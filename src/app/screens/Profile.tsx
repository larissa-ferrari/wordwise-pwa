import { useNavigate } from 'react-router-dom'
import {
  Settings,
  Users,
  Heart,
  MessageCircle,
  Palette,
  Library,
  Flame,
  PenLine,
  Star,
} from 'lucide-react'
import { ROUTES } from '../constants'
import { UserAvatar, BadgeIcon, AestheticIcon, EmotionIcon } from '../components/icons'
import type { BadgeId } from '../components/icons'

const badges: { id: BadgeId; name: string; description: string }[] = [
  { id: 'marathon', name: 'Maratonista', description: '10 livros em um mês'    },
  { id: 'explorer', name: 'Explorador',  description: '5 gêneros diferentes'   },
  { id: 'critic',   name: 'Crítico',     description: '25 reviews publicadas'  },
  { id: 'social',   name: 'Social',      description: '50 seguidores'          },
]

const topGenres = [
  { name: 'Fantasy',          percentage: 35, color: '#b87cde' },
  { name: 'Ficção Literária', percentage: 28, color: '#c8a96e' },
  { name: 'Sci-Fi',           percentage: 20, color: '#6a9fcf' },
  { name: 'Romance',          percentage: 17, color: '#e8635a' },
]

const recentReviews = [
  {
    book: { title: 'Fourth Wing',     author: 'Rebecca Yarros', cover: 'from-[#e8635a] to-[#b87cde]' },
    rating: 5,
    excerpt: 'Dragões, romance e guerra. Este livro tem tudo que eu amo em fantasia...',
    likes: 42,
    comments: 8,
  },
  {
    book: { title: 'Project Hail Mary', author: 'Andy Weir', cover: 'from-[#6a9fcf] to-[#b87cde]' },
    rating: 5,
    excerpt: 'Weir fez de novo! Uma jornada científica emocionante do início ao fim...',
    likes: 38,
    comments: 12,
  },
]

const compatibleUsers = [
  { name: 'Pedro Costa',  username: '@pedro_lit',   compatibility: 87 },
  { name: 'Mariana Luz',  username: '@mari_books',  compatibility: 82 },
  { name: 'Lucas Souza',  username: '@lucas_reads', compatibility: 78 },
]

