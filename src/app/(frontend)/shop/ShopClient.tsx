'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Bike, Mountain, Zap, Grid3X3, LayoutList, SlidersHorizontal, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

type BikeItem = {
  id: string
  name: string
  price: number
  kilometers: number
  humanSize: string
  photo: { url: string } | string | null
  description?: string
}

type SkiItem = {
  id: string
  name: string
  price: number
  skiType: string
  size: number
  level: string
  photo: { url: string } | string | null
  withBindings?: boolean | null
  description?: string
}

type ScooterItem = {
  id: string
  name: string
  price: number
  scooterType: string
  isElectric?: boolean | null
  maxSpeed?: number | null
  range?: number | null
  maxWeight?: number | null
  photo: { url: string } | string | null
  description?: string
}

type ShopClientProps = {
  bikes: any[]
  skis: any[]
  scooters: any[]
}

const sizeLabels: Record<string, string> = {
  xs: 'XS',
  s: 'S',
  m: 'M',
  l: 'L',
  xl: 'XL',
}

const skiTypeLabels: Record<string, string> = {
  alpine: 'Alpin',
  freestyle: 'Freestyle',
  freeride: 'Freeride',
  'cross-country': 'Fond',
  touring: 'Randonnée',
}

const skiLevelLabels: Record<string, string> = {
  beginner: 'Débutant',
  intermediate: 'Intermédiaire',
  advanced: 'Avancé',
  expert: 'Expert',
}

const scooterTypeLabels: Record<string, string> = {
  urban: 'Urbain',
  freestyle: 'Freestyle',
  offroad: 'Tout-terrain',
  kids: 'Enfant',
}

