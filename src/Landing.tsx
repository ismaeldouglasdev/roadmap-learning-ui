import React from 'react';
import { Icon } from './components/Icon';

interface LandingProps {
  onLogin: () => void;
}

const features = [
  { icon: 'lightning' as const, title: 'IA Generativa', desc: 'Descreva o assunto que quer aprender e receba um roadmap completo gerado por IA.' },
  { icon: 'star' as const, title: 'Gamificação Total', desc: 'Ganhe XP, suba de nível e desbloqueie conquistas conforme avança no estudo.' },
  { icon: 'check' as const, title: 'Quiz & Exercícios', desc: 'Teste seus conhecimentos com quizzes e exercícios ao final de cada módulo.' },
  { icon: 'users' as const, title: 'Progresso Detalhado', desc: 'Acompanhe cada tópico, anote suas observações e marque o que já dominou.' },
];

const phases = [
  { n: 1, name: 'Fundamentos', color: 'bg-emerald-500', skills: 'Conceitos básicos e teoria essencial' },
  { n: 2, name: 'Intermediário', color: 'bg-sky-500', skills: 'Prática avançada e projetos' },
  { n: 3, name: 'Avançado', color: 'bg-violet-500', skills: 'Técnicas especializadas' },
  { n: 4, name: 'Especialização', color: 'bg-amber-500', skills: 'Foco e nicho do assunto' },
  { n: 5, name: 'Mestre', color: 'bg-rose-500', skills: 'Domínio total e criação própria' },
];

export const Landing: React.FC<LandingProps> = ({ onLogin }) => (
  <div className="min-h-screen bg-indigo-950">
    <nav className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-cream-200 flex items-center justify-center">
          <Icon n="lightning" s={22} c="text-indigo-950" />
        </div>
        <span className="font-heading text-xl font-bold text-cream-200">RoadmapDev</span>
      </div>
      <button onClick={onLogin} className="px-5 py-2.5 rounded-xl bg-cream-200/10 hover:bg-cream-200/20 text-cream-200 font-medium border border-cream-200/20 transition-all">
        Entrar
      </button>
    </nav>

    <section className="max-w-6xl mx-auto px-6 pt-20 pb-28 text-center">
      <div className="inline-block px-4 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-gold text-sm font-medium mb-6">
        Roadmaps para Qualquer Assunto
      </div>
      <h1 className="font-heading text-5xl md:text-7xl font-extrabold text-cream-200 leading-tight mb-6">
        Crie seu Próximo<br />
        <span className="text-gold">Roadmap</span>
      </h1>
      <p className="text-lg md:text-xl text-cream-400 max-w-2xl mx-auto mb-10 leading-relaxed">
        Programação, moda, culinária, negócios — qualquer assunto que você queira dominar. Gere um roadmap gamificado com XP, conquistas e quizzes.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button onClick={onLogin} className="px-8 py-4 rounded-2xl bg-gold hover:bg-gold-light text-indigo-950 font-bold text-lg shadow-lg shadow-gold/20 transition-all hover:scale-105">
          Começar Agora
        </button>
        <a href="#features" className="px-8 py-4 rounded-2xl border border-cream-200/20 text-cream-200 font-medium hover:bg-cream-200/10 transition-all">
          Saiba Mais ↓
        </a>
      </div>
    </section>

    <section id="features" className="max-w-6xl mx-auto px-6 pb-20">
      <h2 className="font-heading text-3xl font-bold text-cream-200 text-center mb-12">Por que usar o RoadmapDev?</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((f, i) => (
          <div key={i} className="p-6 rounded-2xl bg-indigo-900/50 border border-cream-200/10 hover:border-gold/30 transition-all">
            <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-4">
              <Icon n={f.icon} s={24} c="text-gold" />
            </div>
            <h3 className="font-heading text-lg font-bold text-cream-200 mb-2">{f.title}</h3>
            <p className="text-cream-400 text-sm leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>

    <section className="max-w-6xl mx-auto px-6 pb-20">
      <h2 className="font-heading text-3xl font-bold text-cream-200 text-center mb-12">Qualquer Assunto, Um Plano Claro</h2>
      <div className="relative">
        <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-emerald-500 via-sky-500 to-violet-500 rounded-full hidden md:block" />
        <div className="space-y-4">
          {phases.map((p) => (
            <div key={p.n} className="relative flex items-center gap-6 md:pl-20">
              <div className={`hidden md:flex absolute left-4 w-10 h-10 rounded-full ${p.color} items-center justify-center text-white font-bold border-4 border-indigo-950`}>
                {p.n}
              </div>
              <div className="flex-1 p-5 rounded-2xl bg-indigo-900/50 border border-cream-200/10 hover:border-cream-200/20 transition-all">
                <div className="flex items-center gap-3">
                  <span className={`md:hidden w-8 h-8 rounded-full ${p.color} flex items-center justify-center text-white text-sm font-bold`}>{p.n}</span>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-cream-200">{p.name}</h3>
                    <p className="text-cream-400 text-sm">{p.skills}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="max-w-6xl mx-auto px-6 pb-24 text-center">
      <div className="p-10 rounded-3xl bg-indigo-900/30 border border-gold/20">
        <h2 className="font-heading text-3xl font-bold text-cream-200 mb-4">Pronto para começar?</h2>
        <p className="text-cream-400 mb-8 max-w-lg mx-auto">Descreva o assunto que quer dominar e comece sua jornada de aprendizado gamificada hoje.</p>
        <button onClick={onLogin} className="px-10 py-4 rounded-2xl bg-gold hover:bg-gold-light text-indigo-950 font-bold text-lg shadow-lg shadow-gold/20 transition-all hover:scale-105">
          Criar Meu Roadmap
        </button>
      </div>
    </section>

    <footer className="border-t border-cream-200/10 py-8">
      <div className="max-w-6xl mx-auto px-6 text-center text-cream-400 text-sm">
        Desenvolvido por Ismael Douglas — Roadmaps para qualquer assunto.
      </div>
    </footer>
  </div>
);
