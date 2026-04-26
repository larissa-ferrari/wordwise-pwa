import { useState } from 'react'
import { X, Star, Heart, Smile, Zap, Frown, Meh, Music, BookOpen } from 'lucide-react'

interface ReviewModalProps {
  isOpen: boolean
  onClose: () => void
}

const emotions = [
  { id: 'love',     Icon: Heart, label: 'Me apaixonei',     color: '#e8635a' },
  { id: 'cry',      Icon: Frown, label: 'Chorei',           color: '#6a9fcf' },
  { id: 'laugh',    Icon: Smile, label: 'Ri muito',         color: '#c8a96e' },
  { id: 'surprise', Icon: Zap,   label: 'Fui surpreendido', color: '#b87cde' },
  { id: 'meh',      Icon: Meh,   label: 'Me irritei',       color: '#8a7e6e' },
]

const sampleBooks = [
  { title: 'O Nome do Vento', author: 'Patrick Rothfuss', cover: 'from-[#c8a96e] to-[#e8635a]' },
  { title: 'Neuromancer',      author: 'William Gibson',   cover: 'from-[#6a9fcf] to-[#b87cde]' },
  { title: 'A Casa no Cerrado', author: 'Carla Madeira',   cover: 'from-[#7c9e7a] to-[#c8a96e]' },
]

const RATING_LABELS: Record<number, string> = {
  5: 'Obra-prima!',
  4: 'Adorei!',
  3: 'Gostei',
  2: 'Não é pra mim',
  1: 'Decepcionante',
}

