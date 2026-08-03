import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Phase, Skill, Achievement } from './types';
import { initialPhases } from './data/roadmap-dev';
import { initialAchievements } from './data/achievements';
import { StoreProvider, useStore } from './store';
import { AuthProvider, useAuth } from './auth';
import { Stats } from './components/Stats';
import { PhaseCard } from './components/PhaseCard';
import { Badge } from './components/Badge';
import { SkillModal } from './components/SkillModal';
import { QuizModal } from './components/QuizModal';
import { SearchBar } from './features/search/SearchBar';
import { NotesPanel } from './features/notes/NotesPanel';
import { Icon } from './components/Icon';
import { questionnaire, QuestionnaireAnswers } from './features/ai-generator/questions';
import { generateRoadmap } from './features/ai-generator/generator';
import { Landing } from './Landing';
import { LoginPage } from './Login';

type Page = 'landing' | 'login' | 'roadmap';

const LS_KEY = 'roadmap-progress';
const BASE_URL = 'http://localhost:8084';

const loadProgressLocal = () => { try { const s = localStorage.getItem(LS_KEY); return s ? JSON.parse(s) : null; } catch { return null; } };
const saveProgressLocal = (ph: Phase[], ach: Achievement[], xp: number, streak: number, favs: string[]) => {
  localStorage.setItem(LS_KEY, JSON.stringify({ phases: ph, achievements: ach, xp, streak, favorites: favs }));
};

