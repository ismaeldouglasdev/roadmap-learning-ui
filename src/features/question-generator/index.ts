import { Lesson, LessonStep } from '../../types';

// ─── Dados por tópico para geração de questões ──────────────

interface TopicConcept {
  concept: string;
  question: string;
  correctAnswer: string;
  wrongAnswers: string[];
  explanation: string;
}

interface TopicData {
  concepts: TopicConcept[];
  tfStatements: Array<{ statement: string; answer: boolean; explanation: string }>;
  fillPrompts: Array<{ prompt: string; accepted: string[]; explanation: string; hint: string }>;
}

const pythonTopicData: Record<string, TopicData> = {
  'py-async': {
    concepts: [
      {
        concept: 'async/await',
        question: 'O que async/await permite fazer em Python?',
        correctAnswer: 'Escrever código assíncrono que não bloqueia a execução',
        wrongAnswers: ['Criar threads manualmente', 'Acelerar a CPU', 'Compilar código mais rápido'],
        explanation: 'async/await permite escrever código assíncrono de forma clara, sem bloquear o thread principal.'
      },
      {
        concept: 'coroutine',
        question: 'O que é uma coroutine em Python?',
        correctAnswer: 'Uma função que pode ser pausada e retomada',
        wrongAnswers: ['Uma classe especial', 'Um tipo de loop', 'Um módulo de rede'],
        explanation: 'Coroutines são funções que podem ser pausadas (await) e retomadas depois, permitindo multitarefa eficiente.'
      },
      {
        concept: 'event loop',
        question: 'O que gerencia a execução de tarefas assíncronas?',
        correctAnswer: 'O event loop',
        wrongAnswers: ['O garbage collector', 'O interpretador Python', 'O thread pool'],
        explanation: 'O event loop é o coração da programação assíncrona — ele gerencia quando cada coroutine executa.'
      },
    ],
    tfStatements: [
      { statement: 'await só pode ser usado dentro de funções async.', answer: true, explanation: 'await só funciona dentro de funções declaradas com async.' },
      { statement: 'asyncio.sleep() bloqueia toda a execução do programa.', answer: false, explanation: 'asyncio.sleep() é não-bloqueante — outras coroutines continuam executando.' },
    ],
    fillPrompts: [
      { prompt: 'Complete: async def fetch() -> ___:', accepted: ['str', 'int', 'None', 'dict'], explanation: 'Funções async podem retornar qualquer tipo, assim como funções normais.', hint: 'Pense no que a função retorna' },
    ],
  },
  'py-patterns': {
    concepts: [
      {
        concept: 'Strategy Pattern',
        question: 'O que o Strategy Pattern permite?',
        correctAnswer: 'Trocar algoritmos em runtime sem mudar o contexto',
        wrongAnswers: ['Criar novas classes automaticamente', 'Herdar de múltiplas classes', 'Compilar código mais rápido'],
        explanation: 'Strategy define uma família de algoritmos e os torna intercambiáveis.'
      },
      {
        concept: 'Singleton',
        question: 'O que garante que uma classe tenha apenas uma instância?',
        correctAnswer: 'O padrão Singleton',
        wrongAnswers: ['O padrão Factory', 'O padrão Observer', 'O padrão Strategy'],
        explanation: 'Singleton garante que uma classe tenha exatamente uma instância globalmente acessível.'
      },
    ],
    tfStatements: [
      { statement: 'O Strategy Pattern usa herança para trocar algoritmos.', answer: false, explanation: 'Strategy usa composição, não herança, para trocar algoritmos.' },
      { statement: 'Singleton é útil quando precisamos de um único ponto de acesso.', answer: true, explanation: 'Singleton garante uma única instância, útil para configurações, conexões, etc.' },
    ],
    fillPrompts: [
      { prompt: 'Complete: class Singleton:', accepted: ['__new__', '__init__', '__call__'], explanation: 'Singleton geralmente sobrescreve __new__ para controlar a criação de instâncias.', hint: 'Método especial de criação de objeto' },
    ],
  },
  'py-testing': {
    concepts: [
      {
        concept: 'pytest fixtures',
        question: 'O que faz um fixture no pytest?',
        correctAnswer: 'Prepara dados ou estado antes de cada teste',
        wrongAnswers: ['Executa o teste em paralelo', 'Gera relatórios HTML', 'Compila o código'],
        explanation: 'Fixtures preparam o ambiente necessário para os testes, como dados de exemplo ou conexões.'
      },
      {
        concept: 'Property-based testing',
        question: 'O que o Hypothesis faz?',
        correctAnswer: 'Gera dados de teste automaticamente para encontrar edge cases',
        wrongAnswers: ['Rodar testes em paralelo', 'Cobrir código com métricas', 'Documentar testes'],
        explanation: 'Property-based testing gera automaticamente muitos cenários de teste para encontrar bugs inesperados.'
      },
    ],
    tfStatements: [
      { statement: 'pytest é o framework de testes mais popular do Python.', answer: true, explanation: 'pytest é amplamente adotado e tem uma API simples e poderosa.' },
      { statement: 'Mock objects são usados para simular dependências reais nos testes.', answer: true, explanation: 'Mocks substituem dependências reais (como APIs ou bancos) por versões controladas para testes.' },
    ],
    fillPrompts: [
      { prompt: 'Complete: def test_function():', accepted: ['def test_', 'def test_function()', 'def test_function():'], explanation: 'Funções de teste no pytest começam com "test_".', hint: 'Comece com "test_"' },
    ],
  },
};

