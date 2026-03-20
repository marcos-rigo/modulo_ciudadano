export interface UserData {
  fullName: string
  email: string
  dni: string
  consent: boolean
}

export type SubtopicStatus = 'locked' | 'in-progress' | 'completed'
export type WizardStep = 'intro' | 'video' | 'podcast' | 'recommendations' | 'quiz' | 'result'

export interface QuizQuestion {
  id: number
  question: string
  options: string[]
  correctIndex: number
}

export interface Recommendation {
  id: number
  title: string
  type: 'Artículo' | 'Documental' | 'Actividad' | 'Ejemplo' | 'Recurso'
  description: string
  ctaLabel?: string
  ctaUrl?: string
}

export interface SubtopicData {
  id: number
  title: string
  description: string
  introText: string
  learningObjectives: string[]
  keyIdeas: { icon: string; title: string; description: string }[]
  videoUrl: string
  videoTitle: string
  videoDescription: string
  videoTips: string[]
  podcastUrl: string
  podcastTitle: string
  podcastDescription: string
  podcastTips: string[]
  recommendations: Recommendation[]
  quizQuestions: QuizQuestion[]
}

export interface SubtopicState {
  id: number
  status: SubtopicStatus
  currentStep: WizardStep
  score: number | null
  passed: boolean
  // step completion flags
  introRead: boolean
  videoWatched: boolean
  podcastListened: boolean
}

export interface AppState {
  screen: 'registration' | 'dashboard' | 'wizard' | 'certificate'
  user: UserData | null
  activeSubtopicId: number | null
  subtopics: SubtopicState[]
}
