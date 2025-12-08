import React from 'react'
import { Wrench, Check, Clock, Shield } from 'lucide-react'
import Link from 'next/link'

export default function PricesPage() {
  const repairs = [
    { name: 'Crevaison (rustine)', price: '8 €', duration: '15 min' },
    { name: 'Changement chambre à air', price: '15 €', duration: '20 min' },
    { name: 'Changement pneu', price: '20 €', duration: '25 min' },
    { name: 'Réglage freins', price: '12 €', duration: '15 min' },
    { name: 'Changement plaquettes de frein', price: '25 €', duration: '30 min' },
    { name: 'Réglage dérailleur', price: '15 €', duration: '20 min' },
    { name: 'Changement chaîne', price: '20 €', duration: '20 min' },
    { name: 'Changement cassette', price: '30 €', duration: '30 min' },
    { name: 'Changement câbles et gaines', price: '25 €', duration: '40 min' },
    { name: 'Révision complète', price: '60 €', duration: '1h30' },
  ]

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-accent/20 py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
            <Wrench className="w-5 h-5" />
            <span className="font-medium">Atelier de réparation</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Nos <span className="text-primary">tarifs</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
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
                  {repairs.map((repair, index) => (
                    <tr 
                      key={repair.name}
                      className={`border-t border-border ${index % 2 === 0 ? 'bg-background' : 'bg-muted/20'}`}
                    >
                      <td className="px-6 py-4">{repair.name}</td>
                      <td className="px-6 py-4 text-center text-muted-foreground">{repair.duration}</td>
                      <td className="px-6 py-4 text-right font-bold text-primary">{repair.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-sm text-muted-foreground text-center mt-6">
              * Prix hors pièces. Devis gratuit pour toute réparation complexe.
            </p>

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

export const metadata = {
  title: 'Tarifs - Rust-in',
  description: 'Découvrez nos tarifs de réparation vélo à Toulouse',
}

