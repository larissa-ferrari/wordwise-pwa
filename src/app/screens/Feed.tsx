import { Heart, MessageCircle, Bookmark, Share2, Star, Users, BookOpen } from 'lucide-react'
import { EmotionIcon, UserAvatar } from '../components/icons'
import type { EmotionId } from '../components/icons'

const reviews = [
  {
    id: 1,
    user: { name: 'Ana Silva' },
    book: { title: 'O Nome do Vento', author: 'Patrick Rothfuss', cover: 'from-[#c8a96e] to-[#e8635a]' },
    rating: 5,
    emotions: ['love', 'surprised', 'absorbed'] as EmotionId[],
    text: 'Simplesmente perfeito. A prosa de Rothfuss é poesia pura. Kvothe é um dos protagonistas mais complexos que já encontrei na fantasia moderna.',
    likes: 127,
    comments: 23,
    timeAgo: '2h atrás',
  },
  {
    id: 2,
    user: { name: 'Pedro Costa' },
    book: { title: 'Neuromancer', author: 'William Gibson', cover: 'from-[#6a9fcf] to-[#b87cde]' },
    rating: 4,
    emotions: ['surprised', 'excited'] as EmotionId[],
    text: 'Cyberpunk na sua forma mais crua. Gibson antecipou muito do nosso futuro digital. Denso, mas recompensador.',
    likes: 89,
    comments: 15,
    timeAgo: '5h atrás',
  },
  {
    id: 3,
    user: { name: 'Mariana Luz' },
    book: { title: 'A Casa no Cerrado', author: 'Carla Madeira', cover: 'from-[#7c9e7a] to-[#c8a96e]' },
    rating: 5,
    emotions: ['cried', 'love', 'peaceful'] as EmotionId[],
    text: 'Este livro me destroçou de formas que não imaginava. A narrativa sobre maternidade, perda e recomeço é absolutamente visceral.',
    likes: 203,
    comments: 41,
    timeAgo: '1d atrás',
  },
]

const trendingBooks = [
  { title: 'Fourth Wing',           author: 'R. Yarros',       cover: 'from-[#e8635a] to-[#b87cde]' },
  { title: 'Project Hail Mary',     author: 'A. Weir',         cover: 'from-[#6a9fcf] to-[#b87cde]' },
  { title: 'The Housemaid',         author: 'F. McFadden',     cover: 'from-[#1a1210] to-[#e8635a]' },
  { title: 'Cem Anos de Solidão',   author: 'G. García Márquez', cover: 'from-[#7c9e7a] to-[#c8a96e]' },
]

const suggestedReaders = [
  { name: 'Lucas Souza',   username: '@lucas_reads', compatibility: 94 },
  { name: 'Clara Mendes',  username: '@clara_lit',   compatibility: 88 },
  { name: 'Rafael Torres', username: '@rafa_books',  compatibility: 81 },
]

