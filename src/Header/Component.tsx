'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Menu, X, Wrench, Bike, User, LogOut, Settings, ChevronDown } from 'lucide-react'
import { useState, useEffect, useRef, useLayoutEffect } from 'react'
import { Button } from '@/components/ui/button'

type UserData = {
  id: string
  email: string
  name?: string
} | null

export function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [user, setUser] = useState<UserData>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const barRef = useRef<HTMLDivElement | null>(null)
  const bikeRef = useRef<SVGSVGElement | null>(null)
  const userMenuRef = useRef<HTMLDivElement | null>(null)
  const [barW, setBarW] = useState(0)
  const [bikeW, setBikeW] = useState(0)
  const [pedaling, setPedaling] = useState(false)
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null)

  const links = [
    { href: '/', label: 'Accueil' },
    { href: '/about', label: 'À propos' },
    { href: '/bikes', label: 'Vélos à vendre' },
    { href: '/prices', label: 'Tarifs' },
    { href: '/contact', label: 'Contact' },
  ]

  // Fetch user on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/users/me', {
          credentials: 'include',
        })
        if (res.ok) {
          const data = await res.json()
          if (data.user) {
            setUser(data.user)
          }
        }
      } catch (error) {
        console.error('Error fetching user:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchUser()
  }, [])

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = async () => {
    try {
      await fetch('/api/users/logout', {
        method: 'POST',
        credentials: 'include',
      })
      setUser(null)
      setIsUserMenuOpen(false)
      router.refresh()
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }

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

          <div className="flex items-center gap-4">
            {/* User Dropdown - Only shown when logged in */}
            {!isLoading && user && (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors"
                >
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
                    <User className="w-4 h-4" />
                  </div>
                  <span className="hidden sm:block text-sm font-medium max-w-[100px] truncate">
                    {user.name || user.email?.split('@')[0]}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-card border border-border rounded-xl shadow-xl py-2 z-50">
                    <div className="px-4 py-3 border-b border-border">
                      <p className="text-sm font-medium truncate">{user.name || 'Utilisateur'}</p>
                      <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                    </div>

                    <Link
                      href="/admin"
                      className="flex items-center gap-3 px-4 py-3 hover:bg-muted transition-colors"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <Settings className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">Administration</span>
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-muted transition-colors w-full text-left text-red-600"
                    >
                      <LogOut className="w-4 h-4" />
                      <span className="text-sm">Déconnexion</span>
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-4 border-t border-border">
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

            {/* Mobile Auth - Only shown when logged in */}
            {!isLoading && user && (
              <div className="pt-4 border-t border-border space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium">{user.name || 'Utilisateur'}</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                </div>
                <Link
                  href="/admin"
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary"
                  onClick={() => setIsOpen(false)}
                >
                  <Settings className="w-4 h-4" />
                  Administration
                </Link>
                <button
                  onClick={() => {
                    handleLogout()
                    setIsOpen(false)
                  }}
                  className="flex items-center gap-2 text-red-600"
                >
                  <LogOut className="w-4 h-4" />
                  Déconnexion
                </button>
              </div>
            )}
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
