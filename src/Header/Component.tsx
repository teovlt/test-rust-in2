'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Wrench, Bike } from 'lucide-react'
import { useState, useEffect, useRef, useLayoutEffect } from 'react'
import { Button } from '@/components/ui/button'

export function Header() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [progress, setProgress] = useState(0)
  const barRef = useRef<HTMLDivElement | null>(null)
  const bikeRef = useRef<SVGSVGElement | null>(null)
  const [barW, setBarW] = useState(0)
  const [bikeW, setBikeW] = useState(0)
  const [pedaling, setPedaling] = useState(false)
  let scrollTimeout = useRef<NodeJS.Timeout | null>(null)

  const links = [
    { href: '/', label: 'Accueil' },
    { href: '/about', label: 'À propos' },
    { href: '/bikes', label: 'Vélos à vendre' },
    { href: '/prices', label: 'Tarifs' },
    { href: '/contact', label: 'Contact' },
  ]

  const measure = () => {
    const barRect = barRef.current?.getBoundingClientRect()
    const bikeRect = bikeRef.current?.getBoundingClientRect()
    setBarW(barRect?.width || 0)
    setBikeW(bikeRect?.width || 0)
  }

  useLayoutEffect(() => {
    measure()
  }, [])

  useEffect(() => {
    const onResize = () => measure()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    let raf = 0
    const handle = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const p = docHeight > 0 ? Math.min(1, Math.max(0, scrollTop / docHeight)) : 0
      setProgress(p)
      raf = 0
    }

    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(handle)

      setPedaling(true)
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current)
      scrollTimeout.current = setTimeout(() => setPedaling(false), 150)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    handle()
    return () => {
      if (raf) cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  const bikeLeftPx = barW * progress - bikeW / 2

  return (
    <nav
      id="navbar"
      className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm shadow-lg border-b border-primary/20"
    >
      <div className="container mx-auto px-4 relative">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="bg-primary text-primary-foreground p-2 rounded-full transform group-hover:rotate-12 transition-transform">
              <Wrench className="h-6 w-6" />
            </div>
            <div className="text-4xl font-bold text-primary handwritten-title">Rust-in</div>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-lg font-medium transition-all hover:text-primary hover:scale-110 ${
                  pathname === link.href ? 'text-primary font-bold scale-110' : 'text-foreground'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {isOpen && (
          <div className="md:hidden py-4 space-y-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block text-lg font-medium transition-colors hover:text-primary ${
                  pathname === link.href ? 'text-primary font-bold' : 'text-foreground'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>

      <div
        ref={barRef}
        className="hidden md:block bottom-0 left-0 w-full h-1 bg-muted relative overflow-visible"
      >
        <div
          className="h-1 bg-primary transition-all duration-150 ease-linear"
          style={{ width: `${progress * 100}%` }}
        />
        <div
          className="absolute bottom-0 transition-left duration-150"
          style={{
            left: `${Math.max(0, Math.min(barW - bikeW, bikeLeftPx))}px`,
          }}
        >
          <Bike
            ref={bikeRef as any}
            className={`text-primary ${pedaling ? 'animate-bike' : ''}`}
            size={28}
          />
        </div>
      </div>

      <style jsx global>{`
        @keyframes pedal {
          0% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(-10deg);
          }
          50% {
            transform: rotate(0deg);
          }
          75% {
            transform: rotate(10deg);
          }
          100% {
            transform: rotate(0deg);
          }
        }
        .animate-bike {
          animation: pedal 0.8s infinite linear;
        }
        .transition-left {
          transition: left 150ms linear;
        }
      `}</style>
    </nav>
  )
}
