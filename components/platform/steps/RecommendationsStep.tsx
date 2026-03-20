'use client'

import { useAppStore } from '@/lib/app-store'
import { Star, ExternalLink, ChevronRight, FileText, Play, Activity } from 'lucide-react'
import type { SubtopicData, SubtopicState } from '@/lib/types'

interface Props {
    subtopicData: SubtopicData
    subtopicState: SubtopicState
}

export default function RecommendationsStep({ subtopicData, subtopicState }: Props) {
    const setWizardStep = useAppStore((s) => s.setWizardStep)

    const handleContinue = () => {
        setWizardStep(subtopicState.id, 'quiz')
    }

    const getTypeIcon = (type: string) => {
        switch (type.toLowerCase()) {
            case 'artículo':
            case 'guía':
                return <FileText className="w-5 h-5" />
            case 'video':
            case 'documental':
                return <Play className="w-5 h-5" />
            case 'actividad':
                return <Activity className="w-5 h-5" />
            default:
                return <Star className="w-5 h-5" />
        }
    }

    return (
        <div className="space-y-6">
            <div className="rounded-2xl overflow-hidden shadow-sm" style={{ background: 'linear-gradient(135deg, #003257 0%, #4272BB 100%)' }}>
                <div className="p-8 md:p-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/90 text-xs font-semibold mb-4">
                        <Star className="w-3.5 h-3.5" />
                        Recursos recomendados
                    </div>
                    <h1 className="text-2xl md:text-3xl font-black text-white text-balance mb-4">
                        Para seguir profundizando
                    </h1>
                    <p className="text-white/80 text-sm leading-relaxed max-w-2xl">
                        Explorá estos materiales adicionales para reforzar lo aprendido y conocer más sobre el tema.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {subtopicData.recommendations.map((rec) => (
                    <div key={rec.id} className="bg-white rounded-2xl border border-[#d3e2f0] p-6 shadow-sm flex flex-col">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-[#EEF4FB] flex items-center justify-center text-[#4272BB]">
                                {getTypeIcon(rec.type)}
                            </div>
                            <div>
                                <span className="text-[10px] font-bold uppercase tracking-wider text-[#4272BB]">{rec.type}</span>
                                <h3 className="font-black text-[#003257] text-sm leading-tight">{rec.title}</h3>
                            </div>
                        </div>
                        <p className="text-[#5a7a8e] text-xs leading-relaxed mb-6 flex-1">
                            {rec.description}
                        </p>
                        {rec.ctaUrl && (
                            <a
                                href={rec.ctaUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-auto inline-flex items-center gap-2 text-[#4272BB] text-xs font-bold hover:underline"
                            >
                                {rec.ctaLabel || 'Ver recurso'}
                                <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                        )}
                        {!rec.ctaUrl && rec.ctaLabel && (
                            <div className="mt-auto text-[#4272BB] text-xs font-bold opacity-60">
                                {rec.ctaLabel}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-2xl border-2 border-[#d3e2f0] p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                    <p className="text-sm font-semibold text-[#1A2A36]">¿Listo/a para la evaluación?</p>
                    <p className="text-xs text-[#5a7a8e] mt-0.5">Completá el quiz de 10 preguntas para finalizar este subtema.</p>
                </div>
                <button
                    onClick={handleContinue}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 rounded-xl font-bold text-sm text-white transition-all hover:opacity-90 shadow-md"
                    style={{ background: 'linear-gradient(135deg, #D5247A, #b91e67)' }}
                >
                    Iniciar Evaluación
                    <ChevronRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    )
}
