'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Clock,
  Phone,
  Mail,
  Wrench,
  Bike,
  Award,
  ChevronLeft,
  ChevronRight,
  ChevronDownIcon,
  MapPin,
  Star,
  Users,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Heart,
  Shield,
  Zap,
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

type HomePageClientProps = {
  reviews: Review[]
  faq: FAQItem[]
  openingHours: OpeningHour[]
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

export function HomePageClient({ reviews, faq, openingHours }: HomePageClientProps) {
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
            className="absolute top-[15%] right-[10%] w-40 h-40 text-white/10 rotate-12 animate-bounce"
            style={{ animationDuration: '3s' }}
          />
          <Bike className="absolute bottom-[20%] left-[5%] w-28 h-28 text-white/5 -rotate-12" />
          <Wrench className="absolute top-[40%] left-[15%] w-20 h-20 text-white/10 rotate-45" />
          <Sparkles className="absolute top-[25%] right-[30%] w-12 h-12 text-white/20" />
        </div>

        <div className="container mx-auto px-4 relative z-10 flex items-center min-h-[calc(100vh-var(--navbar-height))]">
          <div className="grid lg:grid-cols-2 gap-12 items-center py-16">
            {/* Left: Text content */}
            <div>
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-medium">Atelier depuis 2015</span>
              </div>

              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-balance handwritten-title leading-tight">
                Remettez votre vélo sur la route !
              </h1>

              <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90 text-pretty leading-relaxed max-w-xl">
                Réparations rapides, fiables et abordables. Votre vélo entre de bonnes mains.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Button
                  size="lg"
                  variant="secondary"
                  className="text-lg px-8 py-6 shadow-2xl hover:scale-105 transition-all group"
                  asChild
                >
                  <Link href="/contact" className="flex items-center gap-2">
                    Prendre rendez-vous
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-2 border-white/50 text-white hover:bg-white hover:text-primary text-lg px-8 py-6"
                  asChild
                >
                  <Link href="/bikes">Voir nos vélos</Link>
                </Button>
              </div>

              {/* Quick stats */}
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold">500+</div>
                  <div className="text-sm text-primary-foreground/70">Vélos réparés/mois</div>
                </div>
                <div className="text-center border-x border-white/20 px-4">
                  <div className="text-3xl md:text-4xl font-bold">9 ans</div>
                  <div className="text-sm text-primary-foreground/70">D'expérience</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold">98%</div>
                  <div className="text-sm text-primary-foreground/70">Clients satisfaits</div>
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
                    <a
                      href="tel:5551234567"
                      className="flex items-center gap-3 hover:bg-white/10 p-2 rounded-lg transition-colors"
                    >
                      <Phone className="w-5 h-5" />
                      <span className="font-medium">(555) 123-4567</span>
                    </a>
                    <a
                      href="mailto:hello@rust-in.com"
                      className="flex items-center gap-3 hover:bg-white/10 p-2 rounded-lg transition-colors"
                    >
                      <Mail className="w-5 h-5" />
                      <span className="font-medium">hello@rust-in.com</span>
                    </a>
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
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-8 h-12 border-2 border-white/50 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-white/70 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Quick CTA Banner */}
      <section className="bg-primary py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 text-primary-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              <span className="font-medium">Devis gratuit</span>
            </div>
            <div className="hidden md:block w-px h-6 bg-white/30" />
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5" />
              <span className="font-medium">Réparation express</span>
            </div>
            <div className="hidden md:block w-px h-6 bg-white/30" />
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              <span className="font-medium">Garantie 90 jours</span>
            </div>
            <div className="hidden md:block w-px h-6 bg-white/30" />
            <Button variant="secondary" size="sm" asChild>
              <Link href="/prices">Voir les tarifs →</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 handwritten-title text-primary">
              Pourquoi nous choisir ?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Une équipe passionnée, des réparations de qualité et un service client au top
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="group hover:shadow-xl transition-all hover:-translate-y-2 border-2 border-transparent hover:border-primary/30">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                  <Wrench className="w-8 h-8 text-primary group-hover:text-white transition-colors" />
                </div>
                <CardTitle className="text-xl">Expertise</CardTitle>
                <CardDescription className="text-base">
                  Mécaniciens certifiés avec 9+ ans d'expérience
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-xl transition-all hover:-translate-y-2 border-2 border-transparent hover:border-primary/30">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                  <Zap className="w-8 h-8 text-primary group-hover:text-white transition-colors" />
                </div>
                <CardTitle className="text-xl">Rapidité</CardTitle>
                <CardDescription className="text-base">
                  La plupart des réparations en moins de 24h
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-xl transition-all hover:-translate-y-2 border-2 border-transparent hover:border-primary/30">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                  <Heart className="w-8 h-8 text-primary group-hover:text-white transition-colors" />
                </div>
                <CardTitle className="text-xl">Passion</CardTitle>
                <CardDescription className="text-base">
                  On traite votre vélo comme le nôtre
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-xl transition-all hover:-translate-y-2 border-2 border-transparent hover:border-primary/30">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                  <Award className="w-8 h-8 text-primary group-hover:text-white transition-colors" />
                </div>
                <CardTitle className="text-xl">Qualité</CardTitle>
                <CardDescription className="text-base">
                  Pièces de qualité et garantie 90 jours
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button size="lg" variant="outline" asChild className="bg-transparent">
              <Link href="/about">En savoir plus sur nous →</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Reviews Section - Beautiful slider */}
      {displayReviews.length > 0 && (
        <section className="py-20 bg-gradient-to-br from-accent/30 via-accent/20 to-primary/10">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
                <Star className="w-4 h-4 fill-current" />
                <span className="font-medium">4.9/5 sur Google</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 handwritten-title text-primary">
                Ils nous font confiance
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Découvrez les avis de nos clients satisfaits
              </p>
            </div>

            <div className="relative max-w-6xl mx-auto">
              {/* Navigation buttons */}
              <button
                onClick={() => scroll('left')}
                className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-xl p-3 rounded-full hover:scale-110 transition-all -translate-x-4 ${
                  !canScrollLeft ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={!canScrollLeft}
                aria-label="Avis précédent"
              >
                <ChevronLeft className="h-6 w-6 text-primary" />
              </button>

              {/* Reviews container */}
              <div
                ref={scrollContainerRef}
                className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth py-4 px-8"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {displayReviews.map((review, index) => (
                  <Card
                    key={index}
                    className="flex-shrink-0 w-[340px] shadow-lg hover:shadow-2xl transition-all border-0 bg-white"
                  >
                    <CardContent className="p-6">
                      {/* Stars */}
                      <div className="flex gap-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'}`}
                          />
                        ))}
                      </div>

                      {/* Quote */}
                      <p className="text-muted-foreground mb-6 leading-relaxed line-clamp-4">
                        "{review.text}"
                      </p>

                      {/* Author */}
                      <div className="flex items-center gap-3 pt-4 border-t">
                        <img
                          src={review.image || '/placeholder.svg'}
                          alt={review.name}
                          className="w-12 h-12 rounded-full object-cover ring-2 ring-primary/20"
                        />
                        <div>
                          <p className="font-semibold text-foreground">{review.name}</p>
                          <p className="text-sm text-muted-foreground">Client vérifié</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <button
                onClick={() => scroll('right')}
                className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-xl p-3 rounded-full hover:scale-110 transition-all translate-x-4 ${
                  !canScrollRight ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={!canScrollRight}
                aria-label="Avis suivant"
              >
                <ChevronRight className="h-6 w-6 text-primary" />
              </button>
            </div>

            {/* Dots indicator */}
            <div className="flex justify-center gap-2 mt-8">
              {displayReviews.slice(0, Math.min(5, displayReviews.length)).map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === 0 ? 'w-6 bg-primary' : 'bg-primary/30'
                  }`}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      {displayFaq.length > 0 && (
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
              {/* Left: Title and CTA */}
              <div className="lg:sticky lg:top-24">
                <h2 className="text-4xl md:text-5xl font-bold mb-4 handwritten-title text-primary">
                  Questions fréquentes
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Vous avez des questions ? Voici les réponses aux questions les plus posées par nos
                  clients.
                </p>

                <Card className="bg-primary/5 border-primary/20">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-2">
                      Vous n'avez pas trouvé votre réponse ?
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Notre équipe est là pour vous aider. Contactez-nous directement !
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button asChild>
                        <Link href="/contact">
                          <Mail className="w-4 h-4 mr-2" />
                          Nous contacter
                        </Link>
                      </Button>
                      <Button variant="outline" className="bg-transparent" asChild>
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
              <div className="space-y-3">
                {displayFaq.map((faqItem, index) => (
                  <div
                    key={index}
                    className={`bg-card rounded-xl border-2 transition-all cursor-pointer ${
                      openFaq === index
                        ? 'border-primary shadow-lg'
                        : 'border-border hover:border-primary/30'
                    }`}
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  >
                    <div className="flex items-center justify-between p-5">
                      <h3 className="font-semibold text-lg pr-4">{faqItem.question}</h3>
                      <div
                        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                          openFaq === index ? 'bg-primary text-white' : 'bg-primary/10'
                        }`}
                      >
                        <ChevronDownIcon
                          className={`w-5 h-5 transition-transform ${openFaq === index ? 'rotate-180' : ''}`}
                        />
                      </div>
                    </div>
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        openFaq === index ? 'max-h-96' : 'max-h-0'
                      }`}
                    >
                      <p className="px-5 pb-5 text-muted-foreground leading-relaxed">
                        {faqItem.answer}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Final CTA Section */}
      <section className="py-24 bg-gradient-to-br from-primary via-primary/95 to-accent text-primary-foreground relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Bike className="w-16 h-16 mx-auto mb-6 opacity-80" />
            <h2 className="text-4xl md:text-6xl font-bold mb-6 handwritten-title">
              Prêt à rouler ?
            </h2>
            <p className="text-xl md:text-2xl mb-10 opacity-90 max-w-2xl mx-auto">
              Que ce soit pour une simple révision ou une réparation complète, on s'occupe de tout !
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button
                size="lg"
                variant="secondary"
                className="text-lg px-10 py-6 shadow-2xl hover:scale-105 transition-all"
                asChild
              >
                <Link href="/contact" className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Nous trouver
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-2 border-white/50 hover:bg-white hover:text-primary text-lg px-10 py-6"
                asChild
              >
                <Link href="/prices" className="flex items-center gap-2">
                  Voir les tarifs
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </div>

            {/* Contact info */}
            <div className="flex flex-wrap justify-center gap-8 pt-8 border-t border-white/20">
              <a
                href="tel:5551234567"
                className="flex items-center gap-3 hover:opacity-80 transition-opacity"
              >
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <div className="text-sm opacity-70">Appelez-nous</div>
                  <div className="font-semibold">(555) 123-4567</div>
                </div>
              </a>
              <a
                href="mailto:hello@rust-in.com"
                className="flex items-center gap-3 hover:opacity-80 transition-opacity"
              >
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <div className="text-sm opacity-70">Écrivez-nous</div>
                  <div className="font-semibold">hello@rust-in.com</div>
                </div>
              </a>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <div className="text-sm opacity-70">Horaires</div>
                  <div className="font-semibold">Lun-Sam • 9h-18h</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
