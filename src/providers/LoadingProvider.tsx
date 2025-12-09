'use client'

import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react'
import { Bike, Mountain, Zap, Wrench, Sparkles, Star } from 'lucide-react'

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
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          return 90
        }
        return prev + Math.random() * 12
      })
    }, 120)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 z-[9999] bg-gradient-to-br from-primary via-primary/90 to-accent overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {/* Large blurred circles */}
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] bg-accent/30 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] bg-white/5 rounded-full blur-3xl" />

        {/* Floating icons - Bike */}
        <div
          className="absolute top-[10%] right-[15%] animate-float"
          style={{ animationDelay: '0s', animationDuration: '4s' }}
        >
          <Bike className="w-24 h-24 text-white/15" />
        </div>

        {/* Floating icons - Mountain (Ski) */}
        <div
          className="absolute bottom-[20%] left-[10%] animate-float"
          style={{ animationDelay: '1s', animationDuration: '5s' }}
        >
          <Mountain className="w-20 h-20 text-white/10 rotate-12" />
        </div>

        {/* Floating icons - Zap (Scooter) */}
        <div
          className="absolute top-[25%] left-[20%] animate-float"
          style={{ animationDelay: '0.5s', animationDuration: '4.5s' }}
        >
          <Zap className="w-16 h-16 text-white/10 -rotate-12" />
        </div>

        {/* Floating icons - Wrench */}
        <div
          className="absolute bottom-[30%] right-[20%] animate-float"
          style={{ animationDelay: '1.5s', animationDuration: '5.5s' }}
        >
          <Wrench className="w-14 h-14 text-white/10 rotate-45" />
        </div>

        {/* Sparkles */}
        <div
          className="absolute top-[40%] right-[10%] animate-pulse"
          style={{ animationDelay: '0.3s' }}
        >
          <Sparkles className="w-10 h-10 text-white/20" />
        </div>

        <div
          className="absolute bottom-[15%] left-[30%] animate-pulse"
          style={{ animationDelay: '0.8s' }}
        >
          <Star className="w-8 h-8 text-white/15" />
        </div>

        {/* Small decorative circles */}
        <div
          className="absolute top-[60%] left-[5%] w-4 h-4 bg-white/20 rounded-full animate-ping"
          style={{ animationDuration: '2s' }}
        />
        <div
          className="absolute top-[15%] left-[40%] w-3 h-3 bg-white/15 rounded-full animate-ping"
          style={{ animationDuration: '2.5s', animationDelay: '0.5s' }}
        />
        <div
          className="absolute bottom-[40%] right-[5%] w-5 h-5 bg-white/10 rounded-full animate-ping"
          style={{ animationDuration: '3s', animationDelay: '1s' }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-8 text-white px-4">
          {/* Animated icon carousel */}
          <div className="relative w-32 h-32">
            {/* Rotating ring */}
            <div
              className="absolute inset-0 border-4 border-white/20 rounded-full animate-spin"
              style={{ animationDuration: '8s' }}
            />
            <div
              className="absolute inset-2 border-2 border-dashed border-white/10 rounded-full animate-spin"
              style={{ animationDuration: '12s', animationDirection: 'reverse' }}
            />

            {/* Center icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white/20 backdrop-blur-sm p-5 rounded-full animate-pulse">
                <div className="relative">
                  <Bike className="w-12 h-12 animate-bounce" style={{ animationDuration: '2s' }} />
                </div>
              </div>
            </div>

            {/* Orbiting icons */}
            <div className="absolute inset-0 animate-spin" style={{ animationDuration: '6s' }}>
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white/20 p-2 rounded-full">
                <Mountain className="w-5 h-5" />
              </div>
            </div>
            <div
              className="absolute inset-0 animate-spin"
              style={{ animationDuration: '6s', animationDelay: '-2s' }}
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white/20 p-2 rounded-full">
                <Zap className="w-5 h-5" />
              </div>
            </div>
            <div
              className="absolute inset-0 animate-spin"
              style={{ animationDuration: '6s', animationDelay: '-4s' }}
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white/20 p-2 rounded-full">
                <Wrench className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Brand */}
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold handwritten-title mb-3 animate-pulse">
              Rust-in
            </h1>
            <p className="text-white/80 text-lg">Vélos • Skis • Trottinettes</p>
          </div>

          {/* Progress bar */}
          <div className="w-72 md:w-80">
            <div className="h-2 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
              <div
                className="h-full bg-white rounded-full transition-all duration-300 ease-out relative"
                style={{ width: `${Math.min(progress, 100)}%` }}
              >
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer" />
              </div>
            </div>
            <p className="text-center text-white/60 text-sm mt-3">Chargement...</p>
          </div>

          {/* Animated dots */}
          <div className="flex gap-3">
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-2 h-2 bg-white/70 rounded-full animate-bounce"
                style={{ animationDelay: `${i * 100}ms`, animationDuration: '1s' }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* CSS for custom animations */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-shimmer {
          animation: shimmer 1.5s infinite;
        }
      `}</style>
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
      }, 1500) // Slightly longer to appreciate the animation
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
