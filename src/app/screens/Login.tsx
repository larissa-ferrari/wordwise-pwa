import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BookOpen, Eye, EyeOff, AlertCircle } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [showPwd, setShowPwd]   = useState(false)
  const [error, setError]       = useState<string | null>(null)
  const [loading, setLoading]   = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      await login(email, password)
      navigate('/', { replace: true })
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Erro ao entrar')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0807] flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-sm">

        {/* Logo */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#c8a96e]/10 border border-[#c8a96e]/30 mb-5">
            <BookOpen size={26} className="text-[#c8a96e]" />
          </div>
          <h1 className="text-3xl mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>
            <span className="text-[#c8a96e]">Word</span>
            <span className="text-[#e8d4a8]">Wise</span>
          </h1>
          <p className="text-sm text-[#8a7e6e]">Bem-vindo de volta, leitor</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {error && (
            <div className="flex items-center gap-3 px-4 py-3 bg-[#e8635a]/10 border border-[#e8635a]/30 rounded-xl text-sm text-[#e8635a]">
              <AlertCircle size={16} className="flex-shrink-0" />
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs text-[#8a7e6e] mb-1.5 ml-1">E-mail</label>
            <input
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="seu@email.com"
              className="w-full bg-[#1a1210] border border-[#c8a96e]/20 rounded-xl px-4 py-3 text-sm text-[#e8d4a8] placeholder-[#8a7e6e] focus:outline-none focus:border-[#c8a96e] transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs text-[#8a7e6e] mb-1.5 ml-1">Senha</label>
            <div className="relative">
              <input
                type={showPwd ? 'text' : 'password'}
                autoComplete="current-password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#1a1210] border border-[#c8a96e]/20 rounded-xl px-4 py-3 pr-12 text-sm text-[#e8d4a8] placeholder-[#8a7e6e] focus:outline-none focus:border-[#c8a96e] transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPwd(v => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8a7e6e] hover:text-[#c8a96e] transition-colors"
              >
                {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-[#c8a96e] to-[#e8d4a8] text-[#1a1210] rounded-xl font-medium text-sm hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-[#8a7e6e]">
            Não tem conta?{' '}
            <Link to="/register" className="text-[#c8a96e] hover:text-[#e8d4a8] transition-colors">
              Criar conta
            </Link>
          </p>
        </div>

        {/* Decorative quote */}
        <p
          className="mt-12 text-center text-xs text-[#8a7e6e]/60 italic leading-relaxed"
          style={{ fontFamily: 'Playfair Display, serif' }}
        >
          "Um leitor vive mil vidas antes de morrer."
        </p>
      </div>
    </div>
  )
}
