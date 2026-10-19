import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface AuthResult {
  ok: boolean;
  message?: string;
}

interface AuthState {
  isAuthenticated: boolean;
  isGuest: boolean;
  user: string | null;
  login: (username: string, password: string) => Promise<AuthResult>;
  register: (username: string, password: string) => Promise<AuthResult>;
  enterGuest: () => void;
  logout: () => void;
  getToken: () => string | null;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

const LS_KEY = 'roadmap-auth';
const GUEST_KEY = 'roadmap-guest';

// Backend de contas/sync (OPCIONAL). Configurável no build via VITE_API_URL.
// Em modo convidado o app nunca chama este backend — o progresso fica no navegador.
const API_BASE = (import.meta.env.VITE_API_URL || 'http://localhost:8091').replace(/\/$/, '');

const NETWORK_ERROR =
  'Servidor de contas indisponível. Use "Continuar sem conta" para estudar localmente — seu progresso fica salvo no navegador.';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isGuest, setIsGuest] = useState(false);
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(LS_KEY);
    if (stored) {
      try {
        const { user: u } = JSON.parse(stored);
        setIsAuthenticated(true);
        setUser(u);
        return;
      } catch { /* ignore corrupt value */ }
    }
    if (localStorage.getItem(GUEST_KEY) === '1') {
      setIsGuest(true);
      setUser('Visitante');
    }
  }, []);

  const storeAuthData = (token: string, username: string) => {
    localStorage.setItem(LS_KEY, JSON.stringify({ token, user: username }));
    localStorage.removeItem(GUEST_KEY);
    setIsGuest(false);
    setIsAuthenticated(true);
    setUser(username);
  };

  const authRequest = async (
    path: '/api/login' | '/api/register',
    username: string,
    password: string,
  ): Promise<AuthResult> => {
    try {
      const response = await fetch(`${API_BASE}${path}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        storeAuthData(data.token, data.username);
        return { ok: true };
      }

      let message = path === '/api/register' ? 'Não foi possível criar conta' : 'Usuário ou senha inválidos';
      try {
        const body = await response.json();
        if (body?.detail) message = body.detail;
      } catch { /* ignore non-JSON error body */ }
      return { ok: false, message };
    } catch {
      // Rede fora / backend não publicado — o modo local continua funcionando.
      return { ok: false, message: NETWORK_ERROR };
    }
  };

  const login = (username: string, password: string) => authRequest('/api/login', username, password);
  const register = (username: string, password: string) => authRequest('/api/register', username, password);

  const enterGuest = () => {
    localStorage.setItem(GUEST_KEY, '1');
    setIsGuest(true);
    setIsAuthenticated(false);
    setUser('Visitante');
  };

  const logout = () => {
    setIsAuthenticated(false);
    setIsGuest(false);
    setUser(null);
    localStorage.removeItem(LS_KEY);
    localStorage.removeItem(GUEST_KEY);
  };

  const getToken = (): string | null => {
    const stored = localStorage.getItem(LS_KEY);
    if (stored) {
      try {
        const { token } = JSON.parse(stored);
        return token;
      } catch { /* ignore corrupt value */ }
    }
    return null;
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isGuest, user, login, register, enterGuest, logout, getToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
