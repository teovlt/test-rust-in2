import React from 'react'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'

import './globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <script src="https://tweakcn.com/live-preview.min.js" />
      </head>
      <body className={`${GeistSans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
