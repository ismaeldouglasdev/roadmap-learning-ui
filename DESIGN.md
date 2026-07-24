# 🎮 Roadmap Learning UI — Design System

## 1. Atmosphere & Identity

A gamified learning dashboard that feels like a **skill tree in an RPG**. Each phase is a "world" with unlockable skills, progress tracking, and achievement rewards. The signature is the **path-based navigation** — a winding road that connects learning milestones, making progress feel tangible and rewarding.

**Reading this as:** Interactive learning dashboard for self-taught developers, with a Duolingo-style gamification language, leaning toward Tailwind utilities + shadcn/ui + playful motion.

## 2. Color

### Palette

| Role | Token | Light | Dark | Usage |
|------|-------|-------|------|-------|
| Surface/primary | --surface-primary | #FFFFFF | #0F172A | Main background |
| Surface/secondary | --surface-secondary | #F8FAFC | #1E293B | Cards, panels |
| Surface/elevated | --surface-elevated | #FFFFFF | #334155 | Modals, tooltips |
| Text/primary | --text-primary | #0F172A | #F8FAFC | Headlines, body |
| Text/secondary | --text-secondary | #64748B | #94A3B8 | Captions, hints |
| Text/tertiary | --text-tertiary | #94A3B8 | #64748B | Disabled, muted |
| Border/default | --border-default | #E2E8F0 | #334155 | Dividers, outlines |
| Border/subtle | --border-subtle | #F1F5F9 | #1E293B | Soft separations |
| Accent/primary | --accent-primary | #10B981 | #34D399 | CTAs, progress, success |
| Accent/hover | --accent-hover | #059669 | #6EE7B7 | Hover state |
| Status/success | --status-success | #10B981 | #34D399 | Completed skills |
| Status/warning | --status-warning | #F59E0B | #FBBF24 | In-progress |
| Status/error | --status-error | #EF4444 | #F87171 | Failed/blocked |
| Status/info | --status-info | #3B82F6 | #60A5FA | Informational |
| Gamification/xp | --xp-gold | #F59E0B | #FBBF24 | XP points |
| Gamification/streak | --streak-fire | #EF4444 | #F87171 | Streak counter |
| Gamification/level | --level-purple | #8B5CF6 | #A78BFA | Level badges |

### Rules
- Green (#10B981) = completed/progress — the core gamification color
- Gold (#F59E0B) = rewards, XP, achievements
- Purple (#8B5CF6) = levels, milestones
- Red (#EF4444) = errors, blocked items only
- Never introduce colors outside this palette

## 3. Typography

### Scale

| Level | Size | Weight | Line Height | Tracking | Usage |
|-------|------|--------|-------------|----------|-------|
| Display | 48px / 3rem | 700 | 1.1 | -0.02em | Hero title |
| H1 | 36px / 2.25rem | 700 | 1.2 | -0.015em | Section headers |
| H2 | 28px / 1.75rem | 600 | 1.3 | -0.01em | Phase titles |
| H3 | 22px / 1.375rem | 600 | 1.4 | 0 | Skill names |
| Body/lg | 18px / 1.125rem | 400 | 1.6 | 0 | Descriptions |
| Body | 16px / 1rem | 400 | 1.6 | 0 | Default text |
| Body/sm | 14px / 0.875rem | 400 | 1.5 | 0 | Secondary info |
| Caption | 12px / 0.75rem | 500 | 1.4 | 0.02em | Labels, metadata |
| Overline | 11px / 0.6875rem | 600 | 1.3 | 0.08em | Section labels, uppercase |

### Font Stack
- Primary: "Nunito", system-ui, -apple-system, sans-serif
- Mono: "JetBrains Mono", "Fira Code", monospace

### Rules
- Rounded, friendly feel (Duolingo-inspired)
- Body text never below 14px
- Use clamp() for responsive headings

## 4. Spacing & Layout

### Base Unit
All spacing derives from a base of **4px**.

| Token | Value | Usage |
|-------|-------|-------|
| --space-1 | 4px | Tight: icon-to-label |
| --space-2 | 8px | Compact: list items |
| --space-3 | 12px | Default: form fields |
| --space-4 | 16px | Standard: card padding |
| --space-5 | 20px | Comfortable: section spacing |
| --space-6 | 24px | Generous: card padding |
| --space-8 | 32px | Separated: between groups |
| --space-10 | 40px | Sections within page |
| --space-12 | 48px | Major section breaks |
| --space-16 | 64px | Page-level vertical rhythm |

### Layout
- Max width: 1200px centered
- Grid: 12-column with 24px gutters
- Sidebar: 280px fixed (skill tree navigation)
- Content: fluid with max-width

## 5. Components

### Skill Card
- Rounded corners (16px)
- Subtle shadow on hover
- Progress bar (green gradient)
- Lock icon for unavailable skills
- XP badge in corner

### Progress Path
- SVG winding road
- Nodes for each skill
- Connected lines with gradient
- Animated when scrolling

### Achievement Badge
- Circular with inner icon
- Gold border for earned
- Gray for locked
- Tooltip on hover

### Stats Bar
- XP counter with flame animation
- Streak counter with fire icon
- Level indicator with progress ring

## 6. Motion

### Principles
- Celebratory micro-animations for completions
- Smooth path drawing for progress
- Gentle hover lifts on cards
- No distracting loops

### Timing
- Duration: 200-400ms
- Easing: cubic-bezier(0.4, 0, 0.2, 1)
- Stagger: 50ms between items

## 7. Icons

- Use Phosphor Icons (rounded style)
- Consistent stroke width: 2.0
- Size: 24px default, 20px compact

## 8. Accessibility

- Focus visible states (ring-2)
- ARIA labels on all interactive elements
- Color contrast ratio ≥ 4.5:1
- Reduced motion support