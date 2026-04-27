import { useNavigate } from 'react-router-dom'
import { Settings, Palette, Library, Flame, PenLine, Star } from 'lucide-react'
import { ROUTES } from '../constants'
import { UserAvatar, BadgeIcon, AestheticIcon, EmotionIcon } from '../components/icons'
import type { BadgeId } from '../components/icons'
import { useAuth } from '../context/AuthContext'

const STATIC_BADGES: { id: BadgeId; name: string; description: string }[] = [
  { id: 'marathon', name: 'Maratonista', description: '10 livros em um mês'   },
  { id: 'explorer', name: 'Explorador',  description: '5 gêneros diferentes'  },
  { id: 'critic',   name: 'Crítico',     description: '25 reviews publicadas' },
  { id: 'social',   name: 'Social',      description: '50 seguidores'         },
]

const STATIC_GENRES = [
  { name: 'Fantasy',          percentage: 35, color: '#b87cde' },
  { name: 'Ficção Literária', percentage: 28, color: '#c8a96e' },
  { name: 'Sci-Fi',           percentage: 20, color: '#6a9fcf' },
  { name: 'Romance',          percentage: 17, color: '#e8635a' },
]

export function Profile() {
  const navigate    = useNavigate()
  const { user, logout } = useAuth()

  if (!user) return null

  return (
    <div className="min-h-screen bg-[#0a0807] text-white pb-6">

      {/* Profile header */}
      <header className="relative overflow-hidden">
        <div className="h-40 lg:h-56 bg-gradient-to-br from-[#1a1210] via-[#2a1f1a] to-[#1a1210] relative">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23c8a96e\' fill-opacity=\'0.03\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-[#c8a96e]/10 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-gradient-to-tr from-[#b87cde]/5 to-transparent rounded-full blur-3xl" />
        </div>

        <div className="px-6 lg:px-8 pb-6 relative">
          <div className="flex items-end gap-4 -mt-14 lg:-mt-16 mb-5">
            <UserAvatar name={user.display_name} size="xl" className="border-4 border-[#0a0807] shadow-xl" />
            <div className="mb-2 flex items-center gap-2 flex-wrap">
              <button className="px-5 py-2 bg-gradient-to-r from-[#c8a96e] to-[#e8d4a8] text-[#1a1210] rounded-full text-sm font-medium">
                Editar perfil
              </button>
              <button
                onClick={logout}
                className="w-9 h-9 rounded-full bg-[#1a1210] flex items-center justify-center border border-[#c8a96e]/20"
                title="Sair"
              >
                <Settings size={16} className="text-[#c8a96e]" />
              </button>
              <button
                onClick={() => navigate(ROUTES.brand)}
                className="w-9 h-9 rounded-full bg-[#1a1210] flex items-center justify-center border border-[#c8a96e]/20"
                title="Identidade Visual"
              >
                <Palette size={16} className="text-[#c8a96e]" />
              </button>
            </div>
          </div>

          <div className="lg:flex lg:items-start lg:justify-between lg:gap-8">
            <div className="mb-4 lg:mb-0">
              <h1 className="text-2xl lg:text-3xl mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>
                {user.display_name}
              </h1>
              <p className="text-sm text-[#8a7e6e] mb-2">@{user.username}</p>
              {user.bio && (
                <p className="text-sm text-[#e8d4a8]/90 leading-relaxed max-w-md">{user.bio}</p>
              )}
            </div>

            <div className="flex gap-6 lg:gap-8 flex-shrink-0">
              {[
                { value: user.books_read_count, label: 'Lidos',      color: 'text-[#c8a96e]' },
                { value: user.followers_count,  label: 'Seguidores', color: 'text-[#e8d4a8]' },
                { value: user.following_count,  label: 'Seguindo',   color: 'text-[#e8d4a8]' },
                { value: user.reviews_count,    label: 'Reviews',    color: 'text-[#c8a96e]' },
              ].map(({ value, label, color }) => (
                <div key={label} className="text-center">
                  <p className={`text-xl lg:text-2xl font-bold ${color}`}>{value}</p>
                  <p className="text-xs text-[#8a7e6e]">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {user.aesthetic && (
            <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 bg-[#c8a96e]/10 border border-[#c8a96e]/30 rounded-full">
              <AestheticIcon id={user.aesthetic as 'dark-academia'} size={12} />
              <span className="text-xs text-[#c8a96e] capitalize">{user.aesthetic.replace('-', ' ')}</span>
            </div>
          )}
        </div>
      </header>

      {/* Body */}
      <div className="px-6 lg:px-8 py-6 lg:grid lg:grid-cols-[1fr_340px] lg:gap-8 lg:items-start">

        {/* Left */}
        <div className="space-y-6">

          {/* Stats */}
          <section>
            <h2 className="text-lg mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>Estatísticas de Leitura</h2>
            <div className="grid grid-cols-3 gap-3">
              {[
                { Icon: Library, value: user.books_read_count,  label: 'Livros lidos',  color: 'text-[#c8a96e]' },
                { Icon: Flame,   value: user.reading_streak,    label: 'Dias seguidos', color: 'text-[#e8635a]' },
                { Icon: PenLine, value: user.reviews_count,     label: 'Reviews',       color: 'text-[#c8a96e]' },
              ].map(({ Icon, value, label, color }, i) => (
                <div key={i} className="bg-[#1a1210]/50 border border-[#c8a96e]/20 rounded-xl p-4 text-center">
                  <div className="flex justify-center mb-2">
                    <Icon size={26} className={color} />
                  </div>
                  <p className={`text-2xl font-bold mb-1 ${color}`}>{value}</p>
                  <p className="text-xs text-[#8a7e6e]">{label}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Badges */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg" style={{ fontFamily: 'Playfair Display, serif' }}>Conquistas</h2>
              <button className="text-sm text-[#c8a96e]">Ver todas</button>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {STATIC_BADGES.map((badge) => (
                <button key={badge.id} className="bg-[#1a1210]/50 border border-[#c8a96e]/20 rounded-xl p-3 hover:border-[#c8a96e]/40 transition-all group" title={badge.description}>
                  <div className="flex justify-center mb-2">
                    <BadgeIcon id={badge.id} size={26} />
                  </div>
                  <p className="text-[10px] text-[#e8d4a8] line-clamp-1">{badge.name}</p>
                  <p className="hidden group-hover:block text-[9px] text-[#8a7e6e] mt-0.5 line-clamp-2">{badge.description}</p>
                </button>
              ))}
            </div>
          </section>

          {/* Reading personality */}
          <section>
            <h2 className="text-lg mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>Perfil de Leitor</h2>
            <div className="bg-gradient-to-br from-[#1a1210] to-[#2a1f1a] border border-[#c8a96e]/20 rounded-2xl p-6">
              <h3 className="text-sm text-[#c8a96e] uppercase tracking-wider mb-4">Gêneros favoritos</h3>
              <div className="space-y-3">
                {STATIC_GENRES.map((genre, i) => (
                  <div key={i}>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-[#e8d4a8]">{genre.name}</span>
                      <span className="text-[#8a7e6e]">{genre.percentage}%</span>
                    </div>
                    <div className="h-2 bg-[#8a7e6e]/20 rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-500" style={{ width: `${genre.percentage}%`, backgroundColor: genre.color }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-[#c8a96e]/10 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-[#8a7e6e] mb-1">Emoção dominante</p>
                  <EmotionIcon id="love" size={14} showLabel className="text-sm text-[#e8d4a8]" />
                </div>
                {user.avg_rating && (
                  <div>
                    <p className="text-xs text-[#8a7e6e] mb-1">Nota média</p>
                    <p className="text-sm text-[#e8d4a8] flex items-center gap-1">
                      <Star size={13} className="fill-[#c8a96e] text-[#c8a96e]" />
                      {user.avg_rating.toFixed(1)}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>

        {/* Right */}
        <div className="space-y-6 mt-6 lg:mt-0">
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg" style={{ fontFamily: 'Playfair Display, serif' }}>Compatibilidade</h2>
            </div>
            <div className="text-center py-10 text-[#8a7e6e]">
              <p className="text-sm">Adicione livros à sua estante para encontrar leitores compatíveis.</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
