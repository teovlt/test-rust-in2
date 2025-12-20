'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Clock,
  Phone,
  Mail,
  Wrench,
  Bike,
  ChevronLeft,
  ChevronRight,
  ChevronDownIcon,
  ChevronDown,
  MapPin,
  Star,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Shield,
  Zap,
  CableCar,
  Scooter,
} from 'lucide-react'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

type Review = {
  name: string
  image: string | null
  rating: number
  text: string
}

type FAQItem = {
  question: string
  answer: string
}

type OpeningHour = {
  day: string
  hours: string
  isClosed: boolean
}

type ContactInfo = {
  address: string
  city: string
  postalCode: string
  country: string
  email: string
  phone: string
  socialLinks?: {
    facebook?: string
    instagram?: string
    twitter?: string
    linkedin?: string
  }
} | null

type HomePageClientProps = {
  reviews: Review[]
  faq: FAQItem[]
  openingHours: OpeningHour[]
  contactInfo: ContactInfo
}

// Default opening hours if none in backend
const defaultOpeningHours: OpeningHour[] = [
  { day: 'Lundi', hours: '9h00 - 18h00', isClosed: false },
  { day: 'Mardi', hours: '9h00 - 18h00', isClosed: false },
  { day: 'Mercredi', hours: '9h00 - 18h00', isClosed: false },
  { day: 'Jeudi', hours: '9h00 - 18h00', isClosed: false },
  { day: 'Vendredi', hours: '9h00 - 18h00', isClosed: false },
  { day: 'Samedi', hours: '10h00 - 16h00', isClosed: false },
  { day: 'Dimanche', hours: 'Fermé', isClosed: true },
]

