import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, Heart, Wrench, Award, Calendar, MapPin, Trophy, Bike } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

type TeamMember = {
  name: string
  photo: string | null
  role: string
  description: string
}

async function getTeamMembers(): Promise<TeamMember[]> {
  const payload = await getPayload({ config: configPromise })

  const teamData = await payload.find({
    collection: 'team',
    limit: 20,
    sort: 'order',
  })

  return teamData.docs.map((member) => ({
    name: member.name,
    photo: typeof member.photo === 'object' && member.photo?.url ? member.photo.url : null,
    role: member.role,
    description: member.description,
  }))
}

export default async function AboutPage() {
  const teamMembers = await getTeamMembers()

  return (
    <div className="min-h-screen flex flex-col">
      <section className="relative bg-gradient-to-br from-primary via-primary/90 to-accent text-primary-foreground py-16 md:py-24 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-accent/30 rounded-full blur-3xl" />
          <Wrench className="absolute top-10 right-20 w-24 h-24 text-white/10 rotate-45" />
          <Heart className="absolute bottom-10 left-1/4 w-16 h-16 text-white/10" />
          <Bike className="absolute top-1/2 right-10 w-20 h-20 text-white/5 -rotate-12" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance handwritten-title">
            À propos de Rust-in
          </h1>
          <p className="text-2xl md:text-3xl text-primary-foreground/95 max-w-3xl text-pretty leading-relaxed">
            Votre atelier de confiance depuis 2015 - Où chaque vélo retrouve sa jeunesse
          </p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="order-2 md:order-1">
              <h2 className="text-4xl md:text-5xl font-bold mb-8 handwritten-title text-primary">
                Notre histoire
              </h2>
              <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
                <p>
                  Tout a commencé dans un petit garage en 2015. Passionnés de cyclisme, nous avons
                  remarqué qu'il manquait un véritable atelier de quartier où les cyclistes
                  pouvaient venir faire réparer leur vélo dans une ambiance conviviale et
                  professionnelle.
                </p>
                <p>
                  Le nom <span className="font-bold text-primary">"Rust-in"</span> est né de notre
                  philosophie : transformer la rouille en or. Nous croyons fermement que chaque
                  vélo, même le plus abîmé, mérite une seconde vie. C'est devenu notre mission.
                </p>
                <p>
                  Aujourd'hui, nous sommes fiers de servir plus de 500 cyclistes par mois, du
                  débutant au compétiteur. Notre équipe s'est agrandie, mais notre passion et notre
                  engagement restent intacts.
                </p>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-primary/20 organic-card transform md:rotate-2">
                <img
                  src="/bike-about.jpg"
                  alt="Notre mécanicien avec des vélos"
                  className="w-full h-[500px] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-accent/20 to-background">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center handwritten-title text-primary">
            Notre parcours
          </h2>
          <div className="max-w-4xl mx-auto space-y-8">
            <Card className="organic-card shadow-lg border-l-8 border-primary">
              <CardContent className="p-8">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                      <Calendar className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold handwritten-title text-primary mb-2">
                      2015 - Les débuts
                    </h3>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      Ouverture de notre premier atelier avec 2 mécaniciens passionnés et un rêve :
                      créer un espace où chaque cycliste se sente chez lui.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="organic-card shadow-lg border-l-8 border-primary">
              <CardContent className="p-8">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                      <Trophy className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold handwritten-title text-primary mb-2">
                      2018 - Reconnaissance
                    </h3>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      Élu "Meilleur atelier vélo de la région" par nos clients. Plus de 1000 vélos
                      réparés et des centaines de sourires.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="organic-card shadow-lg border-l-8 border-primary">
              <CardContent className="p-8">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                      <MapPin className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold handwritten-title text-primary mb-2">
                      2021 - Expansion
                    </h3>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      Agrandissement de l'atelier et ajout d'une section vente et location de vélos.
                      L'équipe passe à 5 mécaniciens certifiés.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="organic-card shadow-lg border-l-8 border-primary">
              <CardContent className="p-8">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                      <Heart className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold handwritten-title text-primary mb-2">
                      Aujourd'hui
                    </h3>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      Plus de 6000 vélos réparés, une communauté fidèle et toujours la même passion
                      pour faire rouler vos deux-roues !
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center handwritten-title text-primary">
            Nos valeurs
          </h2>
          <p className="text-xl text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
            Ce qui nous guide au quotidien et fait de Rust-in bien plus qu'un simple atelier
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="organic-card shadow-xl border-4 border-primary/20 hover:shadow-2xl transition-shadow">
              <CardHeader>
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4 mx-auto shadow-lg">
                  <Heart className="h-10 w-10 text-white" />
                </div>
                <CardTitle className="text-2xl handwritten-title text-center">Passion</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-base leading-relaxed text-center">
                  Nous aimons les vélos et le cyclisme. Cette passion nous pousse à offrir un
                  service exceptionnel à chaque fois.
                </p>
              </CardContent>
            </Card>

            <Card className="organic-card shadow-xl border-4 border-primary/20 hover:shadow-2xl transition-shadow">
              <CardHeader>
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4 mx-auto shadow-lg">
                  <Wrench className="h-10 w-10 text-white" />
                </div>
                <CardTitle className="text-2xl handwritten-title text-center">Expertise</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-base leading-relaxed text-center">
                  Nos mécaniciens certifiés se tiennent au courant des dernières techniques et
                  technologies de réparation.
                </p>
              </CardContent>
            </Card>

            <Card className="organic-card shadow-xl border-4 border-secondary/20 hover:shadow-2xl transition-shadow">
              <CardHeader>
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-secondary to-primary flex items-center justify-center mb-4 mx-auto shadow-lg">
                  <Users className="h-10 w-10 text-white" />
                </div>
                <CardTitle className="text-2xl handwritten-title text-center">Communauté</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-base leading-relaxed text-center">
                  Nous sommes plus qu'un atelier - nous faisons partie de la communauté cycliste
                  locale et nous en sommes fiers.
                </p>
              </CardContent>
            </Card>

            <Card className="organic-card shadow-xl border-4 border-primary/20 hover:shadow-2xl transition-shadow">
              <CardHeader>
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4 mx-auto shadow-lg">
                  <Award className="h-10 w-10 text-white" />
                </div>
                <CardTitle className="text-2xl handwritten-title text-center">Qualité</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-base leading-relaxed text-center">
                  Nous ne faisons jamais de compromis sur la qualité. Chaque réparation est bien
                  faite, garantie par notre garantie.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section - Dynamic from Backend */}
      {teamMembers.length > 0 && (
        <section className="py-20 bg-gradient-to-b from-accent/20 to-background">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center handwritten-title text-primary">
              Rencontrez notre équipe
            </h2>
            <p className="text-xl text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
              Des passionnés à votre service, prêts à donner le meilleur pour votre vélo
            </p>
            <div
              className={`grid gap-10 max-w-5xl mx-auto ${
                teamMembers.length === 1
                  ? 'grid-cols-1 max-w-md'
                  : teamMembers.length === 2
                    ? 'grid-cols-1 md:grid-cols-2 max-w-3xl'
                    : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
              }`}
            >
              {teamMembers.map((member, index) => (
                <Card
                  key={index}
                  className="organic-card shadow-xl border-4 border-accent/30 hover:shadow-2xl transition-all hover:-translate-y-2"
                >
                  <CardHeader>
                    <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-6 border-4 border-primary shadow-lg">
                      {member.photo ? (
                        <img
                          src={member.photo}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-primary/20 flex items-center justify-center">
                          <Users className="w-12 h-12 text-primary" />
                        </div>
                      )}
                    </div>
                    <CardTitle className="text-center text-2xl handwritten-title">
                      {member.name}
                    </CardTitle>
                    <p className="text-center text-primary font-semibold text-lg">{member.role}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center text-base text-muted-foreground leading-relaxed">
                      {member.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-20 bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto organic-card shadow-2xl border-4 border-primary/30">
            <CardContent className="p-12 text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 handwritten-title text-primary">
                Prêt à faire revivre votre vélo ?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto">
                Que ce soit pour une simple révision ou une réparation complète, notre équipe est là
                pour vous. Passez nous voir ou contactez-nous !
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all"
                >
                  <Link href="/contact">Nous contacter</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 py-6 border-2 border-primary hover:bg-primary/10 bg-transparent"
                >
                  <Link href="/prices">Voir nos tarifs</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}

// Revalidate data every 60 seconds to pick up new content without redeploying
export const revalidate = 60
