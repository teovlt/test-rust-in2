import React from 'react'
import { cn } from '@/utilities/ui'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import { InitTheme } from '@/providers/Theme/InitTheme'
import type { Metadata } from 'next'
import { getServerSideURL } from '@/utilities/getURL'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'

import './(frontend)/globals.css'

export const metadata: Metadata = {
  title: 'Rust-in - Vélos d\'occasion',
  description: 'Votre spécialiste vélos d\'occasion et réparation à Toulouse',
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html className={cn(GeistSans.variable, GeistMono.variable)} lang="fr" suppressHydrationWarning>
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body className="bg-background text-foreground min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  )
}
