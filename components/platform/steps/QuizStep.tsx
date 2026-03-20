'use client'

import { useState } from 'react'
import { useAppStore } from '@/lib/app-store'
import { HelpCircle, ChevronRight, CheckCircle2, XCircle, ArrowLeft, ArrowRight } from 'lucide-react'
import type { SubtopicData, SubtopicState } from '@/lib/types'

interface Props {
    subtopicData: SubtopicData
    subtopicState: SubtopicState
}

export default function QuizStep({ subtopicData, subtopicState }: Props) {
    const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0)
    const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>(new Array(10).fill(null))
    const [showResults, setShowResults] = useState(false)

    const submitQuiz = useAppStore((s) => s.submitQuiz)

    const currentQuestion = subtopicData.quizQuestions[currentQuestionIdx]

    const handleSelectAnswer = (idx: number) => {
        if (showResults) return
        const newAnswers = [...selectedAnswers]
        newAnswers[currentQuestionIdx] = idx
        setSelectedAnswers(newAnswers)
    }

    const handleNext = () => {
        if (currentQuestionIdx < 9) {
            setCurrentQuestionIdx(currentQuestionIdx + 1)
        } else {
            const score = selectedAnswers.reduce((acc, ans, idx) => {
                return acc + (ans === subtopicData.quizQuestions[idx].correctIndex ? 1 : 0)
            }, 0)
            submitQuiz(subtopicState.id, score)
        }
    }

    const handlePrev = () => {
        if (currentQuestionIdx > 0) {
            setCurrentQuestionIdx(currentQuestionIdx - 1)
        }
    }

    const isLastQuestion = currentQuestionIdx === 9
    const canContinue = selectedAnswers[currentQuestionIdx] !== null

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white rounded-3xl border border-[#d3e2f0] overflow-hidden shadow-lg">
                {/* Progress header */}
                <div className="bg-[#003257] px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <HelpCircle className="w-5 h-5 text-white/70" />
                        <h2 className="text-white font-bold text-sm">Evaluación</h2>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex gap-1">
                            {selectedAnswers.map((ans, i) => (
                                <div
                                    key={i}
                                    className={`w-2 h-2 rounded-full transition-all ${i === currentQuestionIdx
                                            ? 'bg-[#D5247A] w-6'
                                            : ans !== null ? 'bg-[#4272BB]' : 'bg-white/20'
                                        }`}
                                />
                            ))}
                        </div>
                        <span className="text-white/70 text-xs font-mono">{currentQuestionIdx + 1}/10</span>
                    </div>
                </div>

                <div className="p-8 md:p-10">
                    <p className="text-[#5a7a8e] text-xs font-bold uppercase tracking-widest mb-2">Pregunta {currentQuestionIdx + 1}</p>
                    <h3 className="text-xl md:text-2xl font-black text-[#003257] leading-tight mb-8">
                        {currentQuestion.question}
                    </h3>

                    <div className="space-y-3">
                        {currentQuestion.options.map((option, idx) => {
                            const isSelected = selectedAnswers[currentQuestionIdx] === idx
                            return (
                                <button
                                    key={idx}
                                    onClick={() => handleSelectAnswer(idx)}
                                    className={`w-full text-left p-5 rounded-2xl border-2 transition-all flex items-center gap-4 group ${isSelected
                                            ? 'border-[#4272BB] bg-[#EEF4FB]'
                                            : 'border-[#d3e2f0] hover:border-[#4272BB]/50 bg-white'
                                        }`}
                                >
                                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${isSelected ? 'border-[#4272BB] bg-[#4272BB]' : 'border-[#d3e2f0]'
                                        }`}>
                                        {isSelected && <div className="w-2 h-2 bg-white rounded-full" />}
                                    </div>
                                    <span className={`text-sm md:text-base font-semibold ${isSelected ? 'text-[#003257]' : 'text-[#1A2A36]'}`}>
                                        {option}
                                    </span>
                                </button>
                            )
                        })}
                    </div>
                </div>

                <div className="px-8 pb-10 flex items-center justify-between">
                    <button
                        onClick={handlePrev}
                        disabled={currentQuestionIdx === 0}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all ${currentQuestionIdx === 0 ? 'opacity-0 pointer-events-none' : 'text-[#5a7a8e] hover:text-[#003257]'
                            }`}
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Anterior
                    </button>

                    <button
                        onClick={handleNext}
                        disabled={!canContinue}
                        className={`flex items-center gap-2 px-8 py-4 rounded-2xl font-black text-sm transition-all shadow-md ${canContinue
                                ? 'text-white hover:opacity-90 active:scale-95'
                                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                            }`}
                        style={canContinue ? { background: 'linear-gradient(135deg, #003257, #4272BB)' } : {}}
                    >
                        {isLastQuestion ? 'Finalizar Evaluación' : 'Siguiente pregunta'}
                        {isLastQuestion ? <CheckCircle2 className="w-4 h-4 ml-1" /> : <ArrowRight className="w-4 h-4 ml-1" />}
                    </button>
                </div>
            </div>

            <div className="text-center italic text-[#5a7a8e] text-xs">
                Necesitás 8/10 respuestas correctas para aprobar este subtema.
            </div>
        </div>
    )
}