// ─── Templates de questões genéricas ────────────────────────

function generateGenericQuestions(topicName: string, ): TopicConcept[] {
  const name = topicName.toLowerCase();
  const concepts: TopicConcept[] = [];

  if (name.includes('type hint') || name.includes('typing')) {
    concepts.push({
      concept: 'type hints',
      question: 'O que são type hints em Python?',
      correctAnswer: 'Anotações opcionais que descrevem os tipos esperados',
      wrongAnswers: ['Uma forma de converter tipos automaticamente', 'Um sistema de tipos obrigatório', 'Um compilador de Python'],
      explanation: 'Type hints são anotações opcionais que documentam os tipos esperados, sem afetar o runtime.'
    });
    concepts.push({
      concept: 'runtime',
      question: 'Type hints são verificados em runtime?',
      correctAnswer: 'Não, são verificados apenas por ferramentas estáticas',
      wrongAnswers: ['Sim, o Python rejeita tipos errados', 'Sim, mas apenas em modo debug', 'Apenas em versões antigas do Python'],
      explanation: 'Python ignora type hints em runtime — eles servem para ferramentas como mypy.'
    });
  }

  if (name.includes('pydantic') || name.includes('pydantic')) {
    concepts.push({
      concept: 'Pydantic',
      question: 'O que o Pydantic faz?',
      correctAnswer: 'Valida e converte dados usando type hints em runtime',
      wrongAnswers: ['Gera documentação de API', 'Cria migrations de banco', 'Compila Python para C'],
      explanation: 'Pydantic usa type hints para validar e converter dados automaticamente em runtime.'
    });
  }

  if (name.includes('mypy')) {
    concepts.push({
      concept: 'mypy',
      question: 'O que é mypy?',
      correctAnswer: 'Um verificador de tipos estático para Python',
      wrongAnswers: ['Um gerenciador de pacotes', 'Um framework web', 'Um banco de dados'],
      explanation: 'mypy analisa type hints e detecta erros de tipo antes da execução.'
    });
  }

  if (name.includes('docker')) {
    concepts.push({
      concept: 'Docker',
      question: 'O que é um Dockerfile?',
      correctAnswer: 'Um arquivo de texto com instruções para construir uma imagem Docker',
      wrongAnswers: ['Um comando do Docker', 'Uma imagem pronta', 'Um container em execução'],
      explanation: 'Dockerfile contém as instruções passo a passo para construir uma imagem Docker.'
    });
  }

  if (name.includes('kubernetes') || name.includes('k8s')) {
    concepts.push({
      concept: 'Kubernetes',
      question: 'O que é um Pod no Kubernetes?',
      correctAnswer: 'A menor unidade deployable, podendo conter um ou mais containers',
      wrongAnswers: ['Um tipo de rede', 'Um banco de dados', 'Um arquivo de configuração'],
      explanation: 'Pod é a menor unidade do Kubernetes — pode conter um ou mais containers que compartilham recursos.'
    });
  }

  if (name.includes('terraform')) {
    concepts.push({
      concept: 'Terraform',
      question: 'O que é Infrastructure as Code (IaC)?',
      correctAnswer: 'Gerenciar infraestrutura através de código versionado',
      wrongAnswers: ['Código que roda na infraestrutura', 'Um tipo de linguagem de programação', 'Um editor de código'],
      explanation: 'IaC permite declarar e gerenciar infraestrutura como se fosse código fonte.'
    });
  }

  if (name.includes('observ') || name.includes('monitor')) {
    concepts.push({
      concept: 'observabilidade',
      question: 'Quais são os 3 pilares da observabilidade?',
      correctAnswer: 'Logs, Metrics e Traces',
      wrongAnswers: ['CPU, RAM e Disco', 'Alertas, Dashboards e Reports', 'Git, CI e CD'],
      explanation: 'Logs, Metrics e Traces formam os 3 pilares fundamentais da observabilidade de sistemas.'
    });
  }

  return concepts;
}

