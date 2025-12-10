'use client'

import React from 'react'
import { Wrench, Check, Clock, Shield, Bike, Euro } from 'lucide-react'
import Link from 'next/link'

type Price = {
  label: string
  price: number
  time: string
}

type PricesClientProps = {
  prices: Price[]
}

export function PricesClient({ prices }: PricesClientProps) {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary via-primary/90 to-accent text-primary-foreground py-16 md:py-24 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-accent/30 rounded-full blur-3xl" />
          <Wrench className="absolute top-10 right-20 w-24 h-24 text-white/10 rotate-45" />
          <Euro className="absolute bottom-10 left-1/4 w-16 h-16 text-white/10" />
          <Bike className="absolute top-1/2 right-10 w-20 h-20 text-white/5 -rotate-12" />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/20 text-primary-foreground px-4 py-2 rounded-full mb-6 backdrop-blur-sm">
            <Wrench className="w-5 h-5" />
            <span className="font-medium">Atelier de réparation</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 handwritten-title">
            Nos tarifs
          </h1>
          <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-2xl mx-auto">
            Des prix transparents pour toutes vos réparations vélo
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="flex items-center gap-3 justify-center">
              <Clock className="w-6 h-6 text-primary" />
              <span className="font-medium">Réparation rapide</span>
            </div>
            <div className="flex items-center gap-3 justify-center">
              <Shield className="w-6 h-6 text-primary" />
              <span className="font-medium">Garantie 3 mois</span>
            </div>
            <div className="flex items-center gap-3 justify-center">
              <Check className="w-6 h-6 text-primary" />
              <span className="font-medium">Pièces de qualité</span>
            </div>
          </div>
        </div>
      </section>

      {/* Prices Table */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">Tarifs réparation</h2>
            
            {prices.length > 0 ? (
              <>
                <div className="bg-card rounded-2xl border border-border overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="text-left px-6 py-4 font-semibold">Prestation</th>
                        <th className="text-center px-6 py-4 font-semibold">Durée</th>
                        <th className="text-right px-6 py-4 font-semibold">Prix</th>
                      </tr>
                    </thead>
                    <tbody>
                      {prices.map((price, index) => (
                        <tr 
                          key={`${price.label}-${index}`}
                          className={`border-t border-border ${index % 2 === 0 ? 'bg-background' : 'bg-muted/20'}`}
                        >
                          <td className="px-6 py-4">{price.label}</td>
                          <td className="px-6 py-4 text-center text-muted-foreground">{price.time}</td>
                          <td className="px-6 py-4 text-right font-bold text-primary">
                            {price.price.toLocaleString('fr-FR')} €
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <p className="text-sm text-muted-foreground text-center mt-6">
                  * Prix hors pièces. Devis gratuit pour toute réparation complexe.
                </p>
              </>
            ) : (
              <div className="bg-card rounded-2xl border border-border p-12 text-center">
                <Wrench className="w-16 h-16 text-muted-foreground/20 mx-auto mb-4" />
                <p className="text-muted-foreground">Aucun tarif disponible pour le moment.</p>
              </div>
            )}

            {/* CTA */}
            <div className="mt-12 text-center">
              <p className="text-lg mb-6">Besoin d&apos;une réparation ?</p>
              <Link 
                href="/contact"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold hover:bg-primary/90 transition-all hover:scale-105 shadow-lg"
              >
                <Wrench className="w-5 h-5" />
                Prendre rendez-vous
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

