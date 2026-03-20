'use client'

import { useState } from 'react'
import { useAppStore } from '@/lib/app-store'
import { BookOpen, Target, CheckCircle2, ChevronRight, Lightbulb } from 'lucide-react'
import type { SubtopicData, SubtopicState } from '@/lib/types'

interface Props {
  subtopicData: SubtopicData
  subtopicState: SubtopicState
}

export default function ReadingStep({ subtopicData, subtopicState }: Props) {
  const [confirmed, setConfirmed] = useState(subtopicState.introRead)
  const setWizardStep = useAppStore((s) => s.setWizardStep)
  const markIntroRead = useAppStore((s) => s.markIntroRead)

  const handleContinue = () => {
    markIntroRead(subtopicState.id)
    setWizardStep(subtopicState.id, 'video')
  }

  return (
    <div className="space-y-6">
      {/* Title card */}
      <div className="rounded-2xl overflow-hidden shadow-sm" style={{ background: 'linear-gradient(135deg, #003257 0%, #4272BB 100%)' }}>
        <div className="p-8 md:p-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/90 text-xs font-semibold mb-4">
            <BookOpen className="w-3.5 h-3.5" />
            Lectura introductoria
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-white text-balance mb-4">
            {subtopicData.title}
          </h1>
          <p className="text-white/80 text-sm leading-relaxed max-w-2xl">
            {subtopicData.description}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main reading */}
        <div className="lg:col-span-2 space-y-6">
          {/* Intro text */}
          <div className="bg-white rounded-2xl border border-[#d3e2f0] p-6 md:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-xl bg-[#EEF4FB] flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-[#4272BB]" />
              </div>
              <h2 className="font-black text-[#003257] text-lg">Introducción</h2>
            </div>
            {subtopicData.introText.split('\n\n').map((para, i) => (
              <p key={i} className="text-[#1A2A36] text-sm leading-relaxed mb-4 last:mb-0">
                {para}
              </p>
            ))}
          </div>

          {/* Key ideas */}
          <div className="bg-white rounded-2xl border border-[#d3e2f0] p-6 md:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-xl bg-[#EEF4FB] flex items-center justify-center">
                <Lightbulb className="w-5 h-5 text-[#4272BB]" />
              </div>
              <h2 className="font-black text-[#003257] text-lg">Ideas clave</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {subtopicData.keyIdeas.map((idea, i) => (
                <div key={i} className="bg-[#F5F8FC] rounded-xl p-5 border border-[#d3e2f0]">
                  <div className="text-2xl mb-3">{idea.icon}</div>
                  <h3 className="font-bold text-[#003257] text-sm mb-2">{idea.title}</h3>
                  <p className="text-[#5a7a8e] text-xs leading-relaxed">{idea.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Objectives */}
          <div className="bg-white rounded-2xl border border-[#d3e2f0] p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, #003257, #4272BB)' }}>
                <Target className="w-5 h-5 text-white" />
              </div>
              <h2 className="font-black text-[#003257] text-base">Objetivos de aprendizaje</h2>
            </div>
            <ul className="space-y-3">
              {subtopicData.learningObjectives.map((obj, i) => (
                <li key={i} className="flex gap-3 text-xs text-[#1A2A36] leading-relaxed">
                  <div className="w-5 h-5 rounded-full bg-[#EEF4FB] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-[#4272BB] font-bold text-[10px]">{i + 1}</span>
                  </div>
                  {obj}
                </li>
              ))}
            </ul>
          </div>

          {/* Callout */}
          <div className="rounded-xl p-5 border border-[#D5247A]/20" style={{ background: 'linear-gradient(135deg, #fff0f6, #ffe4ef)' }}>
            <p className="text-[#D5247A] font-bold text-xs mb-2 uppercase tracking-wider">Reflexión</p>
            <p className="text-[#1A2A36] text-xs leading-relaxed">
              Al finalizar esta lectura, pensá en una situación real de tu vida digital donde estos conceptos puedan aplicarse.
            </p>
          </div>
        </div>
      </div>

      {/* Confirm & Continue */}
      <div className="bg-white rounded-2xl border-2 border-[#d3e2f0] p-6 shadow-sm">
        <label className="flex gap-4 cursor-pointer group">
          <div className="flex-shrink-0 mt-0.5">
            <div
              className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                confirmed ? 'bg-[#4272BB] border-[#4272BB]' : 'border-[#d3e2f0] bg-[#F5F8FC] group-hover:border-[#4272BB]'
              }`}
              onClick={() => setConfirmed((v) => !v)}
            >
              {confirmed && <CheckCircle2 className="w-4 h-4 text-white" />}
            </div>
          </div>
          <div onClick={() => setConfirmed((v) => !v)}>
            <p className="text-sm font-semibold text-[#1A2A36]">Confirmo que leí y comprendí este contenido.</p>
            <p className="text-xs text-[#5a7a8e] mt-0.5">Marcá esta casilla para habilitar el botón de continuar.</p>
          </div>
        </label>

        <div className="mt-5 flex justify-end">
          <button
            onClick={handleContinue}
            disabled={!confirmed}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all ${
              confirmed
                ? 'text-white hover:opacity-90 cursor-pointer'
                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
            }`}
            style={confirmed ? { background: 'linear-gradient(135deg, #003257, #4272BB)' } : {}}
          >
            Continuar al video
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
