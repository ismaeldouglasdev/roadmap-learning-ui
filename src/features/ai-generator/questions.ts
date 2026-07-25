export interface QuestionStep {
  id: number;
  type: 'text' | 'select';
  label: string;
  placeholder?: string;
  options?: string[];
}

export interface QuestionnaireAnswers {
  subject: string;
  experienceLevel: string;
  objective: string;
  weeklyTime: string;
  learningPreference: string;
  language: string;
}

export const questionnaire: QuestionStep[] = [
  {
    id: 1,
    type: 'text',
    label: 'Qual área você quer estudar?',
    placeholder: 'ex: moda, música, culinária, data science',
  },
  {
    id: 2,
    type: 'select',
    label: 'Qual seu nível de experiência?',
    options: ['Iniciante', 'Intermediário', 'Avançado'],
  },
  {
    id: 3,
    type: 'select',
    label: 'Qual seu objetivo?',
    options: ['Carreira profissional', 'Hobby pessoal', 'Faculdade', 'Empreender'],
  },
  {
    id: 4,
    type: 'select',
    label: 'Quanto tempo por semana você pode dedicar?',
    options: ['5h', '10h', '15h', '20h+'],
  },
  {
    id: 5,
    type: 'select',
    label: 'Como você prefere aprender?',
    options: ['Documentação', 'Vídeos', 'Mix equilibrado'],
  },
  {
    id: 6,
    type: 'select',
    label: 'Em qual idioma?',
    options: ['Português', 'Inglês', 'Ambos'],
  },
];
