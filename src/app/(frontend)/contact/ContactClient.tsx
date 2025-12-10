'use client'

import type React from 'react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { MapPin, Phone, Mail, Clock, MessageCircle, Bike } from 'lucide-react'
import { useState } from 'react'

type OpeningHour = {
  day: string
  hours: string
  isClosed: boolean
}

type ContactClientProps = {
  openingHours: OpeningHour[]
}

export function ContactClient({ openingHours }: ContactClientProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', formData)
    alert('Merci pour votre message ! Nous vous répondrons bientôt.')
    setFormData({ name: '', email: '', phone: '', message: '' })
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

  const displayOpeningHours = openingHours.length > 0 ? openingHours : defaultOpeningHours

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary/90 to-accent text-primary-foreground py-16 md:py-24 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-accent/30 rounded-full blur-3xl" />
          <MessageCircle className="absolute top-10 right-20 w-24 h-24 text-white/10" />
          <Phone className="absolute bottom-10 left-1/4 w-16 h-16 text-white/10 rotate-12" />
          <Bike className="absolute top-1/2 right-10 w-20 h-20 text-white/5 -rotate-12" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance handwritten-title">
            Contactez-nous
          </h1>
          <p className="text-2xl md:text-3xl text-primary-foreground/95 max-w-3xl text-pretty leading-relaxed">
            Entrez en contact avec notre équipe. Nous sommes là pour vous aider avec tous vos
            besoins.
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Envoyez-nous un message</CardTitle>
                <CardDescription>
                  Remplissez le formulaire ci-dessous et nous vous répondrons dans les 24 heures
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nom *</Label>
                    <Input
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Votre nom"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="votre@email.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="(555) 123-4567"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Parlez-nous de vos besoins en réparation de vélo..."
                      rows={5}
                    />
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    Envoyer le message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-4">
              {/* Location Card - Compact */}
              <Card>
                <CardContent className="p-0">
                  {/* Map on top */}
                  <div className="h-48 rounded-t-lg overflow-hidden">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2889.1812259805!2d1.4436!3d43.6047!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDPCsDM2JzE3LjAiTiAxwrAyNiczOS40IkU!5e0!3m2!1sfr!2sfr!4v1234567890"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Localisation Rust-in"
                    />
                  </div>
                  {/* Address below */}
                  <div className="p-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="font-medium">123 Bike Lane</p>
                        <p className="text-sm text-muted-foreground">
                          Cycle City, CC 12345 - France
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full mt-3 bg-transparent"
                      asChild
                    >
                      <a
                        href="https://www.google.com/maps/search/?api=1&query=123+Bike+Lane+Cycle+City"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Obtenir l'itinéraire
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Hours */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Clock className="h-5 w-5 text-primary" />
                    Heures d'ouverture
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 pt-0">
                  {displayOpeningHours.map((hour, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="font-medium">{hour.day}</span>
                      <span className={hour.isClosed ? 'text-red-500' : 'text-muted-foreground'}>
                        {hour.isClosed ? 'Fermé' : hour.hours}
                      </span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Contact Info - Combined */}
              <Card>
                <CardContent className="p-4 space-y-3">
                  <a
                    href="tel:5551234567"
                    className="flex items-center gap-3 p-3 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors"
                  >
                    <Phone className="h-5 w-5 text-primary" />
                    <span className="font-medium">(555) 123-4567</span>
                  </a>
                  <a
                    href="mailto:hello@rust-in.com"
                    className="flex items-center gap-3 p-3 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors"
                  >
                    <Mail className="h-5 w-5 text-primary" />
                    <span className="font-medium">hello@rust-in.com</span>
                  </a>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

