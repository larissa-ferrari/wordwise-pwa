import { Heart, MessageCircle, Bookmark, Share2, Star } from 'lucide-react'
import { EmotionIcon, UserAvatar } from '../components/icons'
import type { EmotionId } from '../components/icons'

const reviews = [
  {
    id: 1,
    user: { name: 'Ana Silva' },
    book: {
      title: 'O Nome do Vento',
      author: 'Patrick Rothfuss',
      cover: 'from-[#c8a96e] to-[#e8635a]',
    },
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
    book: {
      title: 'Neuromancer',
      author: 'William Gibson',
      cover: 'from-[#6a9fcf] to-[#b87cde]',
    },
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
    book: {
      title: 'A Casa no Cerrado',
      author: 'Carla Madeira',
      cover: 'from-[#7c9e7a] to-[#c8a96e]',
    },
    rating: 5,
    emotions: ['cried', 'love', 'peaceful'] as EmotionId[],
    text: 'Este livro me destroçou de formas que não imaginava. A narrativa sobre maternidade, perda e recomeço é absolutamente visceral.',
    likes: 203,
    comments: 41,
    timeAgo: '1d atrás',
  },
]

export function Feed() {
  return (
    <div className="min-h-screen bg-[#0a0807] text-white pb-20">
      {/* Header */}
      <header className="sticky top-0 bg-[#0a0807]/95 backdrop-blur-sm border-b border-[#c8a96e]/20 px-6 py-4 z-40">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl" style={{ fontFamily: 'Playfair Display, serif' }}>
            <span className="text-[#c8a96e]">Word</span>
            <span className="text-[#e8d4a8]">Wise</span>
          </h1>
          <UserAvatar name="Ana Silva" size="md" />
        </div>
      </header>

      {/* Quote of the Day */}
      <div className="px-6 py-6 border-b border-[#c8a96e]/10">
        <div className="max-w-2xl mx-auto bg-gradient-to-br from-[#1a1210] to-[#2a1f1a] border border-[#c8a96e]/20 rounded-2xl p-6">
          <p className="text-xs text-[#c8a96e] uppercase tracking-wider mb-2">Citação do Dia</p>
          <p
            className="text-lg italic text-[#e8d4a8]/90 leading-relaxed"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            "Um leitor vive mil vidas antes de morrer. O homem que nunca lê vive apenas uma."
          </p>
          <p className="text-sm text-[#8a7e6e] mt-2">— George R.R. Martin</p>
        </div>
      </div>

      {/* Reviews Feed */}
      <div className="max-w-2xl mx-auto px-6 py-6 space-y-6">
        {reviews.map((review) => (
          <article
            key={review.id}
            className="bg-[#1a1210]/50 border border-[#c8a96e]/20 rounded-2xl overflow-hidden"
          >
            {/* User Header */}
            <div className="p-4 flex items-center gap-3 border-b border-[#c8a96e]/10">
              <UserAvatar name={review.user.name} size="md" />
              <div className="flex-1">
                <h3 className="text-sm font-medium">{review.user.name}</h3>
                <p className="text-xs text-[#8a7e6e]">{review.timeAgo}</p>
              </div>
            </div>

            {/* Book Info & Cover */}
            <div className="p-4 flex gap-4">
              <div
                className={`w-20 h-28 rounded-lg bg-gradient-to-br ${review.book.cover} flex-shrink-0`}
              />
              <div className="flex-1">
                <h4
                  className="text-lg mb-1"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  {review.book.title}
                </h4>
                <p className="text-sm text-[#8a7e6e] mb-3">{review.book.author}</p>

                {/* Rating & Emotions */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={
                          i < review.rating
                            ? 'fill-[#c8a96e] text-[#c8a96e]'
                            : 'text-[#8a7e6e]/30'
                        }
                      />
                    ))}
                  </div>
                  <div className="flex gap-1.5">
                    {review.emotions.map((id) => (
                      <EmotionIcon key={id} id={id} size={16} />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Review Text */}
            <div className="px-4 pb-4">
              <p className="text-sm text-[#e8d4a8]/90 leading-relaxed">{review.text}</p>
            </div>

            {/* Actions */}
            <div className="px-4 py-3 border-t border-[#c8a96e]/10 flex items-center gap-6">
              <button className="flex items-center gap-2 text-[#8a7e6e] hover:text-[#e8635a] transition-colors">
                <Heart size={20} />
                <span className="text-sm">{review.likes}</span>
              </button>
              <button className="flex items-center gap-2 text-[#8a7e6e] hover:text-[#c8a96e] transition-colors">
                <MessageCircle size={20} />
                <span className="text-sm">{review.comments}</span>
              </button>
              <button className="flex items-center gap-2 text-[#8a7e6e] hover:text-[#c8a96e] transition-colors ml-auto">
                <Bookmark size={20} />
              </button>
              <button className="flex items-center gap-2 text-[#8a7e6e] hover:text-[#c8a96e] transition-colors">
                <Share2 size={20} />
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* Load More */}
      <div className="max-w-2xl mx-auto px-6 pb-6">
        <button className="w-full py-3 border-2 border-[#c8a96e]/30 text-[#c8a96e] rounded-full hover:bg-[#c8a96e]/10 transition-colors">
          Carregar mais reviews
        </button>
      </div>
    </div>
  )
}
