import React from 'react'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import { InitTheme } from '@/providers/Theme/InitTheme'
import type { Metadata, Viewport } from 'next'
import { getServerSideURL } from '@/utilities/getURL'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'

import { FooterWrapper } from '@/Footer/FooterWrapper'
import { Header } from '@/Header/Component'
import { Providers } from '@/providers'
import { LoadingProvider } from '@/providers/LoadingProvider'

import '../globals.css'

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
}

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${GeistSans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
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