function ReviewCard({ review }: { review: (typeof reviews)[number] }) {
  return (
    <article className="bg-[#1a1210]/50 border border-[#c8a96e]/20 rounded-2xl overflow-hidden hover:border-[#c8a96e]/35 transition-colors">
      <div className="p-4 flex items-center gap-3 border-b border-[#c8a96e]/10">
        <UserAvatar name={review.user.name} size="md" />
        <div className="flex-1">
          <h3 className="text-sm font-medium">{review.user.name}</h3>
          <p className="text-xs text-[#8a7e6e]">{review.timeAgo}</p>
        </div>
      </div>

      <div className="p-4 flex gap-4">
        <div className={`w-20 h-28 rounded-lg bg-gradient-to-br ${review.book.cover} flex-shrink-0`} />
        <div className="flex-1 min-w-0">
          <h4 className="text-lg mb-1 leading-snug" style={{ fontFamily: 'Playfair Display, serif' }}>
            {review.book.title}
          </h4>
          <p className="text-sm text-[#8a7e6e] mb-3">{review.book.author}</p>
          <div className="flex items-center gap-3">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={13}
                  className={i < review.rating ? 'fill-[#c8a96e] text-[#c8a96e]' : 'text-[#8a7e6e]/30'}
                />
              ))}
            </div>
            <div className="flex gap-1.5">
              {review.emotions.map((id) => (
                <EmotionIcon key={id} id={id} size={15} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 pb-4">
        <p className="text-sm text-[#e8d4a8]/90 leading-relaxed">{review.text}</p>
      </div>

      <div className="px-4 py-3 border-t border-[#c8a96e]/10 flex items-center gap-6">
        <button className="flex items-center gap-2 text-[#8a7e6e] hover:text-[#e8635a] transition-colors">
          <Heart size={18} />
          <span className="text-sm">{review.likes}</span>
        </button>
        <button className="flex items-center gap-2 text-[#8a7e6e] hover:text-[#c8a96e] transition-colors">
          <MessageCircle size={18} />
          <span className="text-sm">{review.comments}</span>
        </button>
        <button className="flex items-center gap-2 text-[#8a7e6e] hover:text-[#c8a96e] transition-colors ml-auto">
          <Bookmark size={18} />
        </button>
        <button className="flex items-center gap-2 text-[#8a7e6e] hover:text-[#c8a96e] transition-colors">
          <Share2 size={18} />
        </button>
      </div>
    </article>
  )
}

export function Feed() {
  return (
    <div className="min-h-screen bg-[#0a0807] text-white">
      {/* ── Mobile header (hidden on desktop — logo lives in sidebar) ── */}
      <header className="lg:hidden sticky top-0 bg-[#0a0807]/95 backdrop-blur-sm border-b border-[#c8a96e]/20 px-6 py-4 z-40">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl" style={{ fontFamily: 'Playfair Display, serif' }}>
            <span className="text-[#c8a96e]">Word</span>
            <span className="text-[#e8d4a8]">Wise</span>
          </h1>
          <UserAvatar name="Ana Silva" size="md" />
        </div>
      </header>

      {/* ── Desktop header ── */}
      <header className="hidden lg:flex sticky top-0 bg-[#0a0807]/95 backdrop-blur-sm border-b border-[#c8a96e]/20 px-8 py-4 z-30 items-center justify-between">
        <div>
          <h2 className="text-xl font-medium" style={{ fontFamily: 'Playfair Display, serif' }}>
            Feed
          </h2>
          <p className="text-xs text-[#8a7e6e]">O que os leitores estão sentindo</p>
        </div>
        <UserAvatar name="Ana Silva" size="md" />
      </header>

      {/* ── Body ── */}
      <div className="xl:grid xl:grid-cols-[1fr_320px] xl:gap-0">

        {/* Main feed column */}
        <div className="px-6 py-6 xl:px-8 xl:border-r xl:border-[#c8a96e]/10">
          {/* Quote of Day — mobile only (desktop gets it in right panel) */}
          <div className="xl:hidden mb-6 bg-gradient-to-br from-[#1a1210] to-[#2a1f1a] border border-[#c8a96e]/20 rounded-2xl p-6">
            <p className="text-xs text-[#c8a96e] uppercase tracking-wider mb-2">Citação do Dia</p>
            <p className="text-base italic text-[#e8d4a8]/90 leading-relaxed" style={{ fontFamily: 'Playfair Display, serif' }}>
              "Um leitor vive mil vidas antes de morrer."
            </p>
            <p className="text-sm text-[#8a7e6e] mt-2">— George R.R. Martin</p>
          </div>

          {/* Reviews */}
          <div className="space-y-5 max-w-2xl">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}

            <button className="w-full py-3 border-2 border-[#c8a96e]/30 text-[#c8a96e] rounded-full hover:bg-[#c8a96e]/10 transition-colors text-sm">
              Carregar mais reviews
            </button>
          </div>
        </div>

        {/* ── Desktop right panel ── */}
        <aside className="hidden xl:block">
          <div className="sticky top-[73px] px-6 py-6 space-y-6">

            {/* Quote of the Day */}
            <div className="bg-gradient-to-br from-[#1a1210] to-[#2a1f1a] border border-[#c8a96e]/20 rounded-2xl p-5">
              <p className="text-[10px] text-[#c8a96e] uppercase tracking-wider mb-2">Citação do Dia</p>
              <p className="text-sm italic text-[#e8d4a8]/90 leading-relaxed" style={{ fontFamily: 'Playfair Display, serif' }}>
                "Um leitor vive mil vidas antes de morrer. O homem que nunca lê vive apenas uma."
              </p>
              <p className="text-xs text-[#8a7e6e] mt-2">— George R.R. Martin</p>
            </div>

            {/* Trending books */}
            <div>
              <h3 className="text-xs text-[#8a7e6e] uppercase tracking-wider mb-3 flex items-center gap-2">
                <BookOpen size={12} />
                Em Alta Agora
              </h3>
              <div className="grid grid-cols-4 gap-2">
                {trendingBooks.map((book, i) => (
                  <button key={i} className="text-left group">
                    <div className={`w-full aspect-[2/3] rounded-lg bg-gradient-to-br ${book.cover} mb-1.5 group-hover:scale-105 transition-transform`} />
                    <p className="text-[10px] text-[#e8d4a8]/80 line-clamp-2 leading-tight">{book.title}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Suggested readers */}
            <div>
              <h3 className="text-xs text-[#8a7e6e] uppercase tracking-wider mb-3 flex items-center gap-2">
                <Users size={12} />
                Leitores Sugeridos
              </h3>
              <div className="space-y-2">
                {suggestedReaders.map((reader, i) => (
                  <div key={i} className="flex items-center gap-3 p-2 rounded-xl hover:bg-[#1a1210]/60 transition-colors">
                    <UserAvatar name={reader.name} size="sm" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-[#e8d4a8] truncate">{reader.name}</p>
                      <p className="text-[10px] text-[#8a7e6e] truncate">{reader.username}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-xs font-bold text-[#c8a96e]">{reader.compatibility}%</p>
                      <p className="text-[9px] text-[#8a7e6e]">compat.</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-3 text-xs text-[#c8a96e] hover:text-[#e8d4a8] transition-colors">
                Ver mais sugestões →
              </button>
            </div>

          </div>
        </aside>
      </div>
    </div>
  )
}
