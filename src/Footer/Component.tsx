import Link from 'next/link'
import React from 'react'

import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { Logo } from '@/components/Logo/Logo'

export async function Footer() {
  return (
    <footer className="mt-auto border-t-4 border-primary bg-card text-card-foreground">
      <div className="container py-8 gap-8 flex flex-col md:flex-row md:justify-between">
        <Link className="flex items-center" href="/">
          <Logo />
        </Link>

        <div className="flex flex-col-reverse items-start md:flex-row gap-4 md:items-center">
          <ThemeSelector />
          <nav className="flex flex-col md:flex-row gap-4">
            <Link className="hover:text-primary transition-colors" href="/">Accueil</Link>
            <Link className="hover:text-primary transition-colors" href="/about">À propos</Link>
            <Link className="hover:text-primary transition-colors" href="/bikes">Vélos</Link>
            <Link className="hover:text-primary transition-colors" href="/contact">Contact</Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}
