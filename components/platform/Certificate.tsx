'use client'

import { useAppStore } from '@/lib/app-store'
import { Award, Download, ArrowLeft } from 'lucide-react'

export default function Certificate() {
  const user = useAppStore((s) => s.user)
  const setScreen = useAppStore((s) => s.setScreen)
  const reset = useAppStore((s) => s.reset)

  const today = new Date().toLocaleDateString('es-AR', {
    day: 'numeric', month: 'long', year: 'numeric',
  })

  const handleDownload = () => window.print()

  return (
    <div className="min-h-screen bg-slate-50 py-6 sm:py-10 lg:py-12 px-4 sm:px-6 lg:px-8 print:p-0 print:bg-white flex justify-center items-center">
      <div className="max-w-4xl w-full mx-auto">

        {/* ── Toolbar ────────────────────────────────────────────────────────── */}
        <div className="flex items-center justify-between mb-5 sm:mb-8 print:hidden">
          <button
            onClick={() => setScreen('dashboard')}
            className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-medium transition-all text-sm"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden xs:inline">Volver al Panel</span>
            <span className="xs:hidden">Volver</span>
          </button>

          <div className="flex gap-2 sm:gap-3">
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3 sm:px-5 py-2 sm:py-2.5 bg-white border border-slate-200 rounded-lg text-xs sm:text-sm font-semibold text-slate-800 hover:bg-slate-50 transition-all shadow-sm"
            >
              <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Descargar PDF</span>
              <span className="sm:hidden">PDF</span>
            </button>
            <button
              onClick={reset}
              className="flex items-center gap-1.5 px-3 sm:px-5 py-2 sm:py-2.5 bg-red-50 text-red-600 rounded-lg text-xs sm:text-sm font-semibold hover:bg-red-100 transition-all"
            >
              <span className="hidden sm:inline">Reiniciar Progreso</span>
              <span className="sm:hidden">Reiniciar</span>
            </button>
          </div>
        </div>

        {/* ── Certificate Card ──────────────────────────────────────────────── */}
        <div className="bg-white rounded-none border-[12px] border-slate-900 p-8 sm:p-12 lg:p-16 shadow-2xl relative overflow-hidden print:border-8 print:shadow-none print:m-0">
          
          {/* Inner decorative border */}
          <div className="absolute inset-3 sm:inset-4 border-2 border-amber-500/30 pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center text-center">

            {/* Top Bar: Date & Icon */}
            <div className="w-full flex justify-between items-start mb-10 sm:mb-12">
              <div className="text-left">
                <p className="text-slate-400 text-[10px] sm:text-xs uppercase tracking-[0.2em] font-bold mb-1">
                  Fecha de Emisión
                </p>
                <p className="text-slate-800 font-medium text-sm sm:text-base">
                  {today}
                </p>
              </div>
              <div className="text-right">
                <Award className="w-10 h-10 sm:w-12 sm:h-12 text-amber-600 opacity-90" strokeWidth={1.5} />
              </div>
            </div>

            <p className="text-amber-600 font-bold tracking-[0.25em] uppercase text-xs sm:text-sm mb-4">
              Certificado de Finalización
            </p>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 mb-10 tracking-tight font-serif">
              Ciudadanía Digital
            </h1>

            <p className="text-base sm:text-lg text-slate-500 mb-2 italic">
              Se otorga el presente a:
            </p>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-2 font-serif capitalize">
              {user?.fullName || 'Nombre del Estudiante'}
            </h2>
            
            <p className="text-sm sm:text-base text-slate-500 mb-12">
              DNI: <span className="font-semibold text-slate-800">{user?.dni || '00.000.000'}</span>
            </p>

            <p className="max-w-2xl text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed mb-16">
              Por haber completado con éxito la formación en <span className="font-semibold text-slate-900">Competencias Digitales — Módulo 1</span>, en el marco de la iniciativa <span className="font-semibold text-slate-900">Ciudadanía Presente</span>. Demostrando dominio en pensamiento crítico, verificación de información y gestión responsable de la identidad digital.
            </p>

            {/* Footer signatures */}
            <div className="flex justify-center w-full pt-4">
              <div className="flex flex-col items-center">
                {/* Asegúrate de colocar la imagen "nota-firma-jf.png" en la carpeta "public" 
                  de tu proyecto Next.js / React.
                */}
                <img
                  src="/nota-firma-jf.png"
                  alt="Firma José N. Farhat"
                  className="h-24 sm:h-32 object-contain -mb-2 mix-blend-multiply"
                />
                <div className="w-56 sm:w-64 border-b border-slate-300 mb-3" />
                <p className="text-sm sm:text-base font-bold text-slate-900">José N. Farhat</p>
                <p className="text-xs sm:text-sm text-slate-500 font-medium tracking-wide">Ciudadanía Presente</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}