'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  Monitor,
  Shield,
  Users,
  FileText,
  GraduationCap,
  Vote,
  Laptop,
  ArrowRight,
  Lock,
  type LucideIcon,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAppStore } from '@/lib/app-store'

// ── Tipos ─────────────────────────────────────────────────────────────────────
interface Modulo {
  id: string
  titulo: string
  descripcion: string
  icono: LucideIcon
  estado: 'activo' | 'proximo'
  color: string
  gradiente: string
}

// ── Definición de módulos ───────────────────────────────────────────────────
const MODULOS: Modulo[] = [
  {
    id: 'ciudadania-digital',
    titulo: 'Ciudadanía Digital',
    descripcion: 'Formación en competencias digitales para participar de manera segura en el entorno digital.',
    icono: Monitor,
    estado: 'activo',
    color: '#003257',
    gradiente: 'from-[#003257] to-[#4272BB]',
  },
  {
    id: 'cultura-prevencion',
    titulo: 'Cultura de Prevención',
    descripcion: 'Conocimiento sobre entornos digitales seguros y buenas prácticas de ciberseguridad.',
    icono: Shield,
    estado: 'proximo',
    color: '#4272BB',
    gradiente: 'from-[#4272BB] to-[#6B8FD4]',
  },
  {
    id: 'participacion-comunitaria',
    titulo: 'Participación Comunitaria',
    descripcion: 'Herramientas para participar en consejos vecinales, asambleas y espacios de decisión colectiva.',
    icono: Users,
    estado: 'proximo',
    color: '#D5247A',
    gradiente: 'from-[#D5247A] to-[#E85A9C]',
  },
  {
    id: 'transparencia',
    titulo: 'Transparencia y Datos Abiertos',
    descripcion: 'Acceso a información pública, datos abiertos y herramientas de control ciudadano.',
    icono: FileText,
    estado: 'proximo',
    color: '#22C55E',
    gradiente: 'from-[#22C55E] to-[#4ADE80]',
  },
  {
    id: 'educacion-civica',
    titulo: 'Educación Cívica',
    descripcion: 'Conocimiento sobre derechos, deberes ciudadanos e instituciones gubernamentales.',
    icono: GraduationCap,
    estado: 'proximo',
    color: '#8B5CF6',
    gradiente: 'from-[#8B5CF6] to-[#A78BFA]',
  },
  {
    id: 'innovacion-democratica',
    titulo: 'Innovación Democrática',
    descripcion: 'Presupuesto participativo, consultas ciudadanas y mecanismos de participación digital.',
    icono: Vote,
    estado: 'proximo',
    color: '#F59E0B',
    gradiente: 'from-[#F59E0B] to-[#FBBF24]',
  },
  {
    id: 'alfabetizacion-digital',
    titulo: 'Alfabetización Digital',
    descripcion: 'Programas de inclusión tecnológica para reducir la brecha digital en la comunidad.',
    icono: Laptop,
    estado: 'proximo',
    color: '#06B6D4',
    gradiente: 'from-[#06B6D4] to-[#22D3EE]',
  },
]

// ── Componente de tarjeta de módulo ─────────────────────────────────────────
function ModuloCard({ modulo, index }: { modulo: Modulo; index: number }) {
  const [isHovered, setIsHovered] = useState(false)
  const router = useRouter()
  const isActivo = modulo.estado === 'activo'

  const handleClick = () => {
    if (isActivo) {
      // Redirigir según el estado de autenticación
      const isAuthenticated = useAppStore.getState().screen !== 'registration'
      if (isAuthenticated) {
        router.push('/dashboard/inicio')
      } else {
        router.push('/')
      }
    }
  }

  return (
    <div
      className={`
        group relative overflow-hidden rounded-2xl border transition-all duration-500
        ${isActivo 
          ? 'cursor-pointer hover:scale-[1.02] hover:shadow-2xl border-white/40 bg-white shadow-lg hover:border-[#4272BB]/30' 
          : 'border-gray-200 bg-gray-50 cursor-not-allowed'
        }
      `}
      style={{
        animationDelay: `${index * 100}ms`,
      }}
      onMouseEnter={() => isActivo && setIsHovered(true)}
      onMouseLeave={() => isActivo && setIsHovered(false)}
      onClick={handleClick}
    >
      {/* Gradiente de fondo */}
      <div
        className={`
          absolute inset-0 transition-opacity duration-500
          ${isHovered ? 'opacity-100' : ''}
        `}
        style={{
          background: isActivo ? `linear-gradient(135deg, ${modulo.color}15 0%, ${modulo.color}05 100%)` : 'transparent',
        }}
      />

      {/* Contenido */}
      <div className="relative p-6">
        {/* Badge de estado */}
        <div className="mb-4 flex items-center justify-between">
          <span
            className={`
              inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium
              ${isActivo 
                ? 'bg-green-100 text-green-700' 
                : 'bg-gray-200 text-gray-600'
              }
            `}
          >
            {isActivo ? (
              <>
                <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                Activo
              </>
            ) : (
              <>
                <Lock className="h-3 w-3" />
                Próximamente
              </>
            )}
          </span>
        </div>

        {/* Icono */}
        <div
          className={`
            mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl
            bg-gradient-to-br ${modulo.gradiente} shadow-lg
            transition-transform duration-300 group-hover:scale-110
          `}
        >
          <modulo.icono className="h-7 w-7 text-white" />
        </div>

        {/* Título */}
        <h3 className={`mb-2 text-xl font-bold ${isActivo ? 'text-[#003257]' : 'text-gray-500'}`}>
          {modulo.titulo}
        </h3>

        {/* Descripción */}
        <p className={`mb-4 text-sm leading-relaxed ${isActivo ? 'text-gray-600' : 'text-gray-400'}`}>
          {modulo.descripcion}
        </p>

        {/* CTA según estado */}
        {isActivo && (
          <div className="flex items-center gap-2 text-sm font-medium text-[#4272BB] transition-all group-hover:gap-3">
            <span>Comenzar</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </div>
        )}
      </div>

      {/* Borde decorativo */}
      <div
        className={`
          absolute inset-x-0 bottom-0 h-1 origin-bottom transition-transform duration-300
          ${isHovered ? 'scale-x-100' : 'scale-x-0'}
        `}
        style={{ background: modulo.color }}
      />
    </div>
  )
}

