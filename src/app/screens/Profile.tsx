import { useNavigate } from 'react-router-dom'
import {
  Settings,
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
  { id: 'marathon', name: 'Maratonista', description: '10 livros em um mês'   },
  { id: 'explorer', name: 'Explorador',  description: '5 gêneros diferentes'  },
  { id: 'critic',   name: 'Crítico',     description: '25 reviews publicadas' },
  { id: 'social',   name: 'Social',      description: '50 seguidores'         },
]

const topGenres = [
  { name: 'Fantasy',          percentage: 35, color: '#b87cde' },
  { name: 'Ficção Literária', percentage: 28, color: '#c8a96e' },
  { name: 'Sci-Fi',           percentage: 20, color: '#6a9fcf' },
  { name: 'Romance',          percentage: 17, color: '#e8635a' },
]

const recentReviews = [
  {
    book: { title: 'Fourth Wing',      author: 'Rebecca Yarros', cover: 'from-[#e8635a] to-[#b87cde]' },
    rating: 5,
    excerpt: 'Dragões, romance e guerra. Este livro tem tudo que eu amo em fantasia...',
    likes: 42, comments: 8,
  },
  {
    book: { title: 'Project Hail Mary', author: 'Andy Weir', cover: 'from-[#6a9fcf] to-[#b87cde]' },
    rating: 5,
    excerpt: 'Weir fez de novo! Uma jornada científica emocionante do início ao fim...',
    likes: 38, comments: 12,
  },
  {
    book: { title: 'The Housemaid', author: 'Freida McFadden', cover: 'from-[#1a1210] to-[#e8635a]' },
    rating: 4,
    excerpt: 'Thriller impecável. Cada capítulo me deixou mais intrigada...',
    likes: 29, comments: 6,
  },
]

const compatibleUsers = [
  { name: 'Pedro Costa', username: '@pedro_lit',   compatibility: 87 },
  { name: 'Mariana Luz', username: '@mari_books',  compatibility: 82 },
  { name: 'Lucas Souza', username: '@lucas_reads', compatibility: 78 },
]

