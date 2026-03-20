'use client'

import { useAppStore } from '@/lib/app-store'
import { Trophy, CheckCircle2, XCircle, ArrowRight, RotateCcw, LayoutDashboard, Award } from 'lucide-react'
import type { SubtopicData, SubtopicState } from '@/lib/types'

interface Props {
    subtopicData: SubtopicData
    subtopicState: SubtopicState
}

export default function CompletionStep({ subtopicData, subtopicState }: Props) {
    const goToDashboard = useAppStore((s) => s.goToDashboard)
    const setWizardStep = useAppStore((s) => s.setWizardStep)
    const startSubtopic = useAppStore((s) => s.startSubtopic)
    const subtopics = useAppStore((s) => s.subtopics)

    const isPassed = subtopicState.passed
    const nextSubtopic = subtopics.find(s => s.id === subtopicState.id + 1)
    const isLastModule = subtopicState.id === 3 && isPassed

    const handleRetry = () => {
        setWizardStep(subtopicState.id, 'quiz')
    }

    return (
        <div className="max-w-2xl mx-auto py-8">
            <div className="bg-white rounded-[40px] border border-[#d3e2f0] p-10 md:p-16 shadow-2xl text-center relative overflow-hidden">
                {/* Success burst decoration */}
                {isPassed && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent" />
                )}

                <div className={`w-24 h-24 rounded-full mx-auto flex items-center justify-center mb-8 ${isPassed ? 'bg-green-100' : 'bg-red-100'}`}>
                    {isPassed ? (
                        <Trophy className="w-12 h-12 text-green-600" />
                    ) : (
                        <XCircle className="w-12 h-12 text-red-600" />
                    )}
                </div>

                <h1 className="text-3xl md:text-4xl font-black text-[#003257] mb-4">
                    {isPassed ? '¡Felicitaciones!' : 'Seguí intentando'}
                </h1>

                <p className="text-lg font-bold text-[#5a7a8e] mb-2">
                    Obtuviste <span className={isPassed ? 'text-green-600' : 'text-red-500'}>{subtopicState.score} de 10</span> puntos
                </p>

                <p className="text-[#5a7a8e] max-w-sm mx-auto leading-relaxed mb-10">
                    {isPassed
                        ? 'Aprobaste la evaluación de este subtema con éxito. ¡Estás más cerca de tu certificado!'
                        : 'Necesitás al menos 8 aciertos para aprobar. Revisá el material e intentalo de nuevo.'}
                </p>

                <div className="flex flex-col gap-3">
                    {isPassed ? (
                        <>
                            {nextSubtopic ? (
                                <button
                                    onClick={() => startSubtopic(nextSubtopic.id)}
                                    className="w-full flex items-center justify-center gap-2 px-8 py-5 bg-[#003257] hover:bg-[#004278] text-white font-black rounded-2xl transition-all shadow-lg active:scale-95"
                                >
                                    Continuar al siguiente subtema
                                    <ArrowRight className="w-5 h-5" />
                                </button>
                            ) : (
                                <button
                                    onClick={goToDashboard}
                                    className="w-full flex items-center justify-center gap-2 px-8 py-5 bg-[#D5247A] hover:bg-[#b91e67] text-white font-black rounded-2xl transition-all shadow-lg active:scale-95"
                                >
                                    <Award className="w-5 h-5" />
                                    Ir al panel y ver certificado
                                </button>
                            )}
                            <button
                                onClick={goToDashboard}
                                className="w-full flex items-center justify-center gap-2 px-8 py-4 text-[#5a7a8e] font-bold hover:text-[#003257] transition-all"
                            >
                                <LayoutDashboard className="w-4 h-4" />
                                Volver al panel por ahora
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={handleRetry}
                                className="w-full flex items-center justify-center gap-2 px-8 py-5 bg-[#003257] hover:bg-[#004278] text-white font-black rounded-2xl transition-all shadow-lg active:scale-95"
                            >
                                <RotateCcw className="w-5 h-5" />
                                Reintentar evaluación
                            </button>
                            <button
                                onClick={goToDashboard}
                                className="w-full flex items-center justify-center gap-2 px-8 py-4 text-[#5a7a8e] font-bold hover:text-[#003257] transition-all"
                            >
                                <LayoutDashboard className="w-4 h-4" />
                                Volver al panel
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
