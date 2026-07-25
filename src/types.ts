// ─── Core Types ────────────────────────────────────────────
export interface Topic {
  id: string;
  name: string;
  url: string;
  type: 'doc' | 'video' | 'course' | 'exercise' | 'article';
  completed: boolean;
}

export interface Exercise {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  completed: boolean;
}

export interface SubModule {
  id: string;
  name: string;
  topics: Topic[];
  exercises?: Exercise[];
}

export interface Skill {
  id: string;
  name: string;
  description: string;
  xp: number;
  completed: boolean;
  subModules: SubModule[];
}

export interface Phase {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  color: string;
  icon: string;
  skills: Skill[];
  unlocked: boolean;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  earned: boolean;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface QuizData {
  skillId: string;
  questions: QuizQuestion[];
}

// ─── Extended Types (new features) ────────────────────────
export interface UserSettings {
  theme: 'light' | 'dark' | 'auto';
  compactMode: boolean;
  language: string;
}

export interface Notes {
  [topicId: string]: string;
}

export interface Favorites {
  topicIds: string[];
}

export interface StreakData {
  startDate: string;
  lastActiveDate: string;
  currentStreak: number;
  longestStreak: number;
  lastMultiplier: number;
}

export interface ActivityLog {
  [date: string]: number; // date → topics completed count
}

export interface SpacedRepCard {
  nextReview: string;   // ISO date
  interval: number;     // days
  ease: number;         // easiness factor
  correct: number;
  wrong: number;
}

export interface Account {
  id: string;
  name: string;
  avatar?: string;
  email?: string;
  createdAt: string;
}

export interface UserState {
  account: Account | null;
  phases: Phase[];
  achievements: Achievement[];
  xp: number;
  streak: StreakData;
  notes: Notes;
  favorites: string[];
  settings: UserSettings;
  activity: ActivityLog;
  spacedRep: Record<string, SpacedRepCard>;
}

// ─── AI Generator Types ───────────────────────────────────
export interface GeneratorAnswers {
  subject: string;
  level: 'iniciante' | 'intermediario' | 'avancado';
  objective: 'carreira' | 'hobby' | 'faculdade' | 'empreender';
  hoursPerWeek: number;
  preference: 'docs' | 'videos' | 'mix';
  language: 'pt-br' | 'en' | 'both';
}
