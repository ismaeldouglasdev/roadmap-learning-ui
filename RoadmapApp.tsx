import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

interface Topic { id: string; name: string; url: string; type: 'doc'|'video'|'course'|'exercise'|'article'; completed: boolean; }
interface Exercise { id: string; title: string; description: string; difficulty: 'easy'|'medium'|'hard'; completed: boolean; }
interface SubModule { id: string; name: string; topics: Topic[]; exercises?: Exercise[]; }
interface Skill { id: string; name: string; description: string; xp: number; completed: boolean; subModules: SubModule[]; }
interface Phase { id: string; number: number; title: string; subtitle: string; color: string; icon: string; skills: Skill[]; unlocked: boolean; }
interface Achievement { id: string; name: string; description: string; icon: string; earned: boolean; }
interface QuizQuestion { id: string; question: string; options: string[]; correctIndex: number; explanation: string; }
interface QuizData { skillId: string; questions: QuizQuestion[]; }


const initialPhases: Phase[] = [
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

const initialAchievements: Achievement[] = [
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

const quizData: QuizData[] = [
  { skillId:'py-adv', questions:[
    { id:'py-q1', question:'Qual a diferenca entre List e Tuple em Python?', options:['List e mutavel, Tuple e imutavel','Tuple e mais rapido','List aceita tipos mistos, Tuple nao','Nao ha diferenca'], correctIndex:0, explanation:'List permite alteracoes apos criacao, Tuple e imutavel.' },
    { id:'py-q2', question:'O que o decorator @property faz?', options:['Cria uma classe privada','Transforma metodo em propriedade de leitura','Adiciona caching automatico','Valida tipos de retorno'], correctIndex:1, explanation:'@property permite acessar metodo como atributo, com getter automatico.' },
    { id:'py-q3', question:'Qual modulo usar para type hints com validacao em runtime?', options:['typing','dataclasses','pydantic','attrs'], correctIndex:2, explanation:'Pydantic faz validacao em runtime usando type hints.' },
    { id:'py-q4', question:'O que e um async context manager?', options:['Um bloco try/except assincrono','Um gerenciador de conexao async com __aenter__ e __aexit__',' Uma funcao que roda em background','Um decorator para funcoes async'], correctIndex:1, explanation:'Async context manager usa __aenter__ e __aexit__ para gerenciar recursos async.' },
    { id:'py-q5', question:'Qual padrao e ideal para diferentes algoritmos intercambiaveis?', options:['Singleton','Observer','Strategy','Factory'], correctIndex:2, explanation:'Strategy permite trocar algoritmos em runtime sem mudar o contexto.' },
  ]},
  { skillId:'ts-mod', questions:[
    { id:'ts-q1', question:'O que e um Discriminated Union em TypeScript?', options:['Uniao de tipos com campo comum para discriminacao','Tipo generico com constraint','Tipo que aceita qualquer valor','Tipo condicional'], correctIndex:0, explanation:'Discriminated Union usa literal type como discriminador para union types.' },
    { id:'ts-q2', question:'Qual utility type cria versao read-only de um objeto?', options:['Partial<T>','Readonly<T>','Pick<T,K>','Omit<T,K>'], correctIndex:1, explanation:'Readonly<T> torna todas as propriedades imutaveis.' },
    { id:'ts-q3', question:'O que e Type Narrowing?', options:['Reduzir o tamanho do bundle','Especificar tipo mais preciso dentro de um conditional','Deletar tipos desnecessarios','Comprimir tipos em bytes'], correctIndex:1, explanation:'Type Narrowing refina tipo basado em checks em tempo de execucao.' },
    { id:'ts-q4', question:'Qual a diferenca entre interface e type alias?', options:['Nao ha diferenca','Interface e extensivel, type alias e fixo','Type alias suporta union, interface nao','Interface so funciona com objetos'], correctIndex:1, explanation:'Interfaces podem ser extendidas/mergeadas, types sao imutaveis apos declaracao.' },
    { id:'ts-q5', question:'O que e um Conditional Type?', options:['Tipo que so existe em condicoes de runtime','Tipo que depende de outra condicao tipo','Tipo opcional','Tipo que gera erros'], correctIndex:1, explanation:'Conditional types usam sintaxe T extends U ? X : Y para tipos condicionais.' },
  ]},
  { skillId:'git-adv', questions:[
    { id:'git-q1', question:'Qual comando preserva historico linear?', options:['git merge','git rebase','git cherry-pick','git stash'], correctIndex:1, explanation:'Rebase reescreve commits para criar historico linear sem merge commits.' },
    { id:'git-q2', question:'O que git bisect faz?', options:['Divide o repo em partes','Usa busca binaria para encontrar commit com bug','Copia commits entre branches','Remove commits antigos'], correctIndex:1, explanation:'Bisect faz busca binaria entre commits para encontrar onde um bug foi introduzido.' },
    { id:'git-q3', question:'Qual fluxo e ideal para release branches?', options:['GitHub Flow','Git Flow','Trunk-Based','Feature Branch'], correctIndex:1, explanation:'Git Flow tem branch dedicada para releases com ciclo de vida definido.' },
    { id:'git-q4', question:'O que git stash salva?', options:['Apenas arquivos staged','Working directory + staged area','Apenas commits','Configuracoes do git'], correctIndex:1, explanation:'Stash salva modificacoes working directory e staged para recuperacao futura.' },
    { id:'git-q5', question:'Qual opcao do rebase permite reorganizar commits?', options:['--soft','--hard','--interactive','-i'], correctIndex:3, explanation:'git rebase -i permite editar, reordenar, squashar e remover commits.' },
  ]},
  { skillId:'docker', questions:[
    { id:'dk-q1', question:'Qual instrucao reduz tamanho da imagem final?', options:['FROM','RUN','COPY','Multi-stage build'], correctIndex:3, explanation:'Multi-stage build copia apenas artefatos finais, eliminando deps de build.' },
    { id:'dk-q2', question:'O que docker-compose.yml define?', options:['Apenas containers','Servicos, redes e volumes','Apenas imagens','Configuracoes do Docker daemon'], correctIndex:1, explanation:'Compose define servicos, redes, volumes e configuracoes do multi-container.' },
    { id:'dk-q3', question:'Qual flag mantem container rodando apos execucao?', options:['--rm','-d','--restart always','-it'], correctIndex:1, explanation:'-d (detached) roda container em background sem bloquear terminal.' },
    { id:'dk-q4', question:'Qual e a melhor pratica de seguranca para imagens?', options:['Rodar como root','Usar multi-stage e usuario nao-root','Expor todas as portas','Copiar .git para imagem'], correctIndex:1, explanation:'Imagens devem rodar com usuario nao-root e minimizar camadas.' },
    { id:'dk-q5', question:'O que um .dockerignore faz?', options:['Ignora erros do Docker','Exclui arquivos do contexto de build','Remove containers mortos','Desabilita logs'], correctIndex:1, explanation:'Dockerignore exclui arquivos desnecessarios do contexto, acelerando build.' },
  ]},
  { skillId:'cloud', questions:[
    { id:'cl-q1', question:'Qual servico AWS armazena objetos?', options:['EBS','S3','EFS','FSx'], correctIndex:1, explanation:'S3 (Simple Storage Service) e o armazenamento de objetos da AWS.' },
    { id:'cl-q2', question:'O que e um Lambda function?', options:['Container Docker','Servico serverless compute','Banco de dados NoSQL','Load balancer'], correctIndex:1, explanation:'Lambda roda codigo sem gerenciar servidores, com escala automatica.' },
    { id:'cl-q3', question:'Qual GCP service e equivalente ao AWS Lambda?', options:['Compute Engine','Cloud Functions','Cloud Run','Kubernetes Engine'], correctIndex:1, explanation:'Cloud Functions e o servico serverless compute do GCP.' },
    { id:'cl-q4', question:'O que e Infrastructure as Code?', options:['Programar em linguagem de baixo nivel','Gerenciar infra via codigo versionado','Escrever documentacao de infra','Configurar servidores manualmente'], correctIndex:1, explanation:'IaC permite gerenciar infraestrutura atraves de codigo versionado e replicavel.' },
    { id:'cl-q5', question:'Qual servico AWS roda containers sem gerenciar clusters?', options:['EC2','ECS Fargate','EKS','Lightsail'], correctIndex:1, explanation:'Fargate e compute serverless para containers, sem gerenciar EC2.' },
  ]},
  { skillId:'terraform', questions:[
    { id:'tf-q1', question:'Qual comando mostra plano de execucao?', options:['terraform apply','terraform plan','terraform init','terraform validate'], correctIndex:1, explanation:'Plan mostra o que sera criado/modificado/destruido sem aplicar.' },
    { id:'tf-q2', question:'O que e um modulo Terraform?', options:['Um plugin do provider','Pacote reutilizavel de configuracao','Um tipo de variavel','Um comando CLI'], correctIndex:1, explanation:'Modulos sao blocos reutilizaveis de configuracao IaC.' },
    { id:'tf-q3', question:'O que terraform state armazena?', options:['Codigo fonte','Mapeamento entre recursos reais e configuracao','Logs de execucao','Variaveis de ambiente'], correctIndex:1, explanation:'State mapeia recursos Terraform para recursos reais na cloud.' },
    { id:'tf-q4', question:'Qual comando inicializa um workspace Terraform?', options:['terraform start','terraform init','terraform create','terraform setup'], correctIndex:1, explanation:'Init baixa providers e inicializa backend do estado.' },
    { id:'tf-q5', question:'O que e remote state?', options:['Estado em disco local','Estado armazenado em S3/GCS para colaboracao','Estado sincronizado com Git','Estado criptografado'], correctIndex:1, explanation:'Remote state permite compartilhar estado entre equipe via S3/GCS.' },
  ]},
  { skillId:'postgres', questions:[
    { id:'pg-q1', question:'O que e um indice B-tree no PostgreSQL?', options:['Arvore de decisao para buscas','Estrutura para buscas por intervalo e igualdade','Indice para colunas JSON','Indice para full-text search'], correctIndex:1, explanation:'B-tree e o padrao para buscas por igualdade, range e ordenacao.' },
    { id:'pg-q2', question:'Qual comando analisa performance de uma query?', options:['EXPLAIN','ANALYZE','EXPLAIN ANALYZE','PROFILE'], correctIndex:2, explanation:'EXPLAIN ANALYZE mostra plano de execucao e metricas reais de execucao.' },
    { id:'pg-q3', question:'O que e uma Window Function?', options:['Funcao que cria janela de dados','Funcao que calcula sobre conjuntos de linhas relacionadas','Funcao de janela do SO','Funcao para criar view'], correctIndex:1, explanation:'Window functions calculam sobre conjuntos de linhas sem agrupar resultado.' },
    { id:'pg-q4', question:'Qual tipo dado armazena JSON otimizado?', options:['TEXT','VARCHAR','JSONB','XML'], correctIndex:2, explanation:'JSONB armazena JSON binario com indexacao e busca eficiente.' },
    { id:'pg-q5', question:'O que e um CTE (Common Table Expression)?', options:['Tipo de index','Tabela temporaria dentro de query','Configuracao de conexao','Tipo de constraint'], correctIndex:1, explanation:'CTE cria resultado temporario acessivel durante execucao da query principal.' },
  ]},
  { skillId:'airflow', questions:[
    { id:'af-q1', question:'O que e uma DAG no Airflow?', options:['Directed Acyclic Graph de tarefas','Database Abstraction Graph','Dynamic Action Group','Data Access Gateway'], correctIndex:0, explanation:'DAG define dependencias entre tarefas como grafo aciclico direcionado.' },
    { id:'af-q2', question:'Qual operator busca arquivo no S3?', options:['S3Operator','S3ToS3Operator','S3KeySensor','S3CheckOperator'], correctIndex:2, explanation:'S3KeySensor aguarda arquivo existir no S3 antes de prosseguir.' },
    { id:'af-q3', question:'O que e um Sensor no Airflow?', options:['Container que monitora CPU','Operator que aguarda condicao antes de prosseguir','Metrica de performance','Tipo de log'], correctIndex:1, explanation:'Sensors sao operators que aguardam uma condicao externa antes de executar.' },
    { id:'af-q4', question:'Qual e a unidade minima de execucao?', options:['DAG','Task','Operator','TaskInstance'], correctIndex:3, explanation:'TaskInstance e a execucao concreta de uma task em um DAG run especifico.' },
    { id:'af-q5', question:'O que e o TaskFlow API?', options:['API para gerenciar clusters','Decorator para simplificar tarefas Python','API para monitoramento','Framework de testes'], correctIndex:1, explanation:'TaskFlow usa @task decorator para simplificar criacao de tarefas Python.' },
  ]},
  { skillId:'analytics', questions:[
    { id:'an-q1', question:'Qual funcao SQL calcula media movel?', options:['AVG()','LAG()','ROW_NUMBER()','OVER(PARTITION BY...)'], correctIndex:3, explanation:'Window functions com OVER() calculam medias moveis e rankings.' },
    { id:'an-q2', question:'O que e Polars?', options:['Biblioteca de grafos','DataFrame library Rust-based mais rapida que Pandas','Framework ML','Biblioteca de visualizacao'], correctIndex:1, explanation:'Polars e uma DataFrame library em Rust, significativamente mais rapida que Pandas.' },
    { id:'an-q3', question:'Qual metodo Pandas le CSV grandes arquivos?', options:['pd.read_csv() com chunksize','pd.load_csv()','pd.stream_csv()','pd.big_csv()'], correctIndex:0, explanation:'chunksize permite processar CSV em partes, evitando estouro de memoria.' },
    { id:'an-q4', question:'O que e um boxplot?', options:['Grafico de barras','Grafico de distribuicao com quartis','Grafico de linhas','Grafico de dispersao'], correctIndex:1, explanation:'Boxplot mostra mediana, quartis e outliers de uma distribuicao.' },
    { id:'an-q5', question:'Qual metrica mede correlacao entre -1 e 1?', options:['R-squared','Pearson correlation','P-value','Standard deviation'], correctIndex:1, explanation:'Correlacao de Pearson mede forca e direcao da relacao linear entre variaveis.' },
  ]},
  { skillId:'sklearn', questions:[
    { id:'sk-q1', question:'O que e um Pipeline no scikit-learn?', options:['Sequencia de steps de transformacao + modelo','Tipo de dados','Funcao de loss','Metrica de avaliacao'], correctIndex:0, explanation:'Pipeline encadeia transforms e estimator em objeto unico serializavel.' },
    { id:'sk-q2', question:'Qual metrica e melhor para classes desbalanceadas?', options:['Accuracy','F1-score','R2 score','MAE'], correctIndex:1, explanation:'F1-score balanceia precision e recall, melhor para classes desbalanceadas.' },
    { id:'sk-q3', question:'O que GridSearchCV faz?', options:['Divide dados em treino/teste','Busca hiperparametros otimos por cross-validation','Treina modelo final','Limpa dados'], correctIndex:1, explanation:'GridSearchCV testa combinacoes de hiperparametros com cross-validation.' },
    { id:'sk-q4', question:'Qual modelo e mais rapido para treinar?', options:['SVM com kernel RBF','Random Forest','Linear Regression','Rede Neural profunda'], correctIndex:2, explanation:'Linear Regression e o modelo mais simples e rapido para treinar.' },
    { id:'sk-q5', question:'O que e Feature Engineering?', options:['Selecionar features existentes','Criar novas features a partir dos dados originais','Remover outliers','Normalizar dados'], correctIndex:1, explanation:'Feature Engineering cria novas variaveis que melhoram performance do modelo.' },
  ]},
  { skillId:'nlp', questions:[
    { id:'nl-q1', question:'O que e Tokenization em NLP?', options:['Dividir texto em sentencas','Dividir texto em tokens (palavras/subpalavras)','Converter para numeros','Remover stopwords'], correctIndex:1, explanation:'Tokenization quebra texto em unidades menores para processamento.' },
    { id:'nl-q2', question:'O que e um Transformer?', options:['Modelo de traducao automatica','Arquitetura baseada em attention para NLP','Tipo de rede neural convolucional','Algoritmo de clustering'], correctIndex:1, explanation:'Transformers usam mecanismo self-attention para processar sequencias.' },
    { id:'nl-q3', question:'O que e Word Embedding?', options:['Texto comprimido','Representacao vetorial densa de palavras','Tipo de tokenizer','Metrica de similaridade'], correctIndex:1, explanation:'Embeddings representam palavras como vetores que capturam significado semantico.' },
    { id:'nl-q4', question:'Qual biblioteca Python e mais usada para NLP moderno?', options:['NLTK','spaCy','HuggingFace Transformers','Gensim'], correctIndex:2, explanation:'HuggingFace domina NLP moderno com modelos pre-treinados e pipelines.' },
    { id:'nl-q5', question:'O que e Fine-tuning?', options:['Treinar do zero','Ajustar modelo pre-treinado em dados especificos','Remover camadas','Aumentar learning rate'], correctIndex:1, explanation:'Fine-tuning adapta modelo pre-treinado para tarefa especifica com dados proprios.' },
  ]},
  { skillId:'llm', questions:[
    { id:'ll-q1', question:'O que e RAG?', options:['Retrieval Augmented Generation - buscar contexto antes de gerar','Tipo de LLM','Algoritmo de treinamento','Framework de testes'], correctIndex:0, explanation:'RAG combina busca de documentos com geracao para respostas mais precisas.' },
    { id:'ll-q2', question:'O que e Prompt Engineering?', options:['Programar em Python','Desenhar prompts eficazes para LLMs','Configurar servidores','Treinar modelos'], correctIndex:1, explanation:'Prompt Engineering e a arte de criar instrucoes que maximizam qualidade de saida do LLM.' },
    { id:'ll-q3', question:'O que e Chain-of-Thought?', options:['Cadeia de prompts','Tecnica que pede raciocinio passo a passo','Tipo de modelo','Metrica de avaliacao'], correctIndex:1, explanation:'CoT incentiva LLM a mostrar raciocinio, melhorando respostas complexas.' },
    { id:'ll-q4', question:'Qual framework para agents com tools?', options:['Flask','LangChain','Pandas','Matplotlib'], correctIndex:1, explanation:'LangChain fornece abstracoes para agents, tools e chains.' },
    { id:'ll-q5', question:'O que e Temperature em LLMs?', options:['Temperatura do servidor','Parametro que controla criatividade/aleatoriedade','Taxa de aprendizado','Tamanho do contexto'], correctIndex:1, explanation:'Temperature controla sampling: 0 = deterministico, 1+ = mais criativo.' },
  ]},
  { skillId:'k8s', questions:[
    { id:'k8-q1', question:'O que e um Pod no Kubernetes?', options:['Grupo de containers','Container ou grupo de containers compartilhando rede','Volume de dados','Configuracao de rede'], correctIndex:1, explanation:'Pod e a menor unidade deployable, podendo conter 1+ containers.' },
    { id:'k8-q2', question:'O que um Deployment gerencia?', options:['Nodes do cluster','Réplicas de Pods com rollout/rollback','Servicos de rede','Persistent volumes'], correctIndex:1, explanation:'Deployment gerencia réplicas de Pods com estrategias de atualizacao.' },
    { id:'k8-q3', question:'Qual objeto expoe Pods externamente?', options:['ConfigMap','Service','Secret','Namespace'], correctIndex:1, explanation:'Service expoe conjunto de Pods como endpoint de rede estavel.' },
    { id:'k8-q4', question:'O que e Helm?', options:['Gerenciador de pacotes K8s','Tipo de Pod','CLI do kubectl','Sistema de arquivos'], correctIndex:0, explanation:'Helm e o package manager do Kubernetes para charts reutilizaveis.' },
    { id:'k8-q5', question:'Qual recurso armazena dados sensiveis?', options:['ConfigMap','Secret','Deployment','ReplicaSet'], correctIndex:1, explanation:'Secret armazena dados sensiveis (passwords, keys) codificados em base64.' },
  ]},
  { skillId:'cicd', questions:[
    { id:'ci-q1', question:'O que e Continuous Integration?', options:['Integracao manual de codigo','Merge frequente com build e testes automaticos','Deploy para producao','Code review'], correctIndex:1, explanation:'CI automatiza build e testes a cada merge para detectar problemas cedo.' },
    { id:'ci-q2', question:'Qual arquivo define GitHub Actions?', options:['.github/actions.yml','.github/workflows/*.yml','.gitlab-ci.yml','Jenkinsfile'], correctIndex:1, explanation:'Workflows ficam em .github/workflows/ em formato YAML.' },
    { id:'ci-q3', question:'O que e GitOps?', options:['Git como source of truth para infraestrutura','Metodologia de commit','Tipo de branch','Framework de teste'], correctIndex:0, explanation:'GitOps usa Git como unica fonte de verdade para declarar infra desejada.' },
    { id:'ci-q4', question:'O que e ArgoCD?', options:['Pipeline CI/CD','GitOps CD tool para Kubernetes','Banco de dados','Monitor de logs'], correctIndex:1, explanation:'ArgoCD sincroniza estado desejado do Git com cluster Kubernetes.' },
    { id:'ci-q5', question:'Qual pratica reduz tempo de build?', options:['Adicionar mais testes','Cache de dependencias','Aumentar RAM','Usar mais branches'], correctIndex:1, explanation:'Cache de dependencias evita reinstall a cada build, reduzindo tempo drasticamente.' },
  ]},
  { skillId:'observ', questions:[
    { id:'ob-q1', question:'O que sao os 3 pilares da Observabilidade?', options:['CPU, RAM, Disco','Logs, Metrics, Traces','Alertas, Dashboards, Reports','Git, CI, CD'], correctIndex:1, explanation:'Logs, Metrics e Traces formam os 3 pilares fundamentais da observabilidade.' },
    { id:'ob-q2', question:'O que e Prometheus?', options:['Banco de dados SQL','Sistema de monitoramento baseado em metrics','Framework de testes','Gerenciador de containers'], correctIndex:1, explanation:'Prometheus coleta e armazena metrics como time series com PromQL.' },
    { id:'ob-q3', question:'O que Grafana faz?', options:['Coleta metrics','Visualiza dados de multiplos sources via dashboards','Executa queries SQL','Gerencia Kubernetes'], correctIndex:1, explanation:'Grafana cria dashboards conectando Prometheus, Loki, e outras fontes.' },
    { id:'ob-q4', question:'O que e um Trace distribuido?', options:['Log de erros','Registro de caminho de requisicao atravesso de servicos','Metrica de CPU','Configuracao de rede'], correctIndex:1, explanation:'Traces rastreiam requisicao completa atravesso de multiplos servicos.' },
    { id:'ob-q5', question:'O que e OpenTelemetry?', options:['Sistema operacional','Padrao open-source para telemetria','Banco de dados','Framework ML'], correctIndex:1, explanation:'OTel unifica coleta de logs, metrics e traces com SDKs padronizados.' },
  ]},
  { skillId:'pm', questions:[
    { id:'pm-q1', question:'O que e MVP?', options:['Minimum Viable Product - versao minima para validar','Most Valuable Player','Maximum Viable Prototype','Minimum Variable Price'], correctIndex:0, explanation:'MVP e a versao mais simples que valida hipoteses com usuarios reais.' },
    { id:'pm-q2', question:'O que framework RICE avalia?', options:['Custo de projeto','Priorizacao de features por impacto','Qualidade de codigo','Velocidade do time'], correctIndex:1, explanation:'RICE = Reach x Impact x Confidence / Effort para priorizar features.' },
    { id:'pm-q3', question:'O que e Product-Market Fit?', options:['Produto terminado','Produto que satisfaz demanda real do mercado','Preco ideal','Timing perfeito'], correctIndex:1, explanation:'PMF e quando o produto atende necessidade real do mercado com traction.' },
    { id:'pm-q4', question:'O que e User Research?', options:['Pesquisa de mercado','Entender comportamento e necessidades dos usuarios','Testes A/B','Entrevista de emprego'], correctIndex:1, explanation:'User Research entende dores, comportamento e motivacoes dos usuarios.' },
    { id:'pm-q5', question:'O que e um KPI?', options:['Tipo de usuario','Key Performance Indicator - metrica de sucesso','Funcao do produto','Documento de requisitos'], correctIndex:1, explanation:'KPIs sao metricas que medem progresso em relacao a objetivos de negocio.' },
  ]},
  { skillId:'sales', questions:[
    { id:'sa-q1', question:'O que e Cold Outreach?', options:['Contato com clientes frios sem relacao previa','Email para spam','Ligacao para suporte','Mensagem no LinkedIn para amigos'], correctIndex:0, explanation:'Cold outreach e contato inicial com prospects sem relacionamento previo.' },
    { id:'sa-q2', question:'O que e B2B Sales?', options:['Vendas para consumidor final','Vendas business-to-business entre empresas','Vendas de segunda mao','Vendas de produtos digitais'], correctIndex:1, explanation:'B2B e modelo de vendas onde empresas vendem para outras empresas.' },
    { id:'sa-q3', question:'O que e um Sales Funnel?', options:['Funcao matematica','Processo de conduzir prospects pela jornada de compra','Tipo de relatorio','Ferramenta de CRM'], correctIndex:1, explanation:'Funnel mapeia jornada de awareness ate fechamento de venda.' },
    { id:'sa-q4', question:'O que e Lead Scoring?', options:['Pontuacao de exercicios','Classificar leads por probabilidade de conversao','Dar nota para vendedores','Avaliar qualidade de produto'], correctIndex:1, explanation:'Lead scoring prioriza leads baseado em engajamento e perfil ideal.' },
    { id:'sa-q5', question:'Qual tecnica aumenta reply rate de cold email?', options:['Email longo e detalhado','Personalizacao + valor claro + CTA simples','Enviar 10x por dia','Usar caps lock'], correctIndex:1, explanation:'Personalizacao + proposta de valor + CTA claro maximizam respostas.' },
  ]},
  { skillId:'comms', questions:[
    { id:'cw-q1', question:'O que e Technical Writing?', options:['Escrever ficcao tecnica','Documentacao clara para audiencia tecnica','Programar em Assembly','Escrever tweets'], correctIndex:1, explanation:'Technical Writing e comunicar conceitos tecnicos de forma clara e acessivel.' },
    { id:'cw-q2', question:'O que e uma API文档 bem escrita?', options:['Apenas lista de endpoints','Documentacao com exemplos, erros e uso real','Codigo fonte documentado','README com 1 linha'], correctIndex:1, explanation:'Boa doc de API inclui exemplos, error codes, autenticacao erate limits.' },
    { id:'cw-q3', question:'O que e Document-Driven Development?', options:['Escrever docs antes do codigo','Usar docs como spec para implementacao','Documentar apos deploy','Copiar docs de outros projetos'], correctIndex:1, explanation:'DDD usa documentacao como contrato antes da implementacao, reduzindo retrabalho.' },
    { id:'cw-q4', question:'Qual formato e melhor para docs de referencia?', options:['Prosa longa','Tabelas e listas estruturadas','Apenas codigo','Imagens sem texto'], correctIndex:1, explanation:'Tabelas e listas facilitam busca rapida de informacao especifica.' },
    { id:'cw-q5', question:'O que e Readability?', options:['Tamanho da fonte','Facilidade de理解和compreensao do texto','Quantidade de links','Formato do arquivo'], correctIndex:1, explanation:'Readability mede quao facil e para o leitor entender o conteudo escrito.' },
  ]},
];

const loadProgress = () => { try { const s = localStorage.getItem('roadmap-progress'); return s ? JSON.parse(s) : null; } catch { return null; } };
const saveProgress = (ph: Phase[], ach: Achievement[], xp: number, st: number) => { localStorage.setItem('roadmap-progress', JSON.stringify({phases:ph, achievements:ach, xp, streak:st})); };

// ─── ICONS ────────────────────────────────────────────────
const I: React.FC<{n:string;s?:number;c?:string}> = ({n,s=24,c=''}) => {
  const d: Record<string,React.ReactNode> = {
    code:<><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></>,
    server:<><rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></>,
    database:<><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></>,
    brain:<><circle cx="12" cy="10" r="6"/><path d="M12 16v4"/><path d="M8 20h8"/></>,
    gear:<><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></>,
    users:<><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>,
    star:<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>,
    trophy:<><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></>,
    fire:<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>,
    lightning:<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>,
    crown:<><path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14"/></>,
    check:<polyline points="20 6 9 17 4 12"/>,
    lock:<><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></>,
    down:<polyline points="6 9 12 15 18 9"/>,
    right:<polyline points="9 18 15 12 9 6"/>,
    link:<><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></>,
    book:<path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>,
    video:<><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></>,
    play:<polygon points="5 3 19 12 5 21 5 3"/>,
    x:<><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>,
    arrowLeft:<polyline points="15 18 9 12 15 6"/>,
  };
  return <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={c}>{d[n]}</svg>;
};

const typeIcon: Record<string,string> = { doc:'book', video:'video', course:'play', exercise:'code', article:'book' };
const typeColor: Record<string,string> = { doc:'#3B82F6', video:'#EF4444', course:'#10B981', exercise:'#F59E0B', article:'#8B5CF6' };
const typeLabel: Record<string,string> = { doc:'Documentação', video:'Video', course:'Curso', exercise:'Exercicio', article:'Artigo' };

// ─── SUB-COMPONENTS ───────────────────────────────────────
const Bar: React.FC<{p:number;c:string;h?:number}> = ({p,c,h=8}) => (
  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden" style={{height:h}}>
    <div className="h-full rounded-full transition-all duration-500" style={{width:`${Math.min(p,100)}%`,backgroundColor:c}}/>
  </div>
);

const TopicRow: React.FC<{t:Topic;onToggle:()=>void}> = ({t,onToggle}) => (
  <div className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${t.completed?'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800':'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-gray-300'}`}>
    <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white flex-shrink-0" style={{backgroundColor:typeColor[t.type]}}>
      <I n={typeIcon[t.type]} s={16}/>
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-1.5">
        {t.completed && <I n="check" s={13} c="text-green-500 flex-shrink-0"/>}
        <span className={`text-sm font-medium truncate ${t.completed?'text-green-700 dark:text-green-400':'text-gray-900 dark:text-white'}`}>{t.name}</span>
      </div>
      <span className="text-xs text-gray-500 dark:text-gray-400">{typeLabel[t.type]}</span>
    </div>
    <div className="flex items-center gap-1.5 flex-shrink-0">
      <a href={t.url} target="_blank" rel="noopener noreferrer" onClick={e=>e.stopPropagation()}
        className="p-1.5 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors" title="Abrir link">
        <I n="link" s={14}/>
      </a>
      <button onClick={onToggle} className={`p-1.5 rounded-lg transition-colors ${t.completed?'bg-green-100 dark:bg-green-900/30 text-green-600':'bg-gray-100 dark:bg-gray-700 text-gray-400 hover:bg-gray-200'}`} title={t.completed?'Desmarcar':'Marcar como concluido'}>
        <I n={t.completed?'check':'right'} s={14}/>
      </button>
    </div>
  </div>
);

const SubModCard: React.FC<{sm:SubModule;exp:boolean;onToggle:()=>void;onTopic:(id:string)=>void;onExercise:(id:string)=>void;color:string}> = ({sm,exp,onToggle,onTopic,onExercise,color}) => {
  const done = sm.topics.filter(t=>t.completed).length;
  const pct = (done/sm.topics.length)*100;
  const exDone = sm.exercises?.filter(e=>e.completed).length||0;
  const exTotal = sm.exercises?.length||0;
  const diffColor: Record<string,string> = { easy:'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400', medium:'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400', hard:'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' };
  const diffLabel: Record<string,string> = { easy:'Facil', medium:'Medio', hard:'Dificil' };
  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
      <button onClick={onToggle} className="w-full p-4 flex items-center gap-3 text-left hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h4 className="font-semibold text-gray-900 dark:text-white text-sm">{sm.name}</h4>
            <span className="text-xs text-gray-400">{done}/{sm.topics.length}</span>
            {exTotal>0 && <span className="text-xs text-gray-400">| {exDone}/{exTotal} exercicios</span>}
          </div>
          <div className="mt-2"><Bar p={pct} c={color} h={4}/></div>
        </div>
        <I n="down" s={16} c={`text-gray-400 transition-transform duration-200 ${exp?'rotate-180':''}`}/>
      </button>
      {exp && (
        <div className="px-4 pb-4 space-y-2">
          {sm.topics.map(t=><TopicRow key={t.id} t={t} onToggle={()=>onTopic(t.id)}/>)}
          {sm.exercises&&sm.exercises.length>0&&(
            <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
              <h5 className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wider">Exercicios</h5>
              {sm.exercises.map(ex=>(
                <div key={ex.id} className={`flex items-center gap-3 p-2 rounded-lg mb-1 ${ex.completed?'bg-green-50 dark:bg-green-900/20':'bg-gray-50 dark:bg-gray-800/50'}`}>
                  <button onClick={()=>onExercise(ex.id)} className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${ex.completed?'bg-green-500 border-green-500 text-white':'border-gray-300 dark:border-gray-600'}`}>
                    {ex.completed&&<I n="check" s={12}/>}
                  </button>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-gray-900 dark:text-white">{ex.title}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 truncate">{ex.description}</div>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0 ${diffColor[ex.difficulty]}`}>{diffLabel[ex.difficulty]}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// ─── SKILL MODAL ──────────────────────────────────────────
const SkillModal: React.FC<{skill:Skill;color:string;onClose:()=>void;onTopic:(smId:string,tId:string)=>void;onExercise:(smId:string,exId:string)=>void;onQuiz:()=>void}> = ({skill,color,onClose,onTopic,onExercise,onQuiz}) => {
  const [expSM,setExpSM] = useState<string|null>(skill.subModules[0]?.id||null);
  const total = skill.subModules.reduce((a,sm)=>a+sm.topics.length,0);
  const done = skill.subModules.reduce((a,sm)=>a+sm.topics.filter(t=>t.completed).length,0);
  const pct = total>0?(done/total)*100:0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div className="w-full max-w-2xl max-h-[90vh] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden flex flex-col" onClick={e=>e.stopPropagation()}>
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center text-white" style={{backgroundColor:color}}>
                  <I n="book" s={20}/>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">{skill.name}</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{skill.description}</p>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-500">{done}/{total} topicos</span>
                  <span className="font-medium" style={{color}}>{Math.round(pct)}%</span>
                </div>
                <Bar p={pct} c={color} h={6}/>
              </div>
            </div>
            <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex-shrink-0">
              <I n="x" s={20} c="text-gray-500"/>
            </button>
          </div>
        </div>
        {/* SubModules */}
        <div className="flex-1 overflow-y-auto p-6 space-y-3">
          {skill.subModules.map(sm=>(
            <SubModCard key={sm.id} sm={sm} exp={expSM===sm.id} onToggle={()=>setExpSM(expSM===sm.id?null:sm.id)} onTopic={(tid)=>onTopic(sm.id,tid)} onExercise={(eid)=>onExercise(sm.id,eid)} color={color}/>
          ))}
        </div>
        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 flex items-center justify-between">
          <span className="text-sm text-gray-500">+{skill.xp} XP ao completar todos os topicos</span>
          <div className="flex gap-2">
            <button onClick={onQuiz} className="px-4 py-2 rounded-lg font-medium text-white text-sm bg-purple-600 hover:bg-purple-700 transition-colors">
              <I n="zap" s={14} c="text-white mr-1 inline"/>Quiz
            </button>
            <button onClick={onClose} className="px-5 py-2 rounded-lg font-medium text-white text-sm" style={{backgroundColor:color}}>Fechar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── QUIZ MODAL ──────────────────────────────────────────
const QuizModal: React.FC<{skillId:string;skillName:string;color:string;onClose:()=>void;onPass:(xp:number)=>void}> = ({skillId,skillName,color,onClose,onPass}) => {
  const quiz = quizData.find(q=>q.skillId===skillId);
  const [current,setCurrent] = useState(0);
  const [selected,setSelected] = useState<number|null>(null);
  const [showResult,setShowResult] = useState(false);
  const [score,setScore] = useState(0);
  const [answers,setAnswers] = useState<(number|null)[]>([]);

  if(!quiz) return null;
  const q = quiz.questions[current];
  const total = quiz.questions.length;
  const isLast = current===total-1;

  const handleSelect = (idx:number) => {
    if(selected!==null) return;
    setSelected(idx);
    const newAnswers = [...answers, idx];
    setAnswers(newAnswers);
    if(idx===q.correctIndex) setScore(s=>s+1);
  };

  const handleNext = () => {
    if(isLast){
      setShowResult(true);
      const finalScore = selected===q.correctIndex ? score+1 : score;
      const passed = finalScore >= Math.ceil(total*0.6);
      if(passed) onPass(25);
    } else {
      setCurrent(c=>c+1);
      setSelected(null);
    }
  };

  const finalScore = score;
  const passed = finalScore >= Math.ceil(total*0.6);

  if(showResult){
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
        <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 text-center" onClick={e=>e.stopPropagation()}>
          <div className={`w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center ${passed?'bg-green-100 dark:bg-green-900/30':'bg-red-100 dark:bg-red-900/30'}`}>
            <I n={passed?'star':'x'} s={40} c={passed?'text-green-500':'text-red-500'}/>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{passed?'Parabens!':'Continue estudando'}</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">{passed?'Voce passou no quiz!':'Nao atingiu a nota minima (60%)'}</p>
          <div className="text-5xl font-bold mb-4" style={{color:passed?color:'#EF4444'}}>{finalScore}/{total}</div>
          <p className="text-sm text-gray-500 mb-6">{passed?'+25 XP ganhos!':'Tente novamente apos estudar mais'}</p>
          <button onClick={onClose} className="w-full py-3 rounded-xl font-semibold text-white" style={{backgroundColor:color}}>Fechar</button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div className="w-full max-w-lg bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden" onClick={e=>e.stopPropagation()}>
        <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white">{skillName} Quiz</h3>
            <p className="text-sm text-gray-500">Pergunta {current+1} de {total}</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"><I n="x" s={18} c="text-gray-500"/></button>
        </div>
        <div className="p-1"><Bar p={((current+1)/total)*100} c={color} h={3}/></div>
        <div className="p-6">
          <p className="text-lg font-medium text-gray-900 dark:text-white mb-4">{q.question}</p>
          <div className="space-y-2">
            {q.options.map((opt,idx)=>{
              const isSelected = selected===idx;
              const isCorrect = idx===q.correctIndex;
              const showCorrect = selected!==null && isCorrect;
              let cls = 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600';
              if(isSelected) cls = isCorrect?'border-green-500 bg-green-50 dark:bg-green-900/20':'border-red-500 bg-red-50 dark:bg-red-900/20';
              else if(showCorrect) cls = 'border-green-500 bg-green-50 dark:bg-green-900/20';
              return (
                <button key={idx} onClick={()=>handleSelect(idx)} disabled={selected!==null} className={`w-full p-3 rounded-xl border-2 text-left transition-all ${cls}`}>
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full border-2 flex items-center justify-center text-sm font-medium flex-shrink-0 ${showCorrect?'border-green-500 text-green-500':isSelected?'border-red-500 text-red-500':'border-gray-300 dark:border-gray-600 text-gray-500'}">{String.fromCharCode(65+idx)}</span>
                    <span className="text-sm text-gray-900 dark:text-white">{opt}</span>
                    {showCorrect && <I n="check" s={16} c="text-green-500 ml-auto"/>}
                    {isSelected && !isCorrect && <I n="x" s={16} c="text-red-500 ml-auto"/>}
                  </div>
                </button>
              );
            })}
          </div>
          {selected!==null && (
            <div className={`mt-4 p-3 rounded-xl ${selected===q.correctIndex?'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800':'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'}`}>
              <p className="text-sm font-medium mb-1">{selected===q.correctIndex?'Correto!':'Incorreto!'}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{q.explanation}</p>
            </div>
          )}
        </div>
        <div className="p-4 border-t border-gray-200 dark:border-gray-800 flex justify-end">
          <button onClick={handleNext} disabled={selected===null} className="px-6 py-2 rounded-xl font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed" style={{backgroundColor:color}}>
            {isLast?'Ver Resultado':'Proxima'}
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── SKILL CARD (inline) ──────────────────────────────────
const SkillCard: React.FC<{skill:Skill;color:string;onClick:()=>void}> = ({skill,color,onClick}) => {
  const total = skill.subModules.reduce((a,sm)=>a+sm.topics.length,0);
  const done = skill.subModules.reduce((a,sm)=>a+sm.topics.filter(t=>t.completed).length,0);
  const pct = total>0?(done/total)*100:0;
  return (
    <button onClick={onClick} className={`w-full p-4 rounded-xl border-2 text-left transition-all hover:shadow-lg ${skill.completed?'bg-green-50 dark:bg-green-900/20 border-green-500':'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            {skill.completed && <I n="check" s={15} c="text-green-500"/>}
            <h4 className="font-semibold text-gray-900 dark:text-white text-sm">{skill.name}</h4>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 line-clamp-2">{skill.description}</p>
          <div className="flex items-center gap-3 text-xs text-gray-400 mb-2">
            <span className="font-medium" style={{color}}>{skill.xp} XP</span>
            <span>{done}/{total} topicos</span>
            <span>{skill.subModules.length} modulos</span>
          </div>
          <Bar p={pct} c={color} h={4}/>
        </div>
        <I n="right" s={18} c="text-gray-400 mt-1 flex-shrink-0"/>
      </div>
    </button>
  );
};

// ─── PHASE CARD ───────────────────────────────────────────
const PhaseCard: React.FC<{phase:Phase;expanded:boolean;onToggle:()=>void;onSkillClick:(s:Skill)=>void}> = ({phase,expanded,onToggle,onSkillClick}) => {
  const done = phase.skills.filter(s=>s.completed).length;
  const pct = (done/phase.skills.length)*100;
  return (
    <div className={`rounded-2xl border-2 overflow-hidden transition-all ${phase.unlocked?'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700':'bg-gray-100 dark:bg-gray-900 border-gray-300 dark:border-gray-800 opacity-50'}`}>
      <button onClick={onToggle} className="w-full p-5 flex items-center gap-4 text-left" disabled={!phase.unlocked}>
        <div className="w-14 h-14 rounded-xl flex items-center justify-center text-white font-bold text-xl flex-shrink-0" style={{backgroundColor:phase.color}}>
          {phase.number}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">{phase.title}</h3>
            {!phase.unlocked && <I n="lock" s={15} c="text-gray-400"/>}
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{phase.subtitle}</p>
        </div>
        <div className="text-right flex-shrink-0">
          <div className="text-sm font-medium text-gray-900 dark:text-white">{done}/{phase.skills.length}</div>
          <div className="w-24 mt-1"><Bar p={pct} c={phase.color} h={6}/></div>
        </div>
        <I n="down" s={20} c={`text-gray-400 transition-transform duration-200 ${expanded?'rotate-180':''}`}/>
      </button>
      {expanded && phase.unlocked && (
        <div className="px-5 pb-5 space-y-3">
          {phase.skills.map(s=><SkillCard key={s.id} skill={s} color={phase.color} onClick={()=>onSkillClick(s)}/>)}
        </div>
      )}
    </div>
  );
};

// ─── STATS BAR ────────────────────────────────────────────
const Stats: React.FC<{xp:number;streak:number}> = ({xp,streak}) => {
  const lv = Math.floor(xp/200)+1;
  const next = (lv*200)-xp;
  const pct = (xp%200)/200*100;
  return (
    <div className="flex flex-wrap items-center gap-6 p-4 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-3">
        <div className="relative w-14 h-14">
          <svg className="w-14 h-14 -rotate-90"><circle cx="28" cy="28" r="24" stroke="#E5E7EB" strokeWidth="4" fill="none" className="dark:stroke-gray-700"/><circle cx="28" cy="28" r="24" stroke="#8B5CF6" strokeWidth="4" fill="none" strokeDasharray={`${pct*1.508} 150.8`} strokeLinecap="round"/></svg>
          <div className="absolute inset-0 flex items-center justify-center"><span className="text-sm font-bold text-purple-600 dark:text-purple-400">{lv}</span></div>
        </div>
        <div><div className="text-xs text-gray-500">Nivel</div><div className="text-sm font-medium text-gray-900 dark:text-white">{next} XP p/ proximo</div></div>
      </div>
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center"><I n="star" s={24} c="text-yellow-500"/></div>
        <div><div className="text-xs text-gray-500">XP Total</div><div className="text-lg font-bold text-gray-900 dark:text-white">{xp.toLocaleString()}</div></div>
      </div>
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center"><I n="fire" s={24} c="text-red-500"/></div>
        <div><div className="text-xs text-gray-500">Sequencia</div><div className="text-lg font-bold text-gray-900 dark:text-white">{streak} dias</div></div>
      </div>
    </div>
  );
};

// ─── ACHIEVEMENT ──────────────────────────────────────────
const Badge: React.FC<{a:Achievement}> = ({a}) => (
  <div className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all ${a.earned?'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-400':'bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700 opacity-40'}`}>
    <div className={`w-11 h-11 rounded-full flex items-center justify-center ${a.earned?'bg-yellow-400 text-white':'bg-gray-300 dark:bg-gray-600 text-gray-500'}`}><I n={a.icon} s={22}/></div>
    <span className="text-xs font-medium text-center text-gray-900 dark:text-white leading-tight">{a.name}</span>
  </div>
);

// ─── MAIN ─────────────────────────────────────────────────
const RoadmapApp: React.FC = () => {
  const [phases,setPhases] = useState<Phase[]>(initialPhases);
  const [achievements,setAchievements] = useState<Achievement[]>(initialAchievements);
  const [xp,setXp] = useState(0);
  const [streak] = useState(1);
  const [expandedPhase,setExpandedPhase] = useState<string|null>('phase-1');
  const [selectedSkill,setSelectedSkill] = useState<{skill:Skill;color:string}|null>(null);
  const [quizOpen,setQuizOpen] = useState(false);

  useEffect(()=>{ const s=loadProgress(); if(s){setPhases(s.phases);setAchievements(s.achievements);setXp(s.xp);} },[]);
  useEffect(()=>{ saveProgress(phases,achievements,xp,streak); },[phases,achievements,xp,streak]);

  // achievements
  useEffect(()=>{
    const tc = phases.reduce((a,p)=>a+p.skills.filter(s=>s.completed).length,0);
    const cp = phases.filter(p=>p.skills.every(s=>s.completed)).length;
    setAchievements(p=>p.map(a=>{
      if(a.id==='first-skill'&&tc>=1) return{...a,earned:true};
      if(a.id==='phase-complete'&&cp>=1) return{...a,earned:true};
      if(a.id==='xp-500'&&xp>=500) return{...a,earned:true};
      if(a.id==='xp-1000'&&xp>=1000) return{...a,earned:true};
      if(a.id==='streak-7'&&streak>=7) return{...a,earned:true};
      if(a.id==='all-phases'&&cp===phases.length) return{...a,earned:true};
      return a;
    }));
  },[phases,xp,streak]);

  // unlock
  useEffect(()=>{
    setPhases(p=>p.map((ph,i)=>{
      if(i===0) return{...ph,unlocked:true};
      return{...ph,unlocked:p[i-1].skills.every(s=>s.completed)};
    }));
  },[phases]);

  const handleTopicToggle = (phaseId:string, skillId:string, subModId:string, topicId:string) => {
    setPhases(prev=>prev.map(ph=>{
      if(ph.id!==phaseId) return ph;
      return{...ph,skills:ph.skills.map(sk=>{
        if(sk.id!==skillId) return sk;
        return{...sk,subModules:sk.subModules.map(sm=>{
          if(sm.id!==subModId) return sm;
          return{...sm,topics:sm.topics.map(t=>t.id===topicId?{...t,completed:!t.completed}:t)};
        })};
      })};
    }));
    // update selected skill live
    if(selectedSkill&&selectedSkill.skill.id===skillId){
      setSelectedSkill(prev=>{
        if(!prev) return null;
        return{...prev,skill:{...prev.skill,subModules:prev.skill.subModules.map(sm=>{
          if(sm.id!==subModId) return sm;
          return{...sm,topics:sm.topics.map(t=>t.id===topicId?{...t,completed:!t.completed}:t)};
        })}};
      });
    }
  };

  const handleExerciseToggle = (phaseId:string, skillId:string, subModId:string, exerciseId:string) => {
    setPhases(prev=>prev.map(ph=>{
      if(ph.id!==phaseId) return ph;
      return{...ph,skills:ph.skills.map(sk=>{
        if(sk.id!==skillId) return sk;
        return{...sk,subModules:sk.subModules.map(sm=>{
          if(sm.id!==subModId) return sm;
          return{...sm,exercises:sm.exercises?.map(e=>e.id===exerciseId?{...e,completed:!e.completed}:e)||[]};
        })};
      })};
    }));
    if(selectedSkill&&selectedSkill.skill.id===skillId){
      setSelectedSkill(prev=>{
        if(!prev) return null;
        return{...prev,skill:{...prev.skill,subModules:prev.skill.subModules.map(sm=>{
          if(sm.id!==subModId) return sm;
          return{...sm,exercises:sm.exercises?.map(e=>e.id===exerciseId?{...e,completed:!e.completed}:e)||[]};
        })}};
      });
    }
  };

  // auto-complete skill when all topics done
  useEffect(()=>{
    phases.forEach(ph=>{
      ph.skills.forEach(sk=>{
        const allDone = sk.subModules.every(sm=>sm.topics.every(t=>t.completed));
        if(allDone&&!sk.completed){
          setPhases(p=>p.map(x=>x.id!==ph.id?x:{...x,skills:x.skills.map(s=>{
            if(s.id!==sk.id) return s;
            if(!s.completed) setXp(prev=>prev+s.xp);
            return{...s,completed:true};
          })}));
        }
      });
    });
  },[phases]);

  const openSkill = (sk:Skill) => {
    const ph = phases.find(p=>p.skills.some(s=>s.id===sk.id));
    setSelectedSkill({skill:sk, color:ph?.color||'#10B981'});
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">Roadmap de Desenvolvimento</h1>
          <p className="text-gray-600 dark:text-gray-400">Clique numa skill para ver assuntos e links de estudo. Marque topicos concluidos para ganhar XP!</p>
        </div>
        <div className="mb-8"><Stats xp={xp} streak={streak}/></div>
        <div className="mb-8 relative">
          <div className="absolute left-7 top-0 bottom-0 w-1 bg-gradient-to-b from-green-500 via-blue-500 to-purple-500 rounded-full"/>
          <div className="space-y-4">
            {phases.map(ph=>(
              <div key={ph.id} className="relative pl-16">
                <div className={`absolute left-4 w-7 h-7 rounded-full border-4 border-white dark:border-gray-900 ${ph.unlocked?'bg-green-500':'bg-gray-300 dark:bg-gray-600'}`} style={{top:20}}/>
                <PhaseCard phase={ph} expanded={expandedPhase===ph.id} onToggle={()=>setExpandedPhase(expandedPhase===ph.id?null:ph.id)} onSkillClick={openSkill}/>
              </div>
            ))}
          </div>
        </div>
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Conquistas</h2>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">{achievements.map(a=><Badge key={a.id} a={a}/>)}</div>
        </div>
        <div className="text-center text-sm text-gray-500 dark:text-gray-400 mt-8">
          Desenvolvido por Ismael Douglas
        </div>
      </div>
      {selectedSkill && (
        <SkillModal skill={selectedSkill.skill} color={selectedSkill.color} onClose={()=>setSelectedSkill(null)}
          onTopic={(smId,tId)=>{
            const ph = phases.find(p=>p.skills.some(s=>s.id===selectedSkill.skill.id));
            if(ph) handleTopicToggle(ph.id,selectedSkill.skill.id,smId,tId);
          }}
          onExercise={(smId,exId)=>{
            const ph = phases.find(p=>p.skills.some(s=>s.id===selectedSkill.skill.id));
            if(ph) handleExerciseToggle(ph.id,selectedSkill.skill.id,smId,exId);
          }}
          onQuiz={()=>setQuizOpen(true)}
        />
      )}
      {quizOpen && selectedSkill && (
        <QuizModal skillId={selectedSkill.skill.id} skillName={selectedSkill.skill.name} color={selectedSkill.color} onClose={()=>setQuizOpen(false)} onPass={(xp)=>{setXp(prev=>prev+xp);}}/>
      )}
    </div>
  );
};

export default RoadmapApp;

// Auto-mount when loaded as standalone script
if (typeof document !== 'undefined') {
  const root = document.getElementById('root');
  if (root) {
    createRoot(root).render(<RoadmapApp />);
  }
}