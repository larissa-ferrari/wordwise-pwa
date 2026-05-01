import React from 'react'
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { AppLayout } from './components/layouts/AppLayout'
import { OnboardingGuard } from './components/layouts/OnboardingGuard'
import { OnboardingProvider } from './context/OnboardingContext'
import { ReviewModalProvider } from './context/ReviewModalContext'
import { AuthProvider, useAuth } from './context/AuthContext'
import { useOnboarding } from './context/OnboardingContext'
import { ThemeProvider } from './context/ThemeContext'
import { ReadingPrefsProvider } from './context/ReadingPrefsContext'

const Onboarding      = React.lazy(() => import('./screens/Onboarding').then(m      => ({ default: m.Onboarding      })))
const Feed            = React.lazy(() => import('./screens/Feed').then(m            => ({ default: m.Feed            })))
const Discover        = React.lazy(() => import('./screens/Discover').then(m        => ({ default: m.Discover        })))
const Shelves         = React.lazy(() => import('./screens/Shelves').then(m         => ({ default: m.Shelves         })))
const Profile         = React.lazy(() => import('./screens/Profile').then(m         => ({ default: m.Profile         })))
const BookDetails     = React.lazy(() => import('./screens/BookDetails').then(m     => ({ default: m.BookDetails     })))
const BrandGuide      = React.lazy(() => import('./screens/BrandGuide').then(m      => ({ default: m.BrandGuide      })))
const Login           = React.lazy(() => import('./screens/Login').then(m           => ({ default: m.Login           })))
const Register        = React.lazy(() => import('./screens/Register').then(m        => ({ default: m.Register        })))
const Stories         = React.lazy(() => import('./screens/Stories').then(m         => ({ default: m.Stories         })))
const StoryDetails    = React.lazy(() => import('./screens/StoryDetails').then(m    => ({ default: m.StoryDetails    })))
const ChapterReader   = React.lazy(() => import('./screens/ChapterReader').then(m   => ({ default: m.ChapterReader   })))
const MyWorks         = React.lazy(() => import('./screens/MyWorks').then(m         => ({ default: m.MyWorks         })))
const StoryEditor     = React.lazy(() => import('./screens/StoryEditor').then(m     => ({ default: m.StoryEditor     })))
const ChapterEditor   = React.lazy(() => import('./screens/ChapterEditor').then(m   => ({ default: m.ChapterEditor   })))
const AdminLayout     = React.lazy(() => import('./screens/admin/AdminLayout'))
const AdminDashboard  = React.lazy(() => import('./screens/admin/AdminDashboard'))
const TropesPage      = React.lazy(() => import('./screens/admin/TropesPage'))
const CategoriesPage  = React.lazy(() => import('./screens/admin/CategoriesPage'))
const AuthorsPage     = React.lazy(() => import('./screens/admin/AuthorsPage'))

function AuthGuard() {
  const { isAuthenticated, isLoading } = useAuth()
  if (isLoading) return <AppLoadingScreen />
  if (!isAuthenticated) return <Navigate to="/login" replace />
  return <Outlet />
}

function AdminGuard() {
  const { user, isAuthenticated, isLoading } = useAuth()
  if (isLoading) return <AppLoadingScreen />
  if (!isAuthenticated) return <Navigate to="/login" replace />
  if (!user?.is_admin) return <Navigate to="/feed" replace />
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
    <ThemeProvider>
      <ReadingPrefsProvider>
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
                          <Route path="/stories"   element={<Stories />} />
                          <Route path="/stories/:storyId" element={<StoryDetails />} />
                          <Route path="/stories/:storyId/chapters/:chapterNum" element={<ChapterReader />} />
                          <Route path="/my-works"  element={<MyWorks />} />
                          <Route path="/my-works/new" element={<StoryEditor />} />
                          <Route path="/my-works/:storyId/edit" element={<StoryEditor />} />
                          <Route path="/my-works/:storyId/chapters/new" element={<ChapterEditor />} />
                          <Route path="/my-works/:storyId/chapters/:chapterNum/edit" element={<ChapterEditor />} />
                          <Route path="/brand"     element={<BrandGuide />} />
                        </Route>
                      </Route>
                    </Route>

                    {/* Admin CMS — requires is_admin */}
                    <Route element={<AdminGuard />}>
                      <Route element={<AdminLayout />}>
                        <Route path="/admin"             element={<AdminDashboard />} />
                        <Route path="/admin/tropes"      element={<TropesPage />} />
                        <Route path="/admin/categories"  element={<CategoriesPage />} />
                        <Route path="/admin/authors"     element={<AuthorsPage />} />
                      </Route>
                    </Route>

                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </React.Suspense>
              </BrowserRouter>
            </ReviewModalProvider>
          </OnboardingProvider>
        </AuthProvider>
      </ReadingPrefsProvider>
    </ThemeProvider>
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