export function Profile() {
  const navigate = useNavigate()

  const userStats = {
    booksRead: 47,
    currentStreak: 12,
    totalReviews: 34,
    followers: 128,
    following: 93,
    avgRating: 4.3,
  }

  return (
    <div className="min-h-screen bg-[#0a0807] text-white pb-20">
      {/* Header */}
      <header className="relative overflow-hidden">
        <div className="h-32 bg-gradient-to-br from-[#1a1210] via-[#2a1f1a] to-[#1a1210] relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#c8a96e]/10 to-transparent rounded-full blur-3xl" />
        </div>

        <div className="px-6 pb-6 relative">
          {/* Avatar + Actions */}
          <div className="flex items-end gap-4 -mt-12 mb-4">
            <UserAvatar name="Ana Silva" size="xl" className="border-4 border-[#0a0807]" />
            <button className="mb-2 px-6 py-2 bg-gradient-to-r from-[#c8a96e] to-[#e8d4a8] text-[#1a1210] rounded-full text-sm font-medium">
              Editar perfil
            </button>
            <button className="mb-2 w-10 h-10 rounded-full bg-[#1a1210] flex items-center justify-center border border-[#c8a96e]/20">
              <Settings size={18} className="text-[#c8a96e]" />
            </button>
            <button
              onClick={() => navigate(ROUTES.brand)}
              className="mb-2 w-10 h-10 rounded-full bg-[#1a1210] flex items-center justify-center border border-[#c8a96e]/20"
              title="Identidade Visual"
            >
              <Palette size={18} className="text-[#c8a96e]" />
            </button>
          </div>

          {/* User Info */}
          <div className="mb-4">
            <h1 className="text-2xl mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>
              Ana Silva
            </h1>
            <p className="text-sm text-[#8a7e6e] mb-2">@ana_reads</p>
            <p className="text-sm text-[#e8d4a8]/90 leading-relaxed">
              Apaixonada por fantasia e ficção literária. Sempre em busca da próxima história que vai me tirar do chão.
            </p>
          </div>

          {/* Follow Stats */}
          <div className="flex gap-6 mb-4">
            <button className="flex items-center gap-2">
              <Users size={16} className="text-[#c8a96e]" />
              <span className="text-sm">
                <span className="font-medium">{userStats.followers}</span>
                <span className="text-[#8a7e6e]"> seguidores</span>
              </span>
            </button>
            <button className="flex items-center gap-2">
              <span className="text-sm">
                <span className="font-medium">{userStats.following}</span>
                <span className="text-[#8a7e6e]"> seguindo</span>
              </span>
            </button>
          </div>

          {/* Aesthetic Tag */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#c8a96e]/10 border border-[#c8a96e]/30 rounded-full">
            <AestheticIcon id="dark-academia" size={12} />
            <span className="text-xs text-[#c8a96e]">Dark Academia</span>
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-6 py-6 space-y-6">
        {/* Stats Grid */}
        <section>
          <h2 className="text-lg mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            Estatísticas de Leitura
          </h2>
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-[#1a1210]/50 border border-[#c8a96e]/20 rounded-xl p-4 text-center">
              <div className="flex justify-center mb-2">
                <Library size={28} className="text-[#c8a96e]" />
              </div>
              <p className="text-2xl font-bold text-[#c8a96e] mb-1">{userStats.booksRead}</p>
              <p className="text-xs text-[#8a7e6e]">Livros lidos</p>
            </div>
            <div className="bg-[#1a1210]/50 border border-[#c8a96e]/20 rounded-xl p-4 text-center">
              <div className="flex justify-center mb-2">
                <Flame size={28} className="text-[#e8635a]" />
              </div>
              <p className="text-2xl font-bold text-[#e8635a] mb-1">{userStats.currentStreak}</p>
              <p className="text-xs text-[#8a7e6e]">Dias seguidos</p>
            </div>
            <div className="bg-[#1a1210]/50 border border-[#c8a96e]/20 rounded-xl p-4 text-center">
              <div className="flex justify-center mb-2">
                <PenLine size={28} className="text-[#c8a96e]" />
              </div>
              <p className="text-2xl font-bold text-[#c8a96e] mb-1">{userStats.totalReviews}</p>
              <p className="text-xs text-[#8a7e6e]">Reviews</p>
            </div>
          </div>
        </section>

        {/* Badges */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg" style={{ fontFamily: 'Playfair Display, serif' }}>
              Conquistas
            </h2>
            <button className="text-sm text-[#c8a96e]">Ver todas</button>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {badges.map((badge) => (
              <button
                key={badge.id}
                className="bg-[#1a1210]/50 border border-[#c8a96e]/20 rounded-xl p-3 hover:border-[#c8a96e]/40 transition-all"
              >
                <div className="flex justify-center mb-2">
                  <BadgeIcon id={badge.id} size={28} />
                </div>
                <p className="text-[10px] text-[#e8d4a8] line-clamp-1">{badge.name}</p>
              </button>
            ))}
          </div>
        </section>

        {/* Reading Personality */}
        <section>
          <h2 className="text-lg mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            Perfil de Leitor
          </h2>
          <div className="bg-gradient-to-br from-[#1a1210] to-[#2a1f1a] border border-[#c8a96e]/20 rounded-2xl p-6">
            <h3 className="text-sm text-[#c8a96e] uppercase tracking-wider mb-4">
              Gêneros favoritos
            </h3>
            <div className="space-y-3">
              {topGenres.map((genre, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-[#e8d4a8]">{genre.name}</span>
                    <span className="text-[#8a7e6e]">{genre.percentage}%</span>
                  </div>
                  <div className="h-2 bg-[#8a7e6e]/20 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${genre.percentage}%`, backgroundColor: genre.color }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-[#c8a96e]/10 grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-[#8a7e6e] mb-1">Emoção dominante</p>
                <EmotionIcon
                  id="love"
                  size={14}
                  showLabel
                  className="text-sm text-[#e8d4a8]"
                />
              </div>
              <div>
                <p className="text-xs text-[#8a7e6e] mb-1">Nota média</p>
                <p className="text-sm text-[#e8d4a8] flex items-center gap-1">
                  <Star size={14} className="fill-[#c8a96e] text-[#c8a96e]" />
                  {userStats.avgRating}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Recent Reviews */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg" style={{ fontFamily: 'Playfair Display, serif' }}>
              Reviews Recentes
            </h2>
            <button className="text-sm text-[#c8a96e]">Ver todas</button>
          </div>
          <div className="space-y-3">
            {recentReviews.map((review, i) => (
              <div
                key={i}
                className="bg-[#1a1210]/50 border border-[#c8a96e]/20 rounded-xl p-4 hover:border-[#c8a96e]/40 transition-all"
              >
                <div className="flex gap-3 mb-3">
                  <div
                    className={`w-12 h-16 rounded bg-gradient-to-br ${review.book.cover} flex-shrink-0`}
                  />
                  <div className="flex-1">
                    <h3 className="text-sm font-medium mb-1">{review.book.title}</h3>
                    <p className="text-xs text-[#8a7e6e] mb-2">{review.book.author}</p>
                    <div className="flex gap-1">
                      {[...Array(review.rating)].map((_, j) => (
                        <Star key={j} size={12} className="fill-[#c8a96e] text-[#c8a96e]" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-[#e8d4a8]/90 mb-3 line-clamp-2">{review.excerpt}</p>
                <div className="flex items-center gap-4 text-xs text-[#8a7e6e]">
                  <span className="flex items-center gap-1">
                    <Heart size={14} /> {review.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle size={14} /> {review.comments}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Compatibility */}
        <section>
          <h2 className="text-lg mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            Compatibilidade
          </h2>
          <div className="space-y-3">
            {compatibleUsers.map((user, i) => (
              <div
                key={i}
                className="bg-[#1a1210]/50 border border-[#c8a96e]/20 rounded-xl p-4 flex items-center gap-3"
              >
                <UserAvatar name={user.name} size="lg" />
                <div className="flex-1">
                  <h3 className="text-sm font-medium">{user.name}</h3>
                  <p className="text-xs text-[#8a7e6e]">{user.username}</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-[#c8a96e]">{user.compatibility}%</p>
                  <p className="text-[10px] text-[#8a7e6e]">compatível</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
