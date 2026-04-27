# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev       # Start dev server (Next.js)
pnpm build     # Production build (TypeScript errors are ignored — see next.config.mjs)
pnpm start     # Run production build
pnpm lint      # ESLint
```

Package manager is **pnpm** (pnpm-lock.yaml present).

## Architecture

This is a **Next.js 16 + React 19** app using the App Router. It's an educational civic platform ("Ciudadanía Digital") for the province of Tucumán.

### Routing

| Route | Description |
|---|---|
| `/modulos` | Public marketing landing page — grid of available/upcoming civic modules |
| `/` | Login/Register page (mode via `?mode=login` or `?mode=register`) |
| `/dashboard/inicio` | Main dashboard — renders `Dashboard`, `WizardLayout`, or `Certificate` based on Zustand `screen` |
| `/api/auth/register` | POST — register user in MySQL |
| `/api/auth/login` | POST — login + returns progress data |
| `/api/auth/reset-password` | POST — request or confirm password reset |
| `/api/progress/sync` | POST — persist wizard progress to MySQL |

### State Management

All UI state lives in a **Zustand** store (`lib/app-store.ts`) with `persist` middleware (key: `'ciudadania-digital-state'`, localStorage).

Key state shape (defined in `lib/types.ts`):
- `screen`: `'registration' | 'dashboard' | 'wizard' | 'certificate'`
- `user`: `UserData | null` — includes `id: number` (MySQL primary key)
- `activeSubtopicId`: which subtopic is open in the wizard
- `subtopics`: array of `SubtopicState` (status, currentStep, score, flags)

**Dev mode:** When `NODE_ENV === 'development'`, the store ignores localStorage and always starts with a test user on `screen: 'dashboard'`. No login required to access the wizard. In production, localStorage is used normally and login is enforced.

### Auth & Database

**Backend:** MySQL on Hostinger (`srv884.hstgr.io`). No Firebase — it has been fully removed.

**DB layer:** `lib/db.ts` exposes a `query<T>()` helper backed by a `mysql2` connection pool. All queries use `?` placeholders (never string concatenation).

**Auth logic:** `lib/mysql-auth.ts` contains:
- `registerUser()` — bcrypt hash + INSERT into `usuarios`, `estado_usuario`, `progreso_subtemas`
- `loginUser()` — bcrypt compare + returns `{ user, progress }` for store hydration
- `getUserProgress()` / `updateProgress()` — read/write `estado_usuario` + `progreso_subtemas`
- `resetPasswordRequest()` / `resetPasswordConfirm()` — token-based reset via `password_resets` table

**DB schema:** `schema.sql` at project root. Run it once in phpMyAdmin. See `DATABASE_SETUP.md` for step-by-step instructions including Vercel IP allowlist for Hostinger MySQL remote access.

**Auth flow in the frontend:** `RegistrationForm.tsx` calls `/api/auth/login` or `/api/auth/register` via `fetch`. On successful login, the response `{ user, progress }` is loaded into Zustand with `registerUser()` + `loadProgress()`.

### Progress Sync

Every time the user advances a wizard step or submits a quiz, `syncProgress()` (a Zustand action) calls `POST /api/progress/sync` fire-and-forget. If the call fails, the UI is not blocked — localStorage acts as fallback.

Sync is triggered from store actions: `setWizardStep`, `submitQuiz`, `goToDashboard`. `reset()` sends a final sync to restore the user to initial state in MySQL.

`fullName` is stored as `"Apellido, Nombre"` (last name first). The Dashboard greeting splits on `', '` to extract the first name.

### Learning Wizard Flow

Each subtopic progresses through a sequential wizard:

`intro` → `video` → `podcast` → `recommendations` → `quiz` → `result`

Steps map to components in `components/platform/steps/`:
- `intro` → `ReadingStep`
- `video` → `VideoStep`
- `podcast` → `PodcastStep`
- `recommendations` → `RecommendationsStep`
- `quiz` → `QuizStep`
- `result` → `CompletionStep`

`WizardLayout.tsx` handles navigation. Backward navigation is blocked at `quiz` and `result`. A subtopic is `passed` when `score >= 8`; passing unlocks the next subtopic (`id + 1`). When all subtopics pass, `goToDashboard()` transitions to `screen: 'certificate'`.

### Content Data

All subtopic content (text, video URLs, podcast URLs, quiz questions, recommendations) is hardcoded in `lib/mock-data.ts` as `SUBTOPICS_DATA: SubtopicData[]`. There are 3 subtopics. This is static data — no API calls for content.

### UI Components

`components/ui/` is a full shadcn/ui component library (Radix UI primitives + Tailwind). Custom platform components live in `components/platform/`.

### Styling

Tailwind CSS v4 with a custom color palette:
- Primary dark blue: `#003257`
- Accent blue: `#4272BB`
- Accent pink: `#D5247A`
- Background: `#F5F8FC`

Fonts: Roboto (headings/body) and Inter, loaded via `next/font/google`.
