import { Phase } from '../types';

export const initialPhases: Phase[] = [
  {
    id: 'phase-1', number: 1, title: 'Fundamentos', subtitle: 'Python, TypeScript & Git',
    color: '#10B981', icon: 'code', unlocked: true,
    skills: [
      { id: 'py-adv', name: 'Python Avançado', description: 'Type hints, async/await, design patterns, clean architecture', xp: 150, completed: false,
        subModules: [
          { id: 'py-type', name: 'Type Hints & Pydantic', topics: [
            { id:'py-t1', name:'Python Type Hints Official Docs', url:'https://docs.python.org/3/library/typing.html', type:'doc', completed:false },
            { id:'py-t2', name:'Pydantic V2 Tutorial', url:'https://docs.pydantic.dev/latest/tutorial/', type:'doc', completed:false },
            { id:'py-t3', name:'Real Python - Type Hints', url:'https://realpython.com/python-type-checking/', type:'article', completed:false },
            { id:'py-t4', name:'mypy Cheat Sheet', url:'https://mypy.readthedocs.io/en/stable/cheat_sheet_py3.html', type:'doc', completed:false },
            { id:'py-t5', name:'Python typing Module Docs', url:'https://docs.python.org/3/library/typing.html', type:'doc', completed:false },
            { id:'py-t6', name:'Pydantic V2 YouTube Tutorial', url:'https://www.youtube.com/watch?v=RlbR5N6veqw', type:'video', completed:false },
            { id:'py-t7', name:'mypy Official Documentation', url:'https://mypy.readthedocs.io/en/stable/', type:'doc', completed:false },
          ],
            exercises: [
              { id:'py-te1', title:'Modelo Pydantic com validação', description:'Crie um modelo Pydantic com campos aninhados e validação customizada', difficulty:'medium', completed:false },
              { id:'py-te2', title:'Type hints em função existente', description:'Adicione type hints completos a uma função Python existente sem erros de mypy', difficulty:'easy', completed:false },
              { id:'py-te3', title:'Validator customizado', description:'Implemente um validator @field_validator que valida formato de CPF', difficulty:'hard', completed:false },
            ]
          },
          { id: 'py-async', name: 'Async/Await Avançado', topics: [
            { id:'py-a1', name:'Python Asyncio Docs', url:'https://docs.python.org/3/library/asyncio.html', type:'doc', completed:false },
            { id:'py-a2', name:'Real Python - Async IO', url:'https://realpython.com/async-io-python/', type:'article', completed:false },
            { id:'py-a3', name:'AsyncIO Deep Dive (YouTube)', url:'https://www.youtube.com/watch?v=2IW-ZEui4h4', type:'video', completed:false },
            { id:'py-a4', name:'aiohttp Documentation', url:'https://docs.aiohttp.org/en/stable/', type:'doc', completed:false },
            { id:'py-a5', name:'Async Patterns - Real Python', url:'https://realpython.com/async-python-deep-dive/', type:'article', completed:false },
            { id:'py-a6', name:'Trio - Async Library', url:'https://trio.readthedocs.io/en/stable/', type:'doc', completed:false },
            { id:'py-a7', name:'asyncio - GitHub Examples', url:'https://github.com/python/cpython/tree/main/Lib/asyncio', type:'exercise', completed:false },
          ],
            exercises: [
              { id:'py-ae1', title:'HTTP Client async', description:'Escreva um cliente HTTP async que faça 10 requests concorrentes com aiohttp', difficulty:'medium', completed:false },
              { id:'py-ae2', title:'Producer-Consumer', description:'Implemente um padrão producer-consumer com asyncio.Queue', difficulty:'hard', completed:false },
              { id:'py-ae3', title:'Async Context Manager', description:'Crie um async context manager para conexão de banco de dados', difficulty:'medium', completed:false },
            ]
          },
          { id: 'py-patterns', name: 'Design Patterns Python', topics: [
            { id:'py-p1', name:'Refactoring Guru - Design Patterns', url:'https://refactoring.guru/design-patterns', type:'article', completed:false },
            { id:'py-p2', name:'Python Design Patterns (GitHub)', url:'https://github.com/faif/python-patterns', type:'exercise', completed:false },
            { id:'py-p3', name:'Fluent Python (Book)', url:'https://www.oreilly.com/library/view/fluent-python-2nd/9781492056348/', type:'course', completed:false },
            { id:'py-p4', name:'Head First Design Patterns', url:'https://www.oreilly.com/library/view/head-first/9781492076933/', type:'course', completed:false },
            { id:'py-p5', name:'Python Patterns - GitHub Repo', url:'https://github.com/faif/python-patterns', type:'exercise', completed:false },
            { id:'py-p6', name:'SOLID Principles in Python', url:'https://python-solid.readthedocs.io/en/latest/', type:'doc', completed:false },
          ],
            exercises: [
              { id:'py-pe1', title:'Implementar Strategy Pattern', description:'Refatore um if/else chain usando Strategy Pattern em Python', difficulty:'medium', completed:false },
              { id:'py-pe2', title:'Singleton thread-safe', description:'Implemente um Singleton thread-safe usando metaclass', difficulty:'hard', completed:false },
            ]
          },
          { id: 'py-testing', name: 'Testing Avançado', topics: [
            { id:'py-x1', name:'pytest Official Docs', url:'https://docs.pytest.org/en/stable/', type:'doc', completed:false },
            { id:'py-x2', name:'Real Python - pytest', url:'https://realpython.com/pytest-python-testing/', type:'article', completed:false },
            { id:'py-x3', name:'Test-Driven Python (YouTube)', url:'https://www.youtube.com/watch?v=2S5h4V-IXiQ', type:'video', completed:false },
            { id:'py-x4', name:'pytest fixtures', url:'https://docs.pytest.org/en/stable/how-to/fixtures.html', type:'doc', completed:false },
            { id:'py-x5', name:'Hypothesis Testing', url:'https://hypothesis.readthedocs.io/en/latest/', type:'doc', completed:false },
            { id:'py-x6', name:'Coverage.py Docs', url:'https://coverage.readthedocs.io/en/latest/', type:'doc', completed:false },
          ],
            exercises: [
              { id:'py-xe1', title:'Testes com fixtures', description:'Escreva uma suíte de testes com fixtures pytest para uma API REST', difficulty:'medium', completed:false },
              { id:'py-xe2', title:'Property-based testing', description:'Use Hypothesis para testar uma função de validação de email', difficulty:'hard', completed:false },
              { id:'py-xe3', title:'Mock e patch', description:'Crie testes com unittest.mock para uma função que faz chamadas HTTP', difficulty:'medium', completed:false },
            ]
          },
        ]
      },
      { id: 'ts-mod', name: 'TypeScript Moderno', description: 'Strict mode, generics, React hooks, Next.js patterns', xp: 120, completed: false,
        subModules: [
          { id: 'ts-fund', name: 'TypeScript Fundamentals', topics: [
            { id:'ts-f1', name:'TypeScript Official Handbook', url:'https://www.typescriptlang.org/docs/handbook/', type:'doc', completed:false },
            { id:'ts-f2', name:'TypeScript Deep Dive (Book)', url:'https://basarat.gitbook.io/typescript/', type:'course', completed:false },
            { id:'ts-f3', name:'Matt Pocock - Total TypeScript', url:'https://www.totaltypescript.com/', type:'course', completed:false },
            { id:'ts-f4', name:'TypeScript Playground', url:'https://www.typescriptlang.org/play', type:'exercise', completed:false },
            { id:'ts-f5', name:'TypeScript for JS Devs', url:'https://www.youtube.com/watch?v=gp5H0Vw39yw', type:'video', completed:false },
            { id:'ts-f6', name:'TypeScript Exercises', url:'https://typescript-exercises.github.io/', type:'exercise', completed:false },
          ],
            exercises: [
              { id:'ts-fe1', title:'Utility Types', description:'Implemente Pick, Omit e Record usando generics em TypeScript', difficulty:'medium', completed:false },
              { id:'ts-fe2', title:'Discriminated Unions', description:'Crie um sistema de estados de pedido usando discriminated unions', difficulty:'medium', completed:false },
            ]
          },
          { id: 'ts-react', name: 'TypeScript + React', topics: [
            { id:'ts-r1', name:'React TypeScript Cheatsheet', url:'https://react-typescript-cheatsheet.netlify.app/', type:'doc', completed:false },
            { id:'ts-r2', name:'React Docs - TypeScript', url:'https://react.dev/learn/typescript', type:'doc', completed:false },
            { id:'ts-r3', name:'TypeScript with React (YouTube)', url:'https://www.youtube.com/watch?v=BRCylrWdDjU', type:'video', completed:false },
            { id:'ts-r4', name:'React + TS Best Practices', url:'https://www.typescriptlang.org/docs/handbook/react.html', type:'doc', completed:false },
            { id:'ts-r5', name:'Vite + React + TS Template', url:'https://vitejs.dev/guide/', type:'doc', completed:false },
          ],
            exercises: [
              { id:'ts-re1', title:'Componente genérico', description:'Crie um componente React genérico List<T> com props tipadas', difficulty:'medium', completed:false },
              { id:'ts-re2', title:'Custom hook tipado', description:'Implemente um useLocalStorage hook com TypeScript completo', difficulty:'medium', completed:false },
            ]
          },
          { id: 'ts-adv', name: 'TypeScript Avançado', topics: [
            { id:'ts-a1', name:'Utility Types', url:'https://www.typescriptlang.org/docs/handbook/utility-types.html', type:'doc', completed:false },
            { id:'ts-a2', name:'Generics Deep Dive', url:'https://www.typescriptlang.org/docs/handbook/2/generics.html', type:'doc', completed:false },
            { id:'ts-a3', name:'Type Challenges (GitHub)', url:'https://github.com/type-challenges/type-challenges', type:'exercise', completed:false },
            { id:'ts-a4', name:'Conditional Types', url:'https://www.typescriptlang.org/docs/handbook/2/conditional-types.html', type:'doc', completed:false },
            { id:'ts-a5', name:'Template Literal Types', url:'https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html', type:'doc', completed:false },
            { id:'ts-a6', name:'Mapped Types', url:'https://www.typescriptlang.org/docs/handbook/2/mapped-types.html', type:'doc', completed:false },
          ],
            exercises: [
              { id:'ts-ae1', title:'Deep Partial', description:'Implemente um tipo DeepPartial que funcione recursivamente em objetos aninhados', difficulty:'hard', completed:false },
              { id:'ts-ae2', title:'Builder Pattern tipado', description:'Crie um Builder Pattern com type inference em TypeScript', difficulty:'hard', completed:false },
            ]
          },
        ]
      },
      { id: 'git-adv', name: 'Git Avançado', description: 'GitFlow, rebasing, cherry-pick, CI/CD pipelines', xp: 80, completed: false,
        subModules: [
          { id: 'git-wf', name: 'Git Workflows', topics: [
            { id:'git-w1', name:'Git Flow - Atlassian', url:'https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow', type:'article', completed:false },
            { id:'git-w2', name:'GitHub Flow', url:'https://docs.github.com/en/get-started/using-github/github-flow', type:'doc', completed:false },
            { id:'git-w3', name:'Git Rebase vs Merge (YouTube)', url:'https://www.youtube.com/watch?v=htgC_3KpH5s', type:'video', completed:false },
            { id:'git-w4', name:'Trunk-Based Development', url:'https://trunkbaseddevelopment.com/', type:'article', completed:false },
            { id:'git-w5', name:'GitLab Flow Guide', url:'https://docs.gitlab.com/ee/topics/gitlab_flow.html', type:'doc', completed:false },
          ],
            exercises: [
              { id:'git-we1', title:'Git Flow na prática', description:'Simule um ciclo Git Flow completo: feature → develop → release → main', difficulty:'medium', completed:false },
            ]
          },
          { id: 'git-adv', name: 'Comandos Avançados', topics: [
            { id:'git-a1', name:'Git Book Pro (Official)', url:'https://git-scm.com/book/en/v2', type:'doc', completed:false },
            { id:'git-a2', name:'Interactive Git Tutorial', url:'https://learngitbranching.js.org/', type:'exercise', completed:false },
            { id:'git-a3', name:'Git Cheat Sheet', url:'https://education.github.com/git-cheat-sheet-education.pdf', type:'doc', completed:false },
            { id:'git-a4', name:'Git Internals', url:'https://git-scm.com/book/en/v2/Git-Internals-Git-Objects', type:'doc', completed:false },
            { id:'git-a5', name:'Oh Shit Git', url:'https://ohshitgit.com/', type:'article', completed:false },
          ],
            exercises: [
              { id:'git-ae1', title:'Interactive rebase', description:'Use git rebase -i para limpar 5 commits em uma feature branch', difficulty:'medium', completed:false },
              { id:'git-ae2', title:'Bisect para bug', description:'Use git bisect para encontrar qual commit introduziu um bug', difficulty:'medium', completed:false },
            ]
          },
        ]
      },
    ],
  },
  {
    id: 'phase-2', number: 2, title: 'Infraestrutura', subtitle: 'Docker, Cloud & Terraform',
    color: '#3B82F6', icon: 'server', unlocked: false,
    skills: [
      { id: 'docker', name: 'Docker', description: 'Multi-stage builds, Compose, networking, security', xp: 120, completed: false,
        subModules: [
          { id: 'dk-fund', name: 'Docker Fundamentals', topics: [
            { id:'dk-f1', name:'Docker Official Getting Started', url:'https://docs.docker.com/get-started/', type:'doc', completed:false },
            { id:'dk-f2', name:'Docker Curriculum', url:'https://docker-curriculum.com/', type:'course', completed:false },
            { id:'dk-f3', name:'Docker Deep Dive (YouTube)', url:'https://www.youtube.com/watch?v=fq1sZcB0-1U', type:'video', completed:false },
            { id:'dk-f4', name:'Docker Docs - Build Images', url:'https://docs.docker.com/build/', type:'doc', completed:false },
            { id:'dk-f5', name:'Play with Docker', url:'https://labs.play-with-docker.com/', type:'exercise', completed:false },
            { id:'dk-f6', name:'Docker for Beginners (YouTube)', url:'https://www.youtube.com/watch?v=fqmwK8BMveE', type:'video', completed:false },
          ],
            exercises: [
              { id:'dk-fe1', title:'Dockerfile multi-stage', description:'Crie um Dockerfile multi-stage para uma aplicação Python + React', difficulty:'medium', completed:false },
              { id:'dk-fe2', title:'Container PostgreSQL', description:'Suba um container PostgreSQL com volume persistente e dados iniciais', difficulty:'easy', completed:false },
            ]
          },
          { id: 'dk-compose', name: 'Docker Compose', topics: [
            { id:'dk-c1', name:'Compose Specification', url:'https://docs.docker.com/compose/', type:'doc', completed:false },
            { id:'dk-c2', name:'Real Python - Docker Compose', url:'https://realpython.com/docker-python/', type:'article', completed:false },
            { id:'dk-c3', name:'Compose GitHub Examples', url:'https://github.com/docker/awesome-compose', type:'exercise', completed:false },
            { id:'dk-c4', name:'Docker Compose YAML Reference', url:'https://docs.docker.com/compose/compose-file/', type:'doc', completed:false },
            { id:'dk-c5', name:'Compose Networking', url:'https://docs.docker.com/compose/networking/', type:'doc', completed:false },
          ],
            exercises: [
              { id:'dk-ce1', title:'Stack completa', description:'Crie um docker-compose.yml com Python API + PostgreSQL + Redis + Nginx', difficulty:'hard', completed:false },
            ]
          },
          { id: 'dk-sec', name: 'Docker Security', topics: [
            { id:'dk-s1', name:'Docker Security Best Practices', url:'https://docs.docker.com/engine/security/', type:'doc', completed:false },
            { id:'dk-s2', name:'Docker Bench Security', url:'https://github.com/docker/docker-bench-security', type:'exercise', completed:false },
            { id:'dk-s3', name:'Docker Security Scanning', url:'https://docs.docker.com/scout/', type:'doc', completed:false },
            { id:'dk-s4', name:'Snyk Container Security', url:'https://snyk.io/docker/', type:'article', completed:false },
          ],
            exercises: [
              { id:'dk-se1', title:'Image scanning', description:'Execute docker-bench-security e corrija os problemas encontrados', difficulty:'medium', completed:false },
            ]
          },
        ]
      },
      { id: 'cloud', name: 'Cloud Basics', description: 'AWS/GCP fundamentals, compute, storage, databases', xp: 150, completed: false,
        subModules: [
          { id: 'aws-fund', name: 'AWS Fundamentals', topics: [
            { id:'aws-f1', name:'AWS Free Tier', url:'https://aws.amazon.com/free/', type:'doc', completed:false },
            { id:'aws-f2', name:'AWS Well-Architected Labs', url:'https://wellarchitectedlabs.com/', type:'exercise', completed:false },
            { id:'aws-f3', name:'AWS Essentials (YouTube)', url:'https://www.youtube.com/watch?v=SOTamWNgDKc', type:'video', completed:false },
            { id:'aws-f4', name:'AWS Documentation', url:'https://docs.aws.amazon.com/', type:'doc', completed:false },
            { id:'aws-f5', name:'AWS Skill Builder', url:'https://skillbuilder.aws/', type:'course', completed:false },
            { id:'aws-f6', name:'AWS Cloud Practitioner', url:'https://explore.skillbuilder.aws/learn/course/external/view/elearning/11889/aws-cloud-practitioner-essentials', type:'course', completed:false },
          ],
            exercises: [
              { id:'aws-fe1', title:'S3 + CloudFront', description:'Configure um bucket S3 com CloudFront para static website hosting', difficulty:'medium', completed:false },
              { id:'aws-fe2', title:'Lambda function', description:'Crie uma Lambda function Python que processa mensagens de SQS', difficulty:'hard', completed:false },
            ]
          },
          { id: 'gcp-fund', name: 'GCP Fundamentals', topics: [
            { id:'gcp-f1', name:'Google Cloud Skills Boost', url:'https://cloudskillsboost.google/', type:'course', completed:false },
            { id:'gcp-f2', name:'GCP Console Labs', url:'https://www.cloudskillsboost.google/paths', type:'exercise', completed:false },
            { id:'gcp-f3', name:'GCP Documentation', url:'https://cloud.google.com/docs', type:'doc', completed:false },
            { id:'gcp-f4', name:'GCP Free Tier', url:'https://cloud.google.com/free', type:'doc', completed:false },
            { id:'gcp-f5', name:'GCP for Beginners (YouTube)', url:'https://www.youtube.com/watch?v=Ir5GkOk3d0U', type:'video', completed:false },
          ],
            exercises: [
              { id:'gcp-fe1', title:'Cloud Run deploy', description:'Faça deploy de uma aplicação Python no Google Cloud Run', difficulty:'medium', completed:false },
            ]
          },
        ]
      },
      { id: 'terraform', name: 'Terraform', description: 'Infrastructure as Code, HCL, modules, state management', xp: 100, completed: false,
        subModules: [
          { id: 'tf-fund', name: 'Terraform Fundamentals', topics: [
            { id:'tf-f1', name:'HashiCorp Learn', url:'https://developer.hashicorp.com/terraform/tutorials', type:'course', completed:false },
            { id:'tf-f2', name:'Terraform Up & Running (Book)', url:'https://www.oreilly.com/library/view/terraform-up/9781098116736/', type:'course', completed:false },
            { id:'tf-f3', name:'Terraform Best Practices', url:'https://www.terraform-best-practices.com/', type:'article', completed:false },
            { id:'tf-f4', name:'Terraform Registry', url:'https://registry.terraform.io/', type:'doc', completed:false },
            { id:'tf-f5', name:'Terraform AWS Provider', url:'https://registry.terraform.io/providers/hashicorp/aws/latest', type:'doc', completed:false },
            { id:'tf-f6', name:'Terraform GitHub Examples', url:'https://github.com/hashicorp/terraform-provider-aws/tree/main/examples', type:'exercise', completed:false },
          ],
            exercises: [
              { id:'tf-fe1', title:'VPC completa', description:'Crie uma VPC completa com subnets, NAT Gateway e Security Groups usando Terraform', difficulty:'hard', completed:false },
              { id:'tf-fe2', title:'Módulo reutilizável', description:'Crie um módulo Terraform para部署 uma aplicação com ECS Fargate', difficulty:'hard', completed:false },
            ]
          },
        ]
      },
    ],
  },
  {
    id: 'phase-3', number: 3, title: 'Data Engineering', subtitle: 'PostgreSQL, Airflow & Analytics',
    color: '#8B5CF6', icon: 'database', unlocked: false,
    skills: [
      { id: 'postgres', name: 'PostgreSQL', description: 'Advanced queries, indexing, performance tuning, migrations', xp: 130, completed: false,
        subModules: [
          { id: 'pg-fund', name: 'PostgreSQL Fundamentals', topics: [
            { id:'pg-f1', name:'PostgreSQL Tutorial', url:'https://www.postgresqltutorial.com/', type:'course', completed:false },
            { id:'pg-f2', name:'PostgreSQL Official Docs', url:'https://www.postgresql.org/docs/current/tutorial.html', type:'doc', completed:false },
            { id:'pg-f3', name:'pgAdmin Download', url:'https://www.postgresql.org/ftp/pgadmin4/', type:'exercise', completed:false },
            { id:'pg-f4', name:'PostgreSQL Exercises', url:'https://pgexercises.com/', type:'exercise', completed:false },
            { id:'pg-f5', name:'PostgreSQL YouTube Tutorial', url:'https://www.youtube.com/watch?v=qw--V8pxvwU', type:'video', completed:false },
            { id:'pg-f6', name:'SQLBolt Interactive', url:'https://sqlbolt.com/', type:'exercise', completed:false },
          ],
            exercises: [
              { id:'pg-fe1', title:'Joins avançados', description:'Resolva 10 exercícios de JOINs complexos no PostgreSQL', difficulty:'medium', completed:false },
              { id:'pg-fe2', title:'Window functions', description:'Implemente ranking e médias móveis usando window functions', difficulty:'hard', completed:false },
            ]
          },
          { id: 'pg-perf', name: 'Performance Tuning', topics: [
            { id:'pg-p1', name:'Use The Index, Luke', url:'https://use-the-index-luke.com/', type:'course', completed:false },
            { id:'pg-p2', name:'PG Performance Wiki', url:'https://wiki.postgresql.org/wiki/Performance_Optimization', type:'article', completed:false },
            { id:'pg-p3', name:'PostgreSQL EXPLAIN', url:'https://www.postgresql.org/docs/current/using-explain.html', type:'doc', completed:false },
            { id:'pg-p4', name:'PgTune - Query Tuning', url:'https://pgtune.leopard.in.ua/', type:'exercise', completed:false },
            { id:'pg-p5', name:'PostgreSQL Indexing Guide', url:'https://www.postgresql.org/docs/current/indexes.html', type:'doc', completed:false },
          ],
            exercises: [
              { id:'pg-pe1', title:'Query optimization', description:'Otimize uma query lenta usando EXPLAIN ANALYZE e índices', difficulty:'hard', completed:false },
            ]
          },
          { id: 'pg-mig', name: 'Migrations & Alembic', topics: [
            { id:'pg-m1', name:'Alembic Tutorial', url:'https://alembic.sqlalchemy.org/en/latest/tutorial.html', type:'doc', completed:false },
            { id:'pg-m2', name:'SQLAlchemy Metadata', url:'https://docs.sqlalchemy.org/en/20/core/metadata.html', type:'doc', completed:false },
            { id:'pg-m3', name:'Alembic Autogenerate', url:'https://alembic.sqlalchemy.org/en/latest/autogenerate.html', type:'doc', completed:false },
            { id:'pg-m4', name:'SQLAlchemy Migrations Guide', url:'https://docs.sqlalchemy.org/en/20/orm/migration.html', type:'article', completed:false },
          ],
            exercises: [
              { id:'pg-me1', title:'Migration rollback', description:'Crie uma migration com Alembic e teste o downgrade seguro', difficulty:'medium', completed:false },
            ]
          },
        ]
      },
      { id: 'airflow', name: 'Apache Airflow', description: 'DAGs, operators, sensors, monitoring, best practices', xp: 140, completed: false,
        subModules: [
          { id: 'af-fund', name: 'Airflow Fundamentals', topics: [
            { id:'af-f1', name:'Airflow Official Tutorial', url:'https://airflow.apache.org/docs/apache-airflow/stable/tutorial/index.html', type:'doc', completed:false },
            { id:'af-f2', name:'Astronomer Training', url:'https://www.astronomer.io/training/', type:'course', completed:false },
            { id:'af-f3', name:'Airflow Crash Course (YouTube)', url:'https://www.youtube.com/watch?v=o1Bz1fh8cKs', type:'video', completed:false },
            { id:'af-f4', name:'Airflow GitHub Examples', url:'https://github.com/apache/airflow/tree/main/airflow/example_dags', type:'exercise', completed:false },
            { id:'af-f5', name:'Astronomer Astronomer Docs', url:'https://docs.astronomer.io/astro/', type:'doc', completed:false },
            { id:'af-f6', name:'Airflow Concepts', url:'https://airflow.apache.org/docs/apache-airflow/stable/core-concepts/index.html', type:'doc', completed:false },
          ],
            exercises: [
              { id:'af-fe1', title:'DAG simples', description:'Crie uma DAG Airflow que extraia dados de uma API, transforme e salve no S3', difficulty:'medium', completed:false },
              { id:'af-fe2', title:'Sensor pattern', description:'Implemente um sensor personalizado que aguarde arquivo chegar no S3', difficulty:'hard', completed:false },
            ]
          },
          { id: 'af-adv', name: 'Advanced Patterns', topics: [
            { id:'af-a1', name:'Airflow Best Practices', url:'https://airflow.apache.org/docs/apache-airflow/stable/best-practices.html', type:'doc', completed:false },
            { id:'af-a2', name:'Custom Operators', url:'https://airflow.apache.org/docs/apache-airflow/stable/concepts/operators.html', type:'doc', completed:false },
            { id:'af-a3', name:'Airflow TaskFlow API', url:'https://airflow.apache.org/docs/apache-airflow/stable/tutorial/taskflow.html', type:'doc', completed:false },
            { id:'af-a4', name:'Dynamic Task Mapping', url:'https://airflow.apache.org/docs/apache-airflow/stable/authoring-and-scheduling/dynamic-task-mapping.html', type:'doc', completed:false },
          ],
            exercises: [
              { id:'af-ae1', title:'Custom operator', description:'Crie um operator personalizado que faz upload de arquivo para GCS', difficulty:'hard', completed:false },
            ]
          },
        ]
      },
      { id: 'analytics', name: 'Data Analytics', description: 'SQL analytics, Python (Pandas/Polars), dashboards', xp: 110, completed: false,
        subModules: [
          { id: 'an-sql', name: 'SQL Analytics', topics: [
            { id:'an-s1', name:'Mode Analytics SQL Tutorial', url:'https://mode.com/sql-tutorial/', type:'course', completed:false },
            { id:'an-s2', name:'Window Functions', url:'https://www.postgresql.org/docs/current/tutorial-window.html', type:'doc', completed:false },
            { id:'an-s3', name:'SQLZoo Interactive', url:'https://sqlzoo.net/', type:'exercise', completed:false },
            { id:'an-s4', name:'LeetCode SQL', url:'https://leetcode.com/problemset/database/', type:'exercise', completed:false },
            { id:'an-s5', name:'Advanced SQL (YouTube)', url:'https://www.youtube.com/watch?v=7mN0h9W7Bso', type:'video', completed:false },
          ],
            exercises: [
              { id:'an-se1', title:'Window functions', description:'Resolva 5 problemas de analytics usando ROW_NUMBER, RANK e LAG', difficulty:'medium', completed:false },
            ]
          },
          { id: 'an-py', name: 'Python Analytics', topics: [
            { id:'an-p1', name:'Polars User Guide', url:'https://docs.pola.rs/', type:'doc', completed:false },
            { id:'an-p2', name:'Pandas Getting Started', url:'https://pandas.pydata.org/docs/getting_started/index.html', type:'doc', completed:false },
            { id:'an-p3', name:'Polars vs Pandas', url:'https://pola.rs/posts/polars_vs_pandas/', type:'article', completed:false },
            { id:'an-p4', name:'Pandas Exercises (GitHub)', url:'https://github.com/guipsamora/pandas_exercises', type:'exercise', completed:false },
            { id:'an-p5', name:'Kaggle Pandas Course', url:'https://www.kaggle.com/learn/pandas', type:'course', completed:false },
          ],
            exercises: [
              { id:'an-pe1', title:'EDA completo', description:'Faça uma análise exploratória completa de um dataset real com Polars', difficulty:'medium', completed:false },
            ]
          },
        ]
      },
    ],
  },
  {
    id: 'phase-4', number: 4, title: 'Machine Learning', subtitle: 'Scikit-learn, NLP & LLM',
    color: '#F59E0B', icon: 'brain', unlocked: false,
    skills: [
      { id: 'sklearn', name: 'Scikit-learn', description: 'Model training, evaluation, pipelines, hyperparameter tuning', xp: 160, completed: false,
        subModules: [
          { id: 'sk-fund', name: 'Scikit-learn Fundamentals', topics: [
            { id:'sk-f1', name:'Scikit-learn Tutorials', url:'https://scikit-learn.org/stable/tutorial/index.html', type:'doc', completed:false },
            { id:'sk-f2', name:'Hands-On ML (Book)', url:'https://www.oreilly.com/library/view/hands-on-machine-learning/9781098125967/', type:'course', completed:false },
            { id:'sk-f3', name:'ML Course (Coursera)', url:'https://www.coursera.org/learn/machine-learning', type:'course', completed:false },
            { id:'sk-f4', name:'Scikit-learn User Guide', url:'https://scikit-learn.org/stable/user_guide.html', type:'doc', completed:false },
            { id:'sk-f5', name:'Google ML Crash Course', url:'https://developers.google.com/machine-learning/crash-course', type:'course', completed:false },
            { id:'sk-f6', name:'StatQuest ML (YouTube)', url:'https://www.youtube.com/c/joshstarmer', type:'video', completed:false },
          ],
            exercises: [
              { id:'sk-fe1', title:'Pipeline completo', description:'Crie um pipeline scikit-learn com preprocessing + model + evaluation', difficulty:'medium', completed:false },
              { id:'sk-fe2', title:'Hyperparameter tuning', description:'Use GridSearchCV para otimizar hiperparâmetros de um Random Forest', difficulty:'hard', completed:false },
            ]
          },
          { id: 'sk-prac', name: 'Prática com Projetos', topics: [
            { id:'sk-p1', name:'Kaggle Learn', url:'https://www.kaggle.com/learn', type:'course', completed:false },
            { id:'sk-p2', name:'Scikit-learn Examples', url:'https://scikit-learn.org/stable/auto_examples/index.html', type:'exercise', completed:false },
            { id:'sk-p3', name:'Kaggle Competitions', url:'https://www.kaggle.com/competitions', type:'exercise', completed:false },
            { id:'sk-p4', name:'UCI ML Repository', url:'https://archive.ics.uci.edu/', type:'doc', completed:false },
            { id:'sk-p5', name:'Made With ML', url:'https://madewithml.com/', type:'course', completed:false },
          ],
            exercises: [
              { id:'sk-pe1', title:'Kaggle notebook', description:'Complete um notebook Kaggle comEDA + feature engineering + model', difficulty:'hard', completed:false },
            ]
          },
        ]
      },
      { id: 'nlp', name: 'Natural Language Processing', description: 'Text processing, embeddings, transformers, HuggingFace', xp: 140, completed: false,
        subModules: [
          { id: 'nlp-fund', name: 'NLP Fundamentals', topics: [
            { id:'nl-f1', name:'spaCy Course', url:'https://course.spacy.io/', type:'course', completed:false },
            { id:'nl-f2', name:'HuggingFace NLP Course', url:'https://huggingface.co/learn/nlp-course', type:'course', completed:false },
            { id:'nl-f3', name:'NLTK Book', url:'https://www.nltk.org/book/', type:'doc', completed:false },
            { id:'nl-f4', name:'spaCy Documentation', url:'https://spacy.io/usage', type:'doc', completed:false },
            { id:'nl-f5', name:'NLP with Python (YouTube)', url:'https://www.youtube.com/watch?v=8rNRtqN7fra', type:'video', completed:false },
            { id:'nl-f6', name:'Stanford NLP Course', url:'https://www.youtube.com/playlist?list=PLoROMvodv4rOwvldxftJTmoR3mkrsq9U_', type:'video', completed:false },
          ],
            exercises: [
              { id:'nl-fe1', title:'NER customizado', description:'Treine um modelo NER com spaCy para reconhecer entidades de um domínio específico', difficulty:'hard', completed:false },
              { id:'nl-fe2', title:'Text classification', description:'Construa um classificador de sentimentos usando TF-IDF + SVM', difficulty:'medium', completed:false },
            ]
          },
          { id: 'nlp-trans', name: 'Transformers & LLMs', topics: [
            { id:'nl-t1', name:'Transformer Architecture', url:'https://jalammar.github.io/illustrated-transformer/', type:'article', completed:false },
            { id:'nl-t2', name:'HuggingFace Transformers', url:'https://huggingface.co/docs/transformers/index', type:'doc', completed:false },
            { id:'nl-t3', name:'Transformers Course (YouTube)', url:'https://www.youtube.com/watch?v=AhJOfDVS3xY', type:'video', completed:false },
            { id:'nl-t4', name:'LLM from Scratch', url:'https://github.com/rasbt/LLMs-from-scratch', type:'exercise', completed:false },
            { id:'nl-t5', name:'Attention Is All You Need', url:'https://arxiv.org/abs/1706.03762', type:'article', completed:false },
          ],
            exercises: [
              { id:'nl-te1', title:'Fine-tuning BERT', description:'Faça fine-tune de um modelo BERT para classificação de texto', difficulty:'hard', completed:false },
            ]
          },
        ]
      },
      { id: 'llm', name: 'LLM Integration', description: 'Prompt engineering, API integration, fine-tuning, RAG', xp: 130, completed: false,
        subModules: [
          { id: 'llm-prompt', name: 'Prompt Engineering', topics: [
            { id:'ll-p1', name:'OpenAI Prompt Engineering', url:'https://platform.openai.com/docs/guides/prompt-engineering', type:'doc', completed:false },
            { id:'ll-p2', name:'Anthropic Prompt Library', url:'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering', type:'doc', completed:false },
            { id:'ll-p3', name:'Prompt Engineering Guide', url:'https://www.promptingguide.ai/', type:'article', completed:false },
            { id:'ll-p4', name:'Learn Prompting', url:'https://learnprompting.org/', type:'course', completed:false },
            { id:'ll-p5', name:'Prompt Engineering (YouTube)', url:'https://www.youtube.com/watch?v=dOxUroET0a0', type:'video', completed:false },
          ],
            exercises: [
              { id:'ll-pe1', title:'Prompt patterns', description:'Implemente 3 prompt patterns: chain-of-thought, few-shot, e role-playing', difficulty:'medium', completed:false },
            ]
          },
          { id: 'llm-api', name: 'API Integration', topics: [
            { id:'ll-a1', name:'OpenAI Python SDK', url:'https://github.com/openai/openai-python', type:'doc', completed:false },
            { id:'ll-a2', name:'LangChain Documentation', url:'https://python.langchain.com/docs/get_started', type:'doc', completed:false },
            { id:'ll-a3', name:'LlamaIndex Docs', url:'https://docs.llamaindex.ai/en/stable/', type:'doc', completed:false },
            { id:'ll-a4', name:'Anthropic Python SDK', url:'https://github.com/anthropics/anthropic-sdk-python', type:'doc', completed:false },
            { id:'ll-a5', name:'OpenAI Cookbook', url:'https://cookbook.openai.com/', type:'exercise', completed:false },
            { id:'ll-a6', name:'LangChain Tutorials (YouTube)', url:'https://www.youtube.com/watch?v=aywZrzNaK8U', type:'video', completed:false },
          ],
            exercises: [
              { id:'ll-ae1', title:'RAG pipeline', description:'Construa um pipeline RAG completo com LangChain + ChromaDB', difficulty:'hard', completed:false },
              { id:'ll-ae2', title:'Agent com tools', description:'Crie um agent LangChain que usa tools de busca web e cálculo', difficulty:'hard', completed:false },
            ]
          },
        ]
      },
    ],
  },
  {
    id: 'phase-5', number: 5, title: 'DevOps', subtitle: 'Kubernetes, CI/CD & Observability',
    color: '#EF4444', icon: 'gear', unlocked: false,
    skills: [
      { id: 'k8s', name: 'Kubernetes', description: 'Deployments, services, Helm, security, troubleshooting', xp: 180, completed: false,
        subModules: [
          { id: 'k8s-fund', name: 'Kubernetes Fundamentals', topics: [
            { id:'k8-f1', name:'Kubernetes Tutorial (YouTube)', url:'https://www.youtube.com/watch?v=X48VuDVv0do', type:'video', completed:false },
            { id:'k8-f2', name:'Kubernetes Docs', url:'https://kubernetes.io/docs/home/', type:'doc', completed:false },
            { id:'k8-f3', name:'Katacoda K8s Scenarios', url:'https://www.katacoda.com/courses/kubernetes', type:'exercise', completed:false },
            { id:'k8-f4', name:'Kubernetes The Hard Way', url:'https://github.com/kelseyhightower/kubernetes-the-hard-way', type:'exercise', completed:false },
            { id:'k8-f5', name:'K8s Concepts', url:'https://kubernetes.io/docs/concepts/', type:'doc', completed:false },
            { id:'k8-f6', name:'minikube Start', url:'https://minikube.sigs.k8s.io/docs/start/', type:'doc', completed:false },
          ],
            exercises: [
              { id:'k8-fe1', title:'Deployment + Service', description:'Faça deploy de uma app Python com Deployment, Service e Ingress no K8s', difficulty:'medium', completed:false },
              { id:'k8-fe2', title:'ConfigMap e Secrets', description:'Gerencie configurações usando ConfigMaps e Secrets no Kubernetes', difficulty:'medium', completed:false },
            ]
          },
          { id: 'k8s-adv', name: 'Advanced K8s', topics: [
            { id:'k8-a1', name:'Helm Charts', url:'https://helm.sh/docs/', type:'doc', completed:false },
            { id:'k8-a2', name:'K8s Security', url:'https://kubernetes.io/docs/concepts/security/', type:'doc', completed:false },
            { id:'k8-a3', name:'K8s Networking', url:'https://kubernetes.io/docs/concepts/services-networking/', type:'doc', completed:false },
            { id:'k8-a4', name:'K8s Storage', url:'https://kubernetes.io/docs/concepts/storage/', type:'doc', completed:false },
            { id:'k8-a5', name:'K9s - K8s Dashboard', url:'https://k9scli.io/', type:'doc', completed:false },
          ],
            exercises: [
              { id:'k8-ae1', title:'Helm chart', description:'Crie um Helm chart para uma aplicação com values.yaml configurável', difficulty:'hard', completed:false },
            ]
          },
        ]
      },
      { id: 'cicd', name: 'CI/CD Avançado', description: 'GitHub Actions, ArgoCD, GitOps, security scanning', xp: 120, completed: false,
        subModules: [
          { id: 'gh-act', name: 'GitHub Actions', topics: [
            { id:'gh-a1', name:'GH Actions Docs', url:'https://docs.github.com/en/actions', type:'doc', completed:false },
            { id:'gh-a2', name:'Awesome GH Actions', url:'https://github.com/sdras/awesome-actions', type:'exercise', completed:false },
            { id:'gh-a3', name:'GH Actions Marketplace', url:'https://github.com/marketplace?type=actions', type:'doc', completed:false },
            { id:'gh-a4', name:'GH Actions Tutorial (YouTube)', url:'https://www.youtube.com/watch?v=R8_veViYyPw', type:'video', completed:false },
            { id:'gh-a5', name:'GH Actions Python CI', url:'https://docs.github.com/en/actions/automating-builds-and-tests/building-and-testing-python', type:'doc', completed:false },
          ],
            exercises: [
              { id:'gh-ae1', title:'CI/CD pipeline', description:'Crie um workflow GitHub Actions com test, lint, build e deploy', difficulty:'hard', completed:false },
            ]
          },
          { id: 'gitops', name: 'GitOps & ArgoCD', topics: [
            { id:'go-1', name:'ArgoCD Tutorial', url:'https://argo-cd.readthedocs.io/en/stable/getting_started/', type:'doc', completed:false },
            { id:'go-2', name:'GitOps Guide', url:'https://www.gitops.tech/', type:'article', completed:false },
            { id:'go-3', name:'Flux CD Docs', url:'https://fluxcd.io/docs/', type:'doc', completed:false },
            { id:'go-4', name:'GitOps Principles', url:'https://opengitops.dev/', type:'article', completed:false },
            { id:'go-5', name:'ArgoCD YouTube Tutorial', url:'https://www.youtube.com/watch?v=MeU5_k9ssrs', type:'video', completed:false },
          ],
            exercises: [
              { id:'go-e1', title:'GitOps workflow', description:'Configure ArgoCD para fazer sync automático de um repo Kubernetes', difficulty:'hard', completed:false },
            ]
          },
        ]
      },
      { id: 'observ', name: 'Observability', description: 'Prometheus, Grafana, OpenTelemetry, alerting', xp: 110, completed: false,
        subModules: [
          { id: 'prom', name: 'Prometheus & Grafana', topics: [
            { id:'pg-o1', name:'Prometheus Docs', url:'https://prometheus.io/docs/introduction/overview/', type:'doc', completed:false },
            { id:'pg-o2', name:'Grafana Tutorials', url:'https://grafana.com/tutorials/', type:'course', completed:false },
            { id:'pg-o3', name:'PromQL Tutorial', url:'https://prometheus.io/docs/prometheus/latest/querying/basics/', type:'doc', completed:false },
            { id:'pg-o4', name:'Grafana Dashboard Gallery', url:'https://grafana.com/grafana/dashboards/', type:'doc', completed:false },
            { id:'pg-o5', name:'Prometheus + Grafana (YouTube)', url:'https://www.youtube.com/watch?v=7gOAmzSLkSk', type:'video', completed:false },
          ],
            exercises: [
              { id:'pg-oe1', title:'Dashboard customizado', description:'Crie um dashboard Grafana para monitorar uma aplicação Python com métricas custom', difficulty:'medium', completed:false },
            ]
          },
          { id: 'otel', name: 'OpenTelemetry', topics: [
            { id:'ot-1', name:'OTel Docs', url:'https://opentelemetry.io/docs/', type:'doc', completed:false },
            { id:'ot-2', name:'OTel Python SDK', url:'https://opentelemetry.io/docs/instrumentation/python/', type:'doc', completed:false },
            { id:'ot-3', name:'OTel Collector', url:'https://opentelemetry.io/docs/collector/', type:'doc', completed:false },
            { id:'ot-4', name:'OTel Demo App', url:'https://github.com/open-telemetry/opentelemetry-demo', type:'exercise', completed:false },
            { id:'ot-5', name:'OTel Concepts', url:'https://opentelemetry.io/docs/concepts/', type:'doc', completed:false },
          ],
            exercises: [
              { id:'ot-e1', title:'Tracing completo', description:'Instrumente uma API Python com traces, metrics e logs usando OTel', difficulty:'hard', completed:false },
            ]
          },
        ]
      },
    ],
  },
  {
    id: 'phase-6', number: 6, title: 'Soft Skills', subtitle: 'Product, Sales & Communication',
    color: '#EC4899', icon: 'users', unlocked: false,
    skills: [
      { id: 'pm', name: 'Product Management', description: 'User research, metrics, roadmap, prioritization frameworks', xp: 100, completed: false,
        subModules: [
          { id: 'pm-fund', name: 'PM Fundamentals', topics: [
            { id:'pm-f1', name:'Product School', url:'https://www.productschool.com/', type:'course', completed:false },
            { id:'pm-f2', name:'Inspired by Marty Cagan', url:'https://www.svpg.com/inspired-how-to-create-products-customers-love/', type:'course', completed:false },
            { id:'pm-f3', name:'Reforge Programs', url:'https://www.reforge.com/', type:'course', completed:false },
            { id:'pm-f4', name:'Product Management Exercises', url:'https://www.productmanagementexercises.com/', type:'exercise', completed:false },
            { id:'pm-f5', name:"Lenny's Newsletter", url:'https://www.lennysnewsletter.com/', type:'article', completed:false },
            { id:'pm-f6', name:'PM Skills (YouTube)', url:'https://www.youtube.com/watch?v=8uS1aHpOjCo', type:'video', completed:false },
          ],
            exercises: [
              { id:'pm-fe1', title:'Product spec', description:'Escreva uma product requirements document (PRD) para um feature real', difficulty:'medium', completed:false },
              { id:'pm-fe2', title:'Prioritization', description:'Use RICE framework para priorizar 10 features de um produto', difficulty:'easy', completed:false },
            ]
          },
        ]
      },
      { id: 'sales', name: 'Sales & Marketing', description: 'B2B sales, cold outreach, growth hacking, content marketing', xp: 90, completed: false,
        subModules: [
          { id: 'sa-fund', name: 'B2B Sales', topics: [
            { id:'sa-f1', name:'Y Combinator Sales Guide', url:'https://www.ycombinator.com/library/2g-yc-guide-to-sales', type:'article', completed:false },
            { id:'sa-f2', name:'HubSpot Academy', url:'https://academy.hubspot.com/', type:'course', completed:false },
            { id:'sa-f3', name:'Grow with Will (YouTube)', url:'https://www.youtube.com/@growwithwill', type:'video', completed:false },
            { id:'sa-f4', name:'Saleshacker', url:'https://www.saleshacker.com/', type:'article', completed:false },
            { id:'sa-f5', name:'B2B Sales Framework', url:'https://www.saastr.com/the-b2b-sales-process/', type:'article', completed:false },
          ],
            exercises: [
              { id:'sa-fe1', title:'Cold email', description:'Escreva 5 cold emails personalizados para empresas B2B reais', difficulty:'medium', completed:false },
              { id:'sa-fe2', title:'Sales deck', description:'Crie uma apresentação de vendas de 10 slides para um SaaS', difficulty:'hard', completed:false },
            ]
          },
        ]
      },
      { id: 'comms', name: 'Comunicação', description: 'Technical writing, presentations, negotiation', xp: 80, completed: false,
        subModules: [
          { id: 'cw-wr', name: 'Technical Writing', topics: [
            { id:'cw-w1', name:'Google Technical Writing', url:'https://developers.google.com/tech-writing', type:'course', completed:false },
            { id:'cw-w2', name:'Write the Docs', url:'https://www.writethedocs.org/guide/', type:'article', completed:false },
            { id:'cw-w3', name:'Technical Writing Skills', url:'https://www.pluralsight.com/guides/technical-writing', type:'course', completed:false },
            { id:'cw-w4', name:'Microsoft Writing Guide', url:'https://learn.microsoft.com/en-us/style-guide/welcome/', type:'doc', completed:false },
            { id:'cw-w5', name:'Dev.to Technical Writing', url:'https://dev.to/t/technicalwriting', type:'article', completed:false },
          ],
            exercises: [
              { id:'cw-we1', title:'API documentation', description:'Documente uma API REST completa com exemplos de uso e error codes', difficulty:'medium', completed:false },
            ]
          },
        ]
      },
    ],
  },
];