// ── Componente principal ─────────────────────────────────────────────────────
export default function ModulosPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#F5F8FC] dark:bg-[#0d1c26] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#003257]/20 border-t-[#003257] rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F5F8FC] dark:bg-[#0d1c26]">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-b from-[#003257] via-[#003257] to-[#F5F8FC] dark:to-[#0d1c26]">
        {/* Patrón de fondo */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        {/* Contenido del hero */}
        <div className="relative mx-auto max-w-7xl px-6 py-16 md:py-24 lg:py-32">
          <div className="mx-auto max-w-3xl text-center">
            {/* Logo / Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white/80">
              <span className="flex h-2 w-2 items-center justify-center rounded-full bg-[#D5247A]">
                <span className="h-1 w-1 animate-pulse rounded-full bg-white" />
              </span>
              Ciudadanía Presente - José Farhat
            </div>

            {/* Título principal */}
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
              Módulos de{' '}
              <span className="bg-gradient-to-r from-[#4272BB] to-[#D5247A] bg-clip-text text-transparent">
                Ciudadanía Digital
              </span>
            </h1>

            {/* Subtítulo */}
            <p className="mx-auto mb-8 max-w-2xl text-lg text-white/80">
              Explora nuestros programas de formación ciudadana. 
              Cada módulo está diseñado para fortalecer tu participación 
              en la vida democrática de Tucumán.
            </p>

            {/* Botones de acción */}
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link href="/?mode=login">
                <Button
                  size="lg"
                  className="bg-white text-[#003257] hover:bg-white/90 font-semibold px-8 transition-all duration-300 hover:scale-105 hover:shadow-lg animate-[fadeIn_0.5s_ease-out]"
                >
                  Iniciar Sesión
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/?mode=register">
                <Button
                  size="lg"
                  className="bg-[#D5247A] text-white hover:bg-[#b81e68] font-semibold px-8 transition-all duration-300 hover:scale-105 hover:shadow-lg animate-[fadeIn_0.5s_ease-out_0.1s_both] border-2 border-[#D5247A]"
                >
                  Registrarse
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Wave decorativo */}
        <div className="absolute bottom-0 left-0 right-0 h-16 md:h-24">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute bottom-0 h-full w-full"
          >
            <path
              d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              className="fill-[#F5F8FC] dark:fill-[#0d1c26]"
            />
          </svg>
        </div>
      </div>

      {/* Sección de módulos */}
      <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
        {/* Encabezado de sección */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-2xl font-bold text-[#003257] dark:text-white md:text-3xl">
            Nuestros Módulos
          </h2>
          <p className="mx-auto max-w-2xl text-gray-600 dark:text-gray-300">
            Cada módulo ofrece contenido especializado para desarrollar 
            tus competencias como ciudadano digital.
          </p>
        </div>

        {/* Grilla de módulos */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {MODULOS.map((modulo, index) => (
            <ModuloCard key={modulo.id} modulo={modulo} index={index} />
          ))}
        </div>

        {/* Información adicional */}
        <div className="mt-16 rounded-2xl bg-gradient-to-r from-[#003257]/5 to-[#4272BB]/5 p-8 text-center dark:from-[#003257]/10 dark:to-[#4272BB]/10">
          <h3 className="mb-2 text-xl font-semibold text-[#003257] dark:text-white">
            ¿Necesitás más información?
          </h3>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Contactános a través de nuestros canales oficiales para 
            resolver tus dudas sobre los módulos disponibles.
          </p>
          <Button variant="outline" className="border-[#003257] text-[#003257] hover:bg-[#003257] hover:text-white">
            Contactar
          </Button>
        </div>
      </div>

      {/* Footer minimal */}
      <footer className="border-t border-gray-200 bg-white py-8 dark:border-gray-800 dark:bg-[#122233]">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © 2024 Ciudadanía Presente - José Farhat
          </p>
          <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
            Secretaría: José Farhat
          </p>
        </div>
      </footer>
    </div>
  )
}