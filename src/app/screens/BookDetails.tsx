import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Star, Heart, Share2, Plus, BookOpen } from 'lucide-react'
import { EmotionIcon, UserAvatar } from '../components/icons'
import type { EmotionId } from '../components/icons'

const book = {
  title: 'O Nome do Vento',
  author: 'Patrick Rothfuss',
  series: 'A Crônica do Matador do Rei #1',
  cover: 'from-[#c8a96e] to-[#e8635a]',
  rating: 4.7,
  totalRatings: 2847,
  genres: ['Fantasy', 'Aventura', 'Magia'],
  pages: 672,
  published: '2007',
  description:
    'Meu nome é Kvothe. Nomes são importantes, pois dizem muito sobre uma pessoa. Já fui chamado de Kvothe, o Sem-Sangue; Kvothe, o Arcano; e Kvothe, o Matador de Reis. Histórias sobre mim são contadas desde Ademre até Caeldim, e a maioria delas é verdade... a maioria.',
  tropes: ['Chosen One', 'Magic School', 'Frame Story', 'Unreliable Narrator'],
}

const emotionBreakdown: { id: EmotionId; label: string; percentage: number; count: number }[] = [
  { id: 'love',      label: 'Me apaixonei',     percentage: 42, count: 1195 },
  { id: 'surprised', label: 'Fui surpreendido',  percentage: 28, count: 797  },
  { id: 'absorbed',  label: 'Absorvido',          percentage: 20, count: 569  },
  { id: 'cried',     label: 'Chorei',             percentage: 10, count: 285  },
]

const topReviews = [
  {
    user: { name: 'Ana Silva', verified: true },
    rating: 5,
    text: 'Simplesmente perfeito. A prosa de Rothfuss é poesia pura. Kvothe é um dos protagonistas mais complexos que já encontrei na fantasia moderna. A forma como a história é contada, com camadas de narrativa, é magistral.',
    likes: 127,
    helpful: 98,
    emotions: ['love', 'surprised', 'absorbed'] as EmotionId[],
    timeAgo: '2 semanas atrás',
  },
  {
    user: { name: 'Pedro Costa', verified: false },
    rating: 4,
    text: 'Um dos melhores livros de fantasia que já li. A construção de mundo é incrível e Kvothe é um personagem fascinante. Minha única crítica é que algumas partes do meio ficam um pouco lentas.',
    likes: 89,
    helpful: 76,
    emotions: ['love', 'surprised'] as EmotionId[],
    timeAgo: '1 mês atrás',
  },
  {
    user: { name: 'Mariana Luz', verified: true },
    rating: 5,
    text: 'Uma obra que redefine o que a fantasia pode ser. A linguagem é cirúrgica, a magia é intrigante, e a jornada emocional de Kvothe é inesquecível.',
    likes: 64,
    helpful: 89,
    emotions: ['love', 'absorbed'] as EmotionId[],
    timeAgo: '3 semanas atrás',
  },
]

