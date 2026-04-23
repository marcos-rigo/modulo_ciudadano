'use client'

import { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import RegistrationForm from '@/components/platform/RegistrationForm'

function LoginContent() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    // Leer el modo de la URL
    const mode = searchParams.get('mode')
    const defaultMode: 'login' | 'register' = mode === 'register' ? 'register' : 'login'

    if (!mounted) {
        return (
            <div className="min-h-screen bg-[#F5F8FC] flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-[#003257]/20 border-t-[#003257] rounded-full animate-spin"></div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#F5F8FC]">
            {/* Header simple */}
            <header className="bg-[#003257] py-4 px-6">
                <div className="max-w-5xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-[#4272BB] to-[#D5247A] rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-lg">SP</span>
                        </div>
                        <div>
                            <h1 className="text-white font-semibold text-lg">Ciudadanía Digital</h1>
                            <p className="text-white/60 text-xs">Ciudadanía Presente - José Farhat</p>
                        </div>
                    </div>
                    <button 
                        onClick={() => router.push('/modulos')}
                        className="text-white/80 hover:text-white text-sm"
                    >
                        ← Volver a Módulos
                    </button>
                </div>
            </header>

            {/* Formulario de Login/Registro */}
            <main className="max-w-5xl mx-auto py-8 px-4">
                <RegistrationForm defaultMode={defaultMode} />
            </main>
        </div>
    )
}

export default function Home() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-[#F5F8FC] flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-[#003257]/20 border-t-[#003257] rounded-full animate-spin"></div>
            </div>
        }>
            <LoginContent />
        </Suspense>
    )
}
