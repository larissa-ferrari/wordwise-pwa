import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { authService, usersService } from '../services'
import type { ApiUserProfile, RegisterData } from '../services'

const TOKEN_KEY = 'ww:token'

interface AuthContextValue {
  user:            ApiUserProfile | null
  isLoading:       boolean
  isAuthenticated: boolean
  login:           (email: string, password: string) => Promise<void>
  register:        (data: RegisterData) => Promise<void>
  logout:          () => void
  refreshUser:     () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser]       = useState<ApiUserProfile | null>(null)
  const [isLoading, setLoading] = useState(true)

  const fetchMe = useCallback(async () => {
    try {
      const me = await usersService.getMe()
      setUser(me)
    } catch {
      localStorage.removeItem(TOKEN_KEY)
      setUser(null)
    }
  }, [])

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY)
    if (!token) { setLoading(false); return }
    fetchMe().finally(() => setLoading(false))
  }, [fetchMe])

  const login = async (email: string, password: string) => {
    const { access_token } = await authService.login(email, password)
    localStorage.setItem(TOKEN_KEY, access_token)
    await fetchMe()
  }

  const register = async (data: RegisterData) => {
    const { access_token } = await authService.register(data)
    localStorage.setItem(TOKEN_KEY, access_token)
    await fetchMe()
  }

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY)
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        refreshUser: fetchMe,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
