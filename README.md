# 🎮 Roadmap de Desenvolvimento - UI Gamificada

Uma interface interativa estilo Duolingo para acompanhar seu roadmap de aprendizado.

## 🚀 Como Usar

### Opção 1: Arquivo Standalone (Recomendado)
1. Abra o arquivo `index.standalone.html` no navegador
2. Pronto! Não precisa de instalação

### Opção 2: Desenvolvimento Local
```bash
cd roadmap-ui
npm install
npm run dev
```
Acesse: http://localhost:3000

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
- **Salvamento Automático**: Progresso salvo no localStorage
- **Sessão Persistente**: Volte depois e continue de onde parou

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
├── index.standalone.html  # Versão standalone (sem build)
├── package.json           # Dependências
├── vite.config.ts         # Configuração Vite
├── tsconfig.json          # Configuração TypeScript
├── RoadmapApp.tsx         # Componente principal
└── src/
    └── main.tsx           # Entry point
```

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