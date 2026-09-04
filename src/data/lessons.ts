import { Lesson } from '../types';

export const lessonData: Lesson[] = [
  {
    topicId: 'py-t1',
    title: 'Python Type Hints - Guia Completo',
    xp: 10,
    steps: [
      {
        id: 'py-t1-s1',
        type: 'content',
        title: 'O que são Type Hints?',
        body: `Type hints são anotações OPCIONAIS que você adiciona ao código Python para descrever a INTENÇÃO dos tipos.\n\nFuncionam como um guia para desenvolvedores e ferramentas de análise.\nA sintaxe usa dois-pontos (:) e seta (→) para indicar tipos.\n\nExemplo simples: def cumprimentar(nome: str) -> str:`,
        code: `def cumprimentar(nome: str) -> str:\n    return f"Olá, {nome}!"`,
        tip: 'Lembre-se: type hints são apenas anotações — não mudam o comportamento do programa!'
      },
      {
        id: 'py-t1-s2',
        type: 'mcq',
        question: 'Qual a principal função dos type hints?',
        options: ['Converter strings em inteiros automaticamente', 'Documentar intenções e ajudar ferramentas a detectar erros', 'Melhorar a performance do código', 'Obrigar o Python a usar tipos fortes'],
        correctIndex: 1,
        explanation: 'Type hints servem como documentação e permitem que ferramentas como mypy detectem erros antes da execução.'
      },
      {
        id: 'py-t1-s3',
        type: 'content',
        title: 'Sintaxe Básica de Funções',
        body: `Para tipar uma função, adicione o TIPO entre o parâmetro e o dois-pontos.\nO TIPO DE RETORNO vem após seta (→), separado por espaço.\n\nRegras comuns:\n- str, int, float, bool são tipos primitivos\n- list[int] = lista de inteiros (Python 3.9+)\n- dict[str, int] = dicionário string→inteiro\n`,
        code: `def somar(a: int, b: int) -> int:\n    return a + b\n\ndef nomes_validos(idades: list[int]) -> bool:\n    return all(idade > 0 for idade in idades)`,
        tip: 'Você pode usar list[int] ou typing.List[int] — a primeira é mais curta (Python 3.9+)'
      },
      {
        id: 'py-t1-s4',
        type: 'fill',
        prompt: 'Complete o tipo de retorno da função abaixo. Digite apenas o tipo (ex: str, int):',
        code: `def obter_nome() -> ___:\n    return "João"`,
        placeholder: 'Digite o tipo...',
        accepted: ['str', '-> str'],
        explanation: 'A função sempre retorna uma string ("João"), então o tipo é str.'
      },
      {
        id: 'py-t1-s5',
        type: 'content',
        title: 'Tipos Primitivos Comuns',
        body: `Tipos básicos para praticamente tudo:\n\nint: números inteiros (42, -10)\nfloat: números decimais (3.14, -0.5)\nstr: textos ("olá", "mundo")\nbool: verdadeiro/falso (True, False)\nNone: ausência de valor\n\nTambém existem tipos de coleções: list[int], dict[str, str], tuple[int, str], set[str]\n`,
        tip: 'Use isinstance() para checar tipo em runtime, mas os hints não causam verificação automática!'
      },
      {
        id: 'py-t1-s6',
        type: 'tf',
        statement: 'Se você declarar def f(x: int) -> str e chamar f(10), o Python vai converter 10 para string automaticamente.',
        answer: false,
        explanation: 'Type hints são IGNORADOS em tempo de execução. O Python continua aceitando qualquer tipo.'
      },
      {
        id: 'py-t1-s7',
        type: 'mcq',
        question: 'Qual afirmação sobre runtime é VERDADEIRA?',
        options: ['Type hints causam TypeError se passar tipo errado', 'Funções com type hints são mais rápidas que sem', 'Type hints são verificados automaticamente pelo interpretador Python', 'Type hints são apenas anotações e não afetam o comportamento em runtime'],
        correctIndex: 3,
        explanation: 'Isso é crucial: hints são IGNORADOS em runtime. Use ferramentas como mypy ou Pydantic para validação real.'
      }
    ]
  },
  {
    topicId: 'py-t2',
    title: 'Pydantic V2 - Validação de Dados',
    xp: 10,
    steps: [
      {
        id: 'py-t2-s1',
        type: 'content',
        title: 'O que é Pydantic?',
        body: `Pydantic é uma biblioteca que usa type hints para validar dados em runtime.\n\nBaseModel é a classe principal — herde dela para criar seus modelos.\nPydantic converte e valida automaticamente os dados recebidos.\n`,
        code: `from pydantic import BaseModel\n\nclass Usuario(BaseModel):\n    nome: str\n    idade: int`,
        tip: 'Instale com: pip install pydantic'
      },
      {
        id: 'py-t2-s2',
        type: 'mcq',
        question: 'O que Pydantic faz automaticamente?',
        options: ['Salvar dados em arquivo JSON', 'Validar tipos e converter dados', 'Gerar HTML', 'Criar migrations de banco'],
        correctIndex: 1,
        explanation: 'Pydantic valida se os tipos batem e converte automaticamente (ex: "25" → 25).'
      },
      {
        id: 'py-t2-s3',
        type: 'content',
        title: 'Criando um Modelo',
        body: `Defina campos como atributos de classe com seus respectivos tipos.\nPydantic aceita Field() para restrições adicionais.\n`,
        code: `from pydantic import BaseModel, Field\n\nclass Produto(BaseModel):\n    nome: str\n    preco: float = Field(gt=0)  # maior que 0\n    estoque: int = Field(default=0)`,
        tip: 'Field(gt=0) significa "greater than 0" — restrição de validação'
      },
      {
        id: 'py-t2-s4',
        type: 'fill',
        prompt: 'Complete o import correto:',
        code: `from pydantic import ___, Field`,
        placeholder: 'BaseModel',
        accepted: ['BaseModel', 'base', 'model'],
        explanation: 'BaseModel é a classe principal de Pydantic — importe-a para criar modelos.'
      },
      {
        id: 'py-t2-s5',
        type: 'tf',
        statement: 'Se passar um tipo errado para um campo Pydantic, ele lança ValidationError.',
        answer: true,
        explanation: 'É assim que Pydantic valida em runtime — levanta ValidationError quando algo não bate com o tipo.'
      },
      {
        id: 'py-t2-s6',
        type: 'mcq',
        question: 'Qual método serializa um modelo Pydantic para dicionário?',
        options: ['to_json()', 'model_dump()', 'as_dict()', 'serialize()'],
        correctIndex: 1,
        explanation: 'model_dump() retorna dict (Python) e model_dump_json() retorna JSON string.'
      }
    ]
  },
  {
    topicId: 'py-t3',
    title: 'Type Hints Avançados',
    xp: 10,
    steps: [
      {
        id: 'py-t3-s1',
        type: 'content',
        title: 'Tipos de Coleções',
        body: `list[int] - lista de inteiros\ndict[str, int] - dicionário de string → inteiro\ntuple[str, int] - tupla com 2 elementos\nset[str] - conjunto de strings\n\nPara Python < 3.9 use: typing.List, typing.Dict, typing.Tuple, typing.Set`,
        tip: 'Python 3.9+ suporta list[int] nativo — mais curto que List[int]'
      },
      {
        id: 'py-t3-s2',
        type: 'mcq',
        question: 'Qual tipo representa uma lista de strings?',
        options: ['str[]', 'list[str]', 'array[str]', 'String[]'],
        correctIndex: 1,
        explanation: 'list[str] é a sintaxe moderna (Python 3.9+). Em versões antigas, use List[str].'
      },
      {
        id: 'py-t3-s3',
        type: 'content',
        title: 'Optional e Union',
        body: `Optional[int] significa que o valor pode ser int OU None.\nFormalmente: Optional[int] = int | None (sintaxe moderna, Python 3.10+)\n\nExemplo: def buscar(nome: str) -> Optional[int]: return None`,
        code: `def encontrar_id(nome: str) -> int | None:\n    if nome == "admin":\n        return 1\n    return None`,
        tip: 'Use `int | None` se tiver Python 3.10+, senão Optional[int]'
      },
      {
        id: 'py-t3-s4',
        type: 'tf',
        statement: 'Optional[X] e X | None são sinônimos absolutos.',
        answer: true,
        explanation: 'Optional[X] é apenas um atalho para Union[X, None] = X | None.'
      },
      {
        id: 'py-t3-s5',
        type: 'mcq',
        question: 'Qual a diferença entre def f() e def f(x: int) -> None?',
        options: ['Nenhuma — são iguais', 'O segundo exige que x seja inteiro', 'O segundo tem anotação e não afeta o comportamento', 'O primeiro funciona em Python mais antigo'],
        correctIndex: 2,
        explanation: 'Anotações são apenas informações para ferramentas — não mudam o runtime.'
      }
    ]
  },
  {
    topicId: 'py-t4',
    title: 'mypy - Verificador de Tipos',
    xp: 10,
    steps: [
      {
        id: 'py-t4-s1',
        type: 'content',
        title: 'O que é mypy?',
        body: `mypy é um verificador de tipos estático para Python.\nEle analisa TYPE HINTS e alerta sobre incongruências.\nNão executa o código — apenas verifica os tipos declarados.\n`,
        code: `# Erro que mypy detectaria:\ndef somar(a: int, b: int) -> int:\n    return a + b\n\nsomar("1", 2)  # mypy alerta: argument 1 is str, expected int`,
        tip: 'Instale com: pip install mypy'
      },
      {
        id: 'py-t4-s2',
        type: 'mcq',
        question: 'Como instalar mypy?',
        options: ['pip install mypy-cli', 'pip install mypy', 'conda install mypy', 'pip install type-checker'],
        correctIndex: 1,
        explanation: 'mypy é distribuído como pacote pip chamado mypy.'
      },
      {
        id: 'py-t4-s3',
        type: 'content',
        title: 'Usando mypy',
        body: `Execute no terminal: mypy nome_arquivo.py\n\nmypy verifica:\n- Tipos de argumentos\n- Tipos de retorno\n- Match entre declarações\n`,
        code: `$ mypy meu_codigo.py\nSuccess: no issues found in 1 source file`,
        tip: 'Use mypy --strict para checagem completa'
      },
      {
        id: 'py-t4-s4',
        type: 'fill',
        prompt: 'Comando para rodar mypy:',
        code: `$ ___ meu_arquivo.py`,
        placeholder: 'mypy',
        accepted: ['mypy', 'python -m mypy'],
        explanation: 'mypy é o comando para executar o verificador. Instale primeiro com pip install mypy.'
      },
      {
        id: 'py-t4-s5',
        type: 'mcq',
        question: 'O que mypy NÃO faz?',
        options: ['Verificar tipos em runtime', 'Analisar anotações de tipo', 'Detectar erros de tipo antes da execução', 'Checar compatibilidade de tipos'],
        correctIndex: 0,
        explanation: 'mypy é estático — não verifica em runtime. Use Pydantic para isso.'
      }
    ]
  },
  {
    topicId: 'py-t5',
    title: 'typing Avançado',
    xp: 10,
    steps: [
      {
        id: 'py-t5-s1',
        type: 'content',
        title: 'Tipos Especiais',
        body: `typing.Any: tipo genérico (desativar verificação)\ntyping.TypeAlias: alias de tipo (UserId = int)\ntyping.Callable: função (Callable[[int], str])\ntyping.Literal: valores exatos (Literal["sim", "não"])\n`,
        tip: 'Any é perigoso — use apenas quando realmente necessário'
      },
      {
        id: 'py-t5-s2',
        type: 'mcq',
        question: 'Qual tipo usar para um alias?',
        options: ['type UserId = int', 'int', 'TypeAlias[int]', 'Alias[int]'],
        correctIndex: 0,
        explanation: 'Sintaxe moderna: `type UserId = int` (Python 3.10+). Em versões antigas, use TypeAlias.'
      },
      {
        id: 'py-t5-s3',
        type: 'content',
        title: 'Callable e Literal',
        body: `Callable[[arg1, arg2], return_type] define assinatura de função.\nLiteral["a", "b"] aceita apenas esses valores exatos.\n`,
        code: `from typing import Callable, Literal\n\n# Função que recebe int e retorna str\ncalc: Callable[[int], str]\n\n# Estado que pode ser "on" ou "off"\nestado: Literal["on", "off"] = "on"`,
        tip: 'Literal ajuda mypy a saber que só aceita valores específicos'
      },
      {
        id: 'py-t5-s4',
        type: 'tf',
        statement: 'typing.Any desativa a verificação de tipo para aquele campo.',
        answer: true,
        explanation: 'Any diz ao mypy "confie, o tipo pode ser qualquer coisa". Use com parcimônia.'
      },
      {
        id: 'py-t5-s5',
        type: 'mcq',
        question: 'Qual a diferença entre Union[X, Y] e X | Y?',
        options: ['Nenhuma — são sinônimos', 'Union é mais antigo, X | Y é Python 3.10+', 'Union é mais lento', 'X | Y só funciona com tipos básicos'],
        correctIndex: 1,
        explanation: 'X | Y é sintaxe moderna (Python 3.10+) para Union[X, Y].'
      }
    ]
  },
  {
    topicId: 'py-t6',
    title: 'Pydantic Avançado',
    xp: 10,
    steps: [
      {
        id: 'py-t6-s1',
        type: 'content',
        title: 'Modelos Aninhados',
        body: 'Pydantic permite modelos dentro de outros modelos!\nIdeal para estruturas hierárquicas (endereço dentro de usuário).\n',
        code: `from pydantic import BaseModel\n\nclass Endereco(BaseModel):\n    rua: str\n    cidade: str\n\nclass Usuario(BaseModel):\n    nome: str\n    endereco: Endereco  # Modelo aninhado`,
        tip: 'Modelos aninhados validam recursivamente — erros aparecem em endereco.rua, etc.'
      },
      {
        id: 'py-t6-s2',
        type: 'fill',
        prompt: 'Qual é a classe do modelo Endereco? Digite o nome:',
        code: `class Endereco(BaseModel):\n    rua: str\n\nendereco = Endereco(rua="Rua A")\ntipo = ___,  # classe do campo`,
        placeholder: 'Endereco',
        accepted: ['Endereco', 'endereco'],
        explanation: 'Endereco é a classe do modelo — Pydantic usa para validar o campo.'
      },
      {
        id: 'py-t6-s3',
        type: 'content',
        title: 'Validação em Assignment',
        body: 'Pydantic v2 valida AUTOMATICAMENTE quando você atribui novos valores.\n',
        code: `from pydantic import BaseModel\n\nclass Contador(BaseModel):\n    valor: int\n\nc = Contador(valor=0)\nc.valor = "10"  # Converte para 10 automaticamente!\nprint(c.valor)  # 10 (int)`,
        tip: 'Isso evita escrever validadores manualmente!'
      },
      {
        id: 'py-t6-s4',
        type: 'mcq',
        question: 'O que Pydantic faz quando você atribui c.valor = "10"?',
        options: ['Lança TypeError', 'Converte string "10" para inteiro 10', 'Ignora o valor', 'Salva como string'],
        correctIndex: 1,
        explanation: 'Pydantic converte automaticamente — string "10" vira inteiro 10.'
      }
    ]
  },
  {
    topicId: 'py-t7',
    title: 'mypy Avançado',
    xp: 10,
    steps: [
      {
        id: 'py-t7-s1',
        type: 'content',
        title: 'Configuração com mypy.ini',
        body: `Crie mypy.ini (ou setup.cfg) na raiz do projeto.\nControla opções como strict mode, paths, e erros a ignorar.\n`,
        code: `[mypy]\nstrict = True\npython_version = 3.11\nwarn_return_any = True`,
        tip: 'strict=True habiliza todas as verificações mais rígidas'
      },
      {
        id: 'py-t7-s2',
        type: 'mcq',
        question: 'O que strict mode em mypy habilita?',
        options: ['Apenas verificação de tipos', 'Checagens avançadas de tipo, none, importações', 'Performance otimizada', 'Modo interativo'],
        correctIndex: 1,
        explanation: 'Strict mode ativa verificação rigorosa — recomendado para novos projetos.'
      },
      {
        id: 'py-t7-s3',
        type: 'content',
        title: 'Por que Equipes Adotam mypy?',
        body: `Detecta erros antes de rodar o código.\nPadrões de código consistentes.\nDocumenta intenções dos tipos.\n`,
        tip: 'Equipes maiores se beneficiam MUITO de mypy — evita bugs comuns.'
      },
      {
        id: 'py-t7-s4',
        type: 'tf',
        statement: 'Adicionar mypy ao CI/CD ajuda a manter qualidade do tipo ao longo do projeto.',
        answer: true,
        explanation: 'Boa prática: mypy no CI trava merges com erros de tipo não corrigidos.'
      }
    ]
  }
];

export const hasLesson = (): boolean => true; // Generator handles any topic
