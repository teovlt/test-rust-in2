import React from 'react'
import Link from 'next/link'
import { Wrench, Bike, Heart } from 'lucide-react'

export default function HomePage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-background to-accent/30 py-20 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
            <Bike className="w-5 h-5" />
            <span className="font-medium">Vélos d&apos;occasion de qualité</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-foreground">
            Bienvenue chez{' '}
            <span className="text-primary">Rust-in</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Votre spécialiste vélos d&apos;occasion et réparation à Toulouse
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/bikes" 
              className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold hover:bg-primary/90 transition-all hover:scale-105 shadow-lg"
            >
              <Bike className="w-5 h-5" />
              Voir nos vélos
            </Link>
            <Link 
              href="/contact" 
              className="inline-flex items-center justify-center gap-2 bg-card text-card-foreground px-8 py-4 rounded-lg font-semibold hover:bg-accent transition-all border border-border"
            >
              <Wrench className="w-5 h-5" />
              Réparation
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Pourquoi choisir <span className="text-primary">Rust-in</span> ?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-background p-8 rounded-2xl shadow-sm border border-border hover:border-primary/50 transition-colors">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                <Bike className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Vélos reconditionnés</h3>
              <p className="text-muted-foreground">
                Chaque vélo est soigneusement inspecté et remis en état pour vous garantir qualité et sécurité.
              </p>
            </div>
            <div className="bg-background p-8 rounded-2xl shadow-sm border border-border hover:border-primary/50 transition-colors">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                <Wrench className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Réparation experte</h3>
              <p className="text-muted-foreground">
                Notre atelier répare tous types de vélos avec des pièces de qualité et un savoir-faire reconnu.
              </p>
            </div>
            <div className="bg-background p-8 rounded-2xl shadow-sm border border-border hover:border-primary/50 transition-colors">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                <Heart className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Engagement écologique</h3>
              <p className="text-muted-foreground">
                En donnant une seconde vie aux vélos, nous participons à une mobilité plus durable.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export const metadata = {
  title: 'Rust-in - Vélos d\'occasion à Toulouse',
  description: 'Votre spécialiste vélos d\'occasion et réparation à Toulouse. Vélos reconditionnés de qualité.',
}
