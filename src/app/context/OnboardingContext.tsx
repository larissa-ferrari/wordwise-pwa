import React, { createContext, useContext, useState, useEffect } from 'react'
import { STORAGE_KEYS } from '../constants'

interface OnboardingContextValue {
  hasCompleted: boolean
  complete: () => void
  reset: () => void
}

const OnboardingContext = createContext<OnboardingContextValue | null>(null)

export function OnboardingProvider({ children }: { children: React.ReactNode }) {
  const [hasCompleted, setHasCompleted] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.onboardingCompleted) === 'true'
    } catch {
      return false
    }
  })

  const complete = () => {
    setHasCompleted(true)
    try {
      localStorage.setItem(STORAGE_KEYS.onboardingCompleted, 'true')
    } catch {
      // storage unavailable — keep in-memory state
    }
  }

  const reset = () => {
    setHasCompleted(false)
    try {
      localStorage.removeItem(STORAGE_KEYS.onboardingCompleted)
    } catch {
      // ignore
    }
  }

  return (
    <OnboardingContext.Provider value={{ hasCompleted, complete, reset }}>
      {children}
    </OnboardingContext.Provider>
  )
}

export function useOnboarding() {
  const ctx = useContext(OnboardingContext)
  if (!ctx) throw new Error('useOnboarding must be used within <OnboardingProvider>')
  return ctx
}
