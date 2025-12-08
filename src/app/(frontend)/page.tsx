import React from 'react'
import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="container mx-auto px-4 py-16">
      <section className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-6">Bienvenue chez Rust-in</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Votre spécialiste vélos d&apos;occasion et réparation
        </p>
        <Link 
          href="/bikes" 
          className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition"
        >
          Voir nos vélos
        </Link>
      </section>
    </main>
  )
}

export const metadata = {
  title: 'Rust-in - Vélos d\'occasion',
  description: 'Votre spécialiste vélos d\'occasion et réparation',
}
