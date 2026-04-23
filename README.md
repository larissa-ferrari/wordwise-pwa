# WordWise 📚

> **"Seus livros, sua história"** — O app social para leitores apaixonados.

WordWise é uma plataforma social de leitura com estética **Dark Academia Moderna**, onde leitores compartilham reviews emocionais, organizam suas estantes, descobrem novos livros e conectam com leitores compatíveis.

---

## Telas

| Tela | Rota | Descrição |
|---|---|---|
| Onboarding | `/onboarding` | 5 etapas de personalização inicial |
| Feed | `/feed` | Timeline de reviews sociais |
| Descobrir | `/discover` | Busca por mood, tropes e gênero |
| Estantes | `/shelves` | Biblioteca pessoal (lendo / lido / quero ler) |
| Perfil | `/profile` | Identidade literária, badges e stats |
| Ficha do livro | `/books/:id` | Detalhes, sinopse, reviews e emoções |

---

## Instalação

```bash
# Clonar o repositório
git clone <repo-url>
cd wordwise

# Instalar dependências (recomendado: pnpm)
pnpm install

# Iniciar servidor de desenvolvimento
pnpm dev
```

O app abre em `http://localhost:5173`.

---

## Scripts

```bash
pnpm dev          # Servidor de desenvolvimento com HMR
pnpm build        # Build de produção em /dist
pnpm preview      # Preview do build de produção
pnpm type-check   # Verificação TypeScript sem emitir arquivos
pnpm lint         # ESLint
```

---

## Stack

- **React 18** + **TypeScript**
- **Vite 6** — build tool
- **Tailwind CSS v4** — estilização utility-first
- **shadcn/ui** (Radix UI) — componentes acessíveis
- **React Router DOM v7** — roteamento declarativo
- **Motion** — animações
- **React Hook Form** — formulários

Para detalhes completos de arquitetura, leia [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md).

---

## Identidade visual

Paleta Dark Academia:

| Cor | Hex |
|---|---|
| Ink Black | `#0a0807` |
| Deep Espresso | `#1a1210` |
| Antique Gold | `#c8a96e` |
| Literary Coral | `#e8635a` |
| Sage Wisdom | `#7c9e7a` |
| Midnight Blue | `#6a9fcf` |
| Violet Prose | `#b87cde` |

**Fontes:** Playfair Display (display) · DM Sans (corpo)

---

## Status

**Versão:** 1.0 — Protótipos completos  
**Data:** Abril 2026
