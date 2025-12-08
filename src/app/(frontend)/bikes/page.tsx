import React from 'react'
import { Bike, Filter, MapPin, Phone } from 'lucide-react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import Image from 'next/image'
import Link from 'next/link'

async function getBikes() {
  const payload = await getPayload({ config: configPromise })

  const bikes = await payload.find({
    collection: 'bikes',
    limit: 100,
    depth: 1,
  })

  return bikes.docs
}

const sizeLabels: Record<string, string> = {
  xs: 'XS (< 1m55)',
  s: 'S (1m55 - 1m65)',
  m: 'M (1m65 - 1m75)',
  l: 'L (1m75 - 1m85)',
  xl: 'XL (> 1m85)',
}

export default async function BikesPage() {
  const bikes = await getBikes()

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-accent/20 py-16 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
            <Bike className="w-5 h-5" />
            <span className="font-medium">
              {bikes.length} vélo{bikes.length > 1 ? 's' : ''} disponible
              {bikes.length > 1 ? 's' : ''}
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Nos <span className="text-primary">vélos</span> à vendre
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Découvrez notre sélection de vélos d&apos;occasion reconditionnés avec soin par nos
            experts
          </p>
        </div>
      </section>

      {/* Bikes Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {bikes.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
                <Bike className="w-16 h-16 text-primary" />
              </div>
              <h2 className="text-3xl font-bold mb-4">Aucun vélo disponible</h2>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                Nous n&apos;avons pas de vélos en stock pour le moment. Revenez bientôt, de nouveaux
                vélos arrivent régulièrement !
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-xl font-semibold hover:bg-primary/90 transition-all shadow-lg"
              >
                <Phone className="w-5 h-5" />
                Nous contacter
              </Link>
            </div>
          ) : (
            <>
              {/* Grid of bikes */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {bikes.map((bike: any) => (
                  <div
                    key={bike.id}
                    className="bg-card rounded-2xl border border-border overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-xl group"
                  >
                    {/* Image */}
                    <div className="aspect-square relative bg-gradient-to-br from-primary/5 to-accent/10 overflow-hidden">
                      {bike.photo && typeof bike.photo === 'object' && bike.photo.url ? (
                        <Image
                          src={bike.photo.url}
                          alt={bike.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Bike className="w-20 h-20 text-muted-foreground/20" />
                        </div>
                      )}

                      {/* Size badge */}
                      <div className="absolute top-4 right-4 bg-background/95 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-semibold shadow-lg">
                        {sizeLabels[bike.humanSize] || bike.humanSize?.toUpperCase()}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-3 line-clamp-2">{bike.name}</h3>

                      {/* Kilometers */}
                      <div className="flex items-center gap-2 text-muted-foreground text-sm mb-4">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                          />
                        </svg>
                        <span>{bike.kilometers?.toLocaleString('fr-FR')} km parcourus</span>
                      </div>

                      {/* Description if available */}
                      {bike.description && (
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                          {bike.description}
                        </p>
                      )}

                      {/* Price and CTA */}
                      <div className="flex items-center justify-between pt-4 border-t border-border">
                        <div>
                          <p className="text-xs text-muted-foreground">Prix</p>
                          <span className="text-3xl font-bold text-primary">
                            {bike.price?.toLocaleString('fr-FR')} €
                          </span>
                        </div>
                        <Link
                          href="/contact"
                          className="bg-primary text-primary-foreground px-5 py-2.5 rounded-xl font-semibold hover:bg-primary/90 transition-all hover:scale-105"
                        >
                          Intéressé ?
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Contact CTA */}
              <div className="mt-16 bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl p-8 md:p-12 text-center border border-primary/20">
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                  Vous ne trouvez pas votre bonheur ?
                </h3>
                <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Nous recevons régulièrement de nouveaux vélos. Contactez-nous pour nous faire part
                  de vos besoins !
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-xl font-semibold hover:bg-primary/90 transition-all shadow-lg"
                  >
                    <Phone className="w-5 h-5" />
                    Nous contacter
                  </Link>
                  <Link
                    href="/prices"
                    className="inline-flex items-center justify-center gap-2 bg-card text-card-foreground px-8 py-4 rounded-xl font-semibold hover:bg-accent transition-all border border-border"
                  >
                    <MapPin className="w-5 h-5" />
                    Voir nos tarifs
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Why choose us */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Pourquoi acheter chez <span className="text-primary">Rust-in</span> ?
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Garantie 3 mois</h3>
              <p className="text-muted-foreground">
                Tous nos vélos sont garantis 3 mois pièces et main d&apos;œuvre
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Révision complète</h3>
              <p className="text-muted-foreground">
                Chaque vélo est entièrement révisé avant la vente
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Prix justes</h3>
              <p className="text-muted-foreground">Des vélos de qualité à des prix accessibles</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export const metadata = {
  title: 'Vélos à vendre - Rust-in',
  description:
    "Découvrez nos vélos d'occasion reconditionnés à Toulouse. Vélos de qualité garantis.",
}

// Revalidate every 60 seconds
export const revalidate = 60
