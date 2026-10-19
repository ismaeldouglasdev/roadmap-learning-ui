# 🎮 Roadmap de Desenvolvimento - UI Gamificada

Uma interface interativa estilo Duolingo para acompanhar seu roadmap de aprendizado.

## 🚀 Como Usar

### Online (sem instalar nada)
Acesse: **https://ismaeldouglasdev.github.io/roadmap-learning-ui/**

Clique em **"Começar sem conta"** e estude na hora. O progresso fica salvo no
`localStorage` do navegador — não precisa de login nem servidor.

### Desenvolvimento Local
```bash
npm ci
npm run dev
```
Acesse: http://localhost:3000

### Build
```bash
npm run build        # gera dist/
npm run build:pages  # gera docs/ (é o que o GitHub Pages publica)
```

### Modo com conta (opcional)
Criar conta só serve para sincronizar o progresso entre dispositivos. Requer o
backend (`server/`), que roda com FastAPI:

```bash
cd server && ./run.sh   # sobe em http://localhost:8091
```

Aponte o frontend para o backend com `VITE_API_URL` (padrão: `http://localhost:8091`).
Sem backend, o app funciona normalmente em modo convidado.

## 🎯 Funcionalidades

### 📊 Sistema de Progresso
- **XP (Experiência)**: Ganhe XP completando skills
- **Nível**: Suba de nível a cada 200 XP
- **Sequência**: Mantenha sua sequência de estudos

### 🏆 Conquistas
- **Primeiro Passo**: Complete sua primeira skill
- **Fase Concluída**: Complete todas as skills de uma fase
- **500 XP**: Acumule 500 XP
- **1000 XP**: Acumule 1000 XP
- **Sequência de 7**: Estude 7 dias seguidos
- **Mestre**: Desbloqueie todas as fases

### 🎨 Design
- **Estilo Duolingo**: Visual gamificado e motivador
- **Modo Escuro**: Suporte a tema claro e escuro
- **Responsivo**: Funciona em desktop e mobile
- **Animações**: Transições suaves e micro-interações

### 💾 Persistência
- **Salvamento Automático**: Progresso salvo no `localStorage` (modo convidado)
- **Sessão Persistente**: Volte depois e continue de onde parou
- **Sync opcional**: Com conta, o progresso é sincronizado com o backend

## 📋 Fases do Roadmap

### Fase 1: Fundamentos
- Python Avançado (+150 XP)
- TypeScript Moderno (+120 XP)
- Git Avançado (+80 XP)
- Testing (+100 XP)

### Fase 2: Infraestrutura
- Docker (+120 XP)
- Cloud Basics (+150 XP)
- Terraform (+100 XP)

### Fase 3: Data Engineering
- PostgreSQL (+130 XP)
- Airflow (+140 XP)
- Analytics (+110 XP)

### Fase 4: Machine Learning
- Scikit-learn (+160 XP)
- NLP (+140 XP)
- LLM Integration (+130 XP)

### Fase 5: DevOps
- Kubernetes (+180 XP)
- CI/CD Avançado (+120 XP)
- Observability (+110 XP)

### Fase 6: Soft Skills
- Product Management (+100 XP)
- Sales & Marketing (+90 XP)
- Comunicação (+80 XP)

## 🛠️ Tecnologias

- **React 18**: Biblioteca UI
- **TypeScript**: Tipagem estática
- **Tailwind CSS**: Estilização utility-first
- **Vite**: Build tool rápido
- **Lucide React**: Ícones

## 📁 Estrutura

```
roadmap-ui/
├── DESIGN.md              # Design system
├── README.md              # Este arquivo
├── index.html             # HTML para Vite
├── package.json           # Dependências
├── vite.config.ts         # Configuração Vite (base /roadmap-learning-ui/ em prod)
├── tsconfig.json          # Configuração TypeScript
├── docs/                  # Build publicado pelo GitHub Pages (gerado por build:pages)
├── public/                # Assets estáticos (manifest, sw, icons)
├── server/                # Backend opcional (FastAPI + SQLite)
└── src/
    ├── main.tsx           # Entry point
    ├── App.tsx            # AppRouter + RoadmapView
    ├── auth.tsx           # Auth + modo convidado
    └── data/              # Roadmap, lições, quizzes
```

## 🚢 Deploy

GitHub Pages usa o modo **"Deploy from a branch"** com source `master:/docs`.
O workflow `.github/workflows/deploy.yml` roda `npm run build:pages` e faz
commit em `docs/` a cada push no `master`, mantendo o site atualizado.

## 🎨 Customização

### Adicionar Nova Skill
Edite o array `phases` no componente `RoadmapApp`:

```typescript
{
  id: 'nova-skill',
  name: 'Nome da Skill',
  description: 'Descrição da skill',
  xp: 100,
  completed: false,
  resources: ['Recurso 1']
}
```

### Adicionar Nova Conquista
Edite o array `achievements`:

```typescript
{
  id: 'nova-conquista',
  name: 'Nome da Conquista',
  description: 'Descrição',
  icon: 'star',
  earned: false
}
```

### Mudar Cores
As cores estão definidas no DESIGN.md e no componente. Cada fase tem sua cor:

- Fase 1: `#10B981` (Verde)
- Fase 2: `#3B82F6` (Azul)
- Fase 3: `#8B5CF6` (Roxo)
- Fase 4: `#F59E0B` (Amarelo)
- Fase 5: `#EF4444` (Vermelho)
- Fase 6: `#EC4899` (Rosa)

## 📱 Responsivo

A UI é totalmente responsiva:
- **Mobile**: Layout empilhado, cards cheios
- **Tablet**: Grid de conquistas 3 colunas
- **Desktop**: Layout completo com sidebar

## 🔧 Troubleshooting

### Progresso não salva
- Verifique se o localStorage está habilitado
- Limpe o cache do navegador

### Ícones não aparecem
- Verifique a conexão com a internet (ícones são SVG inline)

### Animações lentas
- Reduza `motion` no CSS se necessário
- Verifique se `prefers-reduced-motion` está ativo

---

**Desenvolvido por:** Ismael Douglas
**Data:** 13 de julho de 2026
**Versão:** 1.0.0