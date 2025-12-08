'use client'

import type React from 'react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { useState } from 'react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    bike: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', formData)
    alert('Merci pour votre message ! Nous vous répondrons bientôt.')
    setFormData({ name: '', email: '', phone: '', bike: '', message: '' })
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-primary text-primary-foreground py-16 md:py-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('/friendly-bike-shop-storefront-with-welcome-sign.jpg')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/85 via-primary/80 to-accent/75" />
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
                    <Label htmlFor="bike">Marque/Modèle du vélo</Label>
                    <Input
                      id="bike"
                      value={formData.bike}
                      onChange={(e) => setFormData({ ...formData, bike: e.target.value })}
                      placeholder="ex: Trek Domane SL 5"
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
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    Localisation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col sm:flex-row gap-4">
                    {/* Address Info */}
                    <div className="flex-1">
                      <p className="text-muted-foreground mb-4">
                        123 Bike Lane
                        <br />
                        Cycle City, CC 12345
                        <br />
                        France
                      </p>
                      <Button variant="outline" className="w-full bg-transparent" asChild>
                        <a
                          href="https://www.google.com/maps/search/?api=1&query=123+Bike+Lane+Cycle+City"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Obtenir l'itinéraire
                        </a>
                      </Button>
                    </div>
                    {/* Google Maps Preview */}
                    <div className="flex-1 min-h-[180px] rounded-lg overflow-hidden border border-border">
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2889.1812259805!2d1.4436!3d43.6047!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDPCsDM2JzE3LjAiTiAxwrAyNiczOS40IkU!5e0!3m2!1sfr!2sfr!4v1234567890"
                        width="100%"
                        height="100%"
                        style={{ border: 0, minHeight: '180px' }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Localisation Rust-in"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    Heures d'ouverture
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">Lundi - Vendredi</span>
                    <span className="text-muted-foreground">9h00 - 18h00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Samedi</span>
                    <span className="text-muted-foreground">10h00 - 16h00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Dimanche</span>
                    <span className="text-muted-foreground">Fermé</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="h-5 w-5 text-primary" />
                    Téléphone
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <a href="tel:5551234567" className="text-lg hover:text-primary transition-colors">
                    (555) 123-4567
                  </a>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="h-5 w-5 text-primary" />
                    Email
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <a
                    href="mailto:hello@rust-in.com"
                    className="text-lg hover:text-primary transition-colors"
                  >
                    hello@rust-in.com
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
