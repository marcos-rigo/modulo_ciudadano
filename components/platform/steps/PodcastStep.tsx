'use client'

import { useState } from 'react'
import { useAppStore } from '@/lib/app-store'
import { Headphones, CheckCircle2, ChevronRight, Ear, Music } from 'lucide-react'
import type { SubtopicData, SubtopicState } from '@/lib/types'

interface Props {
  subtopicData: SubtopicData
  subtopicState: SubtopicState
}

export default function PodcastStep({ subtopicData, subtopicState }: Props) {
  const [confirmed, setConfirmed] = useState(subtopicState.podcastListened)
  const setWizardStep = useAppStore((s) => s.setWizardStep)
  const markPodcastListened = useAppStore((s) => s.markPodcastListened)

  const handleContinue = () => {
    markPodcastListened(subtopicState.id)
    setWizardStep(subtopicState.id, 'recommendations')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl overflow-hidden shadow-sm" style={{ background: 'linear-gradient(135deg, #1a1040 0%, #2d1b6e 100%)' }}>
        <div className="p-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/90 text-xs font-semibold mb-4">
            <Headphones className="w-3.5 h-3.5" />
            Contenido de audio
          </div>
          <h1 className="text-2xl font-black text-white mb-2">{subtopicData.podcastTitle}</h1>
          <p className="text-white/75 text-sm leading-relaxed">{subtopicData.podcastDescription}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Podcast player */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-2xl border border-[#d3e2f0] overflow-hidden shadow-sm">
            {/* Spotify embed */}
            <div className="p-2">
              <iframe
                src={subtopicData.podcastUrl}
                title={subtopicData.podcastTitle}
                width="100%"
                height="152"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="rounded-xl"
              />
            </div>
            <div className="px-6 py-5 border-t border-[#EEF4FB] flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: '#1DB954' }}>
                <Music className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="font-bold text-[#003257] text-sm">{subtopicData.podcastTitle}</p>
                <p className="text-[#5a7a8e] text-xs mt-0.5">Spotify Podcast · Ciudadanía Digital</p>
              </div>
            </div>
          </div>

          {/* Audio note */}
          <div className="bg-[#EEF4FB] rounded-xl p-5 border border-[#4272BB]/20">
            <p className="text-[#4272BB] font-bold text-xs mb-1.5 uppercase tracking-wider">Modo de escucha</p>
            <p className="text-[#1A2A36] text-xs leading-relaxed">
              Si el reproductor no está disponible en tu región, podés buscar el episodio directamente en Spotify o en tu aplicación de podcasts preferida con el título indicado.
            </p>
          </div>
        </div>

        {/* Active listening tips */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-[#d3e2f0] p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-purple-50 flex items-center justify-center">
                <Ear className="w-5 h-5 text-purple-500" />
              </div>
              <h2 className="font-black text-[#003257] text-base">Ideas para escuchar activamente</h2>
            </div>
            <ul className="space-y-3">
              {subtopicData.podcastTips.map((tip, i) => (
                <li key={i} className="flex gap-3 text-xs text-[#1A2A36] leading-relaxed">
                  <div className="w-5 h-5 rounded-full bg-purple-50 flex items-center justify-center flex-shrink-0 mt-0.5 border border-purple-200">
                    <span className="text-purple-600 font-bold text-[10px]">{i + 1}</span>
                  </div>
                  {tip}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl p-5 border border-[#D5247A]/20" style={{ background: 'linear-gradient(135deg, #fff0f6, #ffe4ef)' }}>
            <p className="text-[#D5247A] font-bold text-xs mb-1.5 uppercase tracking-wider">Reflexión</p>
            <p className="text-[#1A2A36] text-xs leading-relaxed">
              ¿Coincidís con los puntos de vista que presenta el episodio? Formarte una opinión crítica también es parte del aprendizaje.
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
            <p className="text-sm font-semibold text-[#1A2A36]">Confirmo que escuché el podcast.</p>
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
            Continuar a recursos recomendados
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
