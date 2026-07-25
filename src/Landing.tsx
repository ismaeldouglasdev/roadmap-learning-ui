import React from 'react';
import { Icon } from './components/Icon';

interface LandingProps {
  onLogin: () => void;
}

const features = [
  { icon: 'check' as const, title: 'Progresso Gamificado', desc: 'Ganhe XP, suba de nível e desbloqueie conquistas conforme avança.' },
  { icon: 'star' as const, title: 'Skills Detalhadas', desc: 'Cada skill com tópicos, exercícios e recursos curados.' },
  { icon: 'lightning' as const, title: 'Quiz Interativo', desc: 'Teste seus conhecimentos com quizzes ao final de cada módulo.' },
  { icon: 'users' as const, title: 'IA Generativa', desc: 'Gere roadmaps personalizados com inteligência artificial.' },
];

const phases = [
  { n: 1, name: 'Fundamentos', color: 'bg-green-500', skills: 'Python, TypeScript, Git' },
  { n: 2, name: 'Frontend', color: 'bg-blue-500', skills: 'React, Next.js, Tailwind' },
  { n: 3, name: 'Backend', color: 'bg-purple-500', skills: 'APIs, BD, Auth' },
  { n: 4, name: 'DevOps', color: 'bg-orange-500', skills: 'Docker, CI/CD, Cloud' },
  { n: 5, name: 'Projetos', color: 'bg-red-500', skills: 'Portfolio, Open Source' },
];

export const Landing: React.FC<LandingProps> = ({ onLogin }) => (
  <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
    <nav className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
          <Icon n="lightning" s={22} c="text-white" />
        </div>
        <span className="text-xl font-bold text-white">RoadmapDev</span>
      </div>
      <button onClick={onLogin} className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium backdrop-blur-sm border border-white/10 transition-all">
        Entrar
      </button>
    </nav>

    <section className="max-w-6xl mx-auto px-6 pt-20 pb-28 text-center">
      <div className="inline-block px-4 py-1.5 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-sm font-medium mb-6">
        Plataforma de Aprendizado Gamificada
      </div>
      <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6">
        Domine Desenvolvimento<br />
        <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-green-400 bg-clip-text text-transparent">Full-Stack</span>
      </h1>
      <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
        Roadmap interativo com XP, conquistas e quizzes. Aprenda Python, TypeScript, React, DevOps e muito mais — tudo gamificado.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button onClick={onLogin} className="px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold text-lg shadow-lg shadow-purple-500/25 transition-all hover:scale-105">
          Começar Agora
        </button>
        <a href="#features" className="px-8 py-4 rounded-2xl border border-white/20 text-white font-medium hover:bg-white/10 transition-all">
          Saiba Mais ↓
        </a>
      </div>
    </section>

    <section id="features" className="max-w-6xl mx-auto px-6 pb-20">
      <h2 className="text-3xl font-bold text-white text-center mb-12">Por que usar o RoadmapDev?</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((f, i) => (
          <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-purple-500/50 transition-all">
            <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-4">
              <Icon n={f.icon} s={24} c="text-purple-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">{f.title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>

    <section className="max-w-6xl mx-auto px-6 pb-20">
      <h2 className="text-3xl font-bold text-white text-center mb-12">5 Fases do Roadmap</h2>
      <div className="relative">
        <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-green-500 via-blue-500 to-purple-500 rounded-full hidden md:block" />
        <div className="space-y-4">
          {phases.map((p) => (
            <div key={p.n} className="relative flex items-center gap-6 md:pl-20">
              <div className={`hidden md:flex absolute left-4 w-10 h-10 rounded-full ${p.color} items-center justify-center text-white font-bold border-4 border-gray-900`}>
                {p.n}
              </div>
              <div className="flex-1 p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all">
                <div className="flex items-center gap-3">
                  <span className={`md:hidden w-8 h-8 rounded-full ${p.color} flex items-center justify-center text-white text-sm font-bold`}>{p.n}</span>
                  <div>
                    <h3 className="text-lg font-bold text-white">{p.name}</h3>
                    <p className="text-gray-400 text-sm">{p.skills}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="max-w-6xl mx-auto px-6 pb-24 text-center">
      <div className="p-10 rounded-3xl bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30">
        <h2 className="text-3xl font-bold text-white mb-4">Pronto para começar?</h2>
        <p className="text-gray-300 mb-8 max-w-lg mx-auto">Junte-se a outros desenvolvedores e comece sua jornada de aprendizado gamificada hoje.</p>
        <button onClick={onLogin} className="px-10 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold text-lg shadow-lg shadow-purple-500/25 transition-all hover:scale-105">
          Entrar no Roadmap
        </button>
      </div>
    </section>

    <footer className="border-t border-white/10 py-8">
      <div className="max-w-6xl mx-auto px-6 text-center text-gray-500 text-sm">
        Desenvolvido por Ismael Douglas
      </div>
    </footer>
  </div>
);