const loadProgressServer = async (token: string | null) => {
  if (!token) return null;
  try {
    const response = await fetch(`${BASE_URL}/api/progress`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    if (response.ok) {
      const data = await response.json();
      return data.progress;
    }
  } catch (error) {
    console.error('Failed to load progress from server:', error);
  }
  return null;
};

const RoadmapView: React.FC = () => {
  const store = useStore();
  const { user, logout, getToken } = useAuth();
  const [phases, setPhases] = useState<Phase[]>(initialPhases);
  const [achievements, setAchievements] = useState(initialAchievements);
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(1);
  const [expandedPhase, setExpandedPhase] = useState<string | null>('phase-1');
  const [selectedSkill, setSelectedSkill] = useState<{ skill: Skill; color: string } | null>(null);
  const [quizOpen, setQuizOpen] = useState(false);
  const [notesOpen, setNotesOpen] = useState(false);
  const [notesTopic, setNotesTopic] = useState<{ id: string; name: string; url: string } | null>(null);
  const [showGenerator, setShowGenerator] = useState(false);
  const [generatorStep, setGeneratorStep] = useState(0);
  const [generatorAnswers, setGeneratorAnswers] = useState<Record<string, string>>({});
  const [generatorText, setGeneratorText] = useState('');
  const [showFavs, setShowFavs] = useState(false);

  const hasLoadedRef = useRef(false);
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let cancelled = false;
    const token = getToken();

    const doLoad = async () => {
      const serverData = await loadProgressServer(token);
      if (cancelled) return;

      if (serverData) {
        if (serverData.phases) setPhases(serverData.phases);
        if (serverData.achievements) setAchievements(serverData.achievements);
        if (typeof serverData.xp === 'number') setXp(serverData.xp);
        if (typeof serverData.streak === 'number') setStreak(serverData.streak);
        store.hydrate(serverData.notes || {}, serverData.favorites || []);
      } else {
        const local = loadProgressLocal();
        if (local) {
          setPhases(local.phases);
          setAchievements(local.achievements);
          setXp(local.xp);
          if (local.streak) setStreak(local.streak);
        }
      }
      hasLoadedRef.current = true;
    };

    doLoad();
    return () => { cancelled = true; };
  }, [getToken, store]);

  useEffect(() => {
    saveProgressLocal(phases, achievements, xp, streak, Array.from(store.favorites));

    if (!hasLoadedRef.current || !getToken()) return;

    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);

    saveTimeoutRef.current = setTimeout(async () => {
      const token = getToken();
      if (!token) return;

      try {
        const payload = {
          phases,
          achievements,
          xp,
          streak,
          favorites: Array.from(store.favorites),
          notes: store.notes,
          updatedAt: new Date().toISOString(),
        };

        await fetch(`${BASE_URL}/api/progress`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ progress: payload }),
        });
      } catch (error) {
        console.debug('Progress sync failed (offline):', error);
      }
    }, 1500);

    return () => {
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    };
  }, [phases, achievements, xp, streak, store.favorites, store.notes, getToken]);

  useEffect(() => {
    const tc = phases.reduce((a, p) => a + p.skills.filter(s => s.completed).length, 0);
    const cp = phases.filter(p => p.skills.every(s => s.completed)).length;
    setAchievements(p => p.map(a => {
      if (a.id === 'first-skill' && tc >= 1) return { ...a, earned: true };
      if (a.id === 'phase-complete' && cp >= 1) return { ...a, earned: true };
      if (a.id === 'xp-500' && xp >= 500) return { ...a, earned: true };
      if (a.id === 'xp-1000' && xp >= 1000) return { ...a, earned: true };
      if (a.id === 'streak-7' && streak >= 7) return { ...a, earned: true };
      if (a.id === 'all-phases' && cp === phases.length) return { ...a, earned: true };
      return a;
    }));
  }, [phases, xp, streak]);

  useEffect(() => {
    setPhases(p => p.map((ph, i) => {
      if (i === 0) return { ...ph, unlocked: true };
      return { ...ph, unlocked: p[i - 1].skills.every(s => s.completed) };
    }));
  }, [phases]);

  useEffect(() => {
    phases.forEach(ph => {
      ph.skills.forEach(sk => {
        const allDone = sk.subModules.every(sm => sm.topics.every(t => t.completed));
        if (allDone && !sk.completed) {
          setPhases(p => p.map(x => x.id !== ph.id ? x : { ...x, skills: x.skills.map(s => {
            if (s.id !== sk.id) return s;
            if (!s.completed) setXp(prev => prev + s.xp);
            return { ...s, completed: true };
          }) }));
        }
      });
    });
  }, [phases]);

  const handleTopicToggle = (phaseId: string, skillId: string, subModId: string, topicId: string) => {
    const toggle = (s: Skill) => ({ ...s, subModules: s.subModules.map(sm => sm.id !== subModId ? sm : { ...sm, topics: sm.topics.map(t => t.id === topicId ? { ...t, completed: !t.completed } : t) }) });
    setPhases(prev => prev.map(ph => ph.id !== phaseId ? ph : { ...ph, skills: ph.skills.map(sk => sk.id !== skillId ? sk : toggle(sk)) }));
    if (selectedSkill && selectedSkill.skill.id === skillId) setSelectedSkill(prev => prev ? { ...prev, skill: toggle(prev.skill) } : null);
  };

  const handleExerciseToggle = (phaseId: string, skillId: string, subModId: string, exerciseId: string) => {
    const toggle = (s: Skill) => ({ ...s, subModules: s.subModules.map(sm => sm.id !== subModId ? sm : { ...sm, exercises: sm.exercises?.map(e => e.id === exerciseId ? { ...e, completed: !e.completed } : e) || [] }) });
    setPhases(prev => prev.map(ph => ph.id !== phaseId ? ph : { ...ph, skills: ph.skills.map(sk => sk.id !== skillId ? sk : toggle(sk)) }));
    if (selectedSkill && selectedSkill.skill.id === skillId) setSelectedSkill(prev => prev ? { ...prev, skill: toggle(prev.skill) } : null);
  };

  const openSkill = (sk: Skill) => {
    const ph = phases.find(p => p.skills.some(s => s.id === sk.id));
    setSelectedSkill({ skill: sk, color: ph?.color || '#10B981' });
  };

  const handleGeneratorAnswer = (value: string) => {
    const step = questionnaire[generatorStep];
    setGeneratorAnswers(prev => ({ ...prev, [step.id]: value }));
    if (generatorStep < questionnaire.length - 1) {
      setGeneratorStep(s => s + 1);
      setGeneratorText('');
    } else {
      const answers: QuestionnaireAnswers = {
        subject: generatorAnswers[1] || value,
        experienceLevel: generatorAnswers[2] || '',
        objective: generatorAnswers[3] || '',
        weeklyTime: generatorAnswers[4] || '',
        learningPreference: generatorAnswers[5] || '',
        language: generatorAnswers[6] || '',
      };
      const { phases: newPhases } = generateRoadmap(answers);
      setPhases(newPhases);
      setShowGenerator(false);
      setGeneratorStep(0);
      setGeneratorAnswers({});
    }
  };

  const allTopics = useMemo(() => {
    const topics: Array<{ name: string; type: string; completed: boolean; phaseId: string; skillId: string; subModId: string; topicId: string }> = [];
    phases.forEach(ph => ph.skills.forEach(sk => sk.subModules.forEach(sm => sm.topics.forEach(t => {
      topics.push({ name: t.name, type: t.type, completed: t.completed, phaseId: ph.id, skillId: sk.id, subModId: sm.id, topicId: t.id });
    }))));
    return topics;
  }, [phases]);

  const searchFiltered = useMemo(() => {
    if (!store.searchQuery.trim() && store.searchFilters.type.length === 0 && store.searchFilters.completion.length === 0) return null;
    const q = store.searchQuery.toLowerCase();
    return allTopics.filter(t => {
      if (q && !t.name.toLowerCase().includes(q)) return false;
      if (store.searchFilters.type.length > 0 && !store.searchFilters.type.includes(t.type)) return false;
      if (store.searchFilters.completion.includes('done') && !t.completed) return false;
      if (store.searchFilters.completion.includes('not_done') && t.completed) return false;
      return true;
    });
  }, [allTopics, store.searchQuery, store.searchFilters]);

  const filteredPhases = useMemo(() => {
    if (showFavs) return phases.map(ph => ({ ...ph, skills: ph.skills.map(sk => ({ ...sk, subModules: sk.subModules.map(sm => ({ ...sm, topics: sm.topics.filter(t => store.favorites.has(t.id)) })) })).filter(sk => sk.subModules.some(sm => sm.topics.length > 0)) })).filter(ph => ph.skills.length > 0);
    return phases;
  }, [phases, showFavs, store.favorites]);

  const currentStep = questionnaire[generatorStep];

  return (
    <div className="min-h-screen bg-cream-200">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-indigo-950 mb-1">Meu Roadmap</h1>
            <p className="text-indigo-700 text-sm">Clique num tópico para ver detalhes. Marque concluídos para ganhar XP!</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setShowGenerator(true)} className="px-3 py-2 rounded-xl bg-indigo-950 hover:bg-indigo-900 text-cream-200 text-sm font-medium flex items-center gap-2 transition-colors">
              <Icon n="lightning" s={16} /> Gerar Roadmap
            </button>
            <div className="flex items-center gap-2 pl-2 border-l border-indigo-800/30">
              <span className="text-sm text-indigo-700">{user}</span>
              <button onClick={logout} className="p-2 rounded-lg hover:bg-indigo-900/10 transition-colors" title="Sair">
                <Icon n="x" s={16} c="text-indigo-700" />
              </button>
            </div>
          </div>
        </div>

        <SearchBar />

        {searchFiltered ? (
          <div className="mt-6 space-y-2">
            <h2 className="font-heading text-lg font-bold text-indigo-950 mb-3">Resultados da busca ({searchFiltered.length})</h2>
            {searchFiltered.map(t => (
              <button key={`${t.phaseId}-${t.skillId}-${t.topicId}`} onClick={() => { const sk = phases.flatMap(p => p.skills).find(s => s.id === t.skillId); if (sk) openSkill(sk); }}
                className="w-full flex items-center gap-3 p-3 rounded-xl bg-white border border-indigo-900/10 hover:border-gold transition-colors text-left">
                <span className={`w-2 h-2 rounded-full flex-shrink-0 ${t.completed ? 'bg-emerald-500' : 'bg-indigo-300'}`} />
                <span className="text-sm text-indigo-950 flex-1">{t.name}</span>
                <span className="text-xs text-indigo-600">{t.type}</span>
              </button>
            ))}
          </div>
        ) : (
          <>
            <div className="mt-6 mb-6"><Stats xp={xp} streak={streak} /></div>

            <div className="mb-4 flex items-center gap-3">
              <button onClick={() => setShowFavs(false)} className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${!showFavs ? 'bg-indigo-950 text-cream-200' : 'text-indigo-700 hover:bg-indigo-900/10'}`}>Todos</button>
              <button onClick={() => setShowFavs(true)} className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-1 ${showFavs ? 'bg-gold/20 text-gold-dark' : 'text-indigo-700 hover:bg-indigo-900/10'}`}><Icon n="star" s={14} /> Favoritos</button>
            </div>

            <div className="mb-8 relative">
              <div className="absolute left-7 top-0 bottom-0 w-1 bg-gradient-to-b from-emerald-500 via-sky-500 to-violet-500 rounded-full" />
              <div className="space-y-4">
                {filteredPhases.map(ph => (
                  <div key={ph.id} className="relative pl-16">
                    <div className={`absolute left-4 w-7 h-7 rounded-full border-4 border-cream-200 ${ph.unlocked ? 'bg-emerald-500' : 'bg-indigo-300'}`} style={{ top: 20 }} />
                    <PhaseCard phase={ph} expanded={expandedPhase === ph.id} onToggle={() => setExpandedPhase(expandedPhase === ph.id ? null : ph.id)} onSkillClick={openSkill} />
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h2 className="font-heading text-xl font-bold text-indigo-950 mb-4">Conquistas</h2>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-3">{achievements.map(a => <Badge key={a.id} a={a} />)}</div>
            </div>
          </>
        )}

        <div className="text-center text-sm text-indigo-700 mt-8">Desenvolvido por Ismael Douglas</div>
      </div>

      {selectedSkill && (
        <SkillModal skill={selectedSkill.skill} color={selectedSkill.color} onClose={() => setSelectedSkill(null)}
          onTopic={(smId, tId) => { const ph = phases.find(p => p.skills.some(s => s.id === selectedSkill.skill.id)); if (ph) handleTopicToggle(ph.id, selectedSkill.skill.id, smId, tId); }}
          onExercise={(smId, exId) => { const ph = phases.find(p => p.skills.some(s => s.id === selectedSkill.skill.id)); if (ph) handleExerciseToggle(ph.id, selectedSkill.skill.id, smId, exId); }}
          onQuiz={() => setQuizOpen(true)} />
      )}

      {quizOpen && selectedSkill && (
        <QuizModal skillId={selectedSkill.skill.id} skillName={selectedSkill.skill.name} color={selectedSkill.color} onClose={() => setQuizOpen(false)} onPass={(qxp) => setXp(prev => prev + qxp)} />
      )}

      {notesOpen && notesTopic && (
        <NotesPanel topicId={notesTopic.id} topicName={notesTopic.name} topicUrl={notesTopic.url} onClose={() => { setNotesOpen(false); setNotesTopic(null); }} />
      )}

      {showGenerator && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-indigo-950/80 backdrop-blur-sm" onClick={() => setShowGenerator(false)}>
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="p-4 border-b border-indigo-900/10 flex items-center justify-between">
              <h3 className="font-heading font-bold text-indigo-950">Gerar Roadmap com IA</h3>
              <button onClick={() => setShowGenerator(false)} className="p-1.5 rounded-lg hover:bg-indigo-900/10"><Icon n="x" s={18} c="text-indigo-700" /></button>
            </div>
            <div className="p-1"><div className="h-1 bg-indigo-100 rounded-full mx-4"><div className="h-1 bg-gold rounded-full transition-all" style={{ width: `${((generatorStep + 1) / questionnaire.length) * 100}%` }} /></div></div>
            <div className="p-6">
              <p className="text-sm text-indigo-600 mb-1">Pergunta {generatorStep + 1} de {questionnaire.length}</p>
              <p className="text-lg font-medium text-indigo-950 mb-4">{currentStep.label}</p>
              {currentStep.type === 'text' ? (
                <div>
                  <input type="text" value={generatorText} onChange={e => setGeneratorText(e.target.value)} placeholder={currentStep.placeholder} className="w-full px-4 py-2.5 rounded-xl border border-indigo-900/20 bg-cream-50 text-indigo-950" autoFocus onKeyDown={e => { if (e.key === 'Enter' && generatorText.trim()) handleGeneratorAnswer(generatorText.trim()); }} />
                  <button onClick={() => { if (generatorText.trim()) handleGeneratorAnswer(generatorText.trim()); }} disabled={!generatorText.trim()} className="mt-3 w-full py-2.5 rounded-xl bg-indigo-950 hover:bg-indigo-900 text-cream-200 font-semibold disabled:opacity-50 transition-colors">Proximo</button>
                </div>
              ) : (
                <div className="space-y-2">
                  {currentStep.options?.map(opt => (
                    <button key={opt} onClick={() => handleGeneratorAnswer(opt)} className="w-full p-3 rounded-xl border border-indigo-900/20 text-left text-sm text-indigo-950 hover:border-gold hover:bg-gold/10 transition-colors">{opt}</button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const AppRouter: React.FC = () => {
  const { isAuthenticated, login, register } = useAuth();
  const [page, setPage] = useState<Page>(isAuthenticated ? 'roadmap' : 'landing');

  useEffect(() => {
    setPage(isAuthenticated ? 'roadmap' : 'landing');
  }, [isAuthenticated]);

  const handleLogin = async (user: string, pass: string): Promise<boolean> => {
    const ok = await login(user, pass);
    if (ok) setPage('roadmap');
    return ok;
  };

  const handleRegister = async (user: string, pass: string): Promise<boolean> => {
    const ok = await register(user, pass);
    if (ok) setPage('roadmap');
    return ok;
  };

  if (page === 'landing') return <Landing onLogin={() => setPage('login')} />;
  if (page === 'login') return <LoginPage onLogin={handleLogin} onRegister={handleRegister} onBack={() => setPage('landing')} />;

  return (
    <StoreProvider>
      <RoadmapView />
    </StoreProvider>
  );
};

const App: React.FC = () => (
  <AuthProvider>
    <AppRouter />
  </AuthProvider>
);

export default App;