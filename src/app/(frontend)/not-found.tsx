import Link from 'next/link'
import React from 'react'
import { Home, Search, Bike, ArrowLeft, Wrench, MapPin } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-accent/20">
      <div className="container px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          {/* Animated bike icon */}
          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 bg-primary/10 rounded-full animate-ping" />
            </div>
            <div className="relative flex items-center justify-center">
              <div className="w-40 h-40 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full flex items-center justify-center">
                <Bike className="w-20 h-20 text-primary animate-bounce" />
              </div>
            </div>
          </div>

          {/* 404 Text */}
          <h1 className="text-8xl md:text-9xl font-black text-primary mb-4 tracking-tight">404</h1>

          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Oups ! Cette page a pris la poudre d&apos;escampette 🚴
          </h2>

          <p className="text-lg text-muted-foreground mb-10 max-w-md mx-auto">
            On dirait que cette page a fait une crevaison en chemin... Pas de panique, on peut vous
            ramener à bon port !
          </p>

          {/* Main CTA Button */}
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-3 bg-primary text-primary-foreground px-10 py-5 rounded-2xl font-bold text-xl hover:bg-primary/90 transition-all hover:scale-105 shadow-xl shadow-primary/25 mb-12"
          >
            <Home className="w-6 h-6" />
            Retour à l&apos;accueil
          </Link>

          {/* Quick links */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-lg mx-auto">
            <Link
              href="/bikes"
              className="flex flex-col items-center gap-2 p-4 rounded-xl bg-card border border-border hover:border-primary/50 hover:bg-accent/50 transition-all group"
            >
              <Bike className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors" />
              <span className="text-sm font-medium">Nos vélos</span>
            </Link>
            <Link
              href="/about"
              className="flex flex-col items-center gap-2 p-4 rounded-xl bg-card border border-border hover:border-primary/50 hover:bg-accent/50 transition-all group"
            >
              <Wrench className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors" />
              <span className="text-sm font-medium">À propos</span>
            </Link>
            <Link
              href="/contact"
              className="flex flex-col items-center gap-2 p-4 rounded-xl bg-card border border-border hover:border-primary/50 hover:bg-accent/50 transition-all group"
            >
              <MapPin className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors" />
              <span className="text-sm font-medium">Contact</span>
            </Link>
          </div>

          {/* Decorative elements */}
          <div className="mt-16 flex items-center justify-center gap-2 text-muted-foreground/50">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Utilisez le bouton retour de votre navigateur</span>
          </div>
        </div>
      </div>
    </div>
  )
}
