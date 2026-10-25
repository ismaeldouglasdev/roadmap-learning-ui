# 🎮 RoadmapMaster — Roadmaps gamificados de aprendizado

Interface interativa estilo Duolingo para acompanhar um roadmap de estudo, com XP,
conquistas, quizzes, lições e notas. Funciona 100% no navegador, sem conta e sem servidor.

**Site:** https://ismaeldouglasdev.github.io/roadmap-learning-ui/

---

## 🚀 Como usar

### Online
Acesse o link acima e clique em **"Começar sem conta"**. O progresso fica salvo no
`localStorage` do navegador — não precisa de login, cadastro nem backend.

### Desenvolvimento local
```bash
npm ci
npm run dev        # http://localhost:3000
```

### Build
```bash
npm run build        # gera dist/
npm run build:pages  # gera docs/ (é o que o GitHub Pages publica)
```

### Modo com conta (opcional)
Criar conta só serve para sincronizar o progresso entre dispositivos. Requer o backend
opcional em `server/` (FastAPI + SQLite):

```bash
cd server && ./run.sh   # sobe em http://localhost:8091
```

Aponte o frontend para o backend com `VITE_API_URL` (padrão: `http://localhost:8091`).
Sem backend, o app funciona normalmente em modo convidado.

---

## 🎯 Funcionalidades

### 📊 Progresso e gamificação
- **XP**: +5 XP por tópico concluído (desmarcar devolve os XP).
- **Conquistas**: 9 badges desbloqueados por progresso.
- **Sequência**: contador de dias de estudo.
- **Notas**: anotações por tópico, salvas localmente e sincronizadas com a conta.

### 🧠 Conteúdo
- **7 fases** com skills, submódulos e tópicos (docs, vídeos, cursos, exercícios).
- **Quizzes** com pontuação e nota 10.
- **Lições** geradas a partir de um gerador de questões.
- **Gerador de roadmap por IA**: descreva o assunto e monte um plano personalizado.

### 🎨 Interface
- Visual gamificado com micro-interações e transições suaves.
- **Modo claro e escuro** (toggle no topo, respeita `prefers-color-scheme` e persiste a escolha).
- **Responsivo**: funciona em celular, tablet e desktop.
- **Acessível**: modais com `role="dialog"`, foco preso, `aria-*` nos indicadores de
  progresso e navegação por teclado.
- **PWA**: service worker com cache offline e manifest para instalação.

---

## 📋 Fases do roadmap

| # | Fase | Conteúdo |
|---|------|----------|
| 1 | Fundamentos | Python, TypeScript & Git |
| 2 | Infraestrutura | Docker, Cloud & Terraform |
| 3 | Data Engineering | PostgreSQL, Airflow & Analytics |
| 4 | Machine Learning | Scikit-learn, NLP & LLM |
| 5 | DevOps | Kubernetes, CI/CD & Observability |
| 6 | Soft Skills | Product, Sales & Communication |
| 7 | Cybersecurity | Pentest WiFi, Anonimato & Red Team |

As conquistas são: Primeiro Passo, Fase Concluída, 500 XP, 1000 XP, Sequência de 7,
Mestre, Quiz Master, Nota 10 e Praticante.

---

## 🛠️ Tecnologias

- **React 18** — interface
- **TypeScript** (strict) — tipagem estática
- **Tailwind CSS 3** — estilização utility-first (build-time, sem CDN em runtime)
- **Vite 5** — build tool
- **FastAPI + SQLite** — backend opcional de sync
- Ícones SVG inline próprios (`src/components/Icon.tsx`) — zero dependência de ícones

---

## 📁 Estrutura

```
roadmap-learning-ui/
├── DESIGN.md                  # Design system
├── README.md
├── index.html                 # HTML de entrada do Vite
├── vite.config.ts             # base /roadmap-learning-ui/ em produção
├── tailwind.config.js         # Paleta, fontes e darkMode por classe
├── postcss.config.js
├── package.json
├── docs/                      # Build publicado pelo GitHub Pages (gerado)
├── public/                    # manifest.json, sw.js, icons, robots.txt
├── server/                    # Backend opcional (FastAPI + SQLite)
└── src/
    ├── main.tsx               # Entry point + registro do service worker
    ├── App.tsx                # AppRouter + RoadmapView
    ├── Landing.tsx            # Página inicial
    ├── Login.tsx              # Login / cadastro
    ├── auth.tsx               # Auth + modo convidado
    ├── store.tsx              # Estado global (progresso, notas, favoritos)
    ├── lib/
    │   ├── storage.ts         # localStorage com validação e try/catch
    │   └── theme.ts           # Tema claro/escuro
    ├── components/            # UI reutilizável (modais, cards, ícones)
    ├── features/              # Busca, notas, gerador de IA, question generator
    └── data/                  # Roadmap, lições, quizzes, conquistas
```

---

## 🚢 Deploy

O GitHub Pages deste repositório usa **"Deploy from a branch"** com source `master:/docs`.
O workflow `.github/workflows/deploy.yml` roda `npm run build:pages` a cada push no
`master` e faz commit do resultado em `docs/`, mantendo o site atualizado.

> O `base` do Vite é `/roadmap-learning-ui/` em produção. Se o repositório for
> renomeado ou o site passar a ser servido na raiz, ajuste `base` em `vite.config.ts`.

---

## 🎨 Customização

### Adicionar uma skill
Edite `src/data/roadmap-dev.ts` (array `initialPhases`). Cada skill tem
`id`, `name`, `description`, `xp` e `resources`.

### Adicionar uma conquista
Edite `src/data/achievements.ts` (array `initialAchievements`). O campo `icon` precisa
ser um dos nomes disponíveis em `src/components/Icon.tsx`.

### Mudar as cores
A paleta está em `tailwind.config.js` (`theme.extend.colors`) e documentada no `DESIGN.md`.

### Ajustar o backend
Variáveis de ambiente opcionais:

| Variável | Padrão | Descrição |
|---|---|---|
| `ROADMAP_DB` | `server/roadmap.db` | Caminho do banco SQLite |
| `ROADMAP_ALLOWED_ORIGINS` | origem do Pages + localhost | Origens liberadas no CORS |
| `ROADMAP_SESSION_TTL_HOURS` | `168` (7 dias) | Validade da sessão |
| `ROADMAP_LOGIN_RATE_LIMIT` | `10` | Tentativas de login por minuto e por IP |

---

## 🔧 Troubleshooting

**Progresso não salva** — verifique se o `localStorage` está liberado (modo privativo
bloqueia). O progresso do modo convidado é local por definição.

**O backend não conecta** — o CORS só libera as origens em `ROADMAP_ALLOWED_ORIGINS`.
Inclua a origem exata do frontend.

**Cache antigo após o deploy** — o service worker usa cache versionado; se algo travar,
use "Limpar dados do site" nas configurações do navegador.

**Ícones não aparecem** — os ícones são SVG inline, não dependem de rede.

---

**Desenvolvido por:** Ismael Douglas
**Licença:** MIT
