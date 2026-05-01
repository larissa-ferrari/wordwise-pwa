import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Star, Heart, Share2, Plus, BookOpen } from 'lucide-react'
import { EmotionIcon, UserAvatar } from '../components/icons'
import { BookCover } from '../components/common/BookCover'
import type { EmotionId } from '../components/icons'
import { booksService, reviewsService, shelvesService } from '../services'
import type { ApiBookOut, ApiEmotionBreakdown, ApiReviewOut } from '../services'

export function BookDetails() {
  const navigate       = useNavigate()
  const { bookId }     = useParams<{ bookId: string }>()

  const [book, setBook]           = useState<ApiBookOut | null>(null)
  const [emotions, setEmotions]   = useState<ApiEmotionBreakdown[]>([])
  const [reviews, setReviews]     = useState<ApiReviewOut[]>([])
  const [isWishlisted, setWish]   = useState(false)
  const [loading, setLoading]     = useState(true)

  useEffect(() => {
    if (!bookId) return
    setLoading(true)
    Promise.all([
      booksService.getById(bookId),
      booksService.getEmotions(bookId),
      reviewsService.getByBook(bookId),
    ])
      .then(([b, emo, rev]) => {
        setBook(b)
        setEmotions(emo)
        setReviews(rev.items)
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [bookId])

  const handleAddToShelf = async () => {
    if (!bookId) return
    try {
      await shelvesService.add({ book_id: bookId, shelf: 'want' })
    } catch { /* ignore */ }
  }

  const handleWishlist = async () => {
    if (!bookId) return
    try {
      await shelvesService.add({ book_id: bookId, shelf: isWishlisted ? 'want' : 'want' })
      setWish(v => !v)
    } catch {
      setWish(v => !v)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0807] flex items-center justify-center">
        <div className="w-10 h-10 rounded-full border-2 border-[#c8a96e]/30 border-t-[#c8a96e] animate-spin" />
      </div>
    )
  }

  if (!book) {
    return (
      <div className="min-h-screen bg-[#0a0807] flex items-center justify-center text-[#8a7e6e]">
        Livro não encontrado.
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0807] text-white">
      {/* Header */}
      <header className="sticky top-0 bg-[#0a0807]/95 backdrop-blur-sm border-b border-[#c8a96e]/20 px-6 lg:px-8 py-4 z-30">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="w-9 h-9 rounded-full bg-[#1a1210] flex items-center justify-center flex-shrink-0 hover:bg-[#c8a96e]/10 transition-colors"
          >
            <ArrowLeft size={18} className="text-[#c8a96e]" />
          </button>
          <div className="flex-1 min-w-0">
            <h1 className="text-base lg:text-lg font-medium line-clamp-1">{book.title}</h1>
            <p className="text-xs text-[#8a7e6e]">{book.author}</p>
          </div>
          <button className="w-9 h-9 rounded-full bg-[#1a1210] flex items-center justify-center hover:bg-[#c8a96e]/10 transition-colors">
            <Share2 size={18} className="text-[#c8a96e]" />
          </button>
        </div>
      </header>

      <div className="xl:grid xl:grid-cols-[420px_1fr]">
        {/* Left */}
        <div className="px-6 lg:px-8 py-6 xl:border-r xl:border-[#c8a96e]/10">
          <div className="xl:sticky xl:top-[73px]">

            {/* Hero */}
            <div className="flex gap-6 mb-6">
              <BookCover cover_url={book.cover_url} cover_gradient={book.cover_gradient} alt={book.title} className="w-28 h-44 lg:w-36 lg:h-56 xl:w-44 xl:h-64 rounded-2xl flex-shrink-0 shadow-2xl shadow-[#c8a96e]/15" />
              <div className="flex-1 min-w-0">
                <h2 className="text-xl lg:text-2xl mb-1 leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
                  {book.title}
                </h2>
                <p className="text-sm text-[#c8a96e] mb-0.5">{book.author}</p>
                {book.series && <p className="text-xs text-[#8a7e6e] mb-4">{book.series}</p>}

                <div className="flex items-center gap-2 mb-3">
                  <Star size={16} className="fill-[#c8a96e] text-[#c8a96e]" />
                  <span className="text-lg font-bold text-[#c8a96e]">{book.avg_rating.toFixed(1)}</span>
                  <span className="text-xs text-[#8a7e6e]">({book.rating_count.toLocaleString()})</span>
                </div>

                <p className="text-xs text-[#8a7e6e]">
                  {book.pages && `${book.pages} páginas`}
                  {book.pages && book.published_year && ' · '}
                  {book.published_year}
                </p>
              </div>
            </div>

            {/* Genres */}
            <div className="flex flex-wrap gap-2 mb-5">
              {book.genres.map((genre) => (
                <span key={genre} className="px-3 py-1 bg-[#c8a96e]/10 border border-[#c8a96e]/30 rounded-full text-xs text-[#c8a96e]">
                  {genre}
                </span>
              ))}
            </div>

            {/* Actions */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <button
                onClick={handleAddToShelf}
                className="py-2.5 bg-gradient-to-r from-[#c8a96e] to-[#e8d4a8] text-[#1a1210] rounded-full font-medium text-sm flex items-center justify-center gap-2"
              >
                <Plus size={16} />
                Adicionar
              </button>
              <button
                onClick={handleWishlist}
                className={`py-2.5 rounded-full font-medium text-sm flex items-center justify-center gap-2 transition-all ${
                  isWishlisted ? 'bg-[#e8635a] text-white' : 'border-2 border-[#c8a96e] text-[#c8a96e] hover:bg-[#c8a96e]/10'
                }`}
              >
                <Heart size={16} className={isWishlisted ? 'fill-white' : ''} />
                {isWishlisted ? 'Salvo' : 'Salvar'}
              </button>
            </div>

            {/* Description */}
            {book.description && (
              <div className="mb-5">
                <h3 className="text-base mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>Sinopse</h3>
                <p className="text-sm text-[#e8d4a8]/85 leading-relaxed">{book.description}</p>
              </div>
            )}

            {/* Tropes */}
            {book.tropes.length > 0 && (
              <div>
                <h3 className="text-base mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>Tropes</h3>
                <div className="flex flex-wrap gap-2">
                  {book.tropes.map((trope) => (
                    <button key={trope.id} className="px-3 py-1.5 bg-[#1a1210]/50 border border-[#c8a96e]/20 rounded-full text-xs hover:border-[#c8a96e] hover:bg-[#c8a96e]/10 transition-all">
                      {trope.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right */}
        <div className="px-6 lg:px-8 py-6 xl:py-6 space-y-8">

          {/* Emotion breakdown */}
          {emotions.length > 0 && (
            <section>
              <h3 className="text-lg mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                Como os leitores se sentiram
              </h3>
              <div className="bg-[#1a1210]/50 border border-[#c8a96e]/20 rounded-2xl p-5 space-y-3">
                {emotions.map((item) => (
                  <div key={item.emotion}>
                    <div className="flex items-center justify-between text-sm mb-1.5">
                      <span className="text-[#e8d4a8] flex items-center gap-2">
                        <EmotionIcon id={item.emotion as EmotionId} size={15} />
                        {item.label}
                      </span>
                      <span className="text-[#8a7e6e] text-xs">{item.count.toLocaleString()} pessoas</span>
                    </div>
                    <div className="h-1.5 bg-[#8a7e6e]/20 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-[#c8a96e] to-[#e8d4a8] rounded-full" style={{ width: `${item.percentage}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Reviews */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg" style={{ fontFamily: 'Playfair Display, serif' }}>Reviews em destaque</h3>
              <button className="text-sm text-[#c8a96e]">Ver todas</button>
            </div>

            {reviews.length === 0 ? (
              <div className="text-center py-10 text-[#8a7e6e]">
                <p className="text-sm">Seja o primeiro a avaliar este livro!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div key={review.id} className="bg-[#1a1210]/50 border border-[#c8a96e]/20 rounded-2xl p-4 hover:border-[#c8a96e]/35 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                      <UserAvatar name={review.user.display_name} size="md" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-medium">{review.user.display_name}</h4>
                        </div>
                        <p className="text-xs text-[#8a7e6e]">
                          {new Date(review.created_at).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                      <div className="flex gap-0.5 flex-shrink-0">
                        {[...Array(5)].map((_, j) => (
                          <Star key={j} size={12} className={j < review.rating ? 'fill-[#c8a96e] text-[#c8a96e]' : 'text-[#8a7e6e]/30'} />
                        ))}
                      </div>
                    </div>
                    {review.emotions.length > 0 && (
                      <div className="flex gap-1.5 mb-3">
                        {review.emotions.map((id) => (
                          <EmotionIcon key={id} id={id as EmotionId} size={14} />
                        ))}
                      </div>
                    )}
                    {review.text && (
                      <p className="text-sm text-[#e8d4a8]/90 leading-relaxed mb-3">{review.text}</p>
                    )}
                    <div className="flex items-center gap-4 text-xs text-[#8a7e6e]">
                      <button className="flex items-center gap-1.5 hover:text-[#e8635a] transition-colors">
                        <Heart size={13} />
                        {review.likes_count}
                      </button>
                      {review.helpful_percentage > 0 && (
                        <span>{review.helpful_percentage}% acharam útil</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* CTA */}
          <div className="bg-gradient-to-br from-[#1a1210] to-[#2a1f1a] border border-[#c8a96e]/20 rounded-2xl p-6 text-center">
            <BookOpen size={28} className="text-[#c8a96e] mx-auto mb-3" />
            <p className="text-sm text-[#8a7e6e] mb-4">Já leu este livro?</p>
            <button className="px-8 py-3 bg-gradient-to-r from-[#c8a96e] to-[#e8d4a8] text-[#1a1210] rounded-full font-medium hover:opacity-90 transition-opacity">
              Escrever uma review
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}
