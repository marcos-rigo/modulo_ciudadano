import { NextRequest, NextResponse } from 'next/server'
import { updateProgress } from '@/lib/mysql-auth'

export async function POST(req: NextRequest) {
  let body: { userId?: unknown; progressData?: unknown } = {}

  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Body JSON inválido.' }, { status: 400 })
  }

  const { userId, progressData } = body

  if (!userId || !progressData) {
    console.error('[sync] ✗ Faltan campos:', { userId, progressData })
    return NextResponse.json({ error: 'userId y progressData son requeridos.' }, { status: 400 })
  }

  console.log(`[sync] → userId=${userId} screen=${(progressData as { screen?: string }).screen}`)

  try {
    await updateProgress(Number(userId), progressData as Parameters<typeof updateProgress>[1])
    console.log(`[sync] ✓ userId=${userId}`)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(`[sync] ✗ userId=${userId}:`, error)
    return NextResponse.json({ error: 'Error al guardar el progreso.' }, { status: 500 })
  }
}
