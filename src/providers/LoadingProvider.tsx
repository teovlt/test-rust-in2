'use client'

import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react'
import { Bike } from 'lucide-react'

type LoadingContextType = {
  isAppReady: boolean
  setUserLoaded: () => void
}

const LoadingContext = createContext<LoadingContextType>({
  isAppReady: false,
  setUserLoaded: () => {},
})

export const useLoading = () => useContext(LoadingContext)

function LoadingScreen() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Animate progress bar (visual only, doesn't control actual loading)
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          return 90 // Stay at 90% until actually ready
        }
        return prev + Math.random() * 10
      })
    }, 150)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-8">
        {/* Animated Logo */}
        <div className="relative">
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
  const [showLoading, setShowLoading] = useState(true)
  const [userLoaded, setUserLoadedState] = useState(false)
  const [minimumTimePassed, setMinimumTimePassed] = useState(false)

  // Check session storage on mount
  useEffect(() => {
    const hasVisited = sessionStorage.getItem('rust-in-visited')
    if (hasVisited) {
      // If already visited this session, skip loading
      setShowLoading(false)
      setMinimumTimePassed(true)
      setUserLoadedState(true)
    } else {
      // Minimum loading time for first visit
      const timer = setTimeout(() => {
        setMinimumTimePassed(true)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [])

  // Hide loading when both conditions are met
  useEffect(() => {
    if (userLoaded && minimumTimePassed && showLoading) {
      // Small delay for smooth transition
      const hideTimer = setTimeout(() => {
        sessionStorage.setItem('rust-in-visited', 'true')
        setShowLoading(false)
      }, 300)
      return () => clearTimeout(hideTimer)
    }
  }, [userLoaded, minimumTimePassed, showLoading])

  const setUserLoaded = useCallback(() => {
    setUserLoadedState(true)
  }, [])

  return (
    <LoadingContext.Provider value={{ isAppReady: !showLoading, setUserLoaded }}>
      {showLoading && <LoadingScreen />}
      <div
        className={`transition-opacity duration-500 ${showLoading ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      >
        {children}
      </div>
    </LoadingContext.Provider>
  )
}
