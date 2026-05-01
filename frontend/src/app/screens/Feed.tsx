import { useEffect, useState } from 'react'
import { Heart, MessageCircle, Bookmark, Share2, Star, Users, BookOpen } from 'lucide-react'
import { EmotionIcon, UserAvatar } from '../components/icons'
import type { EmotionId } from '../components/icons'
import { reviewsService, booksService } from '../services'
import type { ApiReviewOut, ApiBookSummary } from '../services'
import { useAuth } from '../context/AuthContext'
import { BookCover } from '../components/common/BookCover'

const QUOTE = {
  text: 'Um leitor vive mil vidas antes de morrer. O homem que nunca lê vive apenas uma.',
  author: 'George R.R. Martin',
}

function ReviewCard({ review, onLike }: { review: ApiReviewOut; onLike: (id: string) => void }) {
  return (
    <article className="bg-[#1a1210]/50 border border-[#c8a96e]/20 rounded-2xl overflow-hidden hover:border-[#c8a96e]/35 transition-colors">
      <div className="p-4 flex items-center gap-3 border-b border-[#c8a96e]/10">
        <UserAvatar name={review.user.display_name} size="md" />
        <div className="flex-1">
          <h3 className="text-sm font-medium">{review.user.display_name}</h3>
          <p className="text-xs text-[#8a7e6e]">
            {new Date(review.created_at).toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' })}
          </p>
        </div>
      </div>

      <div className="p-4 flex gap-4">
        <BookCover
          cover_url={review.book.cover_url}
          cover_gradient={review.book.cover_gradient}
          alt={review.book.title}
          className="w-20 h-28 rounded-lg flex-shrink-0 shadow-lg"
        />
        <div className="flex-1 min-w-0">
          <h4 className="text-lg mb-1 leading-snug" style={{ fontFamily: 'Playfair Display, serif' }}>
            {review.book.title}
          </h4>
          <p className="text-sm text-[#8a7e6e] mb-3">{review.book.author}</p>
          <div className="flex items-center gap-3">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={13} className={i < review.rating ? 'fill-[#c8a96e] text-[#c8a96e]' : 'text-[#8a7e6e]/30'} />
              ))}
            </div>
            <div className="flex gap-1.5">
              {review.emotions.map((id) => (
                <EmotionIcon key={id} id={id as EmotionId} size={15} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {review.text && (
        <div className="px-4 pb-4">
          <p className="text-sm text-[#e8d4a8]/90 leading-relaxed">{review.text}</p>
        </div>
      )}

      <div className="px-4 py-3 border-t border-[#c8a96e]/10 flex items-center gap-6">
        <button
          onClick={() => onLike(review.id)}
          className="flex items-center gap-2 text-[#8a7e6e] hover:text-[#e8635a] transition-colors"
        >
          <Heart size={18} />
          <span className="text-sm">{review.likes_count}</span>
        </button>
        <button className="flex items-center gap-2 text-[#8a7e6e] hover:text-[#c8a96e] transition-colors">
          <MessageCircle size={18} />
          <span className="text-sm">{review.helpful_count}</span>
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

function SkeletonCard() {
  return (
    <div className="bg-[#1a1210]/50 border border-[#c8a96e]/10 rounded-2xl overflow-hidden animate-pulse">
      <div className="p-4 flex items-center gap-3 border-b border-[#c8a96e]/10">
        <div className="w-9 h-9 rounded-full bg-[#c8a96e]/10" />
        <div className="flex-1 space-y-2">
          <div className="h-3 bg-[#c8a96e]/10 rounded w-28" />
          <div className="h-2.5 bg-[#c8a96e]/10 rounded w-16" />
        </div>
      </div>
      <div className="p-4 flex gap-4">
        <div className="w-20 h-28 rounded-lg bg-[#c8a96e]/10 flex-shrink-0" />
        <div className="flex-1 space-y-2 pt-1">
          <div className="h-4 bg-[#c8a96e]/10 rounded w-3/4" />
          <div className="h-3 bg-[#c8a96e]/10 rounded w-1/2" />
        </div>
      </div>
    </div>
  )
}

export function Feed() {
  const { user } = useAuth()
  const [reviews, setReviews]         = useState<ApiReviewOut[]>([])
  const [trending, setTrending]       = useState<ApiBookSummary[]>([])
  const [isLoading, setLoading]       = useState(true)
  const [nextCursor, setNextCursor]   = useState<string | null>(null)
  const [loadingMore, setLoadingMore] = useState(false)

  useEffect(() => {
    Promise.all([
      reviewsService.getFeed(),
      booksService.getTrending(4),
    ])
      .then(([feedPage, trendBooks]) => {
        setReviews(feedPage.items)
        setNextCursor(feedPage.next_cursor)
        setTrending(trendBooks)
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const handleLoadMore = async () => {
    if (!nextCursor || loadingMore) return
    setLoadingMore(true)
    try {
      const page = await reviewsService.getFeed(nextCursor)
      setReviews(prev => [...prev, ...page.items])
      setNextCursor(page.next_cursor)
    } finally {
      setLoadingMore(false)
    }
  }

  const handleLike = async (reviewId: string) => {
    try {
      await reviewsService.like(reviewId)
      setReviews(prev =>
        prev.map(r => r.id === reviewId ? { ...r, likes_count: r.likes_count + 1 } : r)
      )
    } catch { /* ignore */ }
  }

  return (
    <div className="min-h-screen bg-[#0a0807] text-white">
      {/* Mobile header */}
      <header className="lg:hidden sticky top-0 bg-[#0a0807]/95 backdrop-blur-sm border-b border-[#c8a96e]/20 px-6 py-4 z-40">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl" style={{ fontFamily: 'Playfair Display, serif' }}>
            <span className="text-[#c8a96e]">Word</span>
            <span className="text-[#e8d4a8]">Wise</span>
          </h1>
          <UserAvatar name={user?.display_name ?? 'Leitor'} size="md" />
        </div>
      </header>

      {/* Desktop header */}
      <header className="hidden lg:flex sticky top-0 bg-[#0a0807]/95 backdrop-blur-sm border-b border-[#c8a96e]/20 px-8 py-4 z-30 items-center justify-between">
        <div>
          <h2 className="text-xl font-medium" style={{ fontFamily: 'Playfair Display, serif' }}>Feed</h2>
          <p className="text-xs text-[#8a7e6e]">O que os leitores estão sentindo</p>
        </div>
        <UserAvatar name={user?.display_name ?? 'Leitor'} size="md" />
      </header>

      <div className="xl:grid xl:grid-cols-[1fr_320px] xl:gap-0">
        {/* Main feed */}
        <div className="px-6 py-6 xl:px-8 xl:border-r xl:border-[#c8a96e]/10">
          {/* Quote – mobile only */}
          <div className="xl:hidden mb-6 bg-gradient-to-br from-[#1a1210] to-[#2a1f1a] border border-[#c8a96e]/20 rounded-2xl p-6">
            <p className="text-xs text-[#c8a96e] uppercase tracking-wider mb-2">Citação do Dia</p>
            <p className="text-base italic text-[#e8d4a8]/90 leading-relaxed" style={{ fontFamily: 'Playfair Display, serif' }}>
              "{QUOTE.text}"
            </p>
            <p className="text-sm text-[#8a7e6e] mt-2">— {QUOTE.author}</p>
          </div>

          <div className="space-y-5 max-w-2xl">
            {isLoading
              ? Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
              : reviews.length === 0
                ? (
                  <div className="text-center py-16 text-[#8a7e6e]">
                    <BookOpen size={40} className="mx-auto mb-4 opacity-40" />
                    <p className="text-sm">Nenhuma review ainda. Siga outros leitores!</p>
                  </div>
                )
                : reviews.map(r => <ReviewCard key={r.id} review={r} onLike={handleLike} />)
            }

            {nextCursor && (
              <button
                onClick={handleLoadMore}
                disabled={loadingMore}
                className="w-full py-3 border-2 border-[#c8a96e]/30 text-[#c8a96e] rounded-full hover:bg-[#c8a96e]/10 transition-colors text-sm disabled:opacity-50"
              >
                {loadingMore ? 'Carregando...' : 'Carregar mais reviews'}
              </button>
            )}
          </div>
        </div>

        {/* Desktop right panel */}
        <aside className="hidden xl:block">
          <div className="sticky top-[73px] px-6 py-6 space-y-6">
            {/* Quote */}
            <div className="bg-gradient-to-br from-[#1a1210] to-[#2a1f1a] border border-[#c8a96e]/20 rounded-2xl p-5">
              <p className="text-[10px] text-[#c8a96e] uppercase tracking-wider mb-2">Citação do Dia</p>
              <p className="text-sm italic text-[#e8d4a8]/90 leading-relaxed" style={{ fontFamily: 'Playfair Display, serif' }}>
                "{QUOTE.text}"
              </p>
              <p className="text-xs text-[#8a7e6e] mt-2">— {QUOTE.author}</p>
            </div>

            {/* Trending */}
            <div>
              <h3 className="text-xs text-[#8a7e6e] uppercase tracking-wider mb-3 flex items-center gap-2">
                <BookOpen size={12} />
                Em Alta Agora
              </h3>
              <div className="grid grid-cols-4 gap-2">
                {trending.map((book) => (
                  <button key={book.id} className="text-left group">
                    <BookCover cover_url={book.cover_url} cover_gradient={book.cover_gradient} alt={book.title} className="w-full aspect-[2/3] rounded-lg mb-1.5 group-hover:scale-105 transition-transform" />
                    <p className="text-[10px] text-[#e8d4a8]/80 line-clamp-2 leading-tight">{book.title}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Suggested readers placeholder */}
            <div>
              <h3 className="text-xs text-[#8a7e6e] uppercase tracking-wider mb-3 flex items-center gap-2">
                <Users size={12} />
                Leitores Sugeridos
              </h3>
              <p className="text-xs text-[#8a7e6e]/60 italic">
                Adicione livros à sua estante para receber sugestões.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
