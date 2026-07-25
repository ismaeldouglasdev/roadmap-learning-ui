import { Achievement } from '../types';

export const initialAchievements: Achievement[] = [
  { id:'first-skill', name:'Primeiro Passo', description:'Complete seu primeiro tópico', icon:'star', earned:false },
  { id:'phase-complete', name:'Fase Concluída', description:'Complete todas as skills de uma fase', icon:'trophy', earned:false },
  { id:'xp-500', name:'500 XP', description:'Acumule 500 XP', icon:'fire', earned:false },
  { id:'xp-1000', name:'1000 XP', description:'Acumule 1000 XP', icon:'flame', earned:false },
  { id:'streak-7', name:'Sequência de 7', description:'Estude 7 dias seguidos', icon:'lightning', earned:false },
  { id:'all-phases', name:'Mestre', description:'Desbloqueie todas as fases', icon:'crown', earned:false },
  { id:'quiz-pass', name:'Quiz Master', description:'Passe em 3 quizzes', icon:'brain', earned:false },
  { id:'quiz-perfect', name:'Nota 10', description:'Acerte 100% em um quiz', icon:'star', earned:false },
  { id:'exercise-5', name:'Praticante', description:'Complete 5 exercicios', icon:'code', earned:false },
];
