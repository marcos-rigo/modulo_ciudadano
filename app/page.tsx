'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import RegistrationForm from '@/components/platform/RegistrationForm'

function LoginContent() {
    const searchParams = useSearchParams()
    const mode = searchParams.get('mode')
    const defaultMode: 'login' | 'register' = mode === 'register' ? 'register' : 'login'

    return <RegistrationForm defaultMode={defaultMode} />
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
