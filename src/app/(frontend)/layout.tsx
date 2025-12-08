import React from 'react'

import { AdminBar } from '@/components/AdminBar'
import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { Providers } from '@/providers'
import { draftMode } from 'next/headers'

export default async function FrontendLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()

  return (
    <Providers>
      <AdminBar
        adminBarProps={{
          preview: isEnabled,
        }}
      />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </Providers>
  )
}
