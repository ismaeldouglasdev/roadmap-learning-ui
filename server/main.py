
import json
import sqlite3
import secrets
import bcrypt
from datetime import datetime

from fastapi import FastAPI, HTTPException, status, Depends
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel

# --- Database Setup ---
DATABASE_URL = "/home/ismaeldev/Desktop/code_study/MeusProjetos/roadmap-ui/server/roadmap.db"

def get_db():
    conn = sqlite3.connect(DATABASE_URL)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    with get_db() as db:
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
        db.commit()

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
    allow_origins=["*"],  # Allow all origins as per requirements
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
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
    with get_db() as db:
        cursor = db.cursor()
        cursor.execute("SELECT user_id FROM sessions WHERE token = ?", (token,))
        session = cursor.fetchone()
        if not session:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Token inválido",
            )
        return session["user_id"]

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

    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

    with get_db() as db:
        cursor = db.cursor()
        try:
            cursor.execute(
                "INSERT INTO users (username, password_hash) VALUES (?, ?)",
                (username, hashed_password)
            )
            user_id = cursor.lastrowid
            token = secrets.token_hex(32)
            cursor.execute(
                "INSERT INTO sessions (token, user_id) VALUES (?, ?)",
                (token, user_id)
            )
            db.commit()
            return {"token": token, "username": username}
        except sqlite3.IntegrityError:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Usuário já existe"
            )

@app.post("/api/login")
async def login_user(user: UserLogin):
    username = user.username.strip()
    password = user.password

    with get_db() as db:
        cursor = db.cursor()
        cursor.execute("SELECT id, password_hash FROM users WHERE username = ?", (username,))
        user_data = cursor.fetchone()

        if not user_data or not bcrypt.checkpw(password.encode('utf-8'), user_data["password_hash"].encode('utf-8')):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Usuário ou senha inválidos"
            )

        user_id = user_data["id"]
        token = secrets.token_hex(32)
        cursor.execute(
            "INSERT INTO sessions (token, user_id) VALUES (?, ?)",
            (token, user_id)
        )
        db.commit()
        return {"token": token, "username": username}

@app.get("/api/progress")
async def get_progress(user_id: int = Depends(get_current_user)):
    with get_db() as db:
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
        
        return {"progress": json.loads(progress_data["data"])}

@app.put("/api/progress")
async def update_progress(payload: ProgressPayload, user_id: int = Depends(get_current_user)):
    progress_json = json.dumps(payload.progress)
    
    with get_db() as db:
        cursor = db.cursor()
        cursor.execute(
            """
            INSERT INTO progress (user_id, data, updated_at) VALUES (?, ?, datetime('now'))
            ON CONFLICT(user_id) DO UPDATE SET data = EXCLUDED.data, updated_at = datetime('now')
            """,
            (user_id, progress_json)
        )
        db.commit()
        return {"ok": True}

