'use client'

import { useAppStore } from '@/lib/app-store'
import RegistrationForm from '@/components/platform/RegistrationForm'
import Dashboard from '@/components/platform/Dashboard'
import WizardLayout from '@/components/platform/WizardLayout'
import Certificate from '@/components/platform/Certificate'
import { useEffect, useState } from 'react'

export default function Home() {
    const screen = useAppStore((s) => s.screen)
    const [mounted, setMounted] = useState(false)

    // Wait for hydration to avoid mismatch with localStorage state
    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return (
            <div className="min-h-screen bg-[#F5F8FC] flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-[#003257]/20 border-t-[#003257] rounded-full animate-spin"></div>
            </div>
        )
    }

    return (
        <main>
            {screen === 'registration' && <RegistrationForm />}
            {screen === 'dashboard' && <Dashboard />}
            {screen === 'wizard' && <WizardLayout />}
            {screen === 'certificate' && <Certificate />}
        </main>
    )
}
