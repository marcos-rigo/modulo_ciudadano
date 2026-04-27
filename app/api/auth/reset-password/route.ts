import { NextRequest, NextResponse } from 'next/server'
import { resetPasswordRequest, resetPasswordConfirm } from '@/lib/mysql-auth'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    // Modo 1: solicitar reset (solo email)
    if (body.email && !body.token) {
      const token = await resetPasswordRequest(body.email)
      // En producción aquí se enviaría el email con el token
      // En desarrollo devolvemos el token directamente para facilitar las pruebas
      const isDev = process.env.NODE_ENV === 'development'
      return NextResponse.json({
        success: true,
        message: 'Si el correo existe, recibirás instrucciones.',
        ...(isDev && { token }),
      })
    }

    // Modo 2: confirmar reset (token + nueva contraseña)
    if (body.token && body.newPassword) {
      if (body.newPassword.length < 6) {
        return NextResponse.json({ error: 'La contraseña debe tener al menos 6 caracteres.' }, { status: 400 })
      }
      await resetPasswordConfirm(body.token, body.newPassword)
      return NextResponse.json({ success: true, message: 'Contraseña actualizada correctamente.' })
    }

    return NextResponse.json({ error: 'Parámetros inválidos.' }, { status: 400 })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error al procesar la solicitud.'
    return NextResponse.json({ error: message }, { status: 400 })
  }
}