export function HomePageClient({ reviews, faq, openingHours, contactInfo }: HomePageClientProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0)

  // Use data from backend or fallback to defaults
  const displayReviews = reviews.length > 0 ? reviews : []
  const displayFaq = faq.length > 0 ? faq : []
  const displayOpeningHours = openingHours.length > 0 ? openingHours : defaultOpeningHours

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 360
      const newScrollPosition =
        scrollContainerRef.current.scrollLeft +
        (direction === 'right' ? scrollAmount : -scrollAmount)
      scrollContainerRef.current.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth',
      })
    }
  }

  useEffect(() => {
    const navbar = document.getElementById('navbar')
    if (navbar) {
      document.documentElement.style.setProperty('--navbar-height', `${navbar.offsetHeight}px`)
    }
  }, [])

  useEffect(() => {
    const container = scrollContainerRef.current
    if (container) {
      checkScrollButtons()
      container.addEventListener('scroll', checkScrollButtons)
      window.addEventListener('resize', checkScrollButtons)
      return () => {
        container.removeEventListener('scroll', checkScrollButtons)
        window.removeEventListener('resize', checkScrollButtons)
      }
    }
  }, [displayReviews])

  // Auto-scroll reviews
  useEffect(() => {
    if (displayReviews.length <= 1) return
    const interval = setInterval(() => {
      if (scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
        if (scrollLeft >= scrollWidth - clientWidth - 10) {
          scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' })
        } else {
          scroll('right')
        }
      }
    }, 5000)
    return () => clearInterval(interval)
  }, [displayReviews])

  return (
    <div className="flex flex-col">
      {/* Hero Section - Full impact */}
      <section
        className="relative bg-gradient-to-br from-primary via-primary/90 to-accent text-primary-foreground overflow-hidden"
        style={{ minHeight: 'calc(100vh - var(--navbar-height))' }}
      >
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] bg-accent/30 rounded-full blur-3xl" />
          <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] bg-white/5 rounded-full blur-3xl" />
          {/* Floating icons */}
          <Bike
            className="absolute top-[15%] right-[10%] w-20 h-20 md:w-40 md:h-40 text-white/10 rotate-12 animate-bounce"
            style={{ animationDuration: '3s' }}
          />
          <Bike className="absolute bottom-[20%] left-[5%] w-14 h-14 md:w-28 md:h-28 text-white/5 -rotate-12" />
          <Wrench className="absolute top-[40%] left-[15%] w-10 h-10 md:w-20 md:h-20 text-white/10 rotate-45" />
          <Sparkles className="absolute top-[25%] right-[30%] w-6 h-6 md:w-12 md:h-12 text-white/20" />
        </div>

        <div className="container mx-auto px-4 relative z-10 flex items-center min-h-[calc(100vh-var(--navbar-height))]">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center py-8 md:py-16 w-full">
            {/* Left: Text content */}
            <div className="text-left">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1.5 md:px-4 md:py-2 rounded-full mb-4 md:mb-6">
                <Sparkles className="w-3.5 h-3.5 md:w-4 md:h-4" />
                <span className="text-xs md:text-sm font-medium">Atelier depuis 2015</span>
              </div>

              <h1 className="text-5xl sm:text-6xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 md:mb-6 text-balance handwritten-title leading-tight">
                Votre spécialiste mobilité !
              </h1>

              <p className="text-xl sm:text-2xl md:text-xl lg:text-2xl mb-6 md:mb-8 text-primary-foreground/90 leading-relaxed max-w-xl">
                Vente, réparation et entretien. Vos équipements entre de bonnes mains.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-8 md:mb-12">
                <Button
                  size="lg"
                  variant="secondary"
                  className="text-base sm:text-lg md:text-lg px-8 sm:px-6 md:px-8 py-6 sm:py-5 md:py-6 shadow-2xl hover:scale-105 transition-all group w-full sm:w-auto"
                  asChild
                >
                  <Link href="/contact" className="flex items-center justify-center gap-2">
                    <span className="whitespace-nowrap">Prendre rendez-vous</span>
                    <ArrowRight className="w-5 h-5 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                  </Link>
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-2 border-white/50 text-white hover:bg-white hover:text-primary text-base sm:text-lg md:text-lg px-8 sm:px-6 md:px-8 py-6 sm:py-5 md:py-6 w-full sm:w-auto"
                  asChild
                >
                  <Link href="/shop" className="flex items-center justify-center">
                    Voir la boutique
                  </Link>
                </Button>
              </div>

              {/* Quick stats */}
              <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-6 max-w-md mx-auto lg:mx-0 lg:max-w-none">
                <div className="text-center">
                  <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">500+</div>
                  <div className="text-[10px] sm:text-xs md:text-sm text-primary-foreground/70">
                    Équipements/mois
                  </div>
                </div>
                <div className="text-center border-x border-white/20 px-2 sm:px-4">
                  <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">9 ans</div>
                  <div className="text-[10px] sm:text-xs md:text-sm text-primary-foreground/70">
                    D'expérience
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">98%</div>
                  <div className="text-[10px] sm:text-xs md:text-sm text-primary-foreground/70">
                    Satisfaits
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Contact card */}
            <div className="hidden lg:block">
              <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-3">
                    <Clock className="w-6 h-6" />
                    Ouvert maintenant
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    {displayOpeningHours.slice(0, 6).map((hour, i) => (
                      <div
                        key={i}
                        className={`flex justify-between px-3 py-2 rounded-lg ${hour.isClosed ? 'bg-red-500/20' : 'bg-white/10'}`}
                      >
                        <span className="font-medium">{hour.day.slice(0, 3)}</span>
                        <span className="opacity-80">
                          {hour.isClosed ? 'Fermé' : hour.hours.replace(' - ', '-')}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-white/20 space-y-3">
                    {contactInfo?.phone && (
                      <a
                        href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}
                        className="flex items-center gap-3 hover:bg-white/10 p-2 rounded-lg transition-colors"
                      >
                        <Phone className="w-5 h-5" />
                        <span className="font-medium">{contactInfo.phone}</span>
                      </a>
                    )}
                    {contactInfo?.email && (
                      <a
                        href={`mailto:${contactInfo.email}`}
                        className="flex items-center gap-3 hover:bg-white/10 p-2 rounded-lg transition-colors"
                      >
                        <Mail className="w-5 h-5" />
                        <span className="font-medium">{contactInfo.email}</span>
                      </a>
                    )}
                  </div>

                  <Button
                    className="w-full bg-white text-primary hover:bg-white/90 mt-4"
                    size="lg"
                    asChild
                  >
                    <Link href="/contact">Nous contacter</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 md:bottom-8 left-0 right-0 flex items-center justify-center z-20">
          {/* Mobile: Arrow down icon */}
          <div className="md:hidden animate-bounce">
            <ChevronDown className="w-8 h-8 text-white/90 drop-shadow-lg" strokeWidth={2.5} />
          </div>
          {/* Desktop: Mouse icon */}
          <div className="hidden md:block animate-bounce">
            <div className="w-8 h-12 border-2 border-white/50 rounded-full flex justify-center pt-2">
              <div className="w-1.5 h-3 bg-white/70 rounded-full animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* Quick CTA Banner */}
      <section className="bg-primary py-3 md:py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-6 lg:gap-8 text-primary-foreground text-sm md:text-base">
            <div className="flex items-center gap-1.5 md:gap-2">
              <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5" />
              <span className="font-medium">Devis gratuit</span>
            </div>
            <div className="hidden sm:block w-px h-4 md:h-6 bg-white/30" />
            <div className="flex items-center gap-1.5 md:gap-2">
              <Zap className="w-4 h-4 md:w-5 md:h-5" />
              <span className="font-medium">Express</span>
            </div>
            <div className="hidden sm:block w-px h-4 md:h-6 bg-white/30" />
            <div className="flex items-center gap-1.5 md:gap-2">
              <Shield className="w-4 h-4 md:w-5 md:h-5" />
              <span className="font-medium">Garantie 90j</span>
            </div>
            <div className="hidden lg:block w-px h-4 md:h-6 bg-white/30" />
            <Button variant="secondary" size="sm" className="hidden sm:inline-flex" asChild>
              <Link href="/prices">Tarifs →</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 handwritten-title text-primary">
              Pourquoi nous choisir ?
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
              Une équipe passionnée, des réparations de qualité et un service client au top
            </p>
          </div>

          {/* Mobile: Single column layout, Desktop: Grid */}
          <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <Card className="group hover:shadow-xl transition-all hover:-translate-y-2 border-2 border-transparent hover:border-primary/30">
              <CardHeader className="pb-2">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-primary transition-colors">
                  <Bike className="w-7 h-7 text-primary group-hover:text-white transition-colors" />
                </div>
                <CardTitle className="text-xl">Vélos d'occasion</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  VTT, vélos de ville, électriques... Tous nos vélos sont révisés et garantis 3
                  mois.
                </CardDescription>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    Révision complète
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    Garantie 3 mois
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    Prix accessibles
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all hover:-translate-y-2 border-2 border-transparent hover:border-primary/30">
              <CardHeader className="pb-2">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-primary transition-colors">
                  <Scooter className="w-7 h-7 text-primary group-hover:text-white transition-colors" />
                </div>
                <CardTitle className="text-xl">Trottinettes</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  Électriques ou classiques, pour enfants ou adultes. Toutes vérifiées avant vente.
                </CardDescription>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    Batterie testée
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    Réparation express
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    Pièces détachées
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all hover:-translate-y-2 border-2 border-transparent hover:border-primary/30">
              <CardHeader className="pb-2">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-primary transition-colors">
                  <CableCar className="w-7 h-7 text-primary group-hover:text-white transition-colors" />
                </div>
                <CardTitle className="text-xl">Skis & équipements</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  Alpins, fond, freestyle... Skis d'occasion de qualité pour toutes les pratiques.
                </CardDescription>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    Tous niveaux
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    Avec ou sans fixations
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    Conseil expert
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8 md:mt-12">
            <Button size="default" className="md:hidden" variant="outline" asChild>
              <Link href="/about">En savoir plus →</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="bg-transparent hidden md:inline-flex"
            >
              <Link href="/about">En savoir plus sur nous →</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Reviews Section - Beautiful slider */}
      {displayReviews.length > 0 && (
        <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-br from-accent/30 via-accent/20 to-primary/10">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8 md:mb-12">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1.5 md:px-4 md:py-2 rounded-full mb-3 md:mb-4">
                <Star className="w-3.5 h-3.5 md:w-4 md:h-4 fill-current" />
                <span className="font-medium text-sm md:text-base">4.9/5 sur Google</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 handwritten-title text-primary">
                Ils nous font confiance
              </h2>
              <p className="text-sm md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
                Découvrez les avis de nos clients satisfaits
              </p>
            </div>

            <div className="relative max-w-6xl mx-auto">
              {/* Navigation buttons - hidden on mobile */}
              <button
                onClick={() => scroll('left')}
                className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-xl p-2 md:p-3 rounded-full hover:scale-110 transition-all -translate-x-2 md:-translate-x-4 hidden sm:flex ${
                  !canScrollLeft ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={!canScrollLeft}
                aria-label="Avis précédent"
              >
                <ChevronLeft className="h-5 w-5 md:h-6 md:w-6 text-primary" />
              </button>

              {/* Reviews container */}
              <div
                ref={scrollContainerRef}
                className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide scroll-smooth py-4 px-2 sm:px-8"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {displayReviews.map((review, index) => (
                  <Card
                    key={index}
                    className="flex-shrink-0 w-[280px] sm:w-[320px] md:w-[340px] shadow-lg hover:shadow-2xl transition-all border-0 bg-white"
                  >
                    <CardContent className="p-4 md:p-6">
                      {/* Stars */}
                      <div className="flex gap-0.5 md:gap-1 mb-3 md:mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 md:w-5 md:h-5 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'}`}
                          />
                        ))}
                      </div>

                      {/* Quote */}
                      <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6 leading-relaxed line-clamp-4">
                        "{review.text}"
                      </p>

                      {/* Author */}
                      <div className="flex items-center gap-2 md:gap-3 pt-3 md:pt-4 border-t">
                        <img
                          src={review.image || '/placeholder.svg'}
                          alt={review.name}
                          className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover ring-2 ring-primary/20"
                        />
                        <div>
                          <p className="font-semibold text-sm md:text-base text-foreground">
                            {review.name}
                          </p>
                          <p className="text-xs md:text-sm text-muted-foreground">Client vérifié</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <button
                onClick={() => scroll('right')}
                className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-xl p-2 md:p-3 rounded-full hover:scale-110 transition-all translate-x-2 md:translate-x-4 hidden sm:flex ${
                  !canScrollRight ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={!canScrollRight}
                aria-label="Avis suivant"
              >
                <ChevronRight className="h-5 w-5 md:h-6 md:w-6 text-primary" />
              </button>
            </div>

            {/* Dots indicator */}
            <div className="flex justify-center gap-1.5 md:gap-2 mt-6 md:mt-8">
              {displayReviews.slice(0, Math.min(5, displayReviews.length)).map((_, i) => (
                <div
                  key={i}
                  className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full transition-all ${
                    i === 0 ? 'w-4 md:w-6 bg-primary' : 'bg-primary/30'
                  }`}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      {displayFaq.length > 0 && (
        <section className="py-12 md:py-16 lg:py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start max-w-6xl mx-auto">
              {/* Left: Title and CTA */}
              <div className="lg:sticky lg:top-24 text-center lg:text-left">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 handwritten-title text-primary">
                  Questions fréquentes
                </h2>
                <p className="text-sm md:text-lg text-muted-foreground mb-6 md:mb-8 max-w-lg mx-auto lg:mx-0">
                  Vous avez des questions ? Voici les réponses aux questions les plus posées.
                </p>

                <Card className="bg-primary/5 border-primary/20 hidden lg:block">
                  <CardContent className="p-4 md:p-6">
                    <h3 className="font-semibold text-base md:text-lg mb-2">
                      Vous n'avez pas trouvé votre réponse ?
                    </h3>
                    <p className="text-sm md:text-base text-muted-foreground mb-4">
                      Notre équipe est là pour vous aider. Contactez-nous directement !
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button asChild size="sm" className="md:size-default">
                        <Link href="/contact">
                          <Mail className="w-4 h-4 mr-2" />
                          Nous contacter
                        </Link>
                      </Button>
                      <Button variant="outline" className="bg-transparent" size="sm" asChild>
                        <a href="tel:5551234567">
                          <Phone className="w-4 h-4 mr-2" />
                          Appeler
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right: FAQ items */}
              <div className="space-y-2 md:space-y-3">
                {displayFaq.map((faqItem, index) => (
                  <div
                    key={index}
                    className={`bg-card rounded-lg md:rounded-xl border-2 transition-all cursor-pointer ${
                      openFaq === index
                        ? 'border-primary shadow-lg'
                        : 'border-border hover:border-primary/30'
                    }`}
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  >
                    <div className="flex items-center justify-between p-3 md:p-5">
                      <h3 className="font-semibold text-sm md:text-lg pr-3 md:pr-4">
                        {faqItem.question}
                      </h3>
                      <div
                        className={`flex-shrink-0 w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center transition-colors ${
                          openFaq === index ? 'bg-primary text-white' : 'bg-primary/10'
                        }`}
                      >
                        <ChevronDownIcon
                          className={`w-4 h-4 md:w-5 md:h-5 transition-transform ${openFaq === index ? 'rotate-180' : ''}`}
                        />
                      </div>
                    </div>
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        openFaq === index ? 'max-h-96' : 'max-h-0'
                      }`}
                    >
                      <p className="px-3 md:px-5 pb-3 md:pb-5 text-sm md:text-base text-muted-foreground leading-relaxed">
                        {faqItem.answer}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Mobile CTA - shown only on mobile */}
              <div className="lg:hidden mt-6">
                <Card className="bg-primary/5 border-primary/20">
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-sm mb-2">Pas trouvé votre réponse ?</h3>
                    <div className="flex gap-2">
                      <Button asChild size="sm" className="flex-1">
                        <Link href="/contact">Nous contacter</Link>
                      </Button>
                      <Button variant="outline" className="bg-transparent" size="sm" asChild>
                        <a href="tel:5551234567">
                          <Phone className="w-4 h-4" />
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Final CTA Section */}
      <section className="py-12 md:py-16 lg:py-24 bg-gradient-to-br from-primary via-primary/95 to-accent text-primary-foreground relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-48 md:w-96 h-48 md:h-96 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 md:w-96 h-48 md:h-96 bg-accent/20 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Bike className="w-10 h-10 md:w-16 md:h-16 mx-auto mb-4 md:mb-6 opacity-80" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-3 md:mb-6 handwritten-title">
              Prêt à vous équiper ?
            </h2>
            <p className="text-sm sm:text-base md:text-xl lg:text-2xl mb-6 md:mb-10 opacity-90 max-w-2xl mx-auto px-4">
              Vélo, ski ou trottinette : révision, réparation ou achat, on s'occupe de tout !
            </p>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mb-8 md:mb-12">
              <Button
                size="lg"
                variant="secondary"
                className="text-sm md:text-lg px-6 md:px-10 py-5 md:py-6 shadow-2xl hover:scale-105 transition-all"
                asChild
              >
                <Link href="/contact" className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 md:w-5 md:h-5" />
                  Nous trouver
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-2 border-white/50 hover:bg-white hover:text-primary text-sm md:text-lg px-6 md:px-10 py-5 md:py-6"
                asChild
              >
                <Link href="/prices" className="flex items-center gap-2">
                  Voir les tarifs
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                </Link>
              </Button>
            </div>

            {/* Contact info */}
            <div className="flex flex-col sm:flex-row flex-wrap justify-start md:justify-center gap-4 md:gap-8 pt-6 md:pt-8 border-t border-white/20">
              {contactInfo?.phone && (
                <a
                  href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}
                  className="flex items-center gap-2 md:gap-3 hover:opacity-80 transition-opacity"
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <Phone className="w-4 h-4 md:w-5 md:h-5" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs md:text-sm opacity-70">Appelez-nous</div>
                    <div className="font-semibold text-sm md:text-base">{contactInfo.phone}</div>
                  </div>
                </a>
              )}
              {contactInfo?.email && (
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="flex items-center gap-2 md:gap-3 hover:opacity-80 transition-opacity"
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <Mail className="w-4 h-4 md:w-5 md:h-5" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs md:text-sm opacity-70">Écrivez-nous</div>
                    <div className="font-semibold text-sm md:text-base">{contactInfo.email}</div>
                  </div>
                </a>
              )}
              {contactInfo && (
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${contactInfo.address} ${contactInfo.city} ${contactInfo.postalCode}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 md:gap-3 hover:opacity-80 transition-opacity"
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <MapPin className="w-4 h-4 md:w-5 md:h-5" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs md:text-sm opacity-70">Notre adresse</div>
                    <div className="font-semibold text-sm md:text-base">{contactInfo.city}</div>
                  </div>
                </a>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
