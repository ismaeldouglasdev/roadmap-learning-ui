import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { Phase, Skill, Achievement, Lesson, Topic } from './types';
import { initialPhases } from './data/roadmap-dev';
import { initialAchievements } from './data/achievements';
import { lessonData } from './data/lessons';
import { generateLesson } from './features/question-generator';
import { StoreProvider, useStore } from './store';
import { AuthProvider, useAuth, AuthResult } from './auth';
import { Stats } from './components/Stats';
import { PhaseCard } from './components/PhaseCard';
import { Badge } from './components/Badge';
import { SkillModal } from './components/SkillModal';
import { QuizModal } from './components/QuizModal';
import { LessonModal } from './components/LessonModal';
import { Modal } from './components/Modal';
import { SearchBar } from './features/search/SearchBar';
import { NotesPanel } from './features/notes/NotesPanel';
import { Icon } from './components/Icon';
import { questionnaire, QuestionnaireAnswers } from './features/ai-generator/questions';
import { generateRoadmap } from './features/ai-generator/generator';
import { Landing } from './Landing';
import { LoginPage } from './Login';
import { readJson, writeJson } from './lib/storage';
import { normalizeStreak, updateStreak } from './streak';
import { useTheme } from './lib/theme';

type Page = 'landing' | 'login' | 'roadmap';

const LS_KEY = 'roadmap-progress';
const XP_PER_TOPIC = 5;
// Backend opcional de sync. Em modo convidado nunca é chamado (progresso fica local).
const BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:8091').replace(/\/$/, '');

interface SavedProgress {
  phases: Phase[];
  achievements: Achievement[];
  xp: number;
  streak: number;
  lastStreakDate?: string;
  favorites: string[];
}

interface ServerProgress {
  phases?: Phase[];
  achievements?: Achievement[];
  xp?: number;
  streak?: number;
  lastStreakDate?: string;
  favorites?: string[];
  notes?: Record<string, string>;
}

const isSavedProgress = (value: unknown): value is SavedProgress =>
  typeof value === 'object' &&
  value !== null &&
  Array.isArray((value as SavedProgress).phases) &&
  Array.isArray((value as SavedProgress).achievements);

// Leitura blindada: localStorage corrompido devolve `null` em vez de derrubar o app.
const loadProgressLocal = (): SavedProgress | null => {
  const parsed = readJson<unknown>(LS_KEY, null);
  return isSavedProgress(parsed) ? parsed : null;
};

const saveProgressLocal = (ph: Phase[], ach: Achievement[], xp: number, streak: number, favs: string[], lastStreakDate?: string) => {
  // Cota estourada não pode derrubar o app — a sessão segue funcionando.
  writeJson(LS_KEY, { phases: ph, achievements: ach, xp, streak, lastStreakDate, favorites: favs });
};

// Normaliza o que veio do localStorage/servidor. Dado antigo sem
// `lastStreakDate` não tem como provar que a sequência está viva, então zera.
const resolveStreak = (streak: unknown, lastDate: unknown) => {
  const validLastDate = typeof lastDate === 'string' ? lastDate : null;
  const count = typeof streak === 'number' ? streak : 0;
  return { count: normalizeStreak(count, validLastDate), lastDate: validLastDate };
};

