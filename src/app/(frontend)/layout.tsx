import React from 'react'
import { Nunito } from 'next/font/google'
import { InitTheme } from '@/providers/Theme/InitTheme'
import type { Metadata, Viewport } from 'next'
import { getServerSideURL } from '@/utilities/getURL'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'

import { FooterWrapper } from '@/Footer/FooterWrapper'
import { Header } from '@/Header/Component'
import { Providers } from '@/providers'
import { LoadingProvider } from '@/providers/LoadingProvider'

import '../globals.css'

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export const metadata: Metadata = {
  title: "Rust-in - Vélos d'occasion",
  description: "Votre spécialiste vélos d'occasion et réparation à Toulouse",
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
}

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${nunito.className} ${nunito.variable}`} suppressHydrationWarning>
        <div className="bg-background text-foreground min-h-screen flex flex-col">
          <Providers>
            <LoadingProvider>
              <InitTheme />
              <Header />
              <main className="flex-1">{children}</main>
              <FooterWrapper />
            </LoadingProvider>
          </Providers>
        </div>
      </body>
    </html>
  )
}