export function BookDetails() {
  const navigate = useNavigate()
  const [isWishlisted, setIsWishlisted] = useState(false)

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

      {/* ── Body: stacked on mobile, 2-col on xl ── */}
      <div className="xl:grid xl:grid-cols-[420px_1fr]">

        {/* ── Left: book info ── */}
        <div className="px-6 lg:px-8 py-6 xl:border-r xl:border-[#c8a96e]/10">
          <div className="xl:sticky xl:top-[73px]">

            {/* Hero */}
            <div className="flex gap-6 mb-6">
              <div
                className={`w-28 h-44 lg:w-36 lg:h-56 xl:w-44 xl:h-64 rounded-2xl bg-gradient-to-br ${book.cover} flex-shrink-0 shadow-2xl shadow-[#c8a96e]/15`}
              />
              <div className="flex-1 min-w-0">
                <h2
                  className="text-xl lg:text-2xl mb-1 leading-tight"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  {book.title}
                </h2>
                <p className="text-sm text-[#c8a96e] mb-0.5">{book.author}</p>
                <p className="text-xs text-[#8a7e6e] mb-4">{book.series}</p>

                <div className="flex items-center gap-2 mb-3">
                  <Star size={16} className="fill-[#c8a96e] text-[#c8a96e]" />
                  <span className="text-lg font-bold text-[#c8a96e]">{book.rating}</span>
                  <span className="text-xs text-[#8a7e6e]">
                    ({book.totalRatings.toLocaleString()})
                  </span>
                </div>

                <p className="text-xs text-[#8a7e6e]">{book.pages} páginas · {book.published}</p>
              </div>
            </div>

            {/* Genres */}
            <div className="flex flex-wrap gap-2 mb-5">
              {book.genres.map((genre, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-[#c8a96e]/10 border border-[#c8a96e]/30 rounded-full text-xs text-[#c8a96e]"
                >
                  {genre}
                </span>
              ))}
            </div>

            {/* Action buttons */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <button className="py-2.5 bg-gradient-to-r from-[#c8a96e] to-[#e8d4a8] text-[#1a1210] rounded-full font-medium text-sm flex items-center justify-center gap-2">
                <Plus size={16} />
                Adicionar
              </button>
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`py-2.5 rounded-full font-medium text-sm flex items-center justify-center gap-2 transition-all ${
                  isWishlisted
                    ? 'bg-[#e8635a] text-white'
                    : 'border-2 border-[#c8a96e] text-[#c8a96e] hover:bg-[#c8a96e]/10'
                }`}
              >
                <Heart size={16} className={isWishlisted ? 'fill-white' : ''} />
                {isWishlisted ? 'Salvo' : 'Salvar'}
              </button>
            </div>

            {/* Description */}
            <div className="mb-5">
              <h3 className="text-base mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                Sinopse
              </h3>
              <p className="text-sm text-[#e8d4a8]/85 leading-relaxed">{book.description}</p>
            </div>

            {/* Tropes */}
            <div>
              <h3 className="text-base mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
                Tropes
              </h3>
              <div className="flex flex-wrap gap-2">
                {book.tropes.map((trope, i) => (
                  <button
                    key={i}
                    className="px-3 py-1.5 bg-[#1a1210]/50 border border-[#c8a96e]/20 rounded-full text-xs hover:border-[#c8a96e] hover:bg-[#c8a96e]/10 transition-all"
                  >
                    {trope}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Right: emotions + reviews ── */}
        <div className="px-6 lg:px-8 py-6 xl:py-6 space-y-8">

          {/* Emotion breakdown */}
          <section>
            <h3 className="text-lg mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              Como os leitores se sentiram
            </h3>
            <div className="bg-[#1a1210]/50 border border-[#c8a96e]/20 rounded-2xl p-5 space-y-3">
              {emotionBreakdown.map((item) => (
                <div key={item.id}>
                  <div className="flex items-center justify-between text-sm mb-1.5">
                    <span className="text-[#e8d4a8] flex items-center gap-2">
                      <EmotionIcon id={item.id} size={15} />
                      {item.label}
                    </span>
                    <span className="text-[#8a7e6e] text-xs">{item.count.toLocaleString()} pessoas</span>
                  </div>
                  <div className="h-1.5 bg-[#8a7e6e]/20 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#c8a96e] to-[#e8d4a8] rounded-full"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Reviews */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg" style={{ fontFamily: 'Playfair Display, serif' }}>
                Reviews em destaque
              </h3>
              <button className="text-sm text-[#c8a96e]">Ver todas</button>
            </div>

            <div className="space-y-4">
              {topReviews.map((review, i) => (
                <div
                  key={i}
                  className="bg-[#1a1210]/50 border border-[#c8a96e]/20 rounded-2xl p-4 hover:border-[#c8a96e]/35 transition-colors"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <UserAvatar name={review.user.name} size="md" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-medium">{review.user.name}</h4>
                        {review.user.verified && (
                          <Star size={11} className="fill-[#c8a96e] text-[#c8a96e]" />
                        )}
                      </div>
                      <p className="text-xs text-[#8a7e6e]">{review.timeAgo}</p>
                    </div>
                    <div className="flex gap-0.5 flex-shrink-0">
                      {[...Array(5)].map((_, j) => (
                        <Star
                          key={j}
                          size={12}
                          className={j < review.rating ? 'fill-[#c8a96e] text-[#c8a96e]' : 'text-[#8a7e6e]/30'}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-1.5 mb-3">
                    {review.emotions.map((id) => (
                      <EmotionIcon key={id} id={id} size={14} />
                    ))}
                  </div>

                  <p className="text-sm text-[#e8d4a8]/90 leading-relaxed mb-3">{review.text}</p>

                  <div className="flex items-center gap-4 text-xs text-[#8a7e6e]">
                    <button className="flex items-center gap-1.5 hover:text-[#e8635a] transition-colors">
                      <Heart size={13} />
                      {review.likes}
                    </button>
                    <span>{review.helpful}% acharam útil</span>
                  </div>
                </div>
              ))}
            </div>
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
