// lib/firebase-auth.ts
// ─────────────────────────────────────────────────────────────────────────────
// Centraliza toda la interacción con Firebase Authentication y Firestore.
// Importar en RegistrationForm.tsx:
//   import { registerWithFirebase, loginWithFirebase } from '@/lib/firebase-auth'
// ─────────────────────────────────────────────────────────────────────────────

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,     
  sendPasswordResetEmail,  
  reload,  
  signOut,
  type UserCredential,
} from 'firebase/auth'
import {
  doc,
  setDoc,
  getDoc,
  serverTimestamp,
} from 'firebase/firestore'
import { auth, db } from './firebase'

// ── Tipos ─────────────────────────────────────────────────────────────────────
export interface RegisterPayload {
  firstName:       string
  lastName:        string
  fullName:        string
  email:           string
  dni:             string
  birthDate:       string   // "YYYY-MM-DD"
  pais:            string
  provincia:       string
  ciudad:          string
  telefono:        string
  nivelEducativo:  string
  genero:          string
  password:        string
}

// Mapa de errores de Firebase → mensajes en español
const FB_ERRORS: Record<string, string> = {
  'auth/email-already-in-use':    'Ya existe una cuenta con ese correo.',
  'auth/invalid-email':           'El correo electrónico no es válido.',
  'auth/weak-password':           'La contraseña es demasiado débil. Usá al menos 6 caracteres.',
  'auth/user-not-found':          'No encontramos ninguna cuenta con ese correo.',
  'auth/wrong-password':          'Contraseña incorrecta.',
  'auth/invalid-credential':      'Correo o contraseña incorrectos.',
  'auth/too-many-requests':       'Demasiados intentos fallidos. Esperá unos minutos e intentá de nuevo.',
  'auth/network-request-failed':  'Error de red. Verificá tu conexión a internet.',
}

function humanizeFirebaseError(code: string): string {
  return FB_ERRORS[code] ?? 'Ocurrió un error inesperado. Intentá de nuevo.'
}

// ── Registro ──────────────────────────────────────────────────────────────────
export async function registerWithFirebase(payload: RegisterPayload): Promise<UserCredential> {
  const { password, ...profile } = payload

  const credential = await createUserWithEmailAndPassword(auth, profile.email, password)
    .catch((err) => { throw new Error(humanizeFirebaseError(err.code)) })

  await updateProfile(credential.user, {
    displayName: `${profile.lastName}, ${profile.firstName}`,
  }).catch(() => {/* non-blocking */})

  // ENVIAR CORREO DE VERIFICACIÓN
  await sendEmailVerification(credential.user).catch(() => {/* non-blocking */})

  // Guardar perfil completo en Firestore → colección "usuarios"
    await setDoc(doc(db, 'usuarios', credential.user.uid), {
    uid: credential.user.uid,
    firstName: profile.firstName,
    lastName: profile.lastName,
    fullName: profile.fullName,
    email: profile.email,
    dni: profile.dni,
    birthDate: profile.birthDate,
    pais: profile.pais,
    provincia: profile.provincia,
    ciudad: profile.ciudad,
    telefono: profile.telefono || null,
    nivelEducativo: profile.nivelEducativo || null,
    genero: profile.genero || null,
    modulosCompletados: 0,
    certificadoEmitido: false,
    creadoEn: serverTimestamp(),
    actualizadoEn: serverTimestamp(),
  }).catch(() => {/* non-blocking */})

  await signOut(auth).catch(() => {/* non-blocking */})

  return credential
}

// ── Login ─────────────────────────────────────────────────────────────────────
export async function loginWithFirebase(
  email: string,
  password: string,
) {
  const credential = await signInWithEmailAndPassword(auth, email, password)
    .catch((err) => { throw new Error(humanizeFirebaseError(err.code)) })

  // Forzar actualización del estado del usuario en Firebase
  await reload(credential.user)

  // Leer nuevamente el usuario ya refrescado
  const refreshedUser = auth.currentUser

  if (!refreshedUser?.emailVerified) {
    throw new Error(
      'Por favor, verificá tu correo electrónico antes de ingresar. Revisá tu bandeja de entrada o correo no deseado (spam).'
    )
  }

  const userDoc = await getDoc(doc(db, 'usuarios', credential.user.uid))
  const userData = userDoc.exists() ? userDoc.data() : null

  return { credential, userData }
}

// ── Recuperar Contraseña ──────────────────────────────────────────────────────
export async function resetPasswordWithFirebase(email: string): Promise<void> {
  return sendPasswordResetEmail(auth, email)
    .catch((err) => { throw new Error(humanizeFirebaseError(err.code)) })
}