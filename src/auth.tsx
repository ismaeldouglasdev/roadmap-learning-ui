import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthState {
  isAuthenticated: boolean;
  user: string | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

const VALID_USER = 'ismaeldev';
const VALID_PASS = 'Arroz123@';
const LS_KEY = 'roadmap-auth';

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

  const login = (username: string, password: string): boolean => {
    if (username === VALID_USER && password === VALID_PASS) {
      setIsAuthenticated(true);
      setUser(username);
      localStorage.setItem(LS_KEY, JSON.stringify({ user: username }));
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem(LS_KEY);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
