'use client'

import { useAppStore } from '@/lib/app-store'
import { SUBTOPICS_DATA } from '@/lib/mock-data'
import { Shield, ArrowLeft, BookOpen, Video, Headphones, Star, HelpCircle, Trophy } from 'lucide-react'
import type { WizardStep } from '@/lib/types'
import ReadingStep from './steps/ReadingStep'
import VideoStep from './steps/VideoStep'
import PodcastStep from './steps/PodcastStep'
import RecommendationsStep from './steps/RecommendationsStep'
import QuizStep from './steps/QuizStep'
import CompletionStep from './steps/CompletionStep'

const STEPS: { key: WizardStep; label: string; icon: React.ElementType }[] = [
  { key: 'intro',           label: 'Lectura',    icon: BookOpen    },
  { key: 'video',           label: 'Video',      icon: Video       },
  { key: 'podcast',         label: 'Podcast',    icon: Headphones  },
  { key: 'recommendations', label: 'Recursos',   icon: Star        },
  { key: 'quiz',            label: 'Evaluación', icon: HelpCircle  },
  { key: 'result',          label: 'Resultado',  icon: Trophy      },
]

export default function WizardLayout() {
  const activeSubtopicId = useAppStore((s) => s.activeSubtopicId)
  const subtopics        = useAppStore((s) => s.subtopics)
  const goToDashboard    = useAppStore((s) => s.goToDashboard)
  const setWizardStep    = useAppStore((s) => s.setWizardStep) // NUEVO: Importamos setWizardStep

  if (!activeSubtopicId) return null

  const subtopicState = subtopics.find((s) => s.id === activeSubtopicId)
  const dataIdx       = activeSubtopicId - 1
  const subtopicData  = SUBTOPICS_DATA[dataIdx]

  if (!subtopicState || !subtopicData) return null

  const currentStepIdx = STEPS.findIndex((s) => s.key === subtopicState.currentStep)

  // NUEVO: Lógica de bloqueo
  // Verificamos si estamos en un paso donde está prohibido retroceder
  const isLockedBackwards = subtopicState.currentStep === 'quiz' || subtopicState.currentStep === 'result'
  
  // Se puede volver atrás si no es el primer paso y no está en los pasos bloqueados
  const canGoBack = currentStepIdx > 0 && !isLockedBackwards

  const handleGoBack = () => {
    if (canGoBack) {
      setWizardStep(subtopicState.id, STEPS[currentStepIdx - 1].key)
    }
  }

  return (
    <div className="min-h-screen bg-[#F5F8FC] flex flex-col">

      {/* ── Top header ─────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 bg-[#003257] shadow-lg">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-13 sm:h-14 flex items-center gap-3">
          <button
            onClick={goToDashboard}
            className="flex items-center gap-1.5 text-white/70 hover:text-white transition-colors text-xs sm:text-sm font-medium flex-shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Panel</span>
          </button>

          <div className="w-px h-5 bg-white/20 flex-shrink-0" />

          <div className="flex items-center gap-2 flex-1 min-w-0">
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-white/10 flex items-center justify-center border border-white/20 flex-shrink-0">
              <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
            </div>
            <div className="min-w-0">
              <p className="text-white/50 text-[10px] leading-none hidden sm:block">Dimensión Cognitiva</p>
              <p className="text-white font-bold text-xs sm:text-sm truncate">{subtopicData.title}</p>
            </div>
          </div>

          <span className="text-white/60 text-[11px] sm:text-xs font-medium flex-shrink-0">
            Subtema {activeSubtopicId}/3
          </span>
        </div>

        {/* ── Step progress bar ── */}
        <div className="bg-[#002848]">
          <div className="max-w-5xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="flex">
              {STEPS.map((step, idx) => {
                const Icon      = step.icon
                const isDone    = idx < currentStepIdx
                const isCurrent = idx === currentStepIdx
                const isFuture  = idx > currentStepIdx
                
                // NUEVO: Permitir hacer clic en los pasos previos a través de la barra superior (si no estamos en quiz)
                const isClickable = isDone && !isLockedBackwards

                return (
                  <div
                    key={step.key}
                    onClick={() => {
                      if (isClickable) setWizardStep(subtopicState.id, step.key)
                    }}
                    className={`flex-1 flex flex-col items-center py-2 sm:py-2.5 gap-0.5 relative transition-all ${isFuture ? 'opacity-30' : ''} ${isClickable ? 'cursor-pointer hover:opacity-80' : ''}`}
                  >
                    {/* Connector */}
                    {idx < STEPS.length - 1 && (
                      <div className={`absolute top-[14px] sm:top-[16px] left-1/2 w-full h-0.5 ${isDone ? 'bg-[#4272BB]' : 'bg-white/10'}`} />
                    )}
                    <div className={[
                      'relative z-10 w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center border-2 transition-all',
                      isDone    ? 'bg-[#4272BB] border-[#4272BB]'
                        : isCurrent ? 'bg-[#D5247A] border-[#D5247A]'
                        : 'bg-transparent border-white/20',
                    ].join(' ')}>
                      <Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" />
                    </div>
                    <span className="text-white/60 text-[9px] sm:text-[10px] font-medium hidden sm:block">{step.label}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </header>

      {/* ── Content ──────────────────────────────────────────────────────────── */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-5 sm:py-6 lg:py-8">
        
        {/* NUEVO: Botón explícito para volver atrás */}
        {canGoBack && (
          <button
            onClick={handleGoBack}
            className="mb-6 flex items-center gap-2 text-sm font-semibold text-[#4272BB] hover:text-[#003257] transition-colors bg-white px-4 py-2 rounded-xl border border-[#d3e2f0] shadow-sm w-fit"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver para repasar
          </button>
        )}

        {subtopicState.currentStep === 'intro'           && <ReadingStep         subtopicData={subtopicData} subtopicState={subtopicState} />}
        {subtopicState.currentStep === 'video'           && <VideoStep           subtopicData={subtopicData} subtopicState={subtopicState} />}
        {subtopicState.currentStep === 'podcast'         && <PodcastStep         subtopicData={subtopicData} subtopicState={subtopicState} />}
        {subtopicState.currentStep === 'recommendations' && <RecommendationsStep subtopicData={subtopicData} subtopicState={subtopicState} />}
        {subtopicState.currentStep === 'quiz'            && <QuizStep            subtopicData={subtopicData} subtopicState={subtopicState} />}
        {subtopicState.currentStep === 'result'          && <CompletionStep      subtopicData={subtopicData} subtopicState={subtopicState} />}
      </main>
    </div>
  )
}
