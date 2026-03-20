'use client'

import { useAppStore } from '@/lib/app-store'
import { SUBTOPICS_DATA } from '@/lib/mock-data'
import { Shield, Lock, CheckCircle2, Circle, ChevronRight, Award, Brain, LogOut } from 'lucide-react'
import type { SubtopicStatus } from '@/lib/types'

const STATUS_CONFIG = {
  locked: {
    label: 'Bloqueado',
    icon: Lock,
    badgeClass: 'bg-slate-100 text-slate-500',
    borderClass: 'border-slate-200',
    btnClass: 'bg-slate-200 text-slate-400 cursor-not-allowed',
    btnLabel: 'Bloqueado',
  },
  'in-progress': {
    label: 'En progreso',
    icon: Circle,
    badgeClass: 'bg-[#EEF4FB] text-[#4272BB]',
    borderClass: 'border-[#4272BB]/30',
    btnClass: 'bg-[#003257] text-white hover:bg-[#004278] cursor-pointer',
    btnLabel: 'Continuar',
  },
  completed: {
    label: 'Completado',
    icon: CheckCircle2,
    badgeClass: 'bg-green-50 text-green-600',
    borderClass: 'border-green-200',
    btnClass: 'bg-green-50 text-green-600 cursor-pointer hover:bg-green-100',
    btnLabel: 'Revisar',
  },
}

