'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { AppState, UserData, WizardStep, SubtopicStatus } from './types'

interface AppStore extends AppState {
  // Actions
  registerUser: (user: UserData) => void
  setScreen: (screen: AppState['screen']) => void
  startSubtopic: (id: number) => void
  setWizardStep: (id: number, step: WizardStep) => void
  markIntroRead: (id: number) => void
  markVideoWatched: (id: number) => void
  markPodcastListened: (id: number) => void
  submitQuiz: (id: number, score: number) => void
  goToDashboard: () => void
  reset: () => void
}

const initialSubtopics = [
  { id: 1, status: 'in-progress' as SubtopicStatus, currentStep: 'intro' as WizardStep, score: null, passed: false, introRead: false, videoWatched: false, podcastListened: false },
  { id: 2, status: 'locked' as SubtopicStatus, currentStep: 'intro' as WizardStep, score: null, passed: false, introRead: false, videoWatched: false, podcastListened: false },
  { id: 3, status: 'locked' as SubtopicStatus, currentStep: 'intro' as WizardStep, score: null, passed: false, introRead: false, videoWatched: false, podcastListened: false },
]

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      //screen: 'registration',
      screen: 'dashboard',
      //user: null,
      user: { 
  fullName: 'Usuario de Prueba', 
  dni: '12345678', 
  email: 'test@test.com' 
} as UserData,
      activeSubtopicId: null,
      subtopics: initialSubtopics,

      registerUser: (user) => set({ user, screen: 'dashboard' }),

      setScreen: (screen) => set({ screen }),

      startSubtopic: (id) => {
        const st = get().subtopics.find((s) => s.id === id)
        if (!st || st.status === 'locked') return
        set({ activeSubtopicId: id, screen: 'wizard' })
      },

      setWizardStep: (id, step) =>
        set((state) => ({
          subtopics: state.subtopics.map((s) =>
            s.id === id ? { ...s, currentStep: step } : s
          ),
        })),

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
            // Unlock next subtopic if this one passed
            if (passed && s.id === id + 1) {
              return { ...s, status: 'in-progress' as SubtopicStatus }
            }
            return s
          })
          return { subtopics: newSubtopics }
        })
      },

      goToDashboard: () => {
        const allPassed = get().subtopics.every((s) => s.passed)
        set({ screen: allPassed ? 'certificate' : 'dashboard', activeSubtopicId: null })
      },

      reset: () =>
        set({
          screen: 'registration',
          user: null,
          activeSubtopicId: null,
          subtopics: initialSubtopics,
        }),
    }),
    {
      name: 'ciudadania-digital-state',
    }
  )
)
