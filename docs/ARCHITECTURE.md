# WordWise — Arquitetura Técnica

> Documento de referência para desenvolvedor(es) do projeto.

---

## Stack

| Camada | Tecnologia | Versão |
|---|---|---|
| UI Framework | React | 18.3 |
| Linguagem | TypeScript | 5.x |
| Build tool | Vite | 6.x |
| Estilização | Tailwind CSS v4 | 4.x |
| Componentes base | shadcn/ui (Radix UI) | — |
| Roteamento | React Router DOM | 7.x |
| Animações | Motion (Framer Motion) | 12.x |
| Formulários | React Hook Form | 7.x |
| Gráficos | Recharts | 2.x |
| Gerenciador de pacotes | pnpm | — |

---

## Estrutura de diretórios

```
wordwise/
├── index.html                        # HTML entry point
├── package.json
├── tsconfig.json
├── vite.config.ts
├── public/                           # Assets estáticos (favicon, og-image...)
├── docs/
│   └── ARCHITECTURE.md               # Este arquivo
└── src/
    ├── main.tsx                      # Bootstrap React + importação de estilos
    └── app/
        ├── App.tsx                   # BrowserRouter + Routes declarativas
        │
        ├── screens/                  # Uma tela = uma rota
        │   ├── Onboarding.tsx        # /onboarding  (5 steps)
        │   ├── Feed.tsx              # /feed
        │   ├── Discover.tsx          # /discover
        │   ├── Shelves.tsx           # /shelves
        │   ├── Profile.tsx           # /profile
        │   ├── BookDetails.tsx       # /books/:bookId
        │   └── BrandGuide.tsx        # /brand  (internal)
        │
        ├── components/
        │   ├── ui/                   # Primitivos shadcn/ui (Button, Card, Dialog...)
        │   ├── common/               # Componentes genéricos reutilizáveis
        │   │   └── ImageWithFallback.tsx
        │   ├── layouts/              # Estrutura de página
        │   │   ├── AppLayout.tsx     # Outlet + BottomNav + ReviewModal global
        │   │   ├── BottomNav.tsx     # Navegação inferior com 5 tabs
        │   │   └── OnboardingGuard.tsx # Redirect se onboarding incompleto
        │   └── features/             # Componentes por domínio de negócio
        │       ├── feed/             # ReviewCard, QuoteCard, FeedItem...
        │       ├── review/           # ReviewModal (fluxo 5 steps)
        │       ├── discover/         # SearchBar, MoodCard, TropeTag...
        │       ├── shelves/          # ShelfCard, ProgressBar, StatsGrid...
        │       ├── profile/          # BadgeGrid, ReadingStats, CompatList...
        │       └── book/             # BookHero, EmotionBreakdown, ReviewList...
        │
        ├── context/
        │   ├── OnboardingContext.tsx  # hasCompleted + complete() + reset()
        │   └── ReviewModalContext.tsx # isOpen + open() + close()
        │
        ├── hooks/
        │   ├── useLocalStorage.ts    # Persistência tipada no localStorage
        │   ├── useBooks.ts           # Acesso a dados de livros
        │   └── useShelves.ts        # CRUD das estantes do usuário
        │
        ├── types/
        │   └── index.ts              # Todas as interfaces TypeScript do domínio
        │
        ├── services/
        │   ├── booksService.ts       # Abstração de chamadas de API — livros
        │   ├── reviewsService.ts     # Abstração de chamadas de API — reviews
        │   └── mockData.ts           # Dados mock para desenvolvimento
        │
        ├── utils/
        │   └── index.ts              # Funções puras: cn(), formatRelativeTime()...
        │
        └── constants/
            └── index.ts              # COLORS, ROUTES, STORAGE_KEYS, enums...
```

---

## Roteamento

O roteamento é feito com **React Router DOM v7** com rotas declarativas em `App.tsx`.

```
/onboarding          → <Onboarding />          (pública)
/                    → redirect → /feed
/feed                → <Feed />                (protegida)
/discover            → <Discover />            (protegida)
/shelves             → <Shelves />             (protegida)
/profile             → <Profile />             (protegida)
/books/:bookId       → <BookDetails />         (protegida)
/brand               → <BrandGuide />          (protegida)
```

**Proteção de rota:** `<OnboardingGuard>` verifica o contexto de onboarding. Se não completado, redireciona para `/onboarding`.

**Layout compartilhado:** `<AppLayout>` envolve todas as rotas protegidas e renderiza o `<BottomNav>` e o `<ReviewModal>` global.

---

## Gerenciamento de estado

| Escopo | Solução | Onde |
|---|---|---|
| Onboarding concluído | `OnboardingContext` + localStorage | `context/OnboardingContext.tsx` |
| Modal de review aberto | `ReviewModalContext` | `context/ReviewModalContext.tsx` |
| Estantes do usuário | `useShelves` hook + localStorage | `hooks/useShelves.ts` |
| Estado de UI local | `useState` | Dentro de cada componente |

> **Regra:** Não usar Context para estado de UI local (hover, toggle, etc). Context é apenas para estado verdadeiramente global.

---

## Camada de serviços (preparada para backend)

Os serviços em `services/` isolam completamente a origem dos dados:

```typescript
// Hoje: retorna mock data
const books = await booksService.getAll()

// Amanhã: troca a implementação interna, nenhum componente muda
```

Ao integrar um backend real, basta substituir o corpo das funções em `booksService.ts` e `reviewsService.ts` — as screens e hooks não precisam de alteração.

---

## Design System

O design system está definido em CSS Variables em `src/styles/theme.css` e constantes TypeScript em `src/app/constants/index.ts`.

### Paleta principal

| Token | Valor | Uso |
|---|---|---|
| `--ww-ink-black` | `#0a0807` | Background principal |
| `--ww-deep-espresso` | `#1a1210` | Superfícies, cards |
| `--ww-antique-gold` | `#c8a96e` | Primary, interativos |
| `--ww-literary-coral` | `#e8635a` | CTAs, alertas |
| `--ww-ash-gray` | `#8a7e6e` | Texto secundário |

### Tipografia

- **Display / Títulos:** Playfair Display (Google Fonts)
- **Corpo / Interface:** DM Sans (Google Fonts)

---

## Próximos passos

### Backend integration
- [ ] Implementar autenticação (Auth0, Supabase, ou custom JWT)
- [ ] Substituir `mockData.ts` por chamadas reais em `booksService.ts` / `reviewsService.ts`
- [ ] Integrar Google Books API ou Open Library para catálogo

### Features v2
- [ ] Animações de transição entre rotas (Motion layout)
- [ ] Skeleton loaders em todas as telas
- [ ] Integração Spotify (trilha sonora de reviews)
- [ ] Notificações push (Web Push API)
- [ ] PWA (Service Worker + manifest)
- [ ] Clubs de leitura (grupos sociais)

### Qualidade
- [ ] Testes unitários com Vitest + Testing Library
- [ ] Storybook para componentes de UI
- [ ] CI/CD com GitHub Actions
- [ ] Análise de bundle com `vite-bundle-visualizer`
