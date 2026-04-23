'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAppStore } from '@/lib/app-store'
import Dashboard from '@/components/platform/Dashboard'
import WizardLayout from '@/components/platform/WizardLayout'
import Certificate from '@/components/platform/Certificate'

export default function DashboardPage() {
  const screen = useAppStore((s) => s.screen)
  const user   = useAppStore((s) => s.user)
  const router = useRouter()

  useEffect(() => {
    if (!user) router.replace('/')
  }, [user, router])

  if (!user) return null

  if (screen === 'wizard')      return <WizardLayout />
  if (screen === 'certificate') return <Certificate />
  return <Dashboard />
}