export function ReviewModal({ isOpen, onClose }: ReviewModalProps) {
  const [step, setStep] = useState(1)
  const [rating, setRating] = useState(0)
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([])
  const [reviewText, setReviewText] = useState('')

  if (!isOpen) return null

  function toggleEmotion(id: string) {
    setSelectedEmotions((prev) =>
      prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id],
    )
  }

  function handlePublish() {
    onClose()
    setStep(1)
    setRating(0)
    setSelectedEmotions([])
    setReviewText('')
  }

  const STEP_TITLES: Record<number, string> = {
    1: 'Selecionar Livro',
    2: 'Como você se sentiu?',
    3: 'Avalie o livro',
    4: 'Escreva sua review',
    5: 'Adicione extras',
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-end md:items-center justify-center">
      <div className="bg-[#0a0807] w-full md:max-w-2xl md:rounded-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-[#0a0807] border-b border-[#c8a96e]/20 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl" style={{ fontFamily: 'Playfair Display, serif' }}>
            {STEP_TITLES[step]}
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#1a1210] flex items-center justify-center hover:bg-[#c8a96e]/10 transition-colors"
          >
            <X size={20} className="text-[#8a7e6e]" />
          </button>
        </div>

        {/* Step 1: Select Book */}
        {step === 1 && (
          <div className="p-6">
            <div className="mb-4">
              <input
                type="text"
                placeholder="Buscar livro..."
                className="w-full bg-[#1a1210] border border-[#c8a96e]/20 rounded-full py-3 px-4 text-sm focus:outline-none focus:border-[#c8a96e] transition-colors"
              />
            </div>

            <div className="space-y-3">
              {sampleBooks.map((book, i) => (
                <button
                  key={i}
                  onClick={() => setStep(2)}
                  className="w-full p-3 bg-[#1a1210]/50 border border-[#c8a96e]/20 rounded-xl hover:border-[#c8a96e]/40 transition-all flex items-center gap-3"
                >
                  <div className={`w-12 h-16 rounded bg-gradient-to-br ${book.cover} flex-shrink-0`} />
                  <div className="text-left flex-1">
                    <h3 className="text-sm font-medium mb-1">{book.title}</h3>
                    <p className="text-xs text-[#8a7e6e]">{book.author}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Emotions */}
        {step === 2 && (
          <div className="p-6">
            <p className="text-sm text-[#8a7e6e] mb-4">
              Selecione todas as emoções que você sentiu
            </p>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {emotions.map(({ id, Icon, label, color }) => {
                const isSelected = selectedEmotions.includes(id)
                return (
                  <button
                    key={id}
                    onClick={() => toggleEmotion(id)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      isSelected
                        ? 'border-[#c8a96e] bg-[#c8a96e]/10'
                        : 'border-[#c8a96e]/20 bg-[#1a1210]/50'
                    }`}
                  >
                    <div
                      className="w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center"
                      style={{ backgroundColor: `${color}20` }}
                    >
                      <Icon size={24} style={{ color }} />
                    </div>
                    <p className="text-xs">{label}</p>
                  </button>
                )
              })}
            </div>
            <button
              onClick={() => setStep(3)}
              className="w-full bg-gradient-to-r from-[#c8a96e] to-[#e8d4a8] text-[#1a1210] py-3 px-6 rounded-full font-medium"
            >
              Continuar
            </button>
          </div>
        )}

        {/* Step 3: Rating */}
        {step === 3 && (
          <div className="p-6">
            <p className="text-sm text-[#8a7e6e] mb-6">Qual sua nota para este livro?</p>
            <div className="flex justify-center gap-3 mb-8">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    size={48}
                    className={
                      star <= rating ? 'fill-[#c8a96e] text-[#c8a96e]' : 'text-[#8a7e6e]/30'
                    }
                  />
                </button>
              ))}
            </div>
            {rating > 0 && (
              <div className="text-center mb-6">
                <p className="text-2xl" style={{ fontFamily: 'Playfair Display, serif' }}>
                  {RATING_LABELS[rating]}
                </p>
              </div>
            )}
            <button
              onClick={() => setStep(4)}
              disabled={rating === 0}
              className={`w-full py-3 px-6 rounded-full font-medium ${
                rating > 0
                  ? 'bg-gradient-to-r from-[#c8a96e] to-[#e8d4a8] text-[#1a1210]'
                  : 'bg-[#8a7e6e]/20 text-[#8a7e6e] cursor-not-allowed'
              }`}
            >
              Continuar
            </button>
          </div>
        )}

        {/* Step 4: Review Text */}
        {step === 4 && (
          <div className="p-6">
            <p className="text-sm text-[#8a7e6e] mb-4">Compartilhe seus pensamentos</p>
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="O que você achou deste livro? Compartilhe sua experiência de leitura..."
              className="w-full bg-[#1a1210] border border-[#c8a96e]/20 rounded-2xl p-4 text-sm focus:outline-none focus:border-[#c8a96e] transition-colors min-h-[200px] resize-none"
            />
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => setStep(5)}
                className="flex-1 border-2 border-[#c8a96e]/30 text-[#c8a96e] py-3 px-6 rounded-full font-medium"
              >
                Pular
              </button>
              <button
                onClick={() => setStep(5)}
                disabled={reviewText.length < 10}
                className={`flex-1 py-3 px-6 rounded-full font-medium ${
                  reviewText.length >= 10
                    ? 'bg-gradient-to-r from-[#c8a96e] to-[#e8d4a8] text-[#1a1210]'
                    : 'bg-[#8a7e6e]/20 text-[#8a7e6e] cursor-not-allowed'
                }`}
              >
                Continuar
              </button>
            </div>
          </div>
        )}

        {/* Step 5: Extras */}
        {step === 5 && (
          <div className="p-6">
            <p className="text-sm text-[#8a7e6e] mb-4">
              Adicione extras à sua review (opcional)
            </p>

            <div className="space-y-4">
              <div className="bg-[#1a1210]/50 border border-[#c8a96e]/20 rounded-xl p-4">
                <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
                  <BookOpen size={16} className="text-[#c8a96e]" />
                  Citação favorita
                </h3>
                <input
                  type="text"
                  placeholder="Digite uma frase marcante do livro..."
                  className="w-full bg-[#0a0807] border border-[#c8a96e]/20 rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-[#c8a96e]"
                />
              </div>

              <div className="bg-[#1a1210]/50 border border-[#c8a96e]/20 rounded-xl p-4">
                <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
                  <Music size={16} className="text-[#c8a96e]" />
                  Trilha sonora
                </h3>
                <p className="text-xs text-[#8a7e6e] mb-3">O que você ouvia enquanto lia?</p>
                <button className="w-full py-2 border-2 border-[#c8a96e]/30 text-[#c8a96e] rounded-full text-sm hover:bg-[#c8a96e]/10 transition-colors">
                  Conectar Spotify
                </button>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={handlePublish}
                className="flex-1 border-2 border-[#c8a96e]/30 text-[#c8a96e] py-3 px-6 rounded-full font-medium"
              >
                Pular e publicar
              </button>
              <button
                onClick={handlePublish}
                className="flex-1 bg-gradient-to-r from-[#c8a96e] to-[#e8d4a8] text-[#1a1210] py-3 px-6 rounded-full font-medium"
              >
                Publicar review
              </button>
            </div>
          </div>
        )}

        {/* Progress Steps */}
        {step > 1 && (
          <div className="px-6 pb-6">
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((s) => (
                <div
                  key={s}
                  className={`h-1 flex-1 rounded-full transition-all ${
                    s <= step ? 'bg-[#c8a96e]' : 'bg-[#8a7e6e]/20'
                  }`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