const loadProgressServer = async (token: string | null): Promise<ServerProgress | null> => {
  if (!token) return null;
  try {
    const response = await fetch(`${BASE_URL}/api/progress`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    if (response.ok) {
      const data = await response.json();
      const progress = data?.progress;
      return progress && typeof progress === 'object' ? (progress as ServerProgress) : null;
    }
  } catch (error) {
    console.error('Failed to load progress from server:', error);
  }
  return null;
};

const RoadmapView: React.FC = () => {
  const store = useStore();
  const { hydrate } = store;
  const { user, isGuest, logout, getToken } = useAuth();
  const { isDark, toggle: toggleTheme } = useTheme();
  const [phases, setPhases] = useState<Phase[]>(initialPhases);
  const [achievements, setAchievements] = useState(initialAchievements);
  const [xp, setXp] = useState(0);
  const [streakState, setStreakState] = useState<{ count: number; lastDate: string | null }>({ count: 0, lastDate: null });
  const streak = streakState.count;
  const lastStreakDate = streakState.lastDate;
  const [hydrated, setHydrated] = useState(false);
  const [expandedPhase, setExpandedPhase] = useState<string | null>('phase-1');
  const [selectedSkill, setSelectedSkill] = useState<{ skill: Skill; color: string } | null>(null);
  const [quizOpen, setQuizOpen] = useState(false);
  const [lessonTopic, setLessonTopic] = useState<{ topic: Topic; lesson: Lesson; skillId: string; color: string } | null>(null);
  const [notesOpen, setNotesOpen] = useState(false);
  const [notesTopic, setNotesTopic] = useState<{ id: string; name: string; url: string } | null>(null);
  const [showGenerator, setShowGenerator] = useState(false);
  const [generatorStep, setGeneratorStep] = useState(0);
  const [generatorAnswers, setGeneratorAnswers] = useState<Record<string, string>>({});
  const [generatorText, setGeneratorText] = useState('');
  const [showFavs, setShowFavs] = useState(false);

  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Skills cujo bônus de XP já foi creditado: evita pagar o bônus de novo ao
  // recarregar a página ou quando o efeito de conclusão roda outra vez.
  const awardedSkillsRef = useRef<Set<string>>(new Set());

  // Registro atômico: ler e escrever a streak no mesmo updater evita perder
  // uma lição quando duas conclusões acontecem antes do próximo render.
  const registerStudyToday = useCallback(() => {
    setStreakState(prev => {
      const result = updateStreak(prev.count, prev.lastDate);
      if (result.streak === prev.count && result.lastDate === prev.lastDate) return prev;
      return { count: result.streak, lastDate: result.lastDate };
    });
  }, []);

  useEffect(() => {
    let cancelled = false;
    const token = getToken();

    const doLoad = async () => {
      const serverData = await loadProgressServer(token);
      if (cancelled) return;

      const markAwarded = (loaded: Phase[]) => {
        awardedSkillsRef.current = new Set(
          loaded.flatMap(p => p.skills).filter(sk => sk.completed).map(sk => sk.id),
        );
      };

      if (serverData) {
        if (serverData.phases) {
          markAwarded(serverData.phases);
          setPhases(serverData.phases);
        }
        if (serverData.achievements) setAchievements(serverData.achievements);
        if (typeof serverData.xp === 'number') setXp(serverData.xp);
        setStreakState(resolveStreak(serverData.streak, serverData.lastStreakDate));
        hydrate(serverData.notes || {}, serverData.favorites || []);
      } else {
        const local = loadProgressLocal();
        if (local) {
          markAwarded(local.phases);
          setPhases(local.phases);
          setAchievements(local.achievements);
          setXp(local.xp);
          setStreakState(resolveStreak(local.streak, local.lastStreakDate));
        }
      }
      setHydrated(true);
    };

    doLoad();
    return () => { cancelled = true; };
    // `hydrate` é estável (useCallback) e `getToken` só muda em transições de
    // autenticação — antes, `store` no array fazia este efeito rodar a cada
    // tecla digitada na busca, sobrescrevendo o estado do usuário.
  }, [getToken, hydrate]);

  // Fecha a sequência na virada da meia-noite local. `visibilitychange`/`focus`
  // cobrem o caso de notebook dormindo ou aba em segundo plano (timers throttled).
  useEffect(() => {
    if (!hydrated) return;

    const sync = () => {
      setStreakState(prev => {
        const count = normalizeStreak(prev.count, prev.lastDate);
        return count === prev.count ? prev : { ...prev, count };
      });
    };

    sync();

    let timer: number | undefined;
    const scheduleMidnight = () => {
      const now = new Date();
      const next = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 5);
      timer = window.setTimeout(() => {
        sync();
        scheduleMidnight();
      }, Math.max(1000, next.getTime() - now.getTime()));
    };
    scheduleMidnight();

    const onVisible = () => {
      if (document.visibilityState === 'visible') sync();
    };
    document.addEventListener('visibilitychange', onVisible);
    window.addEventListener('focus', sync);

    return () => {
      if (timer !== undefined) window.clearTimeout(timer);
      document.removeEventListener('visibilitychange', onVisible);
      window.removeEventListener('focus', sync);
    };
  }, [hydrated]);

  useEffect(() => {
    if (!hydrated) return;

    saveProgressLocal(phases, achievements, xp, streak, Array.from(store.favorites), lastStreakDate || undefined);

    if (!getToken()) return;

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
          lastStreakDate,
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
  }, [hydrated, phases, achievements, xp, streak, lastStreakDate, store.favorites, store.notes, getToken]);

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
    setPhases(p => {
      const next = p.map((ph, i) => {
        if (i === 0) return ph.unlocked ? ph : { ...ph, unlocked: true };
        const unlocked = p[i - 1].skills.every(s => s.completed);
        return ph.unlocked === unlocked ? ph : { ...ph, unlocked };
      });
      return next.every((ph, i) => ph === p[i]) ? p : next;
    });
  }, [phases]);

  useEffect(() => {
    const newlyCompleted = phases.flatMap(p => p.skills).filter(sk => {
      const allDone = sk.subModules.every(sm => sm.topics.every(t => t.completed));
      return allDone && !sk.completed && !awardedSkillsRef.current.has(sk.id);
    });

    if (newlyCompleted.length > 0) {
      newlyCompleted.forEach(sk => awardedSkillsRef.current.add(sk.id));
      setXp(prev => prev + newlyCompleted.reduce((acc, sk) => acc + sk.xp, 0));
    }

    setPhases(p => {
      let changed = false;
      const next = p.map(ph => {
        const skills = ph.skills.map(sk => {
          const allDone = sk.subModules.every(sm => sm.topics.every(t => t.completed));
          if (allDone && !sk.completed) {
            changed = true;
            return { ...sk, completed: true };
          }
          return sk;
        });
        return skills.some((s, i) => s !== ph.skills[i]) ? { ...ph, skills } : ph;
      });
      return changed ? next : p;
    });
  }, [phases]);

  const handleTopicToggle = (phaseId: string, skillId: string, subModId: string, topicId: string) => {
    const wasCompleted = phases
      .find(p => p.id === phaseId)?.skills.find(s => s.id === skillId)
      ?.subModules.find(sm => sm.id === subModId)?.topics.find(t => t.id === topicId)?.completed;
    const toggle = (s: Skill) => ({ ...s, subModules: s.subModules.map(sm => sm.id !== subModId ? sm : { ...sm, topics: sm.topics.map(t => t.id === topicId ? { ...t, completed: !t.completed } : t) }) });
    setPhases(prev => prev.map(ph => ph.id !== phaseId ? ph : { ...ph, skills: ph.skills.map(sk => sk.id !== skillId ? sk : toggle(sk)) }));
    if (selectedSkill && selectedSkill.skill.id === skillId) setSelectedSkill(prev => prev ? { ...prev, skill: toggle(prev.skill) } : null);
    setXp(prev => Math.max(0, prev + (wasCompleted ? -XP_PER_TOPIC : XP_PER_TOPIC)));
    if (!wasCompleted) registerStudyToday();
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

  const handleStudy = (skillId: string, _subModId: string, topicId: string) => {
    const sk = phases.flatMap(p => p.skills).find(s => s.id === skillId);
    if (!sk) return;
    const topic = sk.subModules.flatMap(sm => sm.topics).find(t => t.id === topicId);
    if (!topic) return;
    let lesson = lessonData.find((l: Lesson) => l.topicId === topicId);
    if (!lesson) {
      const generated = generateLesson(topicId, topic.name);
      if (!generated) return;
      lesson = generated;
    }
    const ph = phases.find(p => p.skills.some(s => s.id === skillId));
    setLessonTopic({ topic, lesson, skillId, color: ph?.color || '#10B981' });
  };

  const completeTopic = (phaseId: string, skillId: string, subModId: string, topicId: string, xpAward: number) => {
    const wasCompleted = phases.find(p => p.id === phaseId)?.skills.find(s => s.id === skillId)?.subModules.find(sm => sm.id === subModId)?.topics.find(t => t.id === topicId)?.completed;
    const complete = (s: Skill) => ({ ...s, subModules: s.subModules.map(sm => sm.id !== subModId ? sm : { ...sm, topics: sm.topics.map(t => t.id === topicId ? { ...t, completed: true } : t) }) });
    setPhases(prev => prev.map(ph => ph.id !== phaseId ? ph : { ...ph, skills: ph.skills.map(sk => sk.id !== skillId ? sk : complete(sk)) }));
    if (selectedSkill && selectedSkill.skill.id === skillId) setSelectedSkill(prev => prev ? { ...prev, skill: complete(prev.skill) } : null);
    if (!wasCompleted && xpAward > 0) {
      setXp(prev => prev + xpAward);
    }
  };

  const handleLessonComplete = (xp: number) => {
    if (!lessonTopic) return;
    registerStudyToday();
    const ph = phases.find(p => p.skills.some(s => s.id === lessonTopic.skillId));
    const sm = ph?.skills.find(s => s.id === lessonTopic.skillId)?.subModules.find(m => m.topics.some(t => t.id === lessonTopic.topic.id));
    if (ph && sm) completeTopic(ph.id, lessonTopic.skillId, sm.id, lessonTopic.topic.id, xp);
    setLessonTopic(null);
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

  const closeGenerator = () => {
    setShowGenerator(false);
    setGeneratorStep(0);
    setGeneratorAnswers({});
    setGeneratorText('');
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
    <div className="min-h-[100dvh] bg-cream-200 dark:bg-indigo-950">
      <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          <div className="min-w-0">
            <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-indigo-950 dark:text-cream-100 mb-1">Meu Roadmap</h1>
            <p className="text-indigo-700 dark:text-cream-400 text-xs sm:text-sm">Clique num tópico para ver detalhes. Marque concluídos para ganhar XP!</p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button onClick={toggleTheme} className="p-2 rounded-lg hover:bg-indigo-900/10 dark:hover:bg-cream-200/10 transition-colors" title={isDark ? 'Modo claro' : 'Modo escuro'} aria-label={isDark ? 'Ativar modo claro' : 'Ativar modo escuro'}>
              {isDark ? (
                <svg className="w-4 h-4 text-indigo-700 dark:text-cream-300" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="4" />
                  <path strokeLinecap="round" d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4l1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
                </svg>
              ) : (
                <svg className="w-4 h-4 text-indigo-700 dark:text-cream-300" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z" />
                </svg>
              )}
            </button>
            <button onClick={() => setShowGenerator(true)} aria-label="Gerar Roadmap" className="px-2.5 sm:px-3 py-2 rounded-xl bg-indigo-950 hover:bg-indigo-900 text-cream-200 text-sm font-medium flex items-center gap-2 transition-colors motion-reduce:transition-none">
              <Icon n="lightning" s={16} /> <span className="hidden sm:inline">Gerar Roadmap</span>
            </button>
            <div className="flex items-center gap-2 pl-2 border-l border-indigo-800/30 dark:border-cream-200/20 min-w-0">
              <span className="text-sm text-indigo-700 dark:text-cream-300 truncate max-w-[8rem] sm:max-w-none">
                {user}
                {isGuest && <span className="ml-1 px-1.5 py-0.5 rounded-md bg-gold/20 text-gold-dark text-xs">local</span>}
              </span>
              <button onClick={logout} className="p-2 -mr-2 rounded-lg hover:bg-indigo-900/10 dark:hover:bg-cream-200/10 transition-colors flex-shrink-0" title="Sair" aria-label="Sair">
                <Icon n="x" s={16} c="text-indigo-700 dark:text-cream-300" />
              </button>
            </div>
          </div>
        </div>

        <SearchBar />

        {searchFiltered ? (
          <div className="mt-6 space-y-2">
            <h2 className="font-heading text-lg font-bold text-indigo-950 dark:text-cream-100 mb-3">Resultados da busca ({searchFiltered.length})</h2>
            {searchFiltered.map(t => (
              <button key={`${t.phaseId}-${t.skillId}-${t.topicId}`} onClick={() => { const sk = phases.flatMap(p => p.skills).find(s => s.id === t.skillId); if (sk) openSkill(sk); }}
                className="w-full flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-indigo-900/60 border border-indigo-900/10 dark:border-cream-200/10 hover:border-gold transition-colors text-left">
                <span className={`w-2 h-2 rounded-full flex-shrink-0 ${t.completed ? 'bg-emerald-500' : 'bg-indigo-300'}`} />
                <span className="text-sm text-indigo-950 dark:text-cream-100 flex-1">{t.name}</span>
                <span className="text-xs text-indigo-600 dark:text-cream-400">{t.type}</span>
              </button>
            ))}
          </div>
        ) : (
          <>
            <div className="mt-6 mb-6"><Stats xp={xp} streak={streak} /></div>

            <div className="mb-4 flex items-center gap-3">
              <button onClick={() => setShowFavs(false)} className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${!showFavs ? 'bg-indigo-950 text-cream-200' : 'text-indigo-700 dark:text-cream-300 hover:bg-indigo-900/10 dark:hover:bg-cream-200/10'}`}>Todos</button>
              <button onClick={() => setShowFavs(true)} className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-1 ${showFavs ? 'bg-gold/20 text-gold-dark' : 'text-indigo-700 dark:text-cream-300 hover:bg-indigo-900/10 dark:hover:bg-cream-200/10'}`}><Icon n="star" s={14} /> Favoritos</button>
            </div>

            <div className="mb-8 relative">
              <div className="absolute left-[18px] sm:left-7 top-0 bottom-0 w-1 bg-gradient-to-b from-emerald-500 via-sky-500 to-violet-500 rounded-full" />
              <div className="space-y-4">
                {filteredPhases.map(ph => (
                  <div key={ph.id} className="relative pl-11 sm:pl-16">
                    <div className={`absolute left-1.5 sm:left-4 top-4 sm:top-5 w-7 h-7 rounded-full border-4 border-cream-200 dark:border-indigo-950 ${ph.unlocked ? 'bg-emerald-500' : 'bg-indigo-300'}`} />
                    <PhaseCard phase={ph} expanded={expandedPhase === ph.id} onToggle={() => setExpandedPhase(expandedPhase === ph.id ? null : ph.id)} onSkillClick={openSkill} />
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h2 className="font-heading text-xl font-bold text-indigo-950 dark:text-cream-100 mb-4">Conquistas</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">{achievements.map(a => <Badge key={a.id} a={a} />)}</div>
            </div>
          </>
        )}

        <div className="text-center text-sm text-indigo-700 dark:text-cream-400 mt-8">Desenvolvido por Ismael Douglas</div>
      </div>

      {selectedSkill && (
        <SkillModal skill={selectedSkill.skill} color={selectedSkill.color} onClose={() => setSelectedSkill(null)}
          onTopic={(smId, tId) => { const ph = phases.find(p => p.skills.some(s => s.id === selectedSkill.skill.id)); if (ph) handleTopicToggle(ph.id, selectedSkill.skill.id, smId, tId); }}
          onExercise={(smId, exId) => { const ph = phases.find(p => p.skills.some(s => s.id === selectedSkill.skill.id)); if (ph) handleExerciseToggle(ph.id, selectedSkill.skill.id, smId, exId); }}
          onStudy={(smId, tId) => handleStudy(selectedSkill.skill.id, smId, tId)}
          onQuiz={() => setQuizOpen(true)} />
      )}

      {quizOpen && selectedSkill && (
        <QuizModal skillId={selectedSkill.skill.id} skillName={selectedSkill.skill.name} color={selectedSkill.color} onClose={() => setQuizOpen(false)} onPass={(qxp) => { setXp(prev => prev + qxp); registerStudyToday(); }} />
      )}

      {lessonTopic && (
        <LessonModal lesson={lessonTopic.lesson} topicName={lessonTopic.topic.name} color={lessonTopic.color} onClose={() => setLessonTopic(null)} onComplete={handleLessonComplete} />
      )}

      {notesOpen && notesTopic && (
        <NotesPanel topicId={notesTopic.id} topicName={notesTopic.name} topicUrl={notesTopic.url} onClose={() => { setNotesOpen(false); setNotesTopic(null); }} />
      )}

      <Modal
        isOpen={showGenerator}
        onClose={closeGenerator}
        title="Gerar Roadmap com IA"
        panelClassName="max-w-md"
        bodyClassName="p-0"
        header={
          <div className="flex-none p-4 border-b border-indigo-900/10 dark:border-cream-200/10">
            <div className="flex items-center justify-between gap-3">
              <h3 className="font-heading font-bold text-indigo-950 dark:text-cream-100 truncate">Gerar Roadmap com IA</h3>
              <button onClick={closeGenerator} aria-label="Fechar gerador" className="p-2 -m-1 rounded-lg hover:bg-indigo-900/10 dark:hover:bg-cream-200/10 transition-colors motion-reduce:transition-none flex-shrink-0">
                <Icon n="x" s={18} c="text-indigo-700 dark:text-cream-300" />
              </button>
            </div>
            <div className="mt-3 h-1 bg-indigo-100 dark:bg-indigo-950 rounded-full overflow-hidden">
              <div className="h-1 bg-gold rounded-full transition-all duration-300 motion-reduce:transition-none" style={{ width: `${((generatorStep + 1) / questionnaire.length) * 100}%` }} />
            </div>
          </div>
        }
      >
        <div className="p-5 sm:p-6">
          <p className="text-sm text-indigo-600 dark:text-cream-400 mb-1">Pergunta {generatorStep + 1} de {questionnaire.length}</p>
          <p className="text-lg font-medium text-indigo-950 dark:text-cream-100 mb-4">{currentStep.label}</p>
          {currentStep.type === 'text' ? (
            <div>
              <input type="text" value={generatorText} onChange={e => setGeneratorText(e.target.value)} placeholder={currentStep.placeholder} aria-label={currentStep.label} className="w-full px-4 py-2.5 rounded-xl border border-indigo-900/20 dark:border-cream-200/20 bg-cream-50 dark:bg-indigo-950 text-indigo-950 dark:text-cream-100" autoFocus onKeyDown={e => { if (e.key === 'Enter' && generatorText.trim()) handleGeneratorAnswer(generatorText.trim()); }} />
              <button onClick={() => { if (generatorText.trim()) handleGeneratorAnswer(generatorText.trim()); }} disabled={!generatorText.trim()} className="mt-3 w-full py-2.5 rounded-xl bg-indigo-950 hover:bg-indigo-900 text-cream-200 font-semibold disabled:opacity-50 transition-colors">Próximo</button>
            </div>
          ) : (
            <div className="space-y-2">
              {currentStep.options?.map(opt => (
                <button key={opt} onClick={() => handleGeneratorAnswer(opt)} className="w-full p-3 rounded-xl border border-indigo-900/20 dark:border-cream-200/20 text-left text-sm text-indigo-950 dark:text-cream-100 hover:border-gold hover:bg-gold/10 transition-colors motion-reduce:transition-none">{opt}</button>
              ))}
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

const AppRouter: React.FC = () => {
  const { isAuthenticated, isGuest, login, register, enterGuest } = useAuth();
  const [page, setPage] = useState<Page>((isAuthenticated || isGuest) ? 'roadmap' : 'landing');

  useEffect(() => {
    setPage((isAuthenticated || isGuest) ? 'roadmap' : 'landing');
  }, [isAuthenticated, isGuest]);

  const handleLogin = async (user: string, pass: string): Promise<AuthResult> => {
    const result = await login(user, pass);
    if (result.ok) setPage('roadmap');
    return result;
  };

  const handleRegister = async (user: string, pass: string): Promise<AuthResult> => {
    const result = await register(user, pass);
    if (result.ok) setPage('roadmap');
    return result;
  };

  const handleGuest = () => {
    enterGuest();
    setPage('roadmap');
  };

  if (page === 'landing') return <Landing onLogin={() => setPage('login')} onGuest={handleGuest} />;
  if (page === 'login') return <LoginPage onLogin={handleLogin} onRegister={handleRegister} onGuest={handleGuest} onBack={() => setPage('landing')} />;

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