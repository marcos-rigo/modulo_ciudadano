import { NextRequest, NextResponse } from 'next/server'
import { loginUser } from '@/lib/mysql-auth'

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()

    if (!email || !password) {
      return NextResponse.json({ error: 'Correo y contraseña son requeridos.' }, { status: 400 })
    }

    const { user, progress } = await loginUser(email, password)

    return NextResponse.json({ success: true, user, progress })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error al iniciar sesión.'
    return NextResponse.json({ error: message }, { status: 401 })
  }
}
