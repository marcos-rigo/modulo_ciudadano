'use client'

import { useState } from 'react'
import { useAppStore } from '@/lib/app-store'
import { Video, CheckCircle2, ChevronRight, Lightbulb, Play } from 'lucide-react'
import type { SubtopicData, SubtopicState } from '@/lib/types'

interface Props {
  subtopicData: SubtopicData
  subtopicState: SubtopicState
}

export default function VideoStep({ subtopicData, subtopicState }: Props) {
  const [confirmed, setConfirmed] = useState(subtopicState.videoWatched)
  const setWizardStep = useAppStore((s) => s.setWizardStep)
  const markVideoWatched = useAppStore((s) => s.markVideoWatched)

  const handleContinue = () => {
    markVideoWatched(subtopicState.id)
    setWizardStep(subtopicState.id, 'podcast')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl overflow-hidden shadow-sm" style={{ background: 'linear-gradient(135deg, #1a2f42 0%, #003257 100%)' }}>
        <div className="p-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/90 text-xs font-semibold mb-4">
            <Video className="w-3.5 h-3.5" />
            Contenido audiovisual
          </div>
          <h1 className="text-2xl font-black text-white mb-2">{subtopicData.videoTitle}</h1>
          <p className="text-white/75 text-sm leading-relaxed">{subtopicData.videoDescription}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Video embed */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-2xl border border-[#d3e2f0] overflow-hidden shadow-sm">
            <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
              <iframe
                src={subtopicData.videoUrl}
                title={subtopicData.videoTitle}
                className="absolute inset-0 w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="p-5 border-t border-[#EEF4FB]">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center flex-shrink-0">
                  <Play className="w-4 h-4 text-red-500" />
                </div>
                <div>
                  <p className="font-bold text-[#003257] text-sm">{subtopicData.videoTitle}</p>
                  <p className="text-[#5a7a8e] text-xs mt-0.5">YouTube · Ciudadanía Digital para Tucumán</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tips sidebar */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-[#d3e2f0] p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center">
                <Lightbulb className="w-5 h-5 text-amber-500" />
              </div>
              <h2 className="font-black text-[#003257] text-base">Prestá atención a estas ideas clave</h2>
            </div>
            <ul className="space-y-3">
              {subtopicData.videoTips.map((tip, i) => (
                <li key={i} className="flex gap-3 text-xs text-[#1A2A36] leading-relaxed">
                  <div className="w-5 h-5 rounded-full bg-amber-50 flex items-center justify-center flex-shrink-0 mt-0.5 border border-amber-200">
                    <span className="text-amber-600 font-bold text-[10px]">{i + 1}</span>
                  </div>
                  {tip}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[#EEF4FB] rounded-xl p-5 border border-[#4272BB]/20">
            <p className="text-[#4272BB] font-bold text-xs mb-1.5 uppercase tracking-wider">Tip de aprendizaje</p>
            <p className="text-[#1A2A36] text-xs leading-relaxed">
              Tomá notas mientras mirás el video. Apuntar las ideas principales mejora significativamente la retención del contenido.
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
            <p className="text-sm font-semibold text-[#1A2A36]">Confirmo que visualicé el video.</p>
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
            Continuar al podcast
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
