'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { Bike, Wrench } from 'lucide-react'

type LoadingContextType = {
  hasLoaded: boolean
}

const LoadingContext = createContext<LoadingContextType>({ hasLoaded: true })

export const useLoading = () => useContext(LoadingContext)

function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 100)

    // Complete after minimum time
    const timer = setTimeout(() => {
      onComplete()
    }, 1500)

    return () => {
      clearInterval(interval)
      clearTimeout(timer)
    }
  }, [onComplete])

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-8">
        {/* Animated Logo */}
        <div className="relative">
          {/* Rotating wrench */}
          <div className="absolute -top-2 -right-2 animate-spin" style={{ animationDuration: '3s' }}>
            <Wrench className="h-8 w-8 text-primary" />
          </div>

          {/* Bouncing bike */}
          <div className="animate-bounce" style={{ animationDuration: '2s' }}>
            <div className="bg-primary/10 p-6 rounded-full">
              <Bike className="h-16 w-16 text-primary" />
            </div>
          </div>
        </div>

        {/* Brand name */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-primary handwritten-title mb-2">Rust-in</h1>
          <p className="text-muted-foreground animate-pulse">Chargement en cours...</p>
        </div>

        {/* Progress bar */}
        <div className="w-64 h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-300 ease-out"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>

        {/* Animated dots */}
        <div className="flex gap-2">
          <div
            className="w-3 h-3 bg-primary rounded-full animate-bounce"
            style={{ animationDelay: '0ms' }}
          />
          <div
            className="w-3 h-3 bg-primary rounded-full animate-bounce"
            style={{ animationDelay: '150ms' }}
          />
          <div
            className="w-3 h-3 bg-primary rounded-full animate-bounce"
            style={{ animationDelay: '300ms' }}
          />
        </div>
      </div>
    </div>
  )
}

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [showLoading, setShowLoading] = useState(false)
  const [hasLoaded, setHasLoaded] = useState(true)

  useEffect(() => {
    // Check if this is the first visit in this session
    const hasVisited = sessionStorage.getItem('rust-in-visited')

    if (!hasVisited) {
      setShowLoading(true)
      setHasLoaded(false)
    }
  }, [])

  const handleLoadingComplete = () => {
    sessionStorage.setItem('rust-in-visited', 'true')
    setShowLoading(false)
    setHasLoaded(true)
  }

  return (
    <LoadingContext.Provider value={{ hasLoaded }}>
      {showLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
      <div
        className={`transition-opacity duration-500 ${showLoading ? 'opacity-0' : 'opacity-100'}`}
      >
        {children}
      </div>
    </LoadingContext.Provider>
  )
}

