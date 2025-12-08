import Link from 'next/link'
import React from 'react'

import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { Logo } from '@/components/Logo/Logo'

export async function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-black dark:bg-card text-white">
      <div className="container py-8 gap-8 flex flex-col md:flex-row md:justify-between">
        <Link className="flex items-center" href="/">
          <Logo />
        </Link>

        <div className="flex flex-col-reverse items-start md:flex-row gap-4 md:items-center">
          <ThemeSelector />
          <nav className="flex flex-col md:flex-row gap-4">
            <Link className="text-white hover:text-gray-300" href="/">Accueil</Link>
            <Link className="text-white hover:text-gray-300" href="/about">À propos</Link>
            <Link className="text-white hover:text-gray-300" href="/bikes">Vélos</Link>
            <Link className="text-white hover:text-gray-300" href="/contact">Contact</Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}
