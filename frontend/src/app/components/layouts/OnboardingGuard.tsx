import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useOnboarding } from '../../context/OnboardingContext'

export function OnboardingGuard() {
  const { hasCompleted } = useOnboarding()

  if (!hasCompleted) {
    return <Navigate to="/onboarding" replace />
  }

  return <Outlet />
}
