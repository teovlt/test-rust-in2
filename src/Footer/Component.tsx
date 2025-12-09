import Link from 'next/link'
import { Instagram, Facebook } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-muted mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl font-bold text-primary">Rust-in</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Votre spécialiste vélos, skis et trottinettes d&apos;occasion. Vente et réparation
              avec soin et expertise.
            </p>
            <div className="flex gap-4 mt-6">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary text-primary-foreground p-2 rounded-full hover:scale-110 transition-transform"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary text-primary-foreground p-2 rounded-full hover:scale-110 transition-transform"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Liens rapides</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Accueil
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  À propos
                </Link>
              </li>
              <li>
                <Link
                  href="/shop"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Boutique
                </Link>
              </li>
              <li>
                <Link
                  href="/prices"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Tarifs
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Coordonnées</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>123 Bike Lane, Cycle City</li>
              <li>Téléphone: (555) 123-4567</li>
              <li>Email: hello@rust-in.com</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Rust-in. Tous droits réservés.</p>
          <Link href="/legal" className="hover:text-primary transition-colors">
            Mentions légales
          </Link>
        </div>
      </div>
    </footer>
  )
}
