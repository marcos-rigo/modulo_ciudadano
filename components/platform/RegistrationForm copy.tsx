'use client'

import { useState, useEffect, KeyboardEvent, ChangeEvent, FormEvent } from 'react'
import {
  BookOpen, BrainCircuit, BadgeCheck, ShieldCheck,
  Info, ChevronRight, Loader2, CheckCircle2, GraduationCap,
  type LucideIcon,
} from 'lucide-react'

// ── Inject fonts & keyframes ──────────────────────────────────────────────────
if (typeof document !== 'undefined') {
  const styleEl = document.createElement('style')
  styleEl.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,600;0,9..40,700;0,9..40,900&display=swap');
    @keyframes spin     { to { transform: rotate(360deg); } }
    @keyframes floatA   { 0%,100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-14px) rotate(3deg); } }
    @keyframes floatB   { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-9px); } }
    @keyframes floatC   { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-18px); } }
    @keyframes pulse    { 0%,100% { opacity: 0.25; } 50% { opacity: 0.6; } }
    *, *::before, *::after { box-sizing: border-box; }
  `
  if (!document.head.querySelector('[data-reg-styles]')) {
    styleEl.setAttribute('data-reg-styles', '1')
    document.head.appendChild(styleEl)
  }
}

// ── Types ─────────────────────────────────────────────────────────────────────
interface FormState { fullName: string; email: string; dni: string; consent: boolean }
type FormErrors = Partial<Record<keyof FormState, string>>

// ── Validation ────────────────────────────────────────────────────────────────
const ONLY_LETTERS = /^[a-zA-ZÀ-ÿ\u00f1\u00d1\s'-]+$/
const EMAIL_REGEX  = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const ONLY_DIGITS  = /^\d+$/

function validateForm(form: FormState): FormErrors {
  const errs: FormErrors = {}
  if (!form.fullName.trim())                          errs.fullName = 'El nombre completo es requerido.'
  else if (!ONLY_LETTERS.test(form.fullName.trim()))  errs.fullName = 'Solo puede contener letras.'
  else if (form.fullName.trim().length < 3)           errs.fullName = 'Mínimo 3 caracteres.'
  if (!form.email.trim())                             errs.email = 'El correo electrónico es requerido.'
  else if (!EMAIL_REGEX.test(form.email.trim()))      errs.email = 'Correo inválido (ej: nombre@dominio.com).'
  if (!form.dni.trim())                               errs.dni = 'El DNI es requerido.'
  else if (!ONLY_DIGITS.test(form.dni.trim()))        errs.dni = 'Solo números, sin puntos ni guiones.'
  else if (form.dni.trim().length < 6 || form.dni.trim().length > 9)
                                                      errs.dni = 'Entre 6 y 9 dígitos.'
  if (!form.consent) errs.consent = 'Debés aceptar la declaración de consentimiento.'
  return errs
}

// ── Features ──────────────────────────────────────────────────────────────────
const FEATURES: { Icon: LucideIcon; title: string; desc: string }[] = [
  { Icon: BookOpen,     title: 'Dimensión Cognitiva',    desc: '3 subtemas con lectura, video y podcast' },
  { Icon: BrainCircuit, title: 'Evaluación interactiva', desc: 'Quiz de 10 preguntas al finalizar' },
  { Icon: BadgeCheck,   title: 'Certificado oficial',    desc: 'Secretaría de Participación Ciudadana' },
  { Icon: ShieldCheck,  title: 'Datos protegidos',       desc: 'Información usada solo para este registro' },
]

// ── Colors ────────────────────────────────────────────────────────────────────
const C = {
  navy: '#001e3c', mid: '#003257', blue: '#4272BB', pink: '#D5247A',
  white: '#ffffff', text: '#1A2A36', subtext: '#5a7a8e',
  inputBg: '#F5F8FC', inputBorder: '#d3e2f0',
} as const

// ── Animated SVG Illustration ─────────────────────────────────────────────────
function CitizenIllustration() {
  return (
    <svg viewBox="0 0 360 220" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', maxWidth: '400px', height: 'auto' }}>
      <defs>
        <radialGradient id="bgGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#4272BB" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#001e3c" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="nodeBlue" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#5b8fd4" stopOpacity="1" />
          <stop offset="100%" stopColor="#2a5490" stopOpacity="1" />
        </radialGradient>
        <radialGradient id="nodePink" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#e0407e" stopOpacity="1" />
          <stop offset="100%" stopColor="#9b1255" stopOpacity="1" />
        </radialGradient>
        <radialGradient id="nodeCenter" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#4272BB" stopOpacity="1" />
          <stop offset="100%" stopColor="#001e3c" stopOpacity="1" />
        </radialGradient>
      </defs>

      {/* Ambient glow */}
      <ellipse cx="180" cy="110" rx="160" ry="100" fill="url(#bgGlow)" />

      {/* Orbit ring */}
      <circle cx="180" cy="110" r="78" stroke="rgba(66,114,187,0.15)" strokeWidth="1" strokeDasharray="5 7" />
      <circle cx="180" cy="110" r="100" stroke="rgba(66,114,187,0.08)" strokeWidth="1" strokeDasharray="3 9" />

      {/* Connection lines with animated dash */}
      {[
        { x2: 92,  y2: 52  }, { x2: 272, y2: 52  },
        { x2: 62,  y2: 136 }, { x2: 298, y2: 136 },
        { x2: 140, y2: 195 }, { x2: 222, y2: 195 },
      ].map((l, i) => (
        <line key={i} x1="180" y1="110" x2={l.x2} y2={l.y2}
          stroke={i % 3 === 2 ? 'rgba(213,36,122,0.25)' : 'rgba(66,114,187,0.28)'}
          strokeWidth="1" strokeDasharray="5 5">
          <animate attributeName="stroke-dashoffset" values="0;-300" dur={`${2.8 + i * 0.4}s`} repeatCount="indefinite" />
        </line>
      ))}

      {/* ── Central node — city skyline ── */}
      <g style={{ animation: 'floatC 5s ease-in-out infinite' }}>
        <circle cx="180" cy="110" r="34" fill="url(#nodeCenter)" />
        <circle cx="180" cy="110" r="34" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
        {/* Buildings */}
        <rect x="162" y="112" width="7"  height="14" rx="1" fill="rgba(255,255,255,0.85)" />
        <rect x="172" y="105" width="9"  height="21" rx="1" fill="white" />
        <rect x="184" y="109" width="7"  height="17" rx="1" fill="rgba(255,255,255,0.8)" />
        <rect x="194" y="114" width="6"  height="12" rx="1" fill="rgba(255,255,255,0.7)" />
        {/* Windows */}
        {[[164,115],[164,119],[174,108],[174,112],[174,116],[178,108],[178,112],[186,112],[186,117],[196,117]].map(([x,y],i) => (
          <rect key={i} x={x} y={y} width="2" height="2" rx="0.5" fill="rgba(66,114,187,0.7)" />
        ))}
        {/* Wi-fi arc */}
        <path d="M172 100 Q180 95 188 100" stroke="rgba(255,255,255,0.45)" strokeWidth="1.4" fill="none" strokeLinecap="round">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
        </path>
        <path d="M175 97 Q180 93 185 97" stroke="rgba(255,255,255,0.75)" strokeWidth="1.4" fill="none" strokeLinecap="round">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" begin="0.35s" repeatCount="indefinite" />
        </path>
        <circle cx="180" cy="91" r="1.4" fill="white">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" begin="0.7s" repeatCount="indefinite" />
        </circle>
      </g>

      {/* ── Satellite: Certificate ── */}
      <g style={{ animation: 'floatA 6s ease-in-out infinite' }}>
        <circle cx="92" cy="52" r="20" fill="url(#nodeBlue)" />
        <circle cx="92" cy="52" r="20" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
        <circle cx="92" cy="52" r="11" stroke="rgba(255,255,255,0.55)" strokeWidth="1.2" fill="none" />
        <path d="M87 52 l3.5 3.5 l7 -7" stroke="white" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {/* ── Satellite: Brain/Quiz ── */}
      <g style={{ animation: 'floatB 7s ease-in-out infinite' }}>
        <circle cx="272" cy="52" r="20" fill="url(#nodePink)" />
        <circle cx="272" cy="52" r="20" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
        <path d="M265 48 Q268 43 272 45 Q276 43 279 48 Q281 53 277 56 Q274 59 272 57 Q270 59 267 56 Q263 53 265 48Z"
          stroke="white" strokeWidth="1.3" fill="none" />
        <line x1="272" y1="45" x2="272" y2="57" stroke="rgba(255,255,255,0.45)" strokeWidth="1" />
        <line x1="266" y1="52" x2="278" y2="52" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
      </g>

      {/* ── Satellite: Shield/Data ── */}
      <g style={{ animation: 'floatB 5.5s ease-in-out infinite 1s' }}>
        <circle cx="62" cy="136" r="18" fill="url(#nodeBlue)" />
        <circle cx="62" cy="136" r="18" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
        <path d="M62 126 l8 3.5 v7.5 q0 5.5 -8 8.5 q-8 -3 -8 -8.5 v-7.5 z"
          stroke="white" strokeWidth="1.3" fill="none" />
        <path d="M59 136 l2.5 2.5 l5 -5" stroke="white" strokeWidth="1.3" fill="none" strokeLinecap="round" />
      </g>

      {/* ── Satellite: Connectivity ── */}
      <g style={{ animation: 'floatA 6.5s ease-in-out infinite 0.5s' }}>
        <circle cx="298" cy="136" r="18" fill="url(#nodeBlue)" />
        <circle cx="298" cy="136" r="18" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
        <circle cx="298" cy="136" r="7" stroke="rgba(255,255,255,0.6)" strokeWidth="1.2" fill="none" />
        <line x1="291" y1="136" x2="305" y2="136" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
        <line x1="298" y1="129" x2="298" y2="143" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
        <ellipse cx="298" cy="136" rx="4" ry="7" stroke="rgba(255,255,255,0.4)" strokeWidth="1" fill="none" />
      </g>

      {/* ── Satellite: Community left ── */}
      <g style={{ animation: 'floatC 7s ease-in-out infinite 1.5s' }}>
        <circle cx="140" cy="195" r="16" fill="url(#nodePink)" />
        <circle cx="140" cy="195" r="16" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
        <circle cx="136" cy="191" r="3" stroke="white" strokeWidth="1.2" fill="none" />
        <circle cx="144" cy="191" r="3" stroke="white" strokeWidth="1.2" fill="none" />
        <path d="M131 200 q0-4.5 5-4.5 q5 0 5 4.5" stroke="white" strokeWidth="1.2" fill="none" />
        <path d="M139 200 q0-4.5 5-4.5 q5 0 5 4.5" stroke="white" strokeWidth="1.2" fill="none" />
      </g>

      {/* ── Satellite: Book/Content right ── */}
      <g style={{ animation: 'floatB 6s ease-in-out infinite 0.8s' }}>
        <circle cx="222" cy="195" r="16" fill="url(#nodeBlue)" />
        <circle cx="222" cy="195" r="16" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
        <rect x="214" y="188" width="16" height="14" rx="1.5" stroke="white" strokeWidth="1.3" fill="none" />
        <line x1="222" y1="188" x2="222" y2="202" stroke="rgba(255,255,255,0.6)" strokeWidth="1" />
        <line x1="216" y1="192" x2="220" y2="192" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
        <line x1="216" y1="195" x2="220" y2="195" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
        <line x1="216" y1="198" x2="220" y2="198" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
      </g>

      {/* Floating micro data packets */}
      {[
        { cx: 130, cy: 82,  d: '0s',    dur: '3.2s' },
        { cx: 232, cy: 78,  d: '0.8s',  dur: '3.8s' },
        { cx: 108, cy: 162, d: '0.4s',  dur: '4.2s' },
        { cx: 252, cy: 168, d: '1.4s',  dur: '3.5s' },
      ].map((p, i) => (
        <g key={i} style={{ animation: `floatB ${p.dur} ease-in-out infinite`, animationDelay: p.d }}>
          <rect x={p.cx - 6} y={p.cy - 6} width="12" height="12" rx="3"
            fill="rgba(66,114,187,0.2)" stroke="rgba(66,114,187,0.5)" strokeWidth="1" />
          <rect x={p.cx - 4} y={p.cy - 1.5} width="8"  height="1.5" rx="0.7" fill="rgba(255,255,255,0.5)" />
          <rect x={p.cx - 4} y={p.cy + 1}   width="5"  height="1.5" rx="0.7" fill="rgba(255,255,255,0.3)" />
        </g>
      ))}

      {/* Pulse rings on center */}
      <circle cx="180" cy="110" r="38" stroke="rgba(66,114,187,0.3)" strokeWidth="1" fill="none">
        <animate attributeName="r"       values="38;58;38" dur="3s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.35;0;0.35" dur="3s" repeatCount="indefinite" />
      </circle>
    </svg>
  )
}

// ── Input style ───────────────────────────────────────────────────────────────
function inputStyle(err: boolean, focused: boolean): React.CSSProperties {
  return {
    width: '100%', padding: '9px 13px', borderRadius: '10px',
    border: `2px solid ${err ? '#f87171' : focused ? C.blue : C.inputBorder}`,
    background: err ? '#fef2f2' : C.inputBg,
    color: C.text, fontSize: '13px', outline: 'none',
    boxShadow: focused && !err ? '0 0 0 3px rgba(66,114,187,0.12)' : 'none',
    transition: 'all 0.18s', fontFamily: "'DM Sans', sans-serif", boxSizing: 'border-box',
  }
}

// ── FieldRow ──────────────────────────────────────────────────────────────────
interface FieldRowProps { label: string; required?: boolean; hint?: string; error?: string; children: React.ReactNode }
function FieldRow({ label, required, hint, error, children }: FieldRowProps) {
  return (
    <div>
      <label style={S.fieldLabel}>
        {label}
        {required && <span style={{ color: C.pink }}> *</span>}
        {hint && <span style={S.hint}> — {hint}</span>}
      </label>
      {children}
      {error && <p style={S.errorMsg}>⚠ {error}</p>}
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────
export default function RegistrationForm() {
  const [form, setForm]                 = useState<FormState>({ fullName: '', email: '', dni: '', consent: false })
  const [errors, setErrors]             = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted]       = useState(false)
  const [focused, setFocused]           = useState<keyof FormState | null>(null)
  const [visible, setVisible]           = useState(false)

  useEffect(() => { const t = setTimeout(() => setVisible(true), 60); return () => clearTimeout(t) }, [])

  const onNameKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key.length === 1 && !/^[a-zA-ZÀ-ÿ\u00f1\u00d1\s''\-]$/.test(e.key)) e.preventDefault()
  }
  const onDniKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key.length === 1 && !/^[0-9]$/.test(e.key)) e.preventDefault()
  }

  const textField = (key: 'fullName' | 'email' | 'dni') => ({
    value: form[key] as string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => {
      setForm(f => ({ ...f, [key]: e.target.value }))
      if (errors[key]) setErrors(er => ({ ...er, [key]: undefined }))
    },
    onFocus: () => setFocused(key),
    onBlur:  () => setFocused(null),
  })

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const errs = validateForm(form)
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setIsSubmitting(true)
    await new Promise(r => setTimeout(r, 1000))
    setSubmitted(true)
  }

  // ── Success ─────────────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div style={S.shell}>
        <div style={S.successCard}>
          <div style={S.successIconWrap}>
            <CheckCircle2 size={28} strokeWidth={1.8} color="#fff" />
          </div>
          <h2 style={S.successTitle}>¡Inscripción exitosa!</h2>
          <p style={S.successSub}>
            Bienvenido/a, <strong>{form.fullName.split(' ')[0]}</strong>. Tu recorrido formativo está listo.
          </p>
          <div style={S.successBadge}>Ciudadanía Digital</div>
        </div>
      </div>
    )
  }

  // ── Main render ─────────────────────────────────────────────────────────────
  return (
    <div style={S.shell}>

      {/* Topbar */}
      <header style={S.topbar}>
        <div style={S.topbarInner}>
          <ShieldCheck size={14} color="rgba(255,255,255,0.5)" strokeWidth={2} />
          <span style={S.topbarText}>Ministerio de Seguridad de Tucumán</span>
          <span style={S.topbarDivider}>·</span>
          <span style={S.topbarBold}>Secretaría de Participación Ciudadana</span>
        </div>
        <div style={S.stepsBadge}>
          {[1, 2, 3].map(n => <span key={n} style={S.stepDot}>{n}</span>)}
          <span style={S.stepsLabel}>Subtemas</span>
        </div>
      </header>

      {/* Two-column grid */}
      <main style={S.main}>

        {/* ── LEFT ──────────────────────────────────────────────────────────── */}
        <div style={{
          ...S.left,
          opacity: visible ? 1 : 0,
          transform: visible ? 'none' : 'translateY(18px)',
          transition: 'opacity 0.65s ease, transform 0.65s ease',
        }}>

          <div style={S.pill}>
            <GraduationCap size={11} strokeWidth={2.5} />
            Formación en Ciudadanía Digital
          </div>

          <h1 style={S.headline}>
            Ciudadanía
            <span style={{ color: C.pink }}> Digital</span>{' '}
            <span style={{ color: 'rgba(255,255,255,0.38)', fontWeight: 300 }}></span>
          </h1>

          <p style={S.tagline}>
            Un recorrido formativo para desarrollar competencias digitales esenciales en la era de la información.
          </p>

          <div style={S.illustrationWrap}>
            <CitizenIllustration />
          </div>

          {/* 4-column feature strip */}
          <div style={S.featureRow}>
            {FEATURES.map(({ Icon, title, desc }) => (
              <div key={title} style={S.featureCard}>
                <div style={S.featureIconWrap}>
                  <Icon size={14} strokeWidth={1.8} color="rgba(255,255,255,0.9)" />
                </div>
                <div style={S.featureTitle}>{title}</div>
                <div style={S.featureDesc}>{desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT — FORM ──────────────────────────────────────────────────── */}
        <div style={{
          ...S.formCard,
          opacity: visible ? 1 : 0,
          transform: visible ? 'none' : 'translateY(18px)',
          transition: 'opacity 0.7s ease 0.12s, transform 0.7s ease 0.12s',
        }}>
          <div style={S.formAccent} />

          <div style={S.formInner}>
            <div>
              <h2 style={S.formTitle}>Inscripción al Módulo</h2>
              <p style={S.formSub}>Completá tus datos para comenzar el recorrido formativo.</p>
            </div>

            <form onSubmit={handleSubmit} noValidate style={S.form}>

              <FieldRow label="Nombre completo" required error={errors.fullName}>
                <input type="text" placeholder="Ej: María González" autoComplete="name"
                  onKeyDown={onNameKeyDown} maxLength={60}
                  style={inputStyle(!!errors.fullName, focused === 'fullName')}
                  {...textField('fullName')} />
              </FieldRow>

              <FieldRow label="Correo electrónico" required error={errors.email}>
                <input type="email" placeholder="Ej: maria@gmail.com" autoComplete="email"
                  style={inputStyle(!!errors.email, focused === 'email')}
                  {...textField('email')} />
              </FieldRow>

              <FieldRow label="DNI" required hint="Solo números, sin puntos ni guiones" error={errors.dni}>
                <input type="text" inputMode="numeric" placeholder="Ej: 35678901" autoComplete="off"
                  maxLength={9} onKeyDown={onDniKeyDown}
                  style={inputStyle(!!errors.dni, focused === 'dni')}
                  {...textField('dni')} />
              </FieldRow>

              {/* Info note */}
              <div style={S.infoNote}>
                <Info size={13} strokeWidth={2} color={C.blue} style={{ flexShrink: 0, marginTop: '1px' }} />
                <span style={S.infoText}>
                  Tus datos se usarán para registrar tu participación y emitir el certificado de finalización.
                </span>
              </div>

              {/* Consent */}
              <div style={{ ...S.consentBox, ...(errors.consent ? S.consentBoxError : {}) }}>
                <label style={S.consentLabel}>
                  <div
                    style={{
                      ...S.consentCheck,
                      ...(form.consent ? S.consentCheckActive : {}),
                      ...(errors.consent ? S.consentCheckError : {}),
                    }}
                    onClick={() => {
                      setForm(f => ({ ...f, consent: !f.consent }))
                      if (errors.consent) setErrors(er => ({ ...er, consent: undefined }))
                    }}
                  >
                    {form.consent && (
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                        <path d="M1 3.5L3.8 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                  <span style={S.consentText}>
                    Declaro que los datos ingresados son correctos y autorizo su uso para registro académico y emisión del certificado.
                  </span>
                </label>
                {errors.consent && (
                  <p style={{ ...S.errorMsg, marginTop: '4px', marginLeft: '26px' }}>{errors.consent}</p>
                )}
              </div>

              {/* Submit */}
              <button type="submit" disabled={isSubmitting}
                style={{ ...S.submitBtn, ...(isSubmitting ? S.submitBtnLoading : {}) }}>
                {isSubmitting
                  ? <><Loader2 size={15} style={S.spinner} /> Procesando...</>
                  : <>Comenzar el recorrido formativo <ChevronRight size={15} strokeWidth={2.5} /></>
                }
              </button>
            </form>
          </div>
        </div>

      </main>
    </div>
  )
}

// ── Styles ────────────────────────────────────────────────────────────────────
const S: Record<string, React.CSSProperties> = {
  shell: {
    width: '100vw', height: '100vh',
    display: 'flex', flexDirection: 'column',
    background: 'linear-gradient(155deg, #001228 0%, #002444 45%, #003a60 100%)',
    fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
    overflow: 'hidden', position: 'relative',
  },

  topbar: {
    flexShrink: 0, height: '44px',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '0 32px', borderBottom: '1px solid rgba(255,255,255,0.08)',
  },
  topbarInner:   { display: 'flex', alignItems: 'center', gap: '8px' },
  topbarText:    { color: 'rgba(255,255,255,0.4)', fontSize: '11px' },
  topbarDivider: { color: 'rgba(255,255,255,0.2)', fontSize: '11px' },
  topbarBold:    { color: '#fff', fontSize: '11px', fontWeight: 700 },
  stepsBadge: {
    display: 'flex', alignItems: 'center', gap: '6px',
    padding: '3px 10px', borderRadius: '20px',
    background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
  },
  stepDot: {
    width: '18px', height: '18px', borderRadius: '50%',
    background: 'rgba(66,114,187,0.3)', border: '1px solid rgba(66,114,187,0.5)',
    color: '#7fb3e8', fontSize: '10px', fontWeight: 700,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  stepsLabel: { color: 'rgba(255,255,255,0.3)', fontSize: '10px', marginLeft: '2px' },

  main: {
    flex: 1,
    display: 'grid',
    gridTemplateColumns: '1fr 410px',
    gap: '24px',
    padding: '12px 32px',
    alignItems: 'center',
    overflow: 'hidden',
  },

  // Left column — everything centered
  left: {
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', textAlign: 'center',
    gap: '10px', color: '#fff', height: '100%',
    justifyContent: 'center',
  },
  pill: {
    display: 'inline-flex', alignItems: 'center', gap: '6px',
    padding: '4px 14px', borderRadius: '20px',
    background: 'rgba(213,36,122,0.18)', border: '1px solid rgba(213,36,122,0.3)',
    color: '#f472b6', fontSize: '11px', fontWeight: 600,
  },
  headline: {
    fontSize: 'clamp(24px, 2.8vw, 42px)',
    fontWeight: 900, lineHeight: 1.1,
    margin: 0, letterSpacing: '-0.02em',
  },
  tagline: {
    color: 'rgba(255,255,255,0.48)', fontSize: '12.5px',
    lineHeight: 1.65, maxWidth: '380px', margin: 0,
  },
  illustrationWrap: {
    width: '100%', display: 'flex', justifyContent: 'center',
    padding: '0 16px',
  },

  featureRow: {
    display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '8px', width: '100%',
  },
  featureCard: {
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    gap: '5px', padding: '10px 8px', borderRadius: '14px', textAlign: 'center',
    background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)',
  },
  featureIconWrap: {
    width: '30px', height: '30px', borderRadius: '9px',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    background: 'linear-gradient(135deg, rgba(66,114,187,0.5), rgba(0,50,87,0.5))',
    border: '1px solid rgba(66,114,187,0.3)',
  },
  featureTitle: { fontSize: '11px', fontWeight: 700, color: '#fff', lineHeight: 1.25 },
  featureDesc:  { fontSize: '10px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.4 },

  // Form card
  formCard: {
    background: '#fff', borderRadius: '20px',
    display: 'flex', flexDirection: 'column',
    boxShadow: '0 24px 64px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.05)',
    overflow: 'hidden', alignSelf: 'center',
  },
  formAccent: {
    height: '3px', flexShrink: 0,
    background: 'linear-gradient(90deg, #001e3c 0%, #4272BB 50%, #D5247A 100%)',
  },
  formInner: {
    padding: '18px 22px 16px',
    display: 'flex', flexDirection: 'column', gap: '12px',
    overflowY: 'auto',
  },
  formTitle: { fontSize: '18px', fontWeight: 900, color: '#003257', margin: '0 0 2px', letterSpacing: '-0.01em' },
  formSub:   { fontSize: '11px', color: '#5a7a8e', margin: 0, lineHeight: 1.5 },
  form:      { display: 'flex', flexDirection: 'column', gap: '10px' },

  fieldLabel: {
    display: 'block', fontSize: '11px', fontWeight: 700,
    color: '#1A2A36', marginBottom: '4px', letterSpacing: '0.01em',
  },
  hint:     { color: '#8ca9be', fontWeight: 400 },
  errorMsg: { margin: '3px 0 0', fontSize: '11px', color: '#ef4444' },

  infoNote: {
    display: 'flex', gap: '8px', alignItems: 'flex-start',
    padding: '8px 11px', borderRadius: '10px',
    background: '#EEF4FB', border: '1px solid #c8ddf5',
  },
  infoText: { fontSize: '11px', color: '#3a6aa8', lineHeight: 1.5 },

  consentBox:      { borderRadius: '10px', padding: '10px 12px', background: '#F5F8FC', border: '2px solid #d3e2f0', transition: 'all 0.18s' },
  consentBoxError: { background: '#fef2f2', borderColor: '#f87171' },
  consentLabel:    { display: 'flex', gap: '10px', cursor: 'pointer', alignItems: 'flex-start' },
  consentCheck: {
    width: '17px', height: '17px', borderRadius: '5px', flexShrink: 0, marginTop: '1px',
    border: '2px solid #c0d4e8', background: '#fff',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    cursor: 'pointer', transition: 'all 0.15s', userSelect: 'none' as const,
  },
  consentCheckActive: { background: '#4272BB', borderColor: '#4272BB' },
  consentCheckError:  { borderColor: '#f87171' },
  consentText: { fontSize: '11px', color: '#1A2A36', lineHeight: 1.5 },

  submitBtn: {
    width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
    gap: '8px', padding: '12px', borderRadius: '11px', border: 'none',
    background: 'linear-gradient(135deg, #001e3c 0%, #4272BB 100%)',
    color: '#fff', fontSize: '13px', fontWeight: 700,
    cursor: 'pointer', transition: 'all 0.2s', letterSpacing: '0.01em',
    fontFamily: "'DM Sans', sans-serif",
  },
  submitBtnLoading: { background: '#4272BB', cursor: 'not-allowed', opacity: 0.8 },
  spinner: { animation: 'spin 0.7s linear infinite' },

  successCard: {
    position: 'absolute', top: '50%', left: '50%',
    transform: 'translate(-50%, -50%)',
    background: '#fff', borderRadius: '20px', padding: '40px 50px',
    textAlign: 'center', boxShadow: '0 30px 80px rgba(0,0,0,0.4)', zIndex: 10,
  },
  successIconWrap: {
    width: '56px', height: '56px', borderRadius: '50%',
    background: 'linear-gradient(135deg, #003257, #4272BB)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    margin: '0 auto 16px',
  },
  successTitle: { fontSize: '22px', fontWeight: 900, color: '#003257', margin: '0 0 8px' },
  successSub:   { fontSize: '14px', color: '#5a7a8e', margin: '0 0 16px', lineHeight: 1.6 },
  successBadge: {
    display: 'inline-block', padding: '5px 14px', borderRadius: '20px',
    background: 'rgba(213,36,122,0.1)', border: '1px solid rgba(213,36,122,0.25)',
    color: '#D5247A', fontSize: '12px', fontWeight: 600,
  },
}
