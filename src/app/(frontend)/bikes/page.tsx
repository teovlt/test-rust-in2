import React from 'react'
import { Bike, Filter, Search } from 'lucide-react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import Image from 'next/image'
import Link from 'next/link'

async function getBikes() {
  const payload = await getPayload({ config: configPromise })
  
  const bikes = await payload.find({
    collection: 'bikes',
    limit: 100,
  })
  
  return bikes.docs
}

export default async function BikesPage() {
  const bikes = await getBikes()

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-accent/20 py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
            <Bike className="w-5 h-5" />
            <span className="font-medium">{bikes.length} vélos disponibles</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Nos <span className="text-primary">vélos</span> à vendre
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Découvrez notre sélection de vélos d&apos;occasion reconditionnés avec soin
          </p>
        </div>
      </section>

      {/* Bikes Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {bikes.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Bike className="w-12 h-12 text-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Aucun vélo disponible</h2>
              <p className="text-muted-foreground mb-8">
                Revenez bientôt, de nouveaux vélos arrivent régulièrement !
              </p>
              <Link 
                href="/contact"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-all"
              >
                Nous contacter
              </Link>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {bikes.map((bike: any) => (
                <div 
                  key={bike.id}
                  className="bg-card rounded-2xl border border-border overflow-hidden hover:border-primary/50 transition-all hover:shadow-lg group"
                >
                  {/* Image */}
                  <div className="aspect-square relative bg-muted">
                    {bike.photo && typeof bike.photo === 'object' && bike.photo.url ? (
                      <Image
                        src={bike.photo.url}
                        alt={bike.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Bike className="w-16 h-16 text-muted-foreground/30" />
                      </div>
                    )}
                    {/* Size badge */}
                    <div className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                      Taille {bike.humanSize?.toUpperCase()}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-5">
                    <h3 className="text-lg font-bold mb-2 truncate">{bike.name}</h3>
                    
                    <div className="flex items-center gap-2 text-muted-foreground text-sm mb-4">
                      <span>{bike.kilometers?.toLocaleString()} km</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-primary">
                        {bike.price?.toLocaleString()} €
                      </span>
                      <Link
                        href="/contact"
                        className="bg-primary/10 text-primary px-4 py-2 rounded-lg font-medium hover:bg-primary hover:text-primary-foreground transition-all"
                      >
                        Intéressé ?
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}

export const metadata = {
  title: 'Vélos à vendre - Rust-in',
  description: 'Découvrez nos vélos d\'occasion reconditionnés à Toulouse',
}

