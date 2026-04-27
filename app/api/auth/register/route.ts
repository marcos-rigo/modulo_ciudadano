import { NextRequest, NextResponse } from 'next/server'
import { registerUser } from '@/lib/mysql-auth'

export async function POST(req: NextRequest) {
  try {
    const { email, password, fullName, dni, ciudad } = await req.json()

    if (!email || !password || !fullName || !dni || !ciudad) {
      return NextResponse.json({ error: 'Todos los campos obligatorios deben completarse.' }, { status: 400 })
    }

    if (password.length < 6) {
      return NextResponse.json({ error: 'La contraseña debe tener al menos 6 caracteres.' }, { status: 400 })
    }

    await registerUser({ email, password, fullName, dni, ciudad })

    return NextResponse.json({ success: true, message: 'Usuario registrado correctamente.' })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error al registrar el usuario.'
    const status = message.includes('Ya existe') ? 409 : 500
    return NextResponse.json({ error: message }, { status })
  }
}
