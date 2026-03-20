import type { Metadata, Viewport } from 'next'
import { Roboto, Inter } from 'next/font/google'
import './globals.css'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '900'],
  variable: '--font-roboto',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Ciudadanía Digital para Tucumán',
  description:
    'Plataforma educativa de la Secretaría de Participación Ciudadana del Ministerio de Seguridad de Tucumán. Formación en competencias digitales para ciudadanos.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  themeColor: '#003257',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${roboto.variable} ${inter.variable}`}>
      <body className="font-sans antialiased bg-background text-foreground">
        {children}
      </body>
    </html>
  )
}