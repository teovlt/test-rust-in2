'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  MapPin,
  Clock,
  Phone,
  Mail,
  Wrench,
  Bike,
  Award,
  ChevronLeft,
  ChevronRight,
  ChevronDownIcon,
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
      const scrollAmount = 340 // Width of card + gap
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

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section
        className="relative bg-gradient-to-br from-primary via-primary/90 to-accent text-primary-foreground py-24 md:py-40 overflow-hidden"
        style={{ minHeight: 'calc(100vh - var(--navbar-height))' }}
      >
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent/30 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl" />
          {/* Bike silhouettes */}
          <Bike className="absolute top-20 right-20 w-32 h-32 text-white/10 rotate-12" />
          <Bike className="absolute bottom-20 left-10 w-24 h-24 text-white/5 -rotate-12" />
          <Wrench className="absolute top-40 left-1/4 w-16 h-16 text-white/10 rotate-45" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-6xl md:text-8xl font-bold mb-6 text-balance handwritten-title leading-tight">
              Remettez votre vélo sur la route !
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-foreground/95 text-pretty leading-relaxed">
              Nous réparons les vélos avec amour et soin. Réparations rapides, fiables et abordables
              pour vous garder en mouvement.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                variant="secondary"
                className="text-lg px-8 py-6 shadow-xl hover:scale-105 transition-transform min-w-[280px] h-[56px]"
                asChild
              >
                <Link href="/contact">Réserver une réparation</Link>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-3 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary text-lg px-8 py-6 shadow-xl hover:scale-105 transition-transform min-w-[280px] h-[56px]"
                asChild
              >
                <Link href="/prices">Voir les tarifs</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Availability Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center handwritten-title text-primary">
            Nos horaires
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="organic-card shadow-2xl border-4 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl handwritten-title">
                  <Clock className="h-7 w-7 text-primary" />
                  Heures d'ouverture
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {displayOpeningHours.map((hour, index) => (
                  <div key={index} className="flex justify-between text-lg">
                    <span className="font-semibold">{hour.day}</span>
                    <span
                      className={
                        hour.isClosed ? 'text-red-500 font-medium' : 'text-muted-foreground'
                      }
                    >
                      {hour.hours}
                    </span>
                  </div>
                ))}
                <div className="pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground italic">
                    Bienvenue sans rendez-vous ! Ou appelez à l'avance pour réserver votre créneau.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="organic-card shadow-2xl border-4 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl handwritten-title">
                  <MapPin className="h-7 w-7 text-primary" />
                  Nous trouver
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-lg leading-relaxed">
                  123 Bike Lane
                  <br />
                  Cycle City, CC 12345
                </p>
                <div className="w-full h-64 rounded-xl overflow-hidden border-4 border-primary/20 shadow-lg">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.2219901290355!2d-74.00369368400567!3d40.71312937933185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a316e5e1c8d%3A0x7e8d3f3b3c3e3e3e!2sNew%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Rust-in Bike Repair Location"
                  />
                </div>
                <Button
                  variant="outline"
                  className="w-full bg-transparent border-2 hover:scale-105 transition-transform"
                  asChild
                >
                  <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer">
                    Obtenir l'itinéraire
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Customer Reviews Section */}
      {displayReviews.length > 0 && (
        <section className="py-16 bg-accent/20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center handwritten-title text-primary">
              Ce que disent nos clients
            </h2>
            <p className="text-lg text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
              Des centaines de cyclistes nous font confiance
            </p>

            <div className="relative max-w-6xl mx-auto">
              {/* Bouton gauche */}
              {canScrollLeft && (
                <button
                  onClick={() => scroll('left')}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-primary text-primary-foreground p-3 rounded-full shadow-xl hover:scale-110 transition-all -translate-x-2 md:-translate-x-6"
                  aria-label="Avis précédent"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
              )}

              {/* Conteneur de scroll - Centré */}
              <div
                ref={scrollContainerRef}
                className={`flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth py-4 px-2 ${
                  displayReviews.length <= 3 ? 'justify-center' : 'justify-start'
                }`}
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {displayReviews.map((review, index) => (
                  <Card
                    key={index}
                    className="organic-card shadow-lg border-2 border-primary/20 flex-shrink-0 w-80 hover:shadow-xl transition-shadow"
                  >
                    <CardContent className="pt-6">
                      <div className="flex flex-col items-center text-center">
                        <img
                          src={review.image || '/placeholder.svg'}
                          alt={review.name}
                          className="w-20 h-20 rounded-full mb-4 border-3 border-primary shadow-lg object-cover"
                        />
                        <div className="flex gap-1 mb-3">
                          {[...Array(review.rating)].map((_, i) => (
                            <span key={i} className="text-primary text-xl">
                              ★
                            </span>
                          ))}
                        </div>
                        <p className="text-sm text-muted-foreground mb-3 italic leading-relaxed">
                          "{review.text}"
                        </p>
                        <p className="text-base font-bold text-primary handwritten-title">
                          {review.name}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Bouton droit */}
              {canScrollRight && displayReviews.length > 3 && (
                <button
                  onClick={() => scroll('right')}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-primary text-primary-foreground p-3 rounded-full shadow-xl hover:scale-110 transition-all translate-x-2 md:translate-x-6"
                  aria-label="Avis suivant"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              )}
            </div>

            <div className="text-center mt-10">
              <Button
                size="lg"
                variant="outline"
                asChild
                className="hover:scale-105 transition-transform bg-transparent"
              >
                <Link href="/contact">Laisser un avis</Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      {displayFaq.length > 0 && (
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center handwritten-title text-primary">
              Questions fréquentes
            </h2>
            <p className="text-lg text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Vous avez des questions ? Nous avons les réponses !
            </p>
            <div className="max-w-3xl mx-auto space-y-4">
              {displayFaq.map((faqItem, index) => (
                <Card
                  key={index}
                  className={`gap-0 organic-card shadow-lg border-2 border-primary/20 cursor-pointer hover:border-primary/40 transition-all duration-300 ${
                    openFaq === index ? 'scale-100' : 'scale-95'
                  }`}
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <CardHeader className={`transition-all duration-300 ease-in-out`}>
                    <CardTitle className="flex items-center justify-between text-xl handwritten-title">
                      <span>{faqItem.question}</span>
                      <ChevronDownIcon
                        className={`h-5 w-5 text-primary transition-transform ${openFaq === index ? 'rotate-180' : ''}`}
                      />
                    </CardTitle>
                  </CardHeader>

                  <CardContent
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      openFaq === index ? 'max-h-96 p-6 pt-4' : 'max-h-0 p-0'
                    }`}
                  >
                    <p className="text-muted-foreground leading-relaxed">{faqItem.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="text-center mt-12">
              <p className="text-lg text-muted-foreground mb-6">Vous avez d'autres questions ?</p>
              <Button
                size="lg"
                variant="default"
                asChild
                className="hover:scale-105 transition-transform"
              >
                <Link href="/contact">Contactez-nous</Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Services Overview */}
      <section className="py-20 bg-accent/20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center handwritten-title text-primary">
            Pourquoi nous choisir ?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <Card className="organic-card shadow-xl border-4 border-accent/30 hover:border-primary/50 transition-colors">
              <CardHeader>
                <Wrench className="h-16 w-16 text-primary mb-4" />
                <CardTitle className="text-2xl handwritten-title">Réparations expertes</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Nos mécaniciens certifiés ont des années d'expérience dans la réparation de tous
                  types de vélos
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="organic-card shadow-xl border-4 border-accent/30 hover:border-primary/50 transition-colors">
              <CardHeader>
                <Bike className="h-16 w-16 text-primary mb-4" />
                <CardTitle className="text-2xl handwritten-title">
                  Toutes marques bienvenues
                </CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Nous entretenons toutes les grandes marques de vélos, y compris Trek, Giant,
                  Specialized et plus encore
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="organic-card shadow-xl border-4 border-accent/30 hover:border-primary/50 transition-colors">
              <CardHeader>
                <Award className="h-16 w-16 text-primary mb-4" />
                <CardTitle className="text-2xl handwritten-title">Garantie qualité</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Toutes les réparations sont garanties 90 jours pour votre tranquillité d'esprit
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 handwritten-title text-primary">
              Prêt à réparer votre vélo ?
            </h2>
            <p className="text-xl text-foreground/80 mb-10 leading-relaxed">
              Contactez-nous dès aujourd'hui pour planifier votre réparation ou poser vos questions
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <div className="flex items-center gap-3 bg-card px-6 py-4 rounded-2xl shadow-lg hover:scale-105 transition-transform">
                <Phone className="h-6 w-6 text-primary" />
                <a
                  href="tel:5551234567"
                  className="text-xl font-semibold hover:text-primary transition-colors"
                >
                  (555) 123-4567
                </a>
              </div>
              <div className="flex items-center gap-3 bg-card px-6 py-4 rounded-2xl shadow-lg hover:scale-105 transition-transform">
                <Mail className="h-6 w-6 text-primary" />
                <a
                  href="mailto:hello@rust-in.com"
                  className="text-xl font-semibold hover:text-primary transition-colors"
                >
                  hello@rust-in.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
