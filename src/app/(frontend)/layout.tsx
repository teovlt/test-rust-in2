import React from 'react'
import { InitTheme } from '@/providers/Theme/InitTheme'
import type { Metadata } from 'next'
import { getServerSideURL } from '@/utilities/getURL'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'

import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { Providers } from '@/providers'
import { LoadingProvider } from '@/providers/LoadingProvider'

export const metadata: Metadata = {
  title: "Rust-in - Vélos d'occasion",
  description: "Votre spécialiste vélos d'occasion et réparation à Toulouse",
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
}

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <LoadingProvider>
        <InitTheme />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </LoadingProvider>
    </Providers>
  )
}
