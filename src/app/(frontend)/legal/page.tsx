import { Scale, Building2, Code, Server, Shield, Mail, Phone, MapPin, FileText } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function LegalPage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary via-primary/90 to-accent text-primary-foreground py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-accent/30 rounded-full blur-3xl" />
          <Scale className="absolute top-10 right-20 w-24 h-24 text-white/10 rotate-12" />
          <FileText className="absolute bottom-10 left-[10%] w-16 h-16 text-white/10 -rotate-12" />
          <Shield className="absolute top-1/2 right-10 w-20 h-20 text-white/5" />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 handwritten-title">
            Mentions légales
          </h1>
          <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
            Informations légales conformément à la loi n° 2004-575 du 21 juin 2004
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="space-y-8">
            {/* Éditeur du site */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-primary" />
                  </div>
                  Éditeur du site
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Raison sociale</h4>
                  <p className="text-muted-foreground">Rust-in SARL</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Forme juridique</h4>
                  <p className="text-muted-foreground">Société à Responsabilité Limitée (SARL)</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Capital social</h4>
                  <p className="text-muted-foreground">10 000 €</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">SIRET</h4>
                  <p className="text-muted-foreground">XXX XXX XXX XXXXX</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Numéro TVA intracommunautaire</h4>
                  <p className="text-muted-foreground">FR XX XXX XXX XXX</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Siège social</h4>
                  <div className="flex items-start gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                    <p>123 Bike Lane<br />31000 Toulouse<br />France</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Contact</h4>
                  <div className="space-y-2 text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      <span>(555) 123-4567</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      <a href="mailto:contact@rust-in.com" className="hover:text-primary transition-colors">
                        contact@rust-in.com
                      </a>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Directeur de la publication</h4>
                  <p className="text-muted-foreground">M. / Mme [Nom du gérant]</p>
                </div>
              </CardContent>
            </Card>

            {/* Hébergeur */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Server className="w-5 h-5 text-primary" />
                  </div>
                  Hébergeur
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Raison sociale</h4>
                  <p className="text-muted-foreground">Vercel Inc.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Adresse</h4>
                  <p className="text-muted-foreground">
                    440 N Barranca Ave #4133<br />
                    Covina, CA 91723<br />
                    États-Unis
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Site web</h4>
                  <a 
                    href="https://vercel.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    https://vercel.com
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Conception et développement */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Code className="w-5 h-5 text-primary" />
                  </div>
                  Conception et développement
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Développeur</h4>
                  <p className="text-muted-foreground">[Nom du développeur / Agence]</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Technologies utilisées</h4>
                  <p className="text-muted-foreground">Next.js, React, Payload CMS, Tailwind CSS</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Contact</h4>
                  <a 
                    href="mailto:dev@example.com" 
                    className="text-primary hover:underline"
                  >
                    dev@example.com
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Propriété intellectuelle */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Shield className="w-5 h-5 text-primary" />
                  </div>
                  Propriété intellectuelle
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  L&apos;ensemble du contenu de ce site (textes, images, vidéos, logos, icônes, etc.) 
                  est la propriété exclusive de Rust-in SARL ou de ses partenaires. Toute reproduction, 
                  représentation, modification, publication, adaptation de tout ou partie des éléments 
                  du site, quel que soit le moyen ou le procédé utilisé, est interdite sans 
                  l&apos;autorisation écrite préalable de Rust-in SARL.
                </p>
                <p>
                  Toute exploitation non autorisée du site ou de l&apos;un quelconque des éléments qu&apos;il 
                  contient sera considérée comme constitutive d&apos;une contrefaçon et poursuivie 
                  conformément aux dispositions des articles L.335-2 et suivants du Code de Propriété 
                  Intellectuelle.
                </p>
              </CardContent>
            </Card>

            {/* Protection des données */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Shield className="w-5 h-5 text-primary" />
                  </div>
                  Protection des données personnelles
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi 
                  Informatique et Libertés du 6 janvier 1978 modifiée, vous disposez des droits 
                  suivants concernant vos données personnelles :
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Droit d&apos;accès à vos données</li>
                  <li>Droit de rectification</li>
                  <li>Droit à l&apos;effacement</li>
                  <li>Droit à la limitation du traitement</li>
                  <li>Droit à la portabilité</li>
                  <li>Droit d&apos;opposition</li>
                </ul>
                <p>
                  Pour exercer ces droits ou pour toute question relative à la protection de vos 
                  données personnelles, vous pouvez nous contacter à l&apos;adresse suivante : 
                  <a href="mailto:rgpd@rust-in.com" className="text-primary hover:underline ml-1">
                    rgpd@rust-in.com
                  </a>
                </p>
                <p>
                  Vous pouvez également adresser une réclamation auprès de la CNIL 
                  (Commission Nationale de l&apos;Informatique et des Libertés).
                </p>
              </CardContent>
            </Card>

            {/* Cookies */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Shield className="w-5 h-5 text-primary" />
                  </div>
                  Cookies
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  Ce site utilise des cookies pour améliorer l&apos;expérience utilisateur. Les cookies 
                  sont de petits fichiers texte stockés sur votre appareil qui nous permettent de :
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Mémoriser vos préférences</li>
                  <li>Analyser le trafic du site</li>
                  <li>Assurer le bon fonctionnement du site</li>
                </ul>
                <p>
                  Vous pouvez configurer votre navigateur pour refuser les cookies. Cependant, 
                  certaines fonctionnalités du site pourraient ne plus être disponibles.
                </p>
              </CardContent>
            </Card>

            {/* Limitation de responsabilité */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Scale className="w-5 h-5 text-primary" />
                  </div>
                  Limitation de responsabilité
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  Les informations contenues sur ce site sont aussi précises que possible et le site 
                  est périodiquement mis à jour. Toutefois, des informations erronées ou des omissions 
                  peuvent être présentes. L&apos;utilisateur devra vérifier l&apos;exactitude des informations 
                  auprès de Rust-in SARL.
                </p>
                <p>
                  Rust-in SARL ne pourra être tenue responsable des dommages directs et indirects 
                  causés au matériel de l&apos;utilisateur lors de l&apos;accès au site, et résultant soit de 
                  l&apos;utilisation d&apos;un matériel ne répondant pas aux spécifications requises, soit de 
                  l&apos;apparition d&apos;un bug ou d&apos;une incompatibilité.
                </p>
              </CardContent>
            </Card>

            {/* Droit applicable */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Scale className="w-5 h-5 text-primary" />
                  </div>
                  Droit applicable
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <p>
                  Les présentes mentions légales sont régies par le droit français. En cas de litige, 
                  les tribunaux français seront seuls compétents.
                </p>
              </CardContent>
            </Card>

            {/* Date de mise à jour */}
            <div className="text-center text-sm text-muted-foreground pt-8 border-t">
              <p>Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export const metadata = {
  title: 'Mentions légales - Rust-in',
  description: 'Mentions légales et informations juridiques du site Rust-in.',
}