export function ShopClient({ bikes, skis, scooters }: ShopClientProps) {
  const [activeCategory, setActiveCategory] = useState<'all' | 'bikes' | 'skis' | 'scooters'>('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const categories = [
    { id: 'all' as const, label: 'Tout', icon: Grid3X3, count: bikes.length + skis.length + scooters.length },
    { id: 'bikes' as const, label: 'Vélos', icon: Bike, count: bikes.length },
    { id: 'skis' as const, label: 'Skis', icon: Mountain, count: skis.length },
    { id: 'scooters' as const, label: 'Trottinettes', icon: Zap, count: scooters.length },
  ]

  const filteredItems = () => {
    switch (activeCategory) {
      case 'bikes':
        return { bikes, skis: [], scooters: [] }
      case 'skis':
        return { bikes: [], skis, scooters: [] }
      case 'scooters':
        return { bikes: [], skis: [], scooters }
      default:
        return { bikes, skis, scooters }
    }
  }

  const { bikes: filteredBikes, skis: filteredSkis, scooters: filteredScooters } = filteredItems()
  const hasItems = filteredBikes.length > 0 || filteredSkis.length > 0 || filteredScooters.length > 0

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        {/* Filters bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          {/* Category tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all ${
                  activeCategory === cat.id
                    ? 'bg-primary text-primary-foreground shadow-lg'
                    : 'bg-card hover:bg-accent border border-border'
                }`}
              >
                <cat.icon className="w-4 h-4" />
                <span>{cat.label}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  activeCategory === cat.id ? 'bg-white/20' : 'bg-muted'
                }`}>
                  {cat.count}
                </span>
              </button>
            ))}
          </div>

          {/* View mode toggle */}
          <div className="flex items-center gap-2 bg-card border rounded-xl p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'grid' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
              }`}
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'list' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
              }`}
            >
              <LayoutList className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content */}
        {!hasItems ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              {activeCategory === 'bikes' && <Bike className="w-12 h-12 text-primary" />}
              {activeCategory === 'skis' && <Mountain className="w-12 h-12 text-primary" />}
              {activeCategory === 'scooters' && <Zap className="w-12 h-12 text-primary" />}
              {activeCategory === 'all' && <Grid3X3 className="w-12 h-12 text-primary" />}
            </div>
            <h2 className="text-2xl font-bold mb-2">Aucun article disponible</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Nous n&apos;avons pas d&apos;articles dans cette catégorie pour le moment. Revenez bientôt !
            </p>
          </div>
        ) : (
          <div className="space-y-12">
            {/* Bikes section */}
            {filteredBikes.length > 0 && (
              <div>
                {activeCategory === 'all' && (
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                      <Bike className="w-5 h-5 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold">Vélos</h2>
                    <span className="text-muted-foreground">({filteredBikes.length})</span>
                  </div>
                )}
                <div className={viewMode === 'grid' 
                  ? 'grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                  : 'space-y-4'
                }>
                  {filteredBikes.map((bike: any) => (
                    <BikeCard key={bike.id} bike={bike} viewMode={viewMode} />
                  ))}
                </div>
              </div>
            )}

            {/* Skis section */}
            {filteredSkis.length > 0 && (
              <div>
                {activeCategory === 'all' && (
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                      <Mountain className="w-5 h-5 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold">Skis</h2>
                    <span className="text-muted-foreground">({filteredSkis.length})</span>
                  </div>
                )}
                <div className={viewMode === 'grid' 
                  ? 'grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                  : 'space-y-4'
                }>
                  {filteredSkis.map((ski: any) => (
                    <SkiCard key={ski.id} ski={ski} viewMode={viewMode} />
                  ))}
                </div>
              </div>
            )}

            {/* Scooters section */}
            {filteredScooters.length > 0 && (
              <div>
                {activeCategory === 'all' && (
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                      <Zap className="w-5 h-5 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold">Trottinettes</h2>
                    <span className="text-muted-foreground">({filteredScooters.length})</span>
                  </div>
                )}
                <div className={viewMode === 'grid' 
                  ? 'grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                  : 'space-y-4'
                }>
                  {filteredScooters.map((scooter: any) => (
                    <ScooterCard key={scooter.id} scooter={scooter} viewMode={viewMode} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}

// Bike Card Component
function BikeCard({ bike, viewMode }: { bike: any; viewMode: 'grid' | 'list' }) {
  const photoUrl = bike.photo && typeof bike.photo === 'object' ? bike.photo.url : null

  if (viewMode === 'list') {
    return (
      <div className="bg-card rounded-2xl border border-border overflow-hidden hover:border-primary/50 transition-all flex">
        <div className="w-48 h-48 relative bg-gradient-to-br from-primary/5 to-accent/10 flex-shrink-0">
          {photoUrl ? (
            <Image src={photoUrl} alt={bike.name} fill className="object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Bike className="w-16 h-16 text-muted-foreground/20" />
            </div>
          )}
        </div>
        <div className="flex-1 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-xl font-bold">{bike.name}</h3>
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                {sizeLabels[bike.humanSize] || bike.humanSize}
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-2">
              {bike.kilometers?.toLocaleString('fr-FR')} km parcourus
            </p>
            {bike.description && (
              <p className="text-sm text-muted-foreground line-clamp-2">{bike.description}</p>
            )}
          </div>
          <div className="flex items-center justify-between pt-4">
            <span className="text-2xl font-bold text-primary">{bike.price?.toLocaleString('fr-FR')} €</span>
            <Link
              href="/contact"
              className="bg-primary text-primary-foreground px-6 py-2 rounded-xl font-semibold hover:bg-primary/90 transition-all"
            >
              Intéressé ?
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-card rounded-2xl border border-border overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-xl group">
      <div className="aspect-square relative bg-gradient-to-br from-primary/5 to-accent/10 overflow-hidden">
        {photoUrl ? (
          <Image
            src={photoUrl}
            alt={bike.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Bike className="w-20 h-20 text-muted-foreground/20" />
          </div>
        )}
        <div className="absolute top-3 left-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-bold">
          VÉLO
        </div>
        <div className="absolute top-3 right-3 bg-background/95 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold">
          {sizeLabels[bike.humanSize] || bike.humanSize}
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-lg font-bold mb-2 line-clamp-2">{bike.name}</h3>
        <p className="text-sm text-muted-foreground mb-4">
          {bike.kilometers?.toLocaleString('fr-FR')} km parcourus
        </p>
        <div className="flex items-center justify-between pt-3 border-t border-border">
          <span className="text-2xl font-bold text-primary">{bike.price?.toLocaleString('fr-FR')} €</span>
          <Link
            href="/contact"
            className="bg-primary text-primary-foreground px-4 py-2 rounded-xl text-sm font-semibold hover:bg-primary/90 transition-all"
          >
            Intéressé ?
          </Link>
        </div>
      </div>
    </div>
  )
}

// Ski Card Component
function SkiCard({ ski, viewMode }: { ski: any; viewMode: 'grid' | 'list' }) {
  const photoUrl = ski.photo && typeof ski.photo === 'object' ? ski.photo.url : null

  if (viewMode === 'list') {
    return (
      <div className="bg-card rounded-2xl border border-border overflow-hidden hover:border-primary/50 transition-all flex">
        <div className="w-48 h-48 relative bg-gradient-to-br from-blue-500/5 to-cyan-500/10 flex-shrink-0">
          {photoUrl ? (
            <Image src={photoUrl} alt={ski.name} fill className="object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Mountain className="w-16 h-16 text-muted-foreground/20" />
            </div>
          )}
        </div>
        <div className="flex-1 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-xl font-bold">{ski.name}</h3>
              <div className="flex gap-2">
                <span className="bg-blue-500/10 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                  {ski.size} cm
                </span>
                {ski.withBindings && (
                  <span className="bg-green-500/10 text-green-600 px-3 py-1 rounded-full text-sm font-medium">
                    + Fixations
                  </span>
                )}
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-2">
              {skiTypeLabels[ski.skiType]} • {skiLevelLabels[ski.level]}
            </p>
            {ski.description && (
              <p className="text-sm text-muted-foreground line-clamp-2">{ski.description}</p>
            )}
          </div>
          <div className="flex items-center justify-between pt-4">
            <span className="text-2xl font-bold text-primary">{ski.price?.toLocaleString('fr-FR')} €</span>
            <Link
              href="/contact"
              className="bg-primary text-primary-foreground px-6 py-2 rounded-xl font-semibold hover:bg-primary/90 transition-all"
            >
              Intéressé ?
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-card rounded-2xl border border-border overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-xl group">
      <div className="aspect-square relative bg-gradient-to-br from-blue-500/5 to-cyan-500/10 overflow-hidden">
        {photoUrl ? (
          <Image
            src={photoUrl}
            alt={ski.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Mountain className="w-20 h-20 text-muted-foreground/20" />
          </div>
        )}
        <div className="absolute top-3 left-3 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold">
          SKI
        </div>
        <div className="absolute top-3 right-3 bg-background/95 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold">
          {ski.size} cm
        </div>
        {ski.withBindings && (
          <div className="absolute bottom-3 left-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
            + Fixations
          </div>
        )}
      </div>
      <div className="p-5">
        <h3 className="text-lg font-bold mb-2 line-clamp-2">{ski.name}</h3>
        <div className="flex gap-2 mb-4">
          <span className="text-xs bg-muted px-2 py-1 rounded-full">{skiTypeLabels[ski.skiType]}</span>
          <span className="text-xs bg-muted px-2 py-1 rounded-full">{skiLevelLabels[ski.level]}</span>
        </div>
        <div className="flex items-center justify-between pt-3 border-t border-border">
          <span className="text-2xl font-bold text-primary">{ski.price?.toLocaleString('fr-FR')} €</span>
          <Link
            href="/contact"
            className="bg-primary text-primary-foreground px-4 py-2 rounded-xl text-sm font-semibold hover:bg-primary/90 transition-all"
          >
            Intéressé ?
          </Link>
        </div>
      </div>
    </div>
  )
}

// Scooter Card Component
function ScooterCard({ scooter, viewMode }: { scooter: any; viewMode: 'grid' | 'list' }) {
  const photoUrl = scooter.photo && typeof scooter.photo === 'object' ? scooter.photo.url : null

  if (viewMode === 'list') {
    return (
      <div className="bg-card rounded-2xl border border-border overflow-hidden hover:border-primary/50 transition-all flex">
        <div className="w-48 h-48 relative bg-gradient-to-br from-purple-500/5 to-pink-500/10 flex-shrink-0">
          {photoUrl ? (
            <Image src={photoUrl} alt={scooter.name} fill className="object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Zap className="w-16 h-16 text-muted-foreground/20" />
            </div>
          )}
        </div>
        <div className="flex-1 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-xl font-bold">{scooter.name}</h3>
              <div className="flex gap-2">
                {scooter.isElectric && (
                  <span className="bg-yellow-500/10 text-yellow-600 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                    <Zap className="w-3 h-3" /> Électrique
                  </span>
                )}
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-2">
              {scooterTypeLabels[scooter.scooterType]}
              {scooter.isElectric && scooter.maxSpeed && ` • Max ${scooter.maxSpeed} km/h`}
              {scooter.isElectric && scooter.range && ` • ${scooter.range} km d'autonomie`}
            </p>
            {scooter.description && (
              <p className="text-sm text-muted-foreground line-clamp-2">{scooter.description}</p>
            )}
          </div>
          <div className="flex items-center justify-between pt-4">
            <span className="text-2xl font-bold text-primary">{scooter.price?.toLocaleString('fr-FR')} €</span>
            <Link
              href="/contact"
              className="bg-primary text-primary-foreground px-6 py-2 rounded-xl font-semibold hover:bg-primary/90 transition-all"
            >
              Intéressé ?
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-card rounded-2xl border border-border overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-xl group">
      <div className="aspect-square relative bg-gradient-to-br from-purple-500/5 to-pink-500/10 overflow-hidden">
        {photoUrl ? (
          <Image
            src={photoUrl}
            alt={scooter.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Zap className="w-20 h-20 text-muted-foreground/20" />
          </div>
        )}
        <div className="absolute top-3 left-3 bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-bold">
          TROTTINETTE
        </div>
        {scooter.isElectric && (
          <div className="absolute top-3 right-3 bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
            <Zap className="w-3 h-3" /> Électrique
          </div>
        )}
      </div>
      <div className="p-5">
        <h3 className="text-lg font-bold mb-2 line-clamp-2">{scooter.name}</h3>
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="text-xs bg-muted px-2 py-1 rounded-full">{scooterTypeLabels[scooter.scooterType]}</span>
          {scooter.isElectric && scooter.maxSpeed && (
            <span className="text-xs bg-muted px-2 py-1 rounded-full">{scooter.maxSpeed} km/h</span>
          )}
          {scooter.isElectric && scooter.range && (
            <span className="text-xs bg-muted px-2 py-1 rounded-full">{scooter.range} km</span>
          )}
        </div>
        <div className="flex items-center justify-between pt-3 border-t border-border">
          <span className="text-2xl font-bold text-primary">{scooter.price?.toLocaleString('fr-FR')} €</span>
          <Link
            href="/contact"
            className="bg-primary text-primary-foreground px-4 py-2 rounded-xl text-sm font-semibold hover:bg-primary/90 transition-all"
          >
            Intéressé ?
          </Link>
        </div>
      </div>
    </div>
  )
}

