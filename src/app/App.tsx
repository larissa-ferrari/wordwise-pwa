import React from 'react'
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { AppLayout } from './components/layouts/AppLayout'
import { OnboardingGuard } from './components/layouts/OnboardingGuard'
import { OnboardingProvider } from './context/OnboardingContext'
import { ReviewModalProvider } from './context/ReviewModalContext'
import { AuthProvider, useAuth } from './context/AuthContext'
import { useOnboarding } from './context/OnboardingContext'

const Onboarding  = React.lazy(() => import('./screens/Onboarding').then(m  => ({ default: m.Onboarding  })))
const Feed        = React.lazy(() => import('./screens/Feed').then(m        => ({ default: m.Feed        })))
const Discover    = React.lazy(() => import('./screens/Discover').then(m    => ({ default: m.Discover    })))
const Shelves     = React.lazy(() => import('./screens/Shelves').then(m     => ({ default: m.Shelves     })))
const Profile     = React.lazy(() => import('./screens/Profile').then(m     => ({ default: m.Profile     })))
const BookDetails = React.lazy(() => import('./screens/BookDetails').then(m => ({ default: m.BookDetails })))
const BrandGuide  = React.lazy(() => import('./screens/BrandGuide').then(m  => ({ default: m.BrandGuide  })))
const Login       = React.lazy(() => import('./screens/Login').then(m       => ({ default: m.Login       })))
const Register    = React.lazy(() => import('./screens/Register').then(m    => ({ default: m.Register    })))

function AuthGuard() {
  const { isAuthenticated, isLoading } = useAuth()
  if (isLoading) return <AppLoadingScreen />
  if (!isAuthenticated) return <Navigate to="/login" replace />
  return <Outlet />
}

function OnboardingRoute() {
  const { isAuthenticated, isLoading } = useAuth()
  const { hasCompleted } = useOnboarding()
  if (isLoading) return <AppLoadingScreen />
  if (!isAuthenticated) return <Navigate to="/login" replace />
  if (hasCompleted) return <Navigate to="/feed" replace />
  return <Onboarding />
}

export default function App() {
  return (
    <AuthProvider>
      <OnboardingProvider>
        <ReviewModalProvider>
          <BrowserRouter>
            <React.Suspense fallback={<AppLoadingScreen />}>
              <Routes>
                {/* Public routes */}
                <Route path="/login"    element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Semi-public: onboarding (needs auth, skips if already done) */}
                <Route path="/onboarding" element={<OnboardingRoute />} />

                {/* Protected routes */}
                <Route element={<AuthGuard />}>
                  <Route element={<OnboardingGuard />}>
                    <Route element={<AppLayout />}>
                      <Route path="/"          element={<Navigate to="/feed" replace />} />
                      <Route path="/feed"      element={<Feed />} />
                      <Route path="/discover"  element={<Discover />} />
                      <Route path="/shelves"   element={<Shelves />} />
                      <Route path="/profile"   element={<Profile />} />
                      <Route path="/books/:bookId" element={<BookDetails />} />
                      <Route path="/brand"     element={<BrandGuide />} />
                    </Route>
                  </Route>
                </Route>

                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </React.Suspense>
          </BrowserRouter>
        </ReviewModalProvider>
      </OnboardingProvider>
    </AuthProvider>
  )
}

function AppLoadingScreen() {
  return (
    <div className="min-h-screen bg-[#0a0807] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-full border-2 border-[#c8a96e]/30 border-t-[#c8a96e] animate-spin" />
        <p className="text-[#8a7e6e] text-sm">Carregando...</p>
      </div>
    </div>
  )
}
