import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthState {
  isAuthenticated: boolean;
  user: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  register: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  getToken: () => string | null;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

const LS_KEY = 'roadmap-auth';
const BASE_URL = 'http://localhost:8084';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(LS_KEY);
    if (stored) {
      try {
        const { user: u } = JSON.parse(stored);
        setIsAuthenticated(true);
        setUser(u);
      } catch { /* ignore */ }
    }
  }, []);

  const storeAuthData = (token: string, username: string) => {
    localStorage.setItem(LS_KEY, JSON.stringify({ token, user: username }));
    setIsAuthenticated(true);
    setUser(username);
  };

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch(`${BASE_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        storeAuthData(data.token, data.username);
        return true;
      } else {
        setIsAuthenticated(false);
        setUser(null);
        localStorage.removeItem(LS_KEY);
        return false;
      }
    } catch (error) {
      console.error('Login network error:', error);
      setIsAuthenticated(false);
      setUser(null);
      localStorage.removeItem(LS_KEY);
      return false;
    }
  };

  const register = async (username: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch(`${BASE_URL}/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        storeAuthData(data.token, data.username);
        return true;
      } else {
        setIsAuthenticated(false);
        setUser(null);
        localStorage.removeItem(LS_KEY);
        return false;
      }
    } catch (error) {
      console.error('Register network error:', error);
      setIsAuthenticated(false);
      setUser(null);
      localStorage.removeItem(LS_KEY);
      return false;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem(LS_KEY);
  };

  const getToken = (): string | null => {
    const stored = localStorage.getItem(LS_KEY);
    if (stored) {
      try {
        const { token } = JSON.parse(stored);
        return token;
      } catch { /* ignore */ }
    }
    return null;
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, register, logout, getToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
