'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { AppState, UserData, WizardStep, SubtopicStatus, SubtopicState } from './types'

interface ProgressData {
  screen:           AppState['screen']
  activeSubtopicId: number | null
  subtopics:        SubtopicState[]
}

interface AppStore extends AppState {
  registerUser:        (user: UserData) => void
  setScreen:           (screen: AppState['screen']) => void
  startSubtopic:       (id: number) => void
  setWizardStep:       (id: number, step: WizardStep) => void
  markIntroRead:       (id: number) => void
  markVideoWatched:    (id: number) => void
  markPodcastListened: (id: number) => void
  submitQuiz:          (id: number, score: number) => void
  goToDashboard:       () => void
  reset:               () => void
  loadProgress:        (progressData: ProgressData) => void
  syncProgress:        () => Promise<void>
}

const INITIAL_SUBTOPICS: SubtopicState[] = [
  { id: 1, status: 'in-progress', currentStep: 'intro', score: null, passed: false, introRead: false, videoWatched: false, podcastListened: false },
  { id: 2, status: 'locked',      currentStep: 'intro', score: null, passed: false, introRead: false, videoWatched: false, podcastListened: false },
  { id: 3, status: 'locked',      currentStep: 'intro', score: null, passed: false, introRead: false, videoWatched: false, podcastListened: false },
]

const DEV_USER: UserData = {
  id:       0,
  fullName: 'Usuario de Prueba',
  dni:      '12345678',
  email:    'test@test.com',
  consent:  true,
}

async function pushProgressSync(userId: number, state: Pick<AppState, 'screen' | 'activeSubtopicId' | 'subtopics'>) {
  console.log(`[syncProgress] → userId=${userId} screen=${state.screen}`)
  const res = await fetch('/api/progress/sync', {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userId,
      progressData: {
        screen:           state.screen,
        activeSubtopicId: state.activeSubtopicId,
        subtopics:        state.subtopics,
      },
    }),
  })
  if (!res.ok) {
    const text = await res.text()
    console.error(`[syncProgress] ✗ HTTP ${res.status}:`, text)
  } else {
    console.log(`[syncProgress] ✓ guardado en MySQL`)
  }
}

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      screen:          process.env.NODE_ENV === 'development' ? 'dashboard' : 'registration',
      user:            process.env.NODE_ENV === 'development' ? DEV_USER : null,
      activeSubtopicId: null,
      subtopics:       INITIAL_SUBTOPICS,

      registerUser: (user) => set({ user, screen: 'dashboard' }),

      setScreen: (screen) => set({ screen }),

      startSubtopic: (id) => {
        const st = get().subtopics.find((s) => s.id === id)
        if (!st || st.status === 'locked') return
        set({ activeSubtopicId: id, screen: 'wizard' })
      },

      setWizardStep: (id, step) => {
        set((state) => ({
          subtopics: state.subtopics.map((s) =>
            s.id === id ? { ...s, currentStep: step } : s
          ),
        }))
        get().syncProgress().catch(() => {})
      },

      markIntroRead: (id) =>
        set((state) => ({
          subtopics: state.subtopics.map((s) =>
            s.id === id ? { ...s, introRead: true } : s
          ),
        })),

      markVideoWatched: (id) =>
        set((state) => ({
          subtopics: state.subtopics.map((s) =>
            s.id === id ? { ...s, videoWatched: true } : s
          ),
        })),

      markPodcastListened: (id) =>
        set((state) => ({
          subtopics: state.subtopics.map((s) =>
            s.id === id ? { ...s, podcastListened: true } : s
          ),
        })),

      submitQuiz: (id, score) => {
        const passed = score >= 8
        set((state) => {
          const newSubtopics = state.subtopics.map((s) => {
            if (s.id === id) {
              return {
                ...s,
                score,
                passed,
                status: passed ? ('completed' as SubtopicStatus) : s.status,
                currentStep: 'result' as WizardStep,
              }
            }
            if (passed && s.id === id + 1) {
              return { ...s, status: 'in-progress' as SubtopicStatus }
            }
            return s
          })
          return { subtopics: newSubtopics }
        })
        get().syncProgress().catch(() => {})
      },

      goToDashboard: () => {
        const allPassed = get().subtopics.every((s) => s.passed)
        set({ screen: allPassed ? 'certificate' : 'dashboard', activeSubtopicId: null })
        get().syncProgress().catch(() => {})
      },

      reset: () => {
        // Solo limpiamos el estado local. El progreso en MySQL se preserva
        // para que el usuario lo recupere en el próximo login.
        set({
          screen:           'registration',
          user:             null,
          activeSubtopicId: null,
          subtopics:        INITIAL_SUBTOPICS,
        })
      },

      loadProgress: (progressData) =>
        set({
          screen:           progressData.screen === 'certificate' ? 'certificate' : 'dashboard',
          activeSubtopicId: progressData.activeSubtopicId,
          subtopics:        progressData.subtopics,
        }),

      syncProgress: async () => {
        const state = get()
        const userId = state.user?.id
        if (!userId || userId === 0) {
          console.warn('[syncProgress] omitido — sin usuario logueado')
          return
        }
        await pushProgressSync(userId, state)
      },
    }),
    {
      name: 'ciudadania-digital-state',
      ...(process.env.NODE_ENV === 'development' && {
        storage: {
          getItem:    () => null,
          setItem:    () => {},
          removeItem: () => {},
        },
      }),
    }
  )
)
