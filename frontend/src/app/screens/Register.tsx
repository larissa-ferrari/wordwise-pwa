import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BookOpen, Eye, EyeOff, AlertCircle, AtSign } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export function Register() {
  const navigate = useNavigate()
  const { register } = useAuth()

  const [displayName, setDisplayName] = useState('')
  const [username, setUsername]       = useState('')
  const [email, setEmail]             = useState('')
  const [password, setPassword]       = useState('')
  const [showPwd, setShowPwd]         = useState(false)
  const [error, setError]             = useState<string | null>(null)
  const [loading, setLoading]         = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (password.length < 8) {
      setError('A senha deve ter pelo menos 8 caracteres')
      return
    }
    setLoading(true)
    try {
      await register({ display_name: displayName, username, email, password })
      navigate('/', { replace: true })
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Erro ao criar conta')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0807] flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-sm">

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#c8a96e]/10 border border-[#c8a96e]/30 mb-5">
            <BookOpen size={26} className="text-[#c8a96e]" />
          </div>
          <h1 className="text-3xl mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>
            <span className="text-[#c8a96e]">Word</span>
            <span className="text-[#e8d4a8]">Wise</span>
          </h1>
          <p className="text-sm text-[#8a7e6e]">Crie sua conta de leitor</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5">

          {error && (
            <div className="flex items-center gap-3 px-4 py-3 bg-[#e8635a]/10 border border-[#e8635a]/30 rounded-xl text-sm text-[#e8635a]">
              <AlertCircle size={16} className="flex-shrink-0" />
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs text-[#8a7e6e] mb-1.5 ml-1">Nome de exibição</label>
            <input
              type="text"
              autoComplete="name"
              required
              value={displayName}
              onChange={e => setDisplayName(e.target.value)}
              placeholder="Como prefere ser chamado?"
              className="w-full bg-[#1a1210] border border-[#c8a96e]/20 rounded-xl px-4 py-3 text-sm text-[#e8d4a8] placeholder-[#8a7e6e] focus:outline-none focus:border-[#c8a96e] transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs text-[#8a7e6e] mb-1.5 ml-1">Username</label>
            <div className="relative">
              <AtSign size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8a7e6e]" />
              <input
                type="text"
                autoComplete="username"
                required
                pattern="[a-z0-9_]{3,50}"
                title="Apenas letras minúsculas, números e _"
                value={username}
                onChange={e => setUsername(e.target.value.toLowerCase())}
                placeholder="seu_username"
                className="w-full bg-[#1a1210] border border-[#c8a96e]/20 rounded-xl pl-9 pr-4 py-3 text-sm text-[#e8d4a8] placeholder-[#8a7e6e] focus:outline-none focus:border-[#c8a96e] transition-colors"
              />
            </div>
          </div>

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
                autoComplete="new-password"
                required
                minLength={8}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Mínimo 8 caracteres"
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
            className="w-full py-3 mt-1 bg-gradient-to-r from-[#c8a96e] to-[#e8d4a8] text-[#1a1210] rounded-xl font-medium text-sm hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Criando conta...' : 'Criar conta'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-[#8a7e6e]">
            Já tem conta?{' '}
            <Link to="/login" className="text-[#c8a96e] hover:text-[#e8d4a8] transition-colors">
              Entrar
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
