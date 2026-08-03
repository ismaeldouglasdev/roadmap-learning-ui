import React, { useState } from 'react';
import { Icon } from './components/Icon';

interface LoginProps {
  onLogin: (user: string, pass: string) => Promise<boolean>;
  onRegister: (user: string, pass: string) => Promise<boolean>;
  onBack: () => void;
}

export const LoginPage: React.FC<LoginProps> = ({ onLogin, onRegister, onBack }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    const ok = isRegister ? await onRegister(username, password) : await onLogin(username, password);
    if (!ok) {
      setError(isRegister ? 'Não foi possível criar conta' : 'Usuário ou senha inválidos');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-indigo-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <button onClick={onBack} className="flex items-center gap-2 text-cream-400 hover:text-cream-200 mb-8 transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Voltar
        </button>

        <div className="bg-indigo-900/50 border border-cream-200/10 rounded-3xl p-8 shadow-2xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-cream-200 flex items-center justify-center">
              <Icon n="lightning" s={24} c="text-indigo-950" />
            </div>
            <div>
              <h1 className="font-heading text-2xl font-bold text-cream-200">{isRegister ? 'Criar conta' : 'Entrar'}</h1>
              <p className="text-cream-400 text-sm">{isRegister ? 'Comece sua jornada' : 'Acesse seu roadmap'}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-cream-300 mb-2">Usuário</label>
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-indigo-950/50 border border-cream-200/20 text-cream-200 placeholder-cream-400/50 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all"
                placeholder="Digite seu usuário"
                autoFocus
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-cream-300 mb-2">Senha</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-indigo-950/50 border border-cream-200/20 text-cream-200 placeholder-cream-400/50 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all"
                placeholder="Digite sua senha"
                required
              />
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !username || !password}
              className="w-full py-3.5 rounded-xl bg-gold hover:bg-gold-light text-indigo-950 font-bold text-lg shadow-lg shadow-gold/20 transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  {isRegister ? 'Criando...' : 'Entrando...'}
                </span>
              ) : (isRegister ? 'Criar conta' : 'Entrar')}
            </button>
          </form>

          <button
            onClick={() => { setIsRegister(!isRegister); setError(''); }}
            className="w-full mt-4 text-sm text-cream-400 hover:text-gold transition-colors text-center"
          >
            {isRegister ? 'Já tenho conta' : 'Criar conta'}
          </button>
        </div>

        <p className="text-center text-cream-400 text-sm mt-6">
          RoadmapMaster — Ismael Douglas
        </p>
      </div>
    </div>
  );
};
