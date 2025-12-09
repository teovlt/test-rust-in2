import React from 'react'
import {
  Bike,
  Phone,
  Sparkles,
  Mountain,
  Zap,
  ShoppingBag,
  Shield,
  Wrench,
  BadgeCheck,
} from 'lucide-react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import Image from 'next/image'
import Link from 'next/link'
import { ShopClient } from './ShopClient'

async function getData() {
  const payload = await getPayload({ config: configPromise })

  const [bikes, skis, scooters] = await Promise.all([
    payload.find({
      collection: 'bikes',
      limit: 100,
      depth: 1,
    }),
    payload.find({
      collection: 'skis',
      limit: 100,
      depth: 1,
    }),
    payload.find({
      collection: 'scooters',
      limit: 100,
      depth: 1,
    }),
  ])

  return {
    bikes: bikes.docs,
    skis: skis.docs,
    scooters: scooters.docs,
  }
}

export default async function ShopPage() {
  const { bikes, skis, scooters } = await getData()
  const totalItems = bikes.length + skis.length + scooters.length

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary via-primary/90 to-accent text-primary-foreground py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-accent/30 rounded-full blur-3xl" />
          <Bike className="absolute top-10 right-[15%] w-20 h-20 text-white/10 rotate-12" />
          <Mountain className="absolute bottom-10 left-[10%] w-16 h-16 text-white/10 -rotate-12" />
          <Zap className="absolute top-1/2 right-10 w-14 h-14 text-white/5" />
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/20 text-primary-foreground px-4 py-2 rounded-full mb-6 backdrop-blur-sm">
            <ShoppingBag className="w-5 h-5" />
            <span className="font-medium">
              {totalItems} article{totalItems > 1 ? 's' : ''} disponible{totalItems > 1 ? 's' : ''}
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 handwritten-title">Notre boutique</h1>

          <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-2xl mx-auto mb-8">
            Vélos, skis et trottinettes d&apos;occasion reconditionnés avec soin
          </p>

          {/* Category pills */}
          <div className="flex flex-wrap justify-center gap-3">
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <Bike className="w-4 h-4" />
              <span>{bikes.length} vélos</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <Mountain className="w-4 h-4" />
              <span>{skis.length} paires de skis</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <Zap className="w-4 h-4" />
              <span>{scooters.length} trottinettes</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features banner */}
      <section className="bg-card border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <span className="font-medium">Garantie 3 mois</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Wrench className="w-5 h-5 text-primary" />
              </div>
              <span className="font-medium">Révisé par nos experts</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <BadgeCheck className="w-5 h-5 text-primary" />
              </div>
              <span className="font-medium">Qualité vérifiée</span>
            </div>
          </div>
        </div>
      </section>

      {/* Shop Content - Client Component */}
      <ShopClient bikes={bikes} skis={skis} scooters={scooters} />

      {/* Contact CTA */}
      <section className="py-16 bg-gradient-to-br from-primary/5 to-accent/10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Sparkles className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4 handwritten-title">
              Vous ne trouvez pas ce que vous cherchez ?
            </h2>
            <p className="text-muted-foreground mb-8 text-lg">
              Notre stock change régulièrement. Contactez-nous pour nous faire part de vos besoins !
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-xl font-semibold hover:bg-primary/90 transition-all shadow-lg hover:scale-105"
              >
                <Phone className="w-5 h-5" />
                Nous contacter
              </Link>
              <Link
                href="/prices"
                className="inline-flex items-center justify-center gap-2 bg-card text-foreground px-8 py-4 rounded-xl font-semibold hover:bg-accent transition-all border border-border"
              >
                Voir nos tarifs réparation
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export const metadata = {
  title: 'Boutique - Vélos, Skis & Trottinettes - Rust-in',
  description:
    "Découvrez nos vélos, skis et trottinettes d'occasion reconditionnés. Qualité garantie.",
}

export const revalidate = 60