export function Profile() {
  const navigate = useNavigate()
  const userStats = { booksRead: 47, currentStreak: 12, totalReviews: 34, followers: 128, following: 93, avgRating: 4.3 }

  return (
    <div className="min-h-screen bg-[#0a0807] text-white pb-6">

      {/* ── Profile header ── */}
      <header className="relative overflow-hidden">
        <div className="h-40 lg:h-56 bg-gradient-to-br from-[#1a1210] via-[#2a1f1a] to-[#1a1210] relative">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23c8a96e\' fill-opacity=\'0.03\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-[#c8a96e]/10 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-gradient-to-tr from-[#b87cde]/5 to-transparent rounded-full blur-3xl" />
        </div>

        <div className="px-6 lg:px-8 pb-6 relative">
          <div className="flex items-end gap-4 -mt-14 lg:-mt-16 mb-5">
            <UserAvatar
              name="Ana Silva"
              size="xl"
              className="border-4 border-[#0a0807] shadow-xl"
            />
            <div className="mb-2 flex items-center gap-2 flex-wrap">
              <button className="px-5 py-2 bg-gradient-to-r from-[#c8a96e] to-[#e8d4a8] text-[#1a1210] rounded-full text-sm font-medium">
                Editar perfil
              </button>
              <button className="w-9 h-9 rounded-full bg-[#1a1210] flex items-center justify-center border border-[#c8a96e]/20">
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

          {/* User info + follow stats — side-by-side on desktop */}
          <div className="lg:flex lg:items-start lg:justify-between lg:gap-8">
            <div className="mb-4 lg:mb-0">
              <h1 className="text-2xl lg:text-3xl mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>
                Ana Silva
              </h1>
              <p className="text-sm text-[#8a7e6e] mb-2">@ana_reads</p>
              <p className="text-sm text-[#e8d4a8]/90 leading-relaxed max-w-md">
                Apaixonada por fantasia e ficção literária. Sempre em busca da próxima história que vai me tirar do chão.
              </p>
            </div>

            {/* Stats row — horizontal on desktop */}
            <div className="flex gap-6 lg:gap-8 flex-shrink-0">
              <div className="text-center">
                <p className="text-xl lg:text-2xl font-bold text-[#c8a96e]">{userStats.booksRead}</p>
                <p className="text-xs text-[#8a7e6e]">Lidos</p>
              </div>
              <div className="text-center">
                <p className="text-xl lg:text-2xl font-bold text-[#e8d4a8]">{userStats.followers}</p>
                <p className="text-xs text-[#8a7e6e]">Seguidores</p>
              </div>
              <div className="text-center">
                <p className="text-xl lg:text-2xl font-bold text-[#e8d4a8]">{userStats.following}</p>
                <p className="text-xs text-[#8a7e6e]">Seguindo</p>
              </div>
              <div className="text-center">
                <p className="text-xl lg:text-2xl font-bold text-[#c8a96e]">{userStats.totalReviews}</p>
                <p className="text-xs text-[#8a7e6e]">Reviews</p>
              </div>
            </div>
          </div>

          <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 bg-[#c8a96e]/10 border border-[#c8a96e]/30 rounded-full">
            <AestheticIcon id="dark-academia" size={12} />
            <span className="text-xs text-[#c8a96e]">Dark Academia</span>
          </div>
        </div>
      </header>

      {/* ── Body: single column mobile / two columns desktop ── */}
      <div className="px-6 lg:px-8 py-6 lg:grid lg:grid-cols-[1fr_340px] lg:gap-8 lg:items-start">

        {/* Left column */}
        <div className="space-y-6">

          {/* Stats cards */}
          <section>
            <h2 className="text-lg mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              Estatísticas de Leitura
            </h2>
            <div className="grid grid-cols-3 gap-3">
              {[
                { Icon: Library, value: userStats.booksRead, label: 'Livros lidos',  color: 'text-[#c8a96e]' },
                { Icon: Flame,   value: userStats.currentStreak, label: 'Dias seguidos', color: 'text-[#e8635a]' },
                { Icon: PenLine, value: userStats.totalReviews, label: 'Reviews',     color: 'text-[#c8a96e]' },
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
              {badges.map((badge) => (
                <button
                  key={badge.id}
                  className="bg-[#1a1210]/50 border border-[#c8a96e]/20 rounded-xl p-3 hover:border-[#c8a96e]/40 transition-all group"
                  title={badge.description}
                >
                  <div className="flex justify-center mb-2">
                    <BadgeIcon id={badge.id} size={26} />
                  </div>
                  <p className="text-[10px] text-[#e8d4a8] line-clamp-1">{badge.name}</p>
                  <p className="hidden group-hover:block text-[9px] text-[#8a7e6e] mt-0.5 line-clamp-2">
                    {badge.description}
                  </p>
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
                {topGenres.map((genre, i) => (
                  <div key={i}>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-[#e8d4a8]">{genre.name}</span>
                      <span className="text-[#8a7e6e]">{genre.percentage}%</span>
                    </div>
                    <div className="h-2 bg-[#8a7e6e]/20 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${genre.percentage}%`, backgroundColor: genre.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-[#c8a96e]/10 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-[#8a7e6e] mb-1">Emoção dominante</p>
                  <EmotionIcon id="love" size={14} showLabel className="text-sm text-[#e8d4a8]" />
                </div>
                <div>
                  <p className="text-xs text-[#8a7e6e] mb-1">Nota média</p>
                  <p className="text-sm text-[#e8d4a8] flex items-center gap-1">
                    <Star size={13} className="fill-[#c8a96e] text-[#c8a96e]" />
                    {userStats.avgRating}
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Right column */}
        <div className="space-y-6 mt-6 lg:mt-0">

          {/* Recent reviews */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg" style={{ fontFamily: 'Playfair Display, serif' }}>Reviews Recentes</h2>
              <button className="text-sm text-[#c8a96e]">Ver todas</button>
            </div>
            <div className="space-y-3">
              {recentReviews.map((review, i) => (
                <div
                  key={i}
                  className="bg-[#1a1210]/50 border border-[#c8a96e]/20 rounded-xl p-4 hover:border-[#c8a96e]/40 transition-all"
                >
                  <div className="flex gap-3 mb-3">
                    <div className={`w-10 h-14 rounded bg-gradient-to-br ${review.book.cover} flex-shrink-0`} />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium mb-0.5 truncate">{review.book.title}</h3>
                      <p className="text-xs text-[#8a7e6e] mb-1.5">{review.book.author}</p>
                      <div className="flex gap-0.5">
                        {[...Array(review.rating)].map((_, j) => (
                          <Star key={j} size={11} className="fill-[#c8a96e] text-[#c8a96e]" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-[#e8d4a8]/80 mb-2 line-clamp-2">{review.excerpt}</p>
                  <div className="flex items-center gap-4 text-xs text-[#8a7e6e]">
                    <span className="flex items-center gap-1"><Heart size={12} /> {review.likes}</span>
                    <span className="flex items-center gap-1"><MessageCircle size={12} /> {review.comments}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Compatibility */}
          <section>
            <h2 className="text-lg mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>Compatibilidade</h2>
            <div className="space-y-2">
              {compatibleUsers.map((user, i) => (
                <div
                  key={i}
                  className="bg-[#1a1210]/50 border border-[#c8a96e]/20 rounded-xl p-3 flex items-center gap-3 hover:border-[#c8a96e]/40 transition-all"
                >
                  <UserAvatar name={user.name} size="md" />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium truncate">{user.name}</h3>
                    <p className="text-xs text-[#8a7e6e] truncate">{user.username}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-lg font-bold text-[#c8a96e]">{user.compatibility}%</p>
                    <p className="text-[10px] text-[#8a7e6e]">compatível</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>
      </div>
    </div>
  )
}
