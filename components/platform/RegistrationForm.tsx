'use client'

import { useState, useEffect, KeyboardEvent, ChangeEvent, FormEvent } from 'react'
import {
  BookOpen, BrainCircuit, BadgeCheck, ShieldCheck,
  Info, ChevronRight, Loader2, CheckCircle2, GraduationCap,
  type LucideIcon,
} from 'lucide-react'
import { useAppStore } from '@/lib/app-store'
import { registerWithFirebase, loginWithFirebase ,resetPasswordWithFirebase} from '@/lib/firebase-auth'


// ── Types ─────────────────────────────────────────────────────────────────────
interface FormState {
  firstName:      string
  lastName:       string
  email:          string
  dni:            string
  birthDate:      string
  pais:           string
  provincia:      string
  ciudad:         string
  telefono:       string
  nivelEducativo: string
  genero:         string
  password:       string
  confirmPassword: string
  consent:        boolean
}
type FormErrors = Partial<Record<keyof FormState, string>>

// ── Validation ────────────────────────────────────────────────────────────────
const ONLY_LETTERS = /^[a-zA-ZÀ-ÿ\u00f1\u00d1\s'-]+$/
const EMAIL_REGEX  = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const ONLY_DIGITS  = /^\d+$/

function calcAge(dateStr: string): number {
  const [y, m, d] = dateStr.split('-').map(Number)
  const today = new Date()
  let age = today.getFullYear() - y
  if (today.getMonth() + 1 < m || (today.getMonth() + 1 === m && today.getDate() < d)) age--
  return age
}

function validateForm(f: FormState, isLogin: boolean): FormErrors {
  const e: FormErrors = {}
  if (!f.email.trim())               e.email    = 'El correo es requerido.'
  else if (!EMAIL_REGEX.test(f.email.trim())) e.email = 'Correo inválido.'
  if (!f.password)                   e.password = 'La contraseña es requerida.'
  else if (f.password.length < 6)   e.password = 'Mínimo 6 caracteres.'

  if (!isLogin) {
    if (!f.firstName.trim())         e.firstName = 'Requerido.'
    else if (!ONLY_LETTERS.test(f.firstName.trim())) e.firstName = 'Solo letras.'

    if (!f.lastName.trim())          e.lastName  = 'Requerido.'
    else if (!ONLY_LETTERS.test(f.lastName.trim()))  e.lastName  = 'Solo letras.'

    if (!f.dni.trim())               e.dni       = 'Requerido.'
    else if (!ONLY_DIGITS.test(f.dni.trim()))    e.dni = 'Solo números.'
    else if (f.dni.trim().length < 5 || f.dni.trim().length > 12) e.dni = 'Entre 5 y 12 dígitos.'

    if (!f.birthDate)                e.birthDate = 'Requerido.'
    else {
      const age = calcAge(f.birthDate)
      if (age < 13)  e.birthDate = 'Debés tener al menos 13 años.'
      if (age > 120) e.birthDate = 'Fecha inválida.'
    }

    if (!f.pais.trim())              e.pais      = 'Requerido.'
    if (!f.ciudad.trim())            e.ciudad    = 'Requerido.'

    if (f.password !== f.confirmPassword) e.confirmPassword = 'Las contraseñas no coinciden.'
    if (!f.consent)                  e.consent   = 'Debés aceptar la declaración.'
  }
  return e
}

// ── Max date helper (13 years ago today) ─────────────────────────────────────
function maxBirthDate() {
  const d = new Date()
  d.setFullYear(d.getFullYear() - 13)
  return d.toISOString().split('T')[0]
}

// ── Features strip ────────────────────────────────────────────────────────────
const FEATURES: { Icon: LucideIcon; title: string; desc: string }[] = [
  { Icon: BookOpen,     title: 'Dimensión Cognitiva',    desc: '3 subtemas con lectura, video y podcast' },
  { Icon: BrainCircuit, title: 'Evaluación interactiva', desc: 'Quiz de 10 preguntas al finalizar'       },
  { Icon: BadgeCheck,   title: 'Certificado oficial',    desc: 'Ciudadanía Presente - José Farhat'   },
  { Icon: ShieldCheck,  title: 'Datos protegidos',       desc: 'Información usada solo para estadísticas'},
]

// ── Animated SVG illustration ─────────────────────────────────────────────────
function CitizenIllustration() {
  return (
    <svg viewBox="0 0 360 200" fill="none" xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-xs lg:max-w-sm xl:max-w-md mx-auto h-auto">
      <defs>
        <radialGradient id="rf-bgGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#4272BB" stopOpacity="0.18"/>
          <stop offset="100%" stopColor="#001e3c" stopOpacity="0"/>
        </radialGradient>
        <radialGradient id="rf-nodeBlue" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#5b8fd4"/><stop offset="100%" stopColor="#2a5490"/>
        </radialGradient>
        <radialGradient id="rf-nodePink" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#e0407e"/><stop offset="100%" stopColor="#9b1255"/>
        </radialGradient>
        <radialGradient id="rf-nodeCenter" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#4272BB"/><stop offset="100%" stopColor="#001e3c"/>
        </radialGradient>
      </defs>
      <ellipse cx="180" cy="100" rx="155" ry="90" fill="url(#rf-bgGlow)"/>
      <circle cx="180" cy="100" r="72" stroke="rgba(66,114,187,0.15)" strokeWidth="1" strokeDasharray="5 7"/>
      <circle cx="180" cy="100" r="95" stroke="rgba(66,114,187,0.08)" strokeWidth="1" strokeDasharray="3 9"/>
      {[{x2:92,y2:46},{x2:268,y2:46},{x2:60,y2:122},{x2:300,y2:122},{x2:140,y2:178},{x2:220,y2:178}].map((l,i)=>(
        <line key={i} x1="180" y1="100" x2={l.x2} y2={l.y2}
          stroke={i%3===2?'rgba(213,36,122,0.25)':'rgba(66,114,187,0.28)'}
          strokeWidth="1" strokeDasharray="5 5">
          <animate attributeName="stroke-dashoffset" values="0;-300" dur={`${2.8+i*0.4}s`} repeatCount="indefinite"/>
        </line>
      ))}
      <g style={{animation:'rf-floatC 5s ease-in-out infinite'}}>
        <circle cx="180" cy="100" r="32" fill="url(#rf-nodeCenter)"/>
        <circle cx="180" cy="100" r="32" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5"/>
        <rect x="163" y="102" width="7" height="13" rx="1" fill="rgba(255,255,255,0.85)"/>
        <rect x="173" y="95" width="9" height="20" rx="1" fill="white"/>
        <rect x="185" y="99" width="7" height="16" rx="1" fill="rgba(255,255,255,0.8)"/>
        {[[165,105],[165,109],[175,98],[175,102],[175,106],[187,102],[187,107]].map(([x,y],i)=>(
          <rect key={i} x={x} y={y} width="2" height="2" rx="0.5" fill="rgba(66,114,187,0.7)"/>
        ))}
        <path d="M173 91 Q180 86 187 91" stroke="rgba(255,255,255,0.45)" strokeWidth="1.4" fill="none" strokeLinecap="round">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite"/>
        </path>
        <path d="M176 88 Q180 84 184 88" stroke="rgba(255,255,255,0.75)" strokeWidth="1.4" fill="none" strokeLinecap="round">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" begin="0.35s" repeatCount="indefinite"/>
        </path>
        <circle cx="180" cy="82" r="1.4" fill="white">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" begin="0.7s" repeatCount="indefinite"/>
        </circle>
      </g>
      <g style={{animation:'rf-floatA 6s ease-in-out infinite'}}>
        <circle cx="92" cy="46" r="18" fill="url(#rf-nodeBlue)"/>
        <circle cx="92" cy="46" r="18" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
        <circle cx="92" cy="46" r="10" stroke="rgba(255,255,255,0.55)" strokeWidth="1.2" fill="none"/>
        <path d="M87 46 l3.5 3.5 l7 -7" stroke="white" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
      <g style={{animation:'rf-floatB 7s ease-in-out infinite'}}>
        <circle cx="268" cy="46" r="18" fill="url(#rf-nodePink)"/>
        <circle cx="268" cy="46" r="18" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
        <path d="M261 42 Q264 37 268 39 Q272 37 275 42 Q277 47 273 50 Q270 53 268 51 Q266 53 263 50 Q259 47 261 42Z" stroke="white" strokeWidth="1.3" fill="none"/>
        <line x1="268" y1="39" x2="268" y2="51" stroke="rgba(255,255,255,0.45)" strokeWidth="1"/>
      </g>
      <g style={{animation:'rf-floatB 5.5s ease-in-out infinite 1s'}}>
        <circle cx="60" cy="122" r="16" fill="url(#rf-nodeBlue)"/>
        <circle cx="60" cy="122" r="16" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
        <path d="M60 113 l7 3 v7 q0 5 -7 8 q-7 -3 -7 -8 v-7 z" stroke="white" strokeWidth="1.3" fill="none"/>
        <path d="M57 122 l2.5 2.5 l5 -5" stroke="white" strokeWidth="1.3" fill="none" strokeLinecap="round"/>
      </g>
      <g style={{animation:'rf-floatA 6.5s ease-in-out infinite 0.5s'}}>
        <circle cx="300" cy="122" r="16" fill="url(#rf-nodeBlue)"/>
        <circle cx="300" cy="122" r="16" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
        <circle cx="300" cy="122" r="6" stroke="rgba(255,255,255,0.6)" strokeWidth="1.2" fill="none"/>
        <line x1="294" y1="122" x2="306" y2="122" stroke="rgba(255,255,255,0.5)" strokeWidth="1"/>
        <line x1="300" y1="116" x2="300" y2="128" stroke="rgba(255,255,255,0.5)" strokeWidth="1"/>
      </g>
      <g style={{animation:'rf-floatC 7s ease-in-out infinite 1.5s'}}>
        <circle cx="140" cy="178" r="14" fill="url(#rf-nodePink)"/>
        <circle cx="140" cy="178" r="14" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
        <circle cx="136" cy="174" r="2.5" stroke="white" strokeWidth="1.2" fill="none"/>
        <circle cx="144" cy="174" r="2.5" stroke="white" strokeWidth="1.2" fill="none"/>
        <path d="M132 182 q0-4 4.5-4 q4.5 0 4.5 4" stroke="white" strokeWidth="1.2" fill="none"/>
        <path d="M139 182 q0-4 4.5-4 q4.5 0 4.5 4" stroke="white" strokeWidth="1.2" fill="none"/>
      </g>
      <g style={{animation:'rf-floatB 6s ease-in-out infinite 0.8s'}}>
        <circle cx="220" cy="178" r="14" fill="url(#rf-nodeBlue)"/>
        <circle cx="220" cy="178" r="14" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
        <rect x="213" y="171" width="14" height="12" rx="1.5" stroke="white" strokeWidth="1.3" fill="none"/>
        <line x1="220" y1="171" x2="220" y2="183" stroke="rgba(255,255,255,0.6)" strokeWidth="1"/>
        <line x1="215" y1="175" x2="218" y2="175" stroke="rgba(255,255,255,0.5)" strokeWidth="1"/>
        <line x1="215" y1="178" x2="218" y2="178" stroke="rgba(255,255,255,0.4)" strokeWidth="1"/>
      </g>
      <circle cx="180" cy="100" r="36" stroke="rgba(66,114,187,0.3)" strokeWidth="1" fill="none">
        <animate attributeName="r" values="36;56;36" dur="3s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.35;0;0.35" dur="3s" repeatCount="indefinite"/>
      </circle>
    </svg>
  )
}

// ── Input class helper ────────────────────────────────────────────────────────
function inputCls(err: boolean, focused: boolean) {
  return [
    'w-full px-3 py-2.5 rounded-xl border-2 text-[#1A2A36] text-sm',
    'bg-[#F5F8FC] placeholder-[#9eb5c4] transition-all outline-none',
    'font-[family-name:var(--font-sans)]',
    err
      ? 'border-red-400 bg-red-50'
      : focused
      ? 'border-[#4272BB] ring-2 ring-[#4272BB]/10'
      : 'border-[#d3e2f0] focus:border-[#4272BB] focus:ring-2 focus:ring-[#4272BB]/10',
  ].join(' ')
}
function selectCls(err: boolean) { return inputCls(err, false) + ' cursor-pointer' }

// ── FieldRow ──────────────────────────────────────────────────────────────────
interface FieldRowProps {
  label: string; required?: boolean; hint?: string; error?: string; children: React.ReactNode
}
function FieldRow({ label, required, hint, error, children }: FieldRowProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-[11px] font-bold text-[#1A2A36] tracking-wide">
        {label}
        {required && <span className="text-[#D5247A]"> *</span>}
        {hint && <span className="font-normal text-[#8ca9be]"> — {hint}</span>}
      </label>
      {children}
      {error && <p className="text-[11px] text-red-500 flex items-center gap-1 mt-0.5"><span>⚠</span>{error}</p>}
    </div>
  )
}

// ── Section divider ───────────────────────────────────────────────────────────
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 pt-1">
      <span className="text-[10px] font-black uppercase tracking-widest text-[#4272BB]/70">{children}</span>
      <div className="flex-1 h-px bg-[#d3e2f0]" />
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────
interface RegistrationFormProps {
  defaultMode?: 'login' | 'register'
}

export default function RegistrationForm({ defaultMode = 'login' }: RegistrationFormProps) {
  const registerUser = useAppStore((s) => s.registerUser)

  const [isLogin, setIsLogin]               = useState(defaultMode === 'register' ? false : true)
  const [form, setForm]                     = useState<FormState>({
    firstName: '', lastName: '', email: '', dni: '',
    birthDate: '', pais: '', provincia: '', ciudad: '',
    telefono: '', nivelEducativo: '', genero: '',
    password: '', confirmPassword: '', consent: false,
  })
  const [errors, setErrors]                 = useState<FormErrors>({})
  const [firebaseError, setFirebaseError]   = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting]     = useState(false)
  const [focused, setFocused]               = useState<keyof FormState | null>(null)
  const [visible, setVisible]               = useState(false)

  useEffect(() => { const t = setTimeout(() => setVisible(true), 60); return () => clearTimeout(t) }, [])

  const onNameKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key.length === 1 && !/^[a-zA-ZÀ-ÿ\u00f1\u00d1\s''\-]$/.test(e.key)) e.preventDefault()
  }
  const onNumberKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key.length === 1 && !/^[0-9+\-\s]$/.test(e.key)) e.preventDefault()
  }

  const fieldProps = (key: keyof FormState) => ({
    value: typeof form[key] === 'boolean' ? '' : (form[key] as string),
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setForm(f => ({ ...f, [key]: e.target.value }))
      if (errors[key]) setErrors(er => ({ ...er, [key]: undefined }))
      if (firebaseError) setFirebaseError(null)
      if (successMessage) setSuccessMessage(null)
    },
    onFocus: () => setFocused(key),
    onBlur:  () => setFocused(null),
    className: inputCls(!!errors[key], focused === key),
  })

  const handleForgotPassword = async () => {
    if (!form.email.trim()) {
      setFirebaseError('Por favor, escribí tu correo en el campo de arriba y volvé a tocar "¿Olvidaste tu contraseña?".')
      return
    }
    setIsSubmitting(true)
    try {
      await resetPasswordWithFirebase(form.email.trim())
      setFirebaseError('✅ Te enviamos un correo. Revisá tu bandeja de entrada (o spam) para restablecer la contraseña.')
    } catch (err: unknown) {
      setFirebaseError(err instanceof Error ? err.message : 'Error al enviar el correo.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setFirebaseError(null)
    setSuccessMessage(null)
    const errs = validateForm(form, isLogin)
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setIsSubmitting(true)
    try {
      if (isLogin) {
          const { credential, userData } = await loginWithFirebase(form.email, form.password)
          const displayName = credential.user.displayName || userData?.fullName || 'Usuario'
          registerUser({ fullName: displayName, email: form.email, dni: userData?.dni || '', consent: true })
        } else {
        const fullName = `${form.lastName.trim()}, ${form.firstName.trim()}`
        await registerWithFirebase({
          firstName:       form.firstName.trim(),
          lastName:        form.lastName.trim(),
          fullName,
          email:           form.email.trim(),
          dni:             form.dni.trim(),
          birthDate:       form.birthDate,
          pais:            form.pais.trim(),
          provincia:       form.provincia.trim(),
          ciudad:          form.ciudad.trim(),
          telefono:        form.telefono.trim(),
          nivelEducativo:  form.nivelEducativo,
          genero:          form.genero,
          password:        form.password,
        })
        
        // REGISTRO EXITOSO: limpiar form y mostrar mensaje de verificación
        setSuccessMessage('Revisá tu correo electrónico para verificar tu cuenta y poder iniciar sesión.')
        setIsLogin(true)
        setForm({
          firstName: '', lastName: '', email: '', dni: '',
          birthDate: '', pais: '', provincia: '', ciudad: '',
          telefono: '', nivelEducativo: '', genero: '',
          password: '', confirmPassword: '', consent: false,
        })
        setErrors({})
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Ocurrió un error inesperado. Intentá de nuevo.'
      setFirebaseError(msg)
    } finally {
      setIsSubmitting(false)
    }
  }

  // ── Main render ─────────────────────────────────────────────────────────────
  return (
    <div
      className="min-h-screen w-full flex flex-col"
      style={{ background: 'linear-gradient(155deg,#001228 0%,#002444 45%,#003a60 100%)', fontFamily: 'var(--font-sans)' }}
    >
      <style>{`
        @keyframes rf-floatA { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-12px) rotate(3deg)} }
        @keyframes rf-floatB { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes rf-floatC { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-16px)} }
        @keyframes rf-spin   { to{transform:rotate(360deg)} }
        .rf-spin { animation: rf-spin 0.7s linear infinite; }
        input[type="date"]::-webkit-calendar-picker-indicator { opacity: 0.5; cursor: pointer; }
      `}</style>

      {/* ── Topbar ─────────────────────────────────────────────────────────── */}
      <header className="flex-shrink-0 h-14 flex items-center border-b border-white/[0.08] px-4 sm:px-6 lg:px-8">

        {/* Mobile: logo centrado */}
        <div className="flex lg:hidden w-full justify-center">
          <a href="https://josefarhat.com/" rel="noopener noreferrer">
            <img src="/logo/marcaJFb.png" alt="José Farhat" className="h-8 w-auto object-contain" />
          </a>
        </div>

        {/* Desktop: logo a la izquierda + subtítulo */}
        <div className="hidden lg:flex items-center gap-3">
          <a href="https://josefarhat.com/" rel="noopener noreferrer"
            className="flex-shrink-0 transition-opacity hover:opacity-80">
            <img src="/logo/marcaJFb.png" alt="José Farhat" className="h-9 w-auto object-contain" />
          </a>
          <span className="text-sm font-bold text-[#D5247A] tracking-tight whitespace-nowrap">
            — Ciudadanía Presente
          </span>
        </div>

      </header>

      {/* ── Main grid ──────────────────────────────────────────────────────── */}
      <main className="flex-1 flex flex-col lg:grid lg:grid-cols-[1fr_450px] xl:grid-cols-[1fr_480px] gap-6 lg:gap-8 px-4 sm:px-6 lg:px-8 py-4 lg:py-3 lg:items-center overflow-y-auto lg:overflow-hidden">

        {/* ── LEFT ──────────────────────────────────────────────────────────── */}
        <div
          className="flex flex-col items-center text-center text-white gap-3 lg:gap-4 lg:h-full lg:justify-center"
          style={{ opacity: visible?1:0, transform: visible?'none':'translateY(16px)', transition:'opacity 0.6s ease,transform 0.6s ease' }}
        >
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[11px] font-semibold text-pink-300"
            style={{background:'rgba(213,36,122,0.18)',border:'1px solid rgba(213,36,122,0.3)'}}>
            <GraduationCap size={11} strokeWidth={2.5}/>
            Formación en Ciudadanía Digital
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-[clamp(28px,3vw,44px)] font-black leading-[1.08] tracking-tight m-0">
            Ciudadanía
            <span className="text-[#D5247A]"> Digital</span>{' '}
          </h1>

          <p className="text-white/50 text-sm leading-relaxed max-w-xs lg:max-w-sm m-0">
            Un recorrido formativo para desarrollar competencias digitales esenciales en la era de la información.
          </p>

          <div className="w-full hidden md:flex justify-center">
            <CitizenIllustration/>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full max-w-md lg:max-w-full">
            {FEATURES.map(({ Icon, title, desc }) => (
              <div key={title} className="flex flex-col items-center gap-1.5 p-2.5 rounded-xl text-center"
                style={{background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.08)'}}>
                <div className="w-7 h-7 rounded-lg flex items-center justify-center"
                  style={{background:'linear-gradient(135deg,rgba(66,114,187,0.5),rgba(0,50,87,0.5))',border:'1px solid rgba(66,114,187,0.3)'}}>
                  <Icon size={13} strokeWidth={1.8} color="rgba(255,255,255,0.9)"/>
                </div>
                <span className="text-[11px] font-bold text-white leading-tight">{title}</span>
                <span className="text-[10px] text-white/40 leading-snug hidden sm:block">{desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT — FORM CARD ─────────────────────────────────────────────── */}
        <div
          className="bg-white rounded-2xl overflow-hidden flex flex-col lg:self-center w-full"
          style={{ opacity: visible?1:0, transform: visible?'none':'translateY(16px)', transition:'opacity 0.7s ease 0.1s,transform 0.7s ease 0.1s', boxShadow:'0 24px 64px rgba(0,0,0,0.4)' }}
        >
          {/* Accent bar */}
          <div className="h-[3px] flex-shrink-0" style={{background:'linear-gradient(90deg,#001e3c 0%,#4272BB 50%,#D5247A 100%)'}}/>

          {/* Scrollable body */}
          <div className="flex flex-col gap-3 p-5 sm:p-6 overflow-y-auto" style={{maxHeight:'calc(100dvh - 80px)'}}>

            {/* Tabs */}
            <div className="flex bg-[#EEF4FB] rounded-xl p-1 gap-1">
              {([{k:true,l:'Iniciar Sesión'},{k:false,l:'Crear Cuenta'}] as const).map(tab=>(
                <button key={String(tab.k)} type="button"
                  onClick={()=>{ setIsLogin(tab.k); setErrors({}); setFirebaseError(null); setSuccessMessage(null) }}
                  className={['flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all',
                    isLogin===tab.k?'bg-white text-[#003257] shadow-sm':'text-[#8ca9be] hover:text-[#5a7a8e]',
                  ].join(' ')}>
                  {tab.l}
                </button>
              ))}
            </div>

            {/* Title */}
            <div>
              <h2 className="text-lg font-black text-[#003257] tracking-tight m-0">
                {isLogin ? 'Ingresar a la plataforma' : 'Inscripción al Módulo'}
              </h2>
              <p className="text-[11px] text-[#5a7a8e] mt-0.5 leading-relaxed">
                {isLogin ? 'Ingresá tus credenciales para continuar.' : 'Completá tus datos para darte de alta.'}
              </p>
            </div>

            {/* Firebase error — solo errores reales */}
            {firebaseError && (
              <div className="flex gap-2 items-start p-3 rounded-xl bg-red-50 border border-red-200">
                <span className="text-red-500 flex-shrink-0 text-sm mt-0.5">⚠</span>
                <span className="text-[11px] text-red-700 leading-relaxed">{firebaseError}</span>
              </div>
            )}

            {/* Mensaje de éxito — verificación de correo */}
            {successMessage && (
              <div className="flex gap-2.5 items-start p-3.5 rounded-xl border"
                style={{ background: 'rgba(34,197,94,0.08)', borderColor: 'rgba(34,197,94,0.30)' }}>
                <CheckCircle2 size={15} className="flex-shrink-0 mt-0.5" style={{ color: '#16a34a' }}/>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[12px] font-bold" style={{ color: '#15803d' }}>
                    ¡Registro exitoso!
                  </span>
                  <span className="text-[11px] leading-relaxed" style={{ color: '#166534' }}>
                    {successMessage}
                  </span>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-3">

              {/* ═══════════════ REGISTRO ═══════════════ */}
              {!isLogin && (
                <>
                  {/* ── Datos personales ── */}
                  <SectionLabel>Datos personales</SectionLabel>

                  {/* Apellido + Nombre */}
                  <div className="grid grid-cols-2 gap-3">
                    <FieldRow label="Apellido" required error={errors.lastName}>
                      <input type="text" placeholder="Ej: González"
                        onKeyDown={onNameKeyDown} maxLength={40} autoComplete="family-name"
                        {...fieldProps('lastName')}/>
                    </FieldRow>
                    <FieldRow label="Nombre/s" required error={errors.firstName}>
                      <input type="text" placeholder="Ej: María"
                        onKeyDown={onNameKeyDown} maxLength={40} autoComplete="given-name"
                        {...fieldProps('firstName')}/>
                    </FieldRow>
                  </div>

                  {/* N° Documento + Fecha de nacimiento */}
                  <div className="grid grid-cols-2 gap-3">
                    <FieldRow label="N° Documento" required hint="DNI, pasaporte…" error={errors.dni}>
                      <input type="text" inputMode="numeric" placeholder="Sin puntos ni espacios"
                        maxLength={12} onKeyDown={onNumberKeyDown} autoComplete="off"
                        {...fieldProps('dni')}/>
                    </FieldRow>
                    <FieldRow label="Fecha de nacimiento" required error={errors.birthDate}>
                      <input type="date" max={maxBirthDate()} min="1900-01-01"
                        autoComplete="bday" {...fieldProps('birthDate')}/>
                    </FieldRow>
                  </div>

                  {/* Género */}
                  <FieldRow label="Género" error={errors.genero}>
                    <select autoComplete="off" className={selectCls(!!errors.genero)}
                      value={form.genero}
                      onChange={e=>{ setForm(f=>({...f,genero:e.target.value})); if(errors.genero) setErrors(er=>({...er,genero:undefined})) }}>
                      <option value="" disabled>Seleccionar…</option>
                      <option value="Femenino">Femenino</option>
                      <option value="Masculino">Masculino</option>
                      <option value="No binario">No binario</option>
                      <option value="Prefiero no decirlo">Prefiero no decirlo</option>
                    </select>
                  </FieldRow>

                  {/* ── Procedencia ── */}
                  <SectionLabel>Procedencia</SectionLabel>

                  {/* País + Provincia / Estado */}
                  <div className="grid grid-cols-2 gap-3">
                    <FieldRow label="País" required error={errors.pais}>
                      <input type="text" placeholder="Ej: Argentina, España…"
                        autoComplete="country-name" maxLength={60}
                        {...fieldProps('pais')}/>
                    </FieldRow>
                    <FieldRow label="Provincia / Estado" hint="Opcional" error={errors.provincia}>
                      <input type="text" placeholder="Ej: Tucumán, Cataluña…"
                        autoComplete="address-level1" maxLength={60}
                        {...fieldProps('provincia')}/>
                    </FieldRow>
                  </div>

                  {/* Ciudad */}
                  <FieldRow label="Ciudad / Localidad" required error={errors.ciudad}>
                    <input type="text" placeholder="Ej: San Miguel de Tucumán, Buenos Aires, Madrid…"
                      autoComplete="address-level2" maxLength={80}
                      {...fieldProps('ciudad')}/>
                  </FieldRow>

                  {/* ── Contacto y educación ── */}
                  <SectionLabel>Contacto y educación</SectionLabel>

                  {/* Email */}
                  <FieldRow label="Correo electrónico" required error={errors.email}>
                    <input type="email" placeholder="Ej: maria@correo.com" autoComplete="email"
                      {...fieldProps('email')}/>
                  </FieldRow>

                  {/* Teléfono + Nivel educativo */}
                  <div className="grid grid-cols-2 gap-3">
                    <FieldRow label="Teléfono" hint="Opcional" error={errors.telefono}>
                      <input type="tel" placeholder="Ej: +54 381…" autoComplete="tel"
                        {...fieldProps('telefono')}/>
                    </FieldRow>
                    <FieldRow label="Nivel Educativo" error={errors.nivelEducativo}>
                      <select autoComplete="off" className={selectCls(!!errors.nivelEducativo)}
                        value={form.nivelEducativo}
                        onChange={e=>{ setForm(f=>({...f,nivelEducativo:e.target.value})); if(errors.nivelEducativo) setErrors(er=>({...er,nivelEducativo:undefined})) }}>
                        <option value="" disabled>Seleccionar…</option>
                        <option value="Primario">Primario</option>
                        <option value="Secundario">Secundario</option>
                        <option value="Terciario">Terciario</option>
                        <option value="Universitario">Universitario</option>
                        <option value="Posgrado">Posgrado</option>
                        <option value="Otro">Otro</option>
                      </select>
                    </FieldRow>
                  </div>

                  {/* ── Contraseña ── */}
                  <SectionLabel>Contraseña de acceso</SectionLabel>

                  <div className="grid grid-cols-2 gap-3">
                    <FieldRow label="Contraseña" required error={errors.password}>
                      <input type="password" placeholder="Mínimo 6 caracteres"
                        autoComplete="new-password" {...fieldProps('password')}/>
                    </FieldRow>
                    <FieldRow label="Confirmar contraseña" required error={errors.confirmPassword}>
                      <input type="password" placeholder="Repetir contraseña"
                        autoComplete="new-password" {...fieldProps('confirmPassword')}/>
                    </FieldRow>
                  </div>

                  {/* Info legal */}
                  <div className="flex gap-2 items-start p-3 rounded-xl bg-[#EEF4FB] border border-[#c8ddf5]">
                    <Info size={13} strokeWidth={2} color="#4272BB" className="flex-shrink-0 mt-0.5"/>
                    <span className="text-[11px] text-[#3a6aa8] leading-relaxed">
                      Tus datos se usarán exclusivamente para registrar tu participación, emitir el certificado y elaborar estadísticas de alcance.
                    </span>
                  </div>

                  {/* Consentimiento */}
                  <div className={['rounded-xl p-3 transition-all',
                    errors.consent?'bg-red-50 border-2 border-red-300':'bg-[#F5F8FC] border-2 border-[#d3e2f0]',
                  ].join(' ')}>
                    <label className="flex gap-2.5 cursor-pointer items-start">
                      <div
                        className="flex-shrink-0 mt-0.5 w-[17px] h-[17px] rounded-[5px] flex items-center justify-center cursor-pointer transition-all select-none"
                        style={{
                          border: errors.consent ? '2px solid #f87171' : form.consent ? '2px solid #4272BB' : '2px solid #c0d4e8',
                          background: form.consent ? '#4272BB' : '#fff',
                        }}
                        onClick={()=>{ setForm(f=>({...f,consent:!f.consent})); if(errors.consent) setErrors(er=>({...er,consent:undefined})) }}
                      >
                        {form.consent && (
                          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                            <path d="M1 3.5L3.8 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </div>
                      <span className="text-[11px] text-[#1A2A36] leading-relaxed">
                        Declaro que los datos ingresados son correctos y autorizo su uso para registro académico, fines estadísticos y emisión del certificado.
                      </span>
                    </label>
                    {errors.consent && <p className="text-[11px] text-red-500 mt-1.5 ml-6">⚠ {errors.consent}</p>}
                  </div>
                </>
              )}

              {/* ═══════════════ LOGIN ═══════════════ */}
              {isLogin && (
                <>
                  <FieldRow label="Correo electrónico" required error={errors.email}>
                    <input type="email" placeholder="Tu correo registrado" autoComplete="email"
                      {...fieldProps('email')}/>
                  </FieldRow>
                  
                  <div className="flex flex-col">
                    <FieldRow label="Contraseña" required error={errors.password}>
                      <input type="password" placeholder="Tu contraseña" autoComplete="current-password"
                        {...fieldProps('password')}/>
                    </FieldRow>
                    <button
                      type="button"
                      onClick={handleForgotPassword}
                      className="text-[11px] text-[#4272BB] font-semibold self-start hover:underline mt-2"
                    >
                      ¿Olvidaste tu contraseña?
                    </button>
                  </div>
                </>
              )}

              {/* ── Submit ── */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={['w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold text-white transition-all mt-1',
                  isSubmitting?'opacity-70 cursor-not-allowed':'hover:opacity-90 active:scale-[0.98]',
                ].join(' ')}
                style={{background: isSubmitting ? '#4272BB' : 'linear-gradient(135deg,#001e3c 0%,#4272BB 100%)'}}
              >
                {isSubmitting
                  ? <><Loader2 size={15} className="rf-spin"/> Procesando…</>
                  : <>{isLogin ? 'Ingresar a mi cuenta' : 'Comenzar el recorrido'} <ChevronRight size={15} strokeWidth={2.5}/></>
                }
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}
