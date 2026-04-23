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
| `/modulos` | Landing page — grid of available/upcoming civic modules |
| `/` | Login/Register page (mode controlled via `?mode=login` or `?mode=register`) |
| `/dashboard/inicio` | Main dashboard (authenticated users) |

Navigation is done via `useRouter` from `next/navigation`. The `/modulos` page checks `useAppStore.getState().screen` to decide whether to redirect to `/dashboard/inicio` or `/` (login).

### State Management

All app state lives in a **Zustand** store with `persist` middleware (`lib/app-store.ts`). The persistence key is `'ciudadania-digital-state'` (localStorage).

Key state shape (defined in `lib/types.ts`):
- `screen`: `'registration' | 'dashboard' | 'wizard' | 'certificate'`
- `user`: `UserData | null`
- `activeSubtopicId`: which subtopic is currently open in the wizard
- `subtopics`: array of `SubtopicState` (status, currentStep, score, flags)

**Note:** `app-store.ts` currently has the initial state hardcoded to `screen: 'dashboard'` with a test user — this is a dev convenience, not production state.

### Learning Wizard Flow

Each subtopic progresses through a sequential wizard with these steps (`WizardStep` type):

`intro` → `video` → `podcast` → `recommendations` → `quiz` → `result`

- Steps are rendered by `components/platform/WizardLayout.tsx` which switches on `subtopicState.currentStep`
- Each step is its own component in `components/platform/steps/`
- Backward navigation is blocked once the user reaches `quiz` or `result`
- A subtopic is `passed` when `score >= 8`; passing unlocks the next subtopic (`id + 1`)
- After all subtopics pass, `goToDashboard()` transitions to `screen: 'certificate'`

### Content Data

All subtopic content (text, video URLs, podcast URLs, quiz questions, recommendations) is hardcoded in `lib/mock-data.ts` as `SUBTOPICS_DATA: SubtopicData[]`. There are 3 subtopics. This is static data — no API calls.

### Firebase

`lib/firebase.ts` initializes Firebase Auth and Firestore via env vars (`NEXT_PUBLIC_FIREBASE_*`). `lib/firebase-auth.ts` contains auth helpers. Firebase is initialized but may not be fully wired into all flows.

### UI Components

`components/ui/` is a full shadcn/ui component library (Radix UI primitives + Tailwind). Custom platform components live in `components/platform/`.

### Styling

Tailwind CSS v4 with a custom color palette:
- Primary dark blue: `#003257`
- Accent blue: `#4272BB`
- Accent pink: `#D5247A`
- Background: `#F5F8FC`

Fonts: Roboto (headings/body) and Inter, loaded via `next/font/google`.
