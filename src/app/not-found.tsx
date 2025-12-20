import Link from 'next/link'
import React from 'react'
import { Home, Bike, Wrench, MapPin, ArrowLeft } from 'lucide-react'
import { Nunito } from 'next/font/google'

import './globals.css'

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
})

export default function NotFound() {
  return (
    <html lang="fr">
      <body className={`${nunito.className} ${nunito.variable}`}>
        <div className="bg-gradient-to-br from-orange-50 via-white to-orange-100 min-h-screen flex items-center justify-center">
          <div className="container px-4 py-16">
            <div className="max-w-2xl mx-auto text-center">
              {/* Animated bike icon */}
              <div className="relative mb-8">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 bg-orange-200 rounded-full animate-ping opacity-30" />
                </div>
                <div className="relative flex items-center justify-center">
                  <div className="w-40 h-40 bg-gradient-to-br from-orange-200 to-orange-100 rounded-full flex items-center justify-center">
                    <Bike className="w-20 h-20 text-orange-500 animate-bounce" />
                  </div>
                </div>
              </div>

              {/* 404 Text */}
              <h1 className="text-8xl md:text-9xl font-black text-orange-500 mb-4 tracking-tight">
                404
              </h1>

              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Oups ! Cette page a pris la poudre d&apos;escampette 🚴
              </h2>

              <p className="text-lg text-gray-600 mb-10 max-w-md mx-auto">
                On dirait que cette page a fait une crevaison en chemin... Pas de panique, on peut
                vous ramener à bon port !
              </p>

              {/* Main CTA Button */}
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-3 bg-orange-500 text-white px-10 py-5 rounded-2xl font-bold text-xl hover:bg-orange-600 transition-all hover:scale-105 shadow-xl shadow-orange-500/25 mb-12"
              >
                <Home className="w-6 h-6" />
                Retour à l&apos;accueil
              </Link>

              {/* Quick links */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-lg mx-auto">
                <Link
                  href="/shop"
                  className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white border border-gray-200 hover:border-orange-300 hover:bg-orange-50 transition-all group"
                >
                  <Bike className="w-8 h-8 text-gray-400 group-hover:text-orange-500 transition-colors" />
                  <span className="text-sm font-medium text-gray-700">Boutique</span>
                </Link>
                <Link
                  href="/about"
                  className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white border border-gray-200 hover:border-orange-300 hover:bg-orange-50 transition-all group"
                >
                  <Wrench className="w-8 h-8 text-gray-400 group-hover:text-orange-500 transition-colors" />
                  <span className="text-sm font-medium text-gray-700">À propos</span>
                </Link>
                <Link
                  href="/contact"
                  className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white border border-gray-200 hover:border-orange-300 hover:bg-orange-50 transition-all group"
                >
                  <MapPin className="w-8 h-8 text-gray-400 group-hover:text-orange-500 transition-colors" />
                  <span className="text-sm font-medium text-gray-700">Contact</span>
                </Link>
              </div>

              {/* Decorative elements */}
              <div className="mt-16 flex items-center justify-center gap-2 text-gray-400">
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm">Utilisez le bouton retour de votre navigateur</span>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