// ─── Gerador principal ──────────────────────────────────────

function getTopicData(topicId: string): TopicData | null {
  // Tópicos Python com dados ricos
  if (pythonTopicData[topicId]) return pythonTopicData[topicId];

  // Tópicos genéricos — gerar a partir do nome
  return null;
}

function pickRandom<T>(arr: T[], count: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, arr.length));
}

export function generateLesson(topicId: string, topicName: string): Lesson | null {
  const topicData = getTopicData(topicId);
  const concepts = topicData?.concepts ?? generateGenericQuestions(topicName);

  if (concepts.length === 0) return null;

  const steps: LessonStep[] = [];
  let stepNum = 0;

  // Step 1: Conteúdo introdutório
  const introConcept = concepts[0];
  steps.push({
    id: `${topicId}-s${++stepNum}`,
    type: 'content',
    title: `O que é ${introConcept.concept}?`,
    body: introConcept.explanation,
    tip: 'Leia com atenção — o próximo exercício testa exatamente isso.',
  });

  // Step 2: MCQ sobre o primeiro conceito
  steps.push({
    id: `${topicId}-s${++stepNum}`,
    type: 'mcq',
    question: introConcept.question,
    options: shuffle([introConcept.correctAnswer, ...pickRandom(introConcept.wrongAnswers, 3)]),
    correctIndex: shuffle([0, 1, 2, 3]).indexOf(0), // Will be recalculated properly below
    explanation: introConcept.explanation,
  });

  // Fix correctIndex for mcq
  const mcqStep = steps[steps.length - 1] as any;
  const correctOpt = mcqStep.options.indexOf(introConcept.correctAnswer);
  if (correctOpt >= 0) mcqStep.correctIndex = correctOpt;

  // Step 3: TF statement
  if (topicData?.tfStatements.length) {
    const tf = pickRandom(topicData.tfStatements, 1)[0];
    steps.push({
      id: `${topicId}-s${++stepNum}`,
      type: 'tf',
      statement: tf.statement,
      answer: tf.answer,
      explanation: tf.explanation,
    });
  } else {
    // Generic TF
    steps.push({
      id: `${topicId}-s${++stepNum}`,
      type: 'tf',
      statement: `${introConcept.concept} é um conceito importante em ${topicName}.`,
      answer: true,
      explanation: introConcept.explanation,
    });
  }

  // Step 4: Fill question
  if (topicData?.fillPrompts.length) {
    const fill = pickRandom(topicData.fillPrompts, 1)[0];
    steps.push({
      id: `${topicId}-s${++stepNum}`,
      type: 'fill',
      prompt: fill.prompt,
      accepted: fill.accepted,
      explanation: fill.explanation,
      hint: fill.hint,
    });
  } else {
    // Generic fill
    steps.push({
      id: `${topicId}-s${++stepNum}`,
      type: 'fill',
      prompt: `Digite o conceito principal de ${introConcept.concept}:`,
      accepted: [introConcept.correctAnswer.toLowerCase().split(' ')[0]],
      explanation: introConcept.explanation,
      hint: `Pense no que ${introConcept.concept} faz`,
    });
  }

  // Step 5: MCQ revisão
  if (concepts.length > 1) {
    const revConcept = concepts[1];
    steps.push({
      id: `${topicId}-s${++stepNum}`,
      type: 'mcq',
      question: revConcept.question,
      options: shuffle([revConcept.correctAnswer, ...pickRandom(revConcept.wrongAnswers, 3)]),
      correctIndex: 0, // Will be fixed below
      explanation: revConcept.explanation,
    });
    const revMcq = steps[steps.length - 1] as any;
    const revCorrect = revMcq.options.indexOf(revConcept.correctAnswer);
    if (revCorrect >= 0) revMcq.correctIndex = revCorrect;
  }

  return {
    topicId,
    title: `${topicName} — Exercícios`,
    xp: 10,
    steps,
  };
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
