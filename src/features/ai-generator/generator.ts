import { Phase, Skill, SubModule, Topic, Exercise, QuizData, QuizQuestion } from '../../types';
import { getSubjectResources, getSubjectSubAreas, Resource } from './resources';
import { QuestionnaireAnswers } from './questions';

const MAX_PHASES = 5;
const SKILLS_PER_PHASE = 3;
const SUBMODULES_PER_SKILL = 3;
const TOPICS_PER_SUBMODULE = 5;
const EXERCISES_PER_SUBMODULE = 2;
const QUESTIONS_PER_QUIZ = 4;

const XP_PER_TOPIC = 15;
const BASE_XP = 50;



function generateUniqueId(prefix: string, index: number): string {
  return `${prefix}-${index}-${Date.now().toString(36)}`;
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function getPhaseColorAndIcon(_level: string, index: number) {
  const colors = ['#10B981', '#3B82F6', '#8B5CF6', '#F59E0B', '#EF4444', '#EC4899', '#06B6D4', '#84CC16'];
  const icons = ['code', 'database', 'globe', 'palette', 'music', 'book', 'rocket', 'star', 'brain', 'lightbulb', 'camera', 'utensils', 'scissors', 'briefcase', 'heart', 'chat'];
  
  return {
    color: colors[index % colors.length],
    icon: icons[index % icons.length],
  };
}

function generateTopics(resources: Resource[], subArea: string, subModuleIndex: number, topicCount: number, language: string, pref: string): Topic[] {
  const topics: Topic[] = [];
  const shuffledResources = shuffleArray(resources);
  
  const typeDistribution = pref === 'documentação' ? ['doc', 'article', 'doc', 'article', 'course'] :
                           pref === 'vídeos' ? ['video', 'course', 'video', 'course', 'doc'] :
                           ['doc', 'video', 'course', 'article', 'exercise'];
  
  for (let i = 0; i < topicCount; i++) {
    const resource = shuffledResources[i % shuffledResources.length];
    const type = typeDistribution[i % typeDistribution.length];
    
    const name = language === 'português' 
      ? `${subArea} - ${resource.name} (${i + 1})`
      : language === 'inglês'
      ? `${subArea} - ${resource.name} (${i + 1})`
      : `${subArea} - ${resource.name} (${i + 1})`;
    
    topics.push({
      id: generateUniqueId('topic', subModuleIndex * 100 + i),
      name,
      url: resource.url,
      type: type as Topic['type'],
      completed: false,
    });
  }
  
  return topics;
}

function generateExercises(subArea: string, subModuleIndex: number, count: number): Exercise[] {
  const difficulties: Exercise['difficulty'][] = ['easy', 'medium', 'hard'];
  const exercises: Exercise[] = [];
  
  const exerciseTemplates: Record<string, {title: string; description: string}[]> = {
    programação: [
      { title: 'Implemente uma funcionalidade', description: `Crie uma funcionalidade completa usando ${subArea}` },
      { title: 'Refatore código legado', description: `Melhore a qualidade de um código ${subArea} existente` },
      { title: 'Escreva testes automatizados', description: `Crie testes unitários e de integração para ${subArea}` },
      { title: 'Debugue um problema', description: `Encontre e corrija um bug em um projeto ${subArea}` },
      { title: 'Crie um projeto do zero', description: `Desenvolva um projeto completo em ${subArea}` },
    ],
    design: [
      { title: 'Crie um wireframe', description: `Desenhe o wireframe de uma interface ${subArea}` },
      { title: 'Design de um componente', description: `Desenvolva um componente de UI reutilizável para ${subArea}` },
      { title: 'Sistema de design', description: `Crie tokens de design para ${subArea}` },
      { title: 'Protótipo interativo', description: `Construa um protótipo navegável em ${subArea}` },
      { title: 'Auditoria de usabilidade', description: `Realize testes de usabilidade em ${subArea}` },
    ],
    música: [
      { title: 'Componha uma melodia', description: `Crie uma composição original em ${subArea}` },
      { title: 'Pratique escalas', description: `Estude escalas e arpejos relacionados a ${subArea}` },
      { title: 'Grave uma demo', description: `Produza uma gravação caseira de ${subArea}` },
      { title: 'Analise uma música', description: `Faça análise harmônica de uma peça de ${subArea}` },
      { title: 'Improvise sobre base', description: `Pratique improvisação em ${subArea}` },
    ],
    marketing: [
      { title: 'Crie uma campanha', description: `Desenvolva campanha completa de ${subArea}` },
      { title: 'Análise de métricas', description: `Analise KPIs de uma campanha ${subArea}` },
      { title: 'Copywriting', description: `Escreva textos persuasivos para ${subArea}` },
      { title: 'A/B Testing', description: `Configure e analise testes A/B em ${subArea}` },
      { title: 'Planejamento estratégico', description: `Monte plano de marketing para ${subArea}` },
    ],
    fotografia: [
      { title: 'Sessão fotográfica', description: `Realize ensaio fotográfico temático de ${subArea}` },
      { title: 'Edição de fotos', description: `Edite imagens usando técnicas de ${subArea}` },
      { title: 'Portfólio', description: `Monte portfólio profissional de ${subArea}` },
      { title: 'Estudo de luz', description: `Experimente diferentes iluminações em ${subArea}` },
      { title: 'Composição', description: `Pratique regras de composição em ${subArea}` },
    ],
    culinária: [
      { title: 'Receita original', description: `Crie receita autoral de ${subArea}` },
      { title: 'Técnica culinária', description: `Domine técnica específica de ${subArea}` },
      { title: 'Menu degustação', description: `Planeje menu completo de ${subArea}` },
      { title: 'Apresentação de prato', description: `Pratique empratamento artístico em ${subArea}` },
      { title: 'Harmonização', description: `Estude harmonização para ${subArea}` },
    ],
    moda: [
      { title: 'Croqui de moda', description: `Desenhe coleção de croquis para ${subArea}` },
      { title: 'Modelagem', description: `Desenvolva molde para peça de ${subArea}` },
      { title: 'Costura', description: `Confeccione peça piloto de ${subArea}` },
      { title: 'Moodboard', description: `Crie painel de referências para ${subArea}` },
      { title: 'Tech pack', description: `Elabore ficha técnica completa de ${subArea}` },
    ],
    negócios: [
      { title: 'Business Model Canvas', description: `Complete BMC para negócio de ${subArea}` },
      { title: 'Plano de negócios', description: `Elabore plano executivo de ${subArea}` },
      { title: 'Pitch deck', description: `Crie apresentação para investidores de ${subArea}` },
      { title: 'Análise SWOT', description: `Faça análise estratégica de ${subArea}` },
      { title: 'MVP', description: `Desenvolva produto mínimo viável de ${subArea}` },
    ],
    idiomas: [
      { title: 'Conversação', description: `Pratique speaking por 30 min em ${subArea}` },
      { title: 'Escrita criativa', description: `Escreva texto de 500 palavras em ${subArea}` },
      { title: 'Listening', description: `Assista conteúdo nativo e resuma em ${subArea}` },
      { title: 'Vocabulário temático', description: `Aprenda 50 palavras novas de ${subArea}` },
      { title: 'Mock test', description: `Faça simulado de proficiência em ${subArea}` },
    ],
  };
  
  const templates = exerciseTemplates[subArea.toLowerCase()] || exerciseTemplates['programação'];
  
  for (let i = 0; i < count; i++) {
    const template = templates[i % templates.length];
    exercises.push({
      id: generateUniqueId('ex', subModuleIndex * 10 + i),
      title: template.title,
      description: template.description,
      difficulty: difficulties[i % difficulties.length],
      completed: false,
    });
  }
  
  return exercises;
}

function generateQuizQuestions(skillName: string, _skillId: string, count: number): QuizQuestion[] {
  const questions: QuizQuestion[] = [];
  
  const questionTemplates: Record<string, Omit<QuizQuestion, 'id'>[]> = {
    programação: [
      { question: 'Qual a principal característica da programação orientada a objetos?', options: ['Encapsulamento', 'Sequencial', 'Funcional', 'Linear'], correctIndex: 0, explanation: 'OO usa encapsulamento, herança e polimorfismo.' },
      { question: 'O que é uma API REST?', options: ['Banco de dados', 'Interface de programação', 'Linguagem', 'Framework'], correctIndex: 1, explanation: 'REST define arquitetura para APIs web.' },
      { question: 'Qual padrão cria objetos sem especificar classe?', options: ['Singleton', 'Factory', 'Observer', 'Strategy'], correctIndex: 1, explanation: 'Factory encapsula criação de objetos.' },
      { question: 'O que é CI/CD?', options: ['Integração/Deploy contínuos', 'Código limpo', 'Teste unitário', 'Documentação'], correctIndex: 0, explanation: 'Automatiza build, teste e deploy.' },
      { question: 'Para que serve versionamento?', options: ['Backup apenas', 'Histórico e colaboração', 'Compilação', 'Deploy'], correctIndex: 1, explanation: 'Git permite rastrear mudanças e trabalho em equipe.' },
    ],
    design: [
      { question: 'O que é Design System?', options: ['Biblioteca de componentes', 'Apenas cores', 'Um arquivo Figma', 'Protótipo'], correctIndex: 0, explanation: 'Sistema coerente de componentes reutilizáveis.' },
      { question: 'Qual princípio garante acessibilidade?', options: ['Contraste', 'Animação', 'Complexidade', 'Minimalismo'], correctIndex: 0, explanation: 'WCAG exige contraste suficiente.' },
      { question: 'O que é user research?', options: ['Pesquisa de mercado', 'Entender necessidades do usuário', 'Teste A/B', 'Analytics'], correctIndex: 1, explanation: 'Pesquisa qualitativa com usuários reais.' },
      { question: 'Para que serve wireframe?', options: ['Design final', 'Estrutura e layout', 'Cores finais', 'Animações'], correctIndex: 1, explanation: 'Define estrutura antes do visual.' },
      { question: 'O que é Design Thinking?', options: ['Metodologia de inovação', 'Ferramenta de desenho', 'Framework CSS', 'Biblioteca UI'], correctIndex: 0, explanation: 'Processo centrado no usuário para resolver problemas.' },
    ],
    música: [
      { question: 'O que é uma escala maior?', options: ['Tom-tom-semitom-tom-tom-tom-semitom', 'Semitom-tom-tom-semitom-tom-tom-tom', 'Tom-semitom-tom-tom-semitom-tom-tom', 'Aleatória'], correctIndex: 0, explanation: 'Fórmula da escala maior natural.' },
      { question: 'Qual intervalo tem 3 semitons?', options: ['Segunda maior', 'Terça menor', 'Quarta justa', 'Quinta justa'], correctIndex: 1, explanation: 'Terça menor = 3 semitons.' },
      { question: 'O que é ritmo?', options: ['Altura dos sons', 'Organização temporal', 'Timbre', 'Dinâmica'], correctIndex: 1, explanation: 'Ritmo organiza sons no tempo.' },
      { question: 'Qual clave usa a 2ª linha?', options: ['Sol', 'Fá', 'Dó', 'Ré'], correctIndex: 0, explanation: 'Clave de Sol centraliza na 2ª linha.' },
      { question: 'O que é harmonia?', options: ['Melodia principal', 'Combinação simultânea de notas', 'Andamento', 'Articulação'], correctIndex: 1, explanation: 'Harmonia = notas soando juntas.' },
    ],
    marketing: [
      { question: 'O que é funil de vendas?', options: ['Processo de compra', 'Jornada do cliente', 'Pipeline', 'CRM'], correctIndex: 1, explanation: 'Etapas da descoberta à conversão.' },
      { question: 'O que significa CAC?', options: ['Custo aquisição cliente', 'Custo anúncio clique', 'Conversão por canal', 'Clique por aquisição'], correctIndex: 0, explanation: 'Customer Acquisition Cost.' },
      { question: 'Qual métrica mede retenção?', options: ['Churn rate', 'CTR', 'CPC', 'CPM'], correctIndex: 0, explanation: 'Churn = taxa de cancelamento.' },
      { question: 'O que é SEO?', options: ['Search Engine Optimization', 'Social Engine Optimization', 'Sales Engine Optimization', 'Site Engine Optimization'], correctIndex: 0, explanation: 'Otimização para buscadores.' },
      { question: 'Para que serve A/B testing?', options: ['Comparar duas versões', 'Testar velocidade', 'Validar código', 'Medir servidor'], correctIndex: 0, explanation: 'Compara variantes para otimizar conversão.' },
    ],
    fotografia: [
      { question: 'O que é abertura do diafragma?', options: ['f-stop', 'ISO', 'Velocidade', 'Foco'], correctIndex: 0, explanation: 'Controla profundidade de campo.' },
      { question: 'Regra dos terços divide imagem em?', options: ['9 partes iguais', '3 partes', '4 partes', '16 partes'], correctIndex: 0, explanation: 'Grade 3x3 para composição.' },
      { question: 'ISO alto causa?', options: ['Ruído/grão', 'Desfoque', 'Superexposição', 'Subexposição'], correctIndex: 0, explanation: 'Sensibilidade alta = mais ruído.' },
      { question: 'O que é distância focal?', options: ['Zoom ótico', 'Ângulo de visão', 'Abertura', 'Velocidade'], correctIndex: 1, explanation: 'Define ângulo e ampliação.' },
      { question: 'RAW vs JPEG?', options: ['RAW tem mais dados', 'JPEG tem mais dados', 'São iguais', 'RAW é menor'], correctIndex: 0, explanation: 'RAW mantém dados do sensor sem compressão.' },
    ],
    culinária: [
      { question: 'O que é mise en place?', options: ['Preparo antecipado', 'Cozimento lento', 'Temperatura', 'Empratamento'], correctIndex: 0, explanation: 'Organização prévia dos ingredientes.' },
      { question: 'Qual temperatura para selar carne?', options: ['120°C', '180°C', '220°C+', '100°C'], correctIndex: 2, explanation: 'Alta temperatura cria crosta (Maillard).' },
      { question: 'O que é julienne?', options: ['Corte em cubos', 'Corte em tiras finas', 'Corte em rodelas', 'Corte irregular'], correctIndex: 1, explanation: 'Tiras de ~3mm x 3mm x 5cm.' },
      { question: 'Para que serve roux?', options: ['Engrossar molhos', 'Temperar', 'Cozinhar arroz', 'Assar pão'], correctIndex: 0, explanation: 'Farinha + gordura cozida = espessante.' },
      { question: 'O que é fermentação?', options: ['Cozimento', 'Ação de microrganismos', 'Congelamento', 'Secagem'], correctIndex: 1, explanation: 'Leveduras/bactérias transformam alimentos.' },
    ],
    moda: [
      { question: 'O que é croqui de moda?', options: ['Desenho técnico', 'Esboço de figura', 'Molde', 'Tecido'], correctIndex: 1, explanation: 'Ilustração estilizada do look.' },
      { question: 'O que é modelagem?', options: ['Desenho', 'Criação do molde', 'Costura', 'Tecido'], correctIndex: 1, explanation: 'Desenvolvimento do molde base.' },
      { question: 'Qual tecido é natural?', options: ['Poliéster', 'Algodão', 'Nylon', 'Elastano'], correctIndex: 1, explanation: 'Algodão = fibra natural vegetal.' },
      { question: 'O que é tech pack?', options: ['Embalagem', 'Ficha técnica', 'Desfile', 'Lookbook'], correctIndex: 1, explanation: 'Especificações completas para produção.' },
      { question: 'O que é moulage?', options: ['Modelagem 3D no manequim', 'Desenho plano', 'Costura', 'Corte'], correctIndex: 0, explanation: 'Técnica de modelagem tridimensional.' },
    ],
    negócios: [
      { question: 'O que é MVP?', options: ['Produto final', 'Produto mínimo viável', 'Protótipo', 'Conceito'], correctIndex: 1, explanation: 'Minimum Viable Product para validar hipóteses.' },
      { question: 'O que é BMC?', options: ['Business Model Canvas', 'Business Marketing Canvas', 'Business Management Canvas', 'Business Money Canvas'], correctIndex: 0, explanation: 'Canvas de modelo de negócios.' },
      { question: 'O que é ROI?', options: ['Return on Investment', 'Rate of Interest', 'Revenue on Investment', 'Risk of Investment'], correctIndex: 0, explanation: 'Retorno sobre investimento.' },
      { question: 'O que é SWOT?', options: ['Forças, Fraquezas, Oportunidades, Ameaças', 'Sistema, Web, Operação, Tecnologia', 'Vendas, Web, Operação, Treino', 'Semana, Obra, Organização, Trabalho'], correctIndex: 0, explanation: 'Análise estratégica (FOFA em PT).' },
      { question: 'O que é Product-Market Fit?', options: ['Produto pronto', 'Produto atende demanda real', 'Preço ideal', 'Marketing perfeito'], correctIndex: 1, explanation: 'Produto satisfaz necessidade de mercado.' },
    ],
    idiomas: [
      { question: 'O que é false friend?', options: ['Amigo falso', 'Palavra似但意不同', 'Dialeto', 'Gíria'], correctIndex: 1, explanation: 'Palavras parecidas com significados diferentes.' },
      { question: 'Para que serve shadowing?', options: ['Leitura', 'Prática de pronúncia', 'Escrita', 'Gramática'], correctIndex: 1, explanation: 'Repetir áudio em tempo real.' },
      { question: 'O que é phrasal verb?', options: ['Verbo + partícula', 'Verbo irregular', 'Verbo modal', 'Verbo auxiliar'], correctIndex: 0, explanation: 'Verbo + preposição/advérbio muda sentido.' },
      { question: 'Qual nível CEFR é intermediário?', options: ['A1', 'B1', 'C1', 'A2'], correctIndex: 1, explanation: 'B1/B2 = intermediário independente.' },
      { question: 'O que é imersão linguística?', options: ['Estudar gramática', 'Viver no idioma alvo', 'Traduzir textos', 'Decorar vocabulário'], correctIndex: 1, explanation: 'Ambiente 100% no idioma de estudo.' },
    ],
  };
  
  const templates = questionTemplates[skillName.toLowerCase()] || questionTemplates['programação'];
  const shuffled = shuffleArray(templates);
  
  for (let i = 0; i < Math.min(count, shuffled.length); i++) {
    const t = shuffled[i];
    questions.push({
      id: generateUniqueId('q', i),
      ...t,
    });
  }
  
  return questions;
}

export function generateRoadmap(answers: QuestionnaireAnswers): { phases: Phase[]; quizData: QuizData[] } {
  const { subject, experienceLevel, learningPreference, language } = answers;
  
  const resources = getSubjectResources(subject);
  const subAreas = getSubjectSubAreas(subject);
  
  const phases: Phase[] = [];
  const quizData: QuizData[] = [];
  
  const phaseCount = Math.min(MAX_PHASES, subAreas.length);
  const skillsPerPhase = Math.min(SKILLS_PER_PHASE, Math.ceil(subAreas.length / phaseCount));
  
  for (let phaseIdx = 0; phaseIdx < phaseCount; phaseIdx++) {
    const phaseSubAreas = subAreas.slice(phaseIdx * skillsPerPhase, (phaseIdx + 1) * skillsPerPhase);
    const { color, icon } = getPhaseColorAndIcon(experienceLevel, phaseIdx);
    
    const skills: Skill[] = [];
    
    phaseSubAreas.forEach((subArea, skillIdx) => {
      const skillId = generateUniqueId('skill', phaseIdx * 10 + skillIdx);
      const subModules: SubModule[] = [];
      
      const subModuleCount = SUBMODULES_PER_SKILL;
      for (let smIdx = 0; smIdx < subModuleCount; smIdx++) {
        const subModId = generateUniqueId('sm', phaseIdx * 100 + skillIdx * 10 + smIdx);
        const topics = generateTopics(resources, subArea, phaseIdx * 100 + skillIdx * 10 + smIdx, TOPICS_PER_SUBMODULE, language, learningPreference);
        const exercises = generateExercises(subArea, phaseIdx * 100 + skillIdx * 10 + smIdx, EXERCISES_PER_SUBMODULE);
        
        subModules.push({
          id: subModId,
          name: `${subArea} - Módulo ${smIdx + 1}`,
          topics,
          exercises,
        });
      }
      
      const totalTopics = subModules.reduce((sum, sm) => sum + sm.topics.length, 0);
      const xp = BASE_XP + totalTopics * XP_PER_TOPIC;
      
      const skill: Skill = {
        id: skillId,
        name: subArea,
        description: `Domine ${subArea} para ${subject} - nível ${experienceLevel}`,
        xp,
        completed: false,
        subModules,
      };
      
      skills.push(skill);
      
      // Generate quiz for this skill
      quizData.push({
        skillId,
        questions: generateQuizQuestions(subArea, skillId, QUESTIONS_PER_QUIZ),
      });
    });
    
    const phase: Phase = {
      id: generateUniqueId('phase', phaseIdx),
      number: phaseIdx + 1,
      title: `Fase ${phaseIdx + 1}: ${subject} - ${experienceLevel}`,
      subtitle: phaseSubAreas.join(', '),
      color,
      icon,
      skills,
      unlocked: phaseIdx === 0,
    };
    
    phases.push(phase);
  }
  
  return { phases, quizData };
}
