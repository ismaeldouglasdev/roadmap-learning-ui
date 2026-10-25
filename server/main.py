
import json
import os
import sqlite3
import secrets
import time
import bcrypt
from collections import defaultdict, deque
from contextlib import contextmanager
from datetime import datetime, timedelta

from fastapi import FastAPI, HTTPException, status, Depends, Request
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel

# --- Database Setup ---
DATABASE_URL = os.environ.get(
    "ROADMAP_DB",
    os.path.join(os.path.dirname(os.path.abspath(__file__)), "roadmap.db"),
)

# Sessões expiram: um token vazado deixa de valer depois deste prazo.
SESSION_TTL_HOURS = int(os.environ.get("ROADMAP_SESSION_TTL_HOURS", "168"))

# Origens liberadas para o CORS. A lista é explícita porque a API usa
# `Authorization: Bearer` (não cookies), então `allow_origins=["*"]` não é
# necessário — e`*` com `allow_credentials=True` é uma combinação inválida
# que o próprio FastAPI/Starlette rejeita.
ALLOWED_ORIGINS = [
    origin.strip()
    for origin in os.environ.get(
        "ROADMAP_ALLOWED_ORIGINS",
        "https://ismaeldouglasdev.github.io,http://localhost:5173,http://127.0.0.1:5173",
    ).split(",")
    if origin.strip()
]

# Limite de tentativas de login por IP, em janela deslizante.
LOGIN_RATE_LIMIT = int(os.environ.get("ROADMAP_LOGIN_RATE_LIMIT", "10"))
LOGIN_RATE_WINDOW_SECONDS = 60
_login_attempts: dict[str, deque] = defaultdict(deque)


@contextmanager
def db_session():
    """Conexão que fecha ao fim do bloco.

    `with conn:` sozinho só faz commit/rollback — a conexão continuava
    aberta e cada requisição vazava um descritor de arquivo.
    """
    conn = sqlite3.connect(DATABASE_URL)
    conn.row_factory = sqlite3.Row
    try:
        yield conn
        conn.commit()
    except Exception:
        conn.rollback()
        raise
    finally:
        conn.close()