export default function Dashboard() {
  const user         = useAppStore((s) => s.user)
  const subtopics    = useAppStore((s) => s.subtopics)
  const startSubtopic = useAppStore((s) => s.startSubtopic)
  const setScreen    = useAppStore((s) => s.setScreen)
  const reset        = useAppStore((s) => s.reset)

  const allCompleted   = subtopics.every((s) => s.passed)
  const completedCount = subtopics.filter((s) => s.passed).length

  return (
    <div className="min-h-screen bg-[#F5F8FC]">

      {/* ── Top bar ──────────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 bg-[#003257] shadow-lg">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-3">

         {/* Brand */}
          <div className="flex items-center gap-2 min-w-0">
            <a href="https://josefarhat.com/" rel="noopener noreferrer" className="flex-shrink-0 hover:opacity-80 transition-opacity">
              <img src="/logo/marcaJFb.png" alt="José Farhat" className="h-6 sm:h-8 w-auto object-contain" />
            </a>
            <span className="hidden sm:inline text-sm font-black text-[#D5247A] whitespace-nowrap">
              - Ciudadanía Presente
            </span>
          </div>

          {/* Progress bar — md+ */}
          <div className="hidden md:flex items-center gap-3 flex-1 max-w-[260px] mx-4">
            <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#D5247A] rounded-full transition-all duration-700"
                style={{ width: `${(completedCount / 3) * 100}%` }}
              />
            </div>
            <span className="text-white/70 text-xs font-medium whitespace-nowrap">{completedCount}/3</span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {allCompleted && (
              <button
                onClick={() => setScreen('certificate')}
                className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-[#D5247A] text-white text-xs sm:text-sm font-bold hover:bg-[#b91e67] transition-colors"
              >
                <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Ver certificado</span>
                <span className="sm:hidden">Cert.</span>
              </button>
            )}
            <button
              onClick={reset}
              className="flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl bg-white/10 text-white/70 text-xs hover:bg-white/20 transition-colors border border-white/20"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Salir</span>
            </button>
          </div>
        </div>

        {/* Mobile progress */}
        <div className="md:hidden px-4 pb-2">
          <div className="flex items-center gap-2">
            <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-[#D5247A] rounded-full transition-all duration-700" style={{ width: `${(completedCount / 3) * 100}%` }} />
            </div>
            <span className="text-white/60 text-[11px]">{completedCount}/3 completados</span>
          </div>
        </div>
      </header>

      {/* ── Main ─────────────────────────────────────────────────────────────── */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">

        {/* Welcome */}
        <div className="mb-6 sm:mb-8 lg:mb-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="text-[#4272BB] font-semibold text-xs sm:text-sm mb-1">¡Bienvenido/a al recorrido formativo!</p>
              <h1 className="text-2xl sm:text-3xl font-black text-[#003257]">
                Hola, {user?.fullName.split(', ')[1] || user?.fullName.split(' ')[0] || 'Usuario'}
              </h1>
              <p className="text-[#5a7a8e] mt-1 text-sm">
                Completá los tres subtemas para obtener tu certificado.
              </p>
            </div>
            <div className="flex gap-3">
              {[
                { value: completedCount, label: 'completados' },
                { value: 3 - completedCount, label: 'restantes' },
              ].map(stat => (
                <div key={stat.label} className="bg-white rounded-2xl border border-[#d3e2f0] px-4 sm:px-5 py-3 sm:py-4 text-center shadow-sm min-w-[72px]">
                  <p className="text-xl sm:text-2xl font-black text-[#003257]">{stat.value}</p>
                  <p className="text-[#5a7a8e] text-xs">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Module breadcrumb */}
        <div className="bg-white border border-[#d3e2f0] rounded-2xl p-4 sm:p-5 mb-5 sm:mb-6 flex items-center gap-3 sm:gap-4 shadow-sm">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg,#003257,#4272BB)' }}>
            <Brain className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[10px] sm:text-xs text-[#5a7a8e] font-medium uppercase tracking-wider">Módulo actual</p>
            <p className="font-black text-[#003257] text-base sm:text-lg leading-tight">Ciudadanía Digital</p>
            <p className="text-[#4272BB] text-xs sm:text-sm font-semibold">Dimensión Cognitiva</p>
          </div>
          <div className="hidden sm:flex items-center gap-2 flex-shrink-0">
            {subtopics.map((s, i) => (
              <div key={s.id} className={[
                'w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all',
                s.passed ? 'bg-green-500 border-green-500 text-white'
                  : s.status === 'in-progress' ? 'bg-[#4272BB] border-[#4272BB] text-white'
                  : 'bg-slate-100 border-slate-200 text-slate-400',
              ].join(' ')}>
                {s.passed ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
              </div>
            ))}
          </div>
        </div>

        {/* Subtopic cards */}
        <div className="space-y-3 sm:space-y-4">
          {subtopics.map((subtopicState, index) => {
            const data   = SUBTOPICS_DATA[index]
            const cfg    = STATUS_CONFIG[subtopicState.status as SubtopicStatus]
            const StatusIcon = cfg.icon
            const isLocked   = subtopicState.status === 'locked'

            return (
              <div key={subtopicState.id} className={[
                'bg-white rounded-2xl border-2 shadow-sm transition-all duration-300 overflow-hidden',
                cfg.borderClass, !isLocked ? 'hover:shadow-md' : 'opacity-70',
              ].join(' ')}>
                <div className="p-4 sm:p-6 lg:p-8">
                  <div className="flex items-start sm:items-center gap-4 sm:gap-6">

                    {/* Number */}
                    <div className={[
                      'w-11 h-11 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center flex-shrink-0 font-black text-lg sm:text-xl',
                      subtopicState.passed ? 'bg-green-500 text-white'
                        : subtopicState.status === 'in-progress' ? 'text-white'
                        : 'bg-slate-100 text-slate-400',
                    ].join(' ')}
                      style={subtopicState.status === 'in-progress' && !subtopicState.passed ? { background: 'linear-gradient(135deg,#003257,#4272BB)' } : {}}
                    >
                      {subtopicState.passed ? <CheckCircle2 className="w-5 h-5 sm:w-7 sm:h-7" /> : index + 1}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${cfg.badgeClass}`}>
                          <StatusIcon className="w-3 h-3" />
                          {cfg.label}
                        </span>
                        {subtopicState.score !== null && (
                          <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${subtopicState.passed ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'}`}>
                            {subtopicState.score}/10 en el quiz
                          </span>
                        )}
                      </div>
                      <h3 className="text-base sm:text-lg font-black text-[#003257] mb-0.5 leading-tight">{data.title}</h3>
                      <p className="text-[#5a7a8e] text-xs sm:text-sm leading-relaxed line-clamp-2 sm:line-clamp-none">{data.description}</p>

                      {/* Progress steps */}
                      {!isLocked && (
                        <div className="flex items-center gap-1 mt-3">
                          {(['intro','video','podcast','recommendations','quiz'] as const).map((step, si) => {
                            const stepOrder = ['intro','video','podcast','recommendations','quiz','result']
                            const currentIdx = stepOrder.indexOf(subtopicState.currentStep)
                            const isDone    = subtopicState.passed || si < currentIdx
                            const isCurrent = si === currentIdx && !subtopicState.passed
                            return (
                              <div key={step} className="w-5 sm:w-6 h-1.5 rounded-full transition-all" style={{
                                background: isDone ? '#4272BB' : isCurrent ? '#D5247A' : '#e2e8f0',
                              }} />
                            )
                          })}
                          <span className="text-[10px] sm:text-xs text-[#5a7a8e] ml-1">
                            {subtopicState.passed ? 'Completado' : `Paso ${['intro','video','podcast','recommendations','quiz','result'].indexOf(subtopicState.currentStep) + 1} de 6`}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Action button */}
                    <div className="flex-shrink-0">
                      <button
                        onClick={() => !isLocked && startSubtopic(subtopicState.id)}
                        disabled={isLocked}
                        className={`flex items-center gap-1.5 px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-bold text-xs sm:text-sm transition-all ${cfg.btnClass}`}
                      >
                        {isLocked && <Lock className="w-3.5 h-3.5" />}
                        <span className="hidden xs:inline">{cfg.btnLabel}</span>
                        {!isLocked && <ChevronRight className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* All done CTA */}
        {allCompleted && (
          <div className="mt-6 sm:mt-8 rounded-2xl p-6 sm:p-8 text-center text-white" style={{ background: 'linear-gradient(135deg,#003257,#4272BB)' }}>
            <Award className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 text-[#D5247A]" />
            <h3 className="text-xl sm:text-2xl font-black mb-2">¡Completaste el recorrido!</h3>
            <p className="text-white/80 mb-5 text-sm">Tu certificado de finalización está listo.</p>
            <button
              onClick={() => setScreen('certificate')}
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-[#D5247A] hover:bg-[#b91e67] text-white font-bold rounded-xl transition-colors text-sm sm:text-base"
            >
              <Award className="w-4 h-4 sm:w-5 sm:h-5" />
              Ver y descargar certificado
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        )}
      </main>
    </div>
  )
}
