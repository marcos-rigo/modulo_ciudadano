'use client'

import { useAppStore } from '@/lib/app-store'
import { Shield, Award, Download, ArrowLeft, BadgeCheck } from 'lucide-react'

export default function Certificate() {
  const user     = useAppStore((s) => s.user)
  const setScreen = useAppStore((s) => s.setScreen)
  const reset    = useAppStore((s) => s.reset)

  const today = new Date().toLocaleDateString('es-AR', {
    day: 'numeric', month: 'long', year: 'numeric',
  })

  const handleDownload = () => window.print()

  return (
    <div className="min-h-screen bg-[#F5F8FC] py-6 sm:py-10 lg:py-12 px-4 sm:px-6 lg:px-8 print:p-0 print:bg-white">
      <div className="max-w-4xl mx-auto">

        {/* ── Toolbar ────────────────────────────────────────────────────────── */}
        <div className="flex items-center justify-between mb-5 sm:mb-8 print:hidden">
          <button
            onClick={() => setScreen('dashboard')}
            className="flex items-center gap-2 text-[#5a7a8e] hover:text-[#003257] font-bold transition-all text-sm"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden xs:inline">Volver al Panel</span>
            <span className="xs:hidden">Volver</span>
          </button>

          <div className="flex gap-2 sm:gap-3">
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3 sm:px-5 py-2 sm:py-2.5 bg-white border border-[#d3e2f0] rounded-xl text-xs sm:text-sm font-bold text-[#003257] hover:bg-[#F5F8FC] transition-all shadow-sm"
            >
              <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Descargar PDF</span>
              <span className="sm:hidden">PDF</span>
            </button>
            <button
              onClick={reset}
              className="flex items-center gap-1.5 px-3 sm:px-5 py-2 sm:py-2.5 bg-red-50 text-red-600 rounded-xl text-xs sm:text-sm font-bold hover:bg-red-100 transition-all"
            >
              <span className="hidden sm:inline">Reiniciar Progreso</span>
              <span className="sm:hidden">Reiniciar</span>
            </button>
          </div>
        </div>

        {/* ── Certificate Card ──────────────────────────────────────────────── */}
        <div className="bg-white rounded-[24px] sm:rounded-[32px] lg:rounded-[40px] border-4 sm:border-6 lg:border-8 border-[#003257] p-6 sm:p-10 lg:p-16 shadow-2xl relative overflow-hidden print:border-4 print:shadow-none print:rounded-xl print:p-8">

          {/* Decorative circles */}
          <div className="absolute -top-16 sm:-top-24 -right-16 sm:-right-24 w-48 sm:w-72 lg:w-96 h-48 sm:h-72 lg:h-96 bg-[#EEF4FB] rounded-full opacity-50 -z-0" />
          <div className="absolute -bottom-16 sm:-bottom-24 -left-16 sm:-left-24 w-48 sm:w-72 lg:w-96 h-48 sm:h-72 lg:h-96 bg-[#EEF4FB] rounded-full opacity-50 -z-0" />

          <div className="relative z-10 flex flex-col items-center text-center">

            {/* Seal */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mb-6 sm:mb-8 lg:mb-10 flex items-center justify-center relative">
              <div className="absolute inset-0 bg-[#D5247A] rounded-full animate-pulse opacity-20" />
              <div className="w-14 h-14 sm:w-18 sm:h-18 lg:w-20 lg:h-20 bg-[#D5247A] rounded-full flex items-center justify-center text-white shadow-lg" style={{width:'calc(100% - 8px)',height:'calc(100% - 8px)'}}>
                <Shield className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10" />
              </div>
              <div className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 w-6 h-6 sm:w-8 sm:h-8 bg-[#4272BB] rounded-full border-2 sm:border-4 border-white flex items-center justify-center text-white">
                <BadgeCheck className="w-3 h-3 sm:w-4 sm:h-4" />
              </div>
            </div>

            <p className="text-[#4272BB] font-black tracking-[0.15em] sm:tracking-[0.2em] uppercase text-[10px] sm:text-sm mb-4 sm:mb-6">
              Certificado de Finalización
            </p>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#003257] mb-5 sm:mb-8 leading-tight">
              Ciudadanía Digital
            </h1>

            <div className="w-16 sm:w-24 h-1 sm:h-1.5 bg-[#D5247A] rounded-full mb-6 sm:mb-10" />

            <p className="text-base sm:text-xl text-[#5a7a8e] mb-2 italic">Se otorga el presente a:</p>
            <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-[#003257] mb-8 sm:mb-12 underline decoration-[#4272BB]/30 underline-offset-4 sm:underline-offset-8 break-words max-w-full">
              {user?.fullName || 'Estudiante'}
            </p>

            <p className="max-w-xl sm:max-w-2xl text-sm sm:text-base text-[#5a7a8e] leading-relaxed mb-10 sm:mb-16 px-2 sm:px-0">
              Por haber completado con éxito la formación en{' '}
              <span className="font-bold text-[#003257]">Competencias Digitales — Módulo 1</span>,
              organizada por la Secretaría de Participación Ciudadana del Ministerio de Seguridad de Tucumán.
              Demostrando dominio en pensamiento crítico, verificación de información y gestión de identidad digital.
            </p>

            {/* Footer signatures */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12 w-full pt-8 sm:pt-12 border-t border-[#d3e2f0]">
              <div className="flex flex-col items-center">
                <div className="w-32 sm:w-40 border-b-2 border-slate-300 mb-3 sm:mb-4" />
                <p className="text-xs sm:text-sm font-bold text-[#003257]">Secretaría de Participación Ciudadana</p>
                <p className="text-[11px] sm:text-xs text-[#5a7a8e]">Ministerio de Seguridad de Tucumán</p>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-xs sm:text-sm font-bold text-[#003257] mb-1">Emitido el {today}</p>
                <p className="text-[10px] sm:text-xs text-[#5a7a8e] text-center break-all">
                  Código: SPC-CD-{Math.random().toString(36).substring(2, 8).toUpperCase()}
                </p>
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=https://seguridad.tucuman.gov.ar/verificar/${user?.dni || '0'}`}
                  alt="QR Verification"
                  className="w-14 h-14 sm:w-16 sm:h-16 mt-3 sm:mt-4 opacity-70"
                />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