def init_db():
    with db_session() as db:
        cursor = db.cursor()
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT UNIQUE NOT NULL,
                password_hash TEXT NOT NULL,
                created_at TEXT DEFAULT (datetime('now'))
            )
        """)
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS sessions (
                token TEXT PRIMARY KEY,
                user_id INTEGER NOT NULL,
                created_at TEXT DEFAULT (datetime('now'))
            )
        """)
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS progress (
                user_id INTEGER PRIMARY KEY,
                data TEXT NOT NULL,
                updated_at TEXT DEFAULT (datetime('now'))
            )
        """)
        # Migração leve: bancos criados antes da expiração não têm a coluna.
        cursor.execute("PRAGMA table_info(sessions)")
        if "expires_at" not in {row["name"] for row in cursor.fetchall()}:
            cursor.execute("ALTER TABLE sessions ADD COLUMN expires_at TEXT")
        cursor.execute(
            "DELETE FROM sessions WHERE expires_at IS NOT NULL AND expires_at < datetime('now')"
        )

# Initialize DB on startup
init_db()

# --- FastAPI App Setup ---
app = FastAPI()

@app.exception_handler(RequestValidationError)
async def request_validation_error(_, __):
    return JSONResponse(
        status_code=status.HTTP_400_BAD_REQUEST,
        content={"detail": "Entrada inválida"},
    )

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=False,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["Authorization", "Content-Type"],
)

# --- Models ---
class UserRegister(BaseModel):
    username: str
    password: str

class UserLogin(BaseModel):
    username: str
    password: str

class ProgressPayload(BaseModel):
    progress: dict

# --- Auth Dependency ---
security = HTTPBearer(auto_error=False)

def get_current_user(credentials: HTTPAuthorizationCredentials | None = Depends(security)):
    if credentials is None or credentials.scheme.lower() != "bearer":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token inválido",
        )
    token = credentials.credentials
    with db_session() as db:
        cursor = db.cursor()
        cursor.execute(
            "SELECT user_id FROM sessions WHERE token = ? AND (expires_at IS NULL OR expires_at > datetime('now'))",
            (token,),
        )
        session = cursor.fetchone()
        if not session:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Token inválido",
            )
        return session["user_id"]


def _rate_limit_login(client_host: str) -> None:
    now = time.monotonic()
    attempts = _login_attempts[client_host]
    while attempts and now - attempts[0] > LOGIN_RATE_WINDOW_SECONDS:
        attempts.popleft()
    if len(attempts) >= LOGIN_RATE_LIMIT:
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail="Muitas tentativas. Tente novamente em instantes.",
        )
    attempts.append(now)


def _create_session(cursor, user_id: int) -> str:
    token = secrets.token_hex(32)
    cursor.execute(
        """
        INSERT INTO sessions (token, user_id, created_at, expires_at)
        VALUES (?, ?, datetime('now'), datetime('now', ?))
        """,
        (token, user_id, f"+{SESSION_TTL_HOURS} hours"),
    )
    return token

# --- Endpoints ---

@app.post("/api/register", status_code=status.HTTP_201_CREATED)
async def register_user(user: UserRegister):
    username = user.username.strip()
    password = user.password

    # Basic validation (Pydantic handles most, but extra checks here)
    if not (3 <= len(username) <= 50):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Nome de usuário deve ter entre 3 e 50 caracteres"
        )
    if len(password) < 6:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Senha deve ter no mínimo 6 caracteres"
        )
    if len(password) > 200:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Senha deve ter no máximo 200 caracteres"
        )

    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

    with db_session() as db:
        cursor = db.cursor()
        try:
            cursor.execute(
                "INSERT INTO users (username, password_hash) VALUES (?, ?)",
                (username, hashed_password)
            )
            user_id = cursor.lastrowid
            if user_id is None:
                raise HTTPException(
                    status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                    detail="Não foi possível criar a conta"
                )
            token = _create_session(cursor, user_id)
            return {"token": token, "username": username}
        except sqlite3.IntegrityError:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Usuário já existe"
            )

@app.post("/api/login")
async def login_user(request: Request, user: UserLogin):
    _rate_limit_login(request.client.host if request.client else "unknown")
    username = user.username.strip()
    password = user.password

    with db_session() as db:
        cursor = db.cursor()
        cursor.execute("SELECT id, password_hash FROM users WHERE username = ?", (username,))
        user_data = cursor.fetchone()

        if not user_data or not bcrypt.checkpw(password.encode('utf-8'), user_data["password_hash"].encode('utf-8')):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Usuário ou senha inválidos"
            )

        user_id = user_data["id"]
        token = _create_session(cursor, user_id)
        return {"token": token, "username": username}

@app.delete("/api/session")
async def logout_user(user_id: int = Depends(get_current_user)):
    with db_session() as db:
        db.cursor().execute("DELETE FROM sessions WHERE user_id = ?", (user_id,))
    return {"ok": True}

@app.get("/api/progress")
async def get_progress(user_id: int = Depends(get_current_user)):
    with db_session() as db:
        cursor = db.cursor()
        cursor.execute("SELECT data, updated_at FROM progress WHERE user_id = ?", (user_id,))
        progress_data = cursor.fetchone()

        if not progress_data:
            # Return default empty progress if not found
            return {
                "progress": {
                    "phases": [],
                    "achievements": [],
                    "xp": 0,
                    "streak": 1,
                    "favorites": [],
                    "notes": {},
                    "updatedAt": datetime.now().isoformat()
                }
            }

        try:
            data = json.loads(progress_data["data"])
        except json.JSONDecodeError:
            # Progresso corrompido no banco não pode virar 500.
            data = {
                "phases": [],
                "achievements": [],
                "xp": 0,
                "streak": 1,
                "favorites": [],
                "notes": {},
            }
        return {"progress": data}

@app.put("/api/progress")
async def update_progress(payload: ProgressPayload, user_id: int = Depends(get_current_user)):
    progress_json = json.dumps(payload.progress)

    with db_session() as db:
        cursor = db.cursor()
        cursor.execute(
            """
            INSERT INTO progress (user_id, data, updated_at) VALUES (?, ?, datetime('now'))
            ON CONFLICT(user_id) DO UPDATE SET data = EXCLUDED.data, updated_at = datetime('now')
            """,
            (user_id, progress_json)
        )
        return {"ok": True}
