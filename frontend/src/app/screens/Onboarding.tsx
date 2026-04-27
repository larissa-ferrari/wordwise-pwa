import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronRight, Heart, Smile, Zap, BookOpen, Sparkles } from 'lucide-react'
import { useOnboarding } from '../context/OnboardingContext'
import { ROUTES } from '../constants'
import { GenreIcon } from '../components/icons'
import type { GenreId } from '../components/icons'

const aesthetics = [
  { id: 'dark-academia', name: 'Dark Academia',        colors: ['#1a1210', '#c8a96e', '#8a7e6e'] },
  { id: 'cottagecore',   name: 'Cottagecore Literário', colors: ['#f5f0e8', '#7c9e7a', '#e8d4a8'] },
  { id: 'minimalist',    name: 'Minimalista Urbano',    colors: ['#0a0807', '#6a9fcf', '#f5f0e8'] },
  { id: 'vibrant',       name: 'Fantasia Vibrante',     colors: ['#b87cde', '#e8635a', '#c8a96e'] },
]

const genres: { id: GenreId; name: string }[] = [
  { id: 'fantasy',    name: 'Fantasy'     },
  { id: 'romance',    name: 'Romance'     },
  { id: 'thriller',   name: 'Thriller'    },
  { id: 'literary',   name: 'Literário'   },
  { id: 'scifi',      name: 'Sci-Fi'      },
  { id: 'horror',     name: 'Terror'      },
  { id: 'nonfiction', name: 'Não-ficção'  },
  { id: 'manga',      name: 'Mangá'       },
]

const moods = [
  { id: 'escape',    label: 'Quero escapar',       Icon: Sparkles, color: '#b87cde' },
  { id: 'learn',     label: 'Quero aprender',      Icon: BookOpen, color: '#6a9fcf' },
  { id: 'cry',       label: 'Quero chorar',        Icon: Heart,    color: '#e8635a' },
  { id: 'laugh',     label: 'Quero rir',           Icon: Smile,    color: '#c8a96e' },
  { id: 'challenge', label: 'Quero ser desafiado', Icon: Zap,      color: '#7c9e7a' },
]

export function Onboarding() {
  const navigate = useNavigate()
  const { complete } = useOnboarding()
  const [step, setStep] = useState(1)
  const [selectedAesthetic, setSelectedAesthetic] = useState<string>('')
  const [selectedGenres, setSelectedGenres] = useState<string[]>([])
  const [selectedBooks, setSelectedBooks] = useState<string[]>([])
  const [selectedMood, setSelectedMood] = useState<string>('')

  function handleNext() {
    if (step < 5) {
      setStep(step + 1)
    } else {
      complete()
      navigate(ROUTES.feed)
    }
  }

  function canProceed() {
    switch (step) {
      case 2: return selectedAesthetic !== ''
      case 3: return selectedGenres.length >= 3
      case 4: return selectedBooks.length >= 1
      case 5: return selectedMood !== ''
      default: return true
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0807] text-white flex flex-col">
      {/* Step 1: Splash */}
      {step === 1 && (
        <div className="flex-1 flex flex-col items-center justify-center px-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#c8a96e]/10 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-[#e8635a]/10 to-transparent rounded-full blur-3xl" />

          <div className="relative z-10 text-center">
            <div className="w-32 h-32 mx-auto mb-8">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <path d="M30 20 L30 80 L50 75 L50 15 Z" fill="#c8a96e" opacity="0.9" />
                <path d="M50 15 L50 75 L70 80 L70 20 Z" fill="#e8d4a8" opacity="0.8" />
                <path
                  d="M35 35 L40 55 L45 40 L50 55 L55 35"
                  stroke="#1a1210"
                  strokeWidth="2.5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <line x1="30" y1="50" x2="70" y2="50" stroke="#e8635a" strokeWidth="1" opacity="0.6" />
              </svg>
            </div>

            <h1 className="font-serif text-5xl mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              <span className="text-[#c8a96e]">Word</span>
              <span className="text-[#e8d4a8]">Wise</span>
            </h1>

            <p
              className="text-lg text-[#c8a96e]/80 mb-12 italic"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              "Seus livros, sua história."
            </p>

            <div className="space-y-3">
              <button
                onClick={handleNext}
                className="w-full bg-gradient-to-r from-[#c8a96e] to-[#e8d4a8] text-[#1a1210] py-4 px-8 rounded-full font-medium transition-transform hover:scale-105"
              >
                Começar
              </button>
              <button className="w-full border-2 border-[#c8a96e] text-[#c8a96e] py-4 px-8 rounded-full font-medium transition-colors hover:bg-[#c8a96e]/10">
                Entrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Aesthetic Selection */}
      {step === 2 && (
        <div className="flex-1 flex flex-col px-6 py-8 pb-32">
          <div className="mb-8">
            <p className="text-xs text-[#8a7e6e] uppercase tracking-wider mb-2">Passo 2 de 5</p>
            <h2 className="text-3xl mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
              Como é o seu universo literário?
            </h2>
            <p className="text-sm text-[#8a7e6e]">Escolha a estética que define você</p>
          </div>

          <div className="space-y-4 flex-1">
            {aesthetics.map((aesthetic) => (
              <button
                key={aesthetic.id}
                onClick={() => setSelectedAesthetic(aesthetic.id)}
                className={`w-full p-6 rounded-2xl border-2 transition-all ${
                  selectedAesthetic === aesthetic.id
                    ? 'border-[#c8a96e] bg-[#c8a96e]/10'
                    : 'border-[#c8a96e]/20 bg-[#1a1210]/50'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg">{aesthetic.name}</h3>
                  <div className="flex gap-2">
                    {aesthetic.colors.map((color, i) => (
                      <div
                        key={i}
                        className="w-6 h-6 rounded-full border border-white/20"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 3: Genre Selection */}
      {step === 3 && (
        <div className="flex-1 flex flex-col px-6 py-8 pb-32">
          <div className="mb-8">
            <p className="text-xs text-[#8a7e6e] uppercase tracking-wider mb-2">Passo 3 de 5</p>
            <h2 className="text-3xl mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
              O que faz seu coração acelerar?
            </h2>
            <p className="text-sm text-[#8a7e6e]">Selecione pelo menos 3 gêneros</p>
          </div>

          <div className="grid grid-cols-2 gap-3 flex-1">
            {genres.map((genre) => {
              const isSelected = selectedGenres.includes(genre.id)
              return (
                <button
                  key={genre.id}
                  onClick={() =>
                    setSelectedGenres(
                      isSelected
                        ? selectedGenres.filter((g) => g !== genre.id)
                        : [...selectedGenres, genre.id],
                    )
                  }
                  className={`p-6 rounded-2xl border-2 transition-all ${
                    isSelected
                      ? 'border-[#c8a96e] bg-[#c8a96e]/10'
                      : 'border-[#c8a96e]/20 bg-[#1a1210]/50'
                  }`}
                >
                  <div className="flex justify-center mb-3">
                    <GenreIcon id={genre.id} size={40} />
                  </div>
                  <div className="text-sm">{genre.name}</div>
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Step 4: Book Selection */}
      {step === 4 && (
        <div className="flex-1 flex flex-col px-6 py-8 pb-32">
          <div className="mb-8">
            <p className="text-xs text-[#8a7e6e] uppercase tracking-wider mb-2">Passo 4 de 5</p>
            <h2 className="text-3xl mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
              Estes te parecem familiares?
            </h2>
            <p className="text-sm text-[#8a7e6e]">Toque nos livros que você já leu ou ama</p>
          </div>

          <div className="grid grid-cols-3 gap-3 flex-1">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((book) => {
              const bookId = `book-${book}`
              const isSelected = selectedBooks.includes(bookId)
              return (
                <button
                  key={book}
                  onClick={() =>
                    setSelectedBooks(
                      isSelected
                        ? selectedBooks.filter((b) => b !== bookId)
                        : [...selectedBooks, bookId],
                    )
                  }
                  className={`aspect-[2/3] rounded-lg transition-all overflow-hidden ${
                    isSelected ? 'ring-4 ring-[#c8a96e] scale-95' : 'ring-1 ring-[#c8a96e]/20'
                  }`}
                >
                  <div
                    className={`w-full h-full bg-gradient-to-br ${
                      book % 3 === 0
                        ? 'from-[#c8a96e] to-[#e8635a]'
                        : book % 3 === 1
                        ? 'from-[#6a9fcf] to-[#b87cde]'
                        : 'from-[#7c9e7a] to-[#c8a96e]'
                    }`}
                  />
                </button>
              )
            })}
          </div>

          <button className="mt-4 text-sm text-[#8a7e6e] underline">
            Não li nenhum desses
          </button>
        </div>
      )}

      {/* Step 5: Mood Selection */}
      {step === 5 && (
        <div className="flex-1 flex flex-col px-6 py-8 pb-32">
          <div className="mb-8">
            <p className="text-xs text-[#8a7e6e] uppercase tracking-wider mb-2">Passo 5 de 5</p>
            <h2 className="text-3xl mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
              E hoje, como você quer se sentir?
            </h2>
            <p className="text-sm text-[#8a7e6e]">Escolha seu mood de leitura atual</p>
          </div>

          <div className="space-y-3 flex-1">
            {moods.map((mood) => {
              const { Icon } = mood
              const isSelected = selectedMood === mood.id
              return (
                <button
                  key={mood.id}
                  onClick={() => setSelectedMood(mood.id)}
                  className={`w-full p-6 rounded-2xl border-2 transition-all flex items-center gap-4 ${
                    isSelected
                      ? 'border-[#c8a96e] bg-[#c8a96e]/10'
                      : 'border-[#c8a96e]/20 bg-[#1a1210]/50'
                  }`}
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${mood.color}20` }}
                  >
                    <Icon size={24} style={{ color: mood.color }} />
                  </div>
                  <span className="text-lg">{mood.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Progress & Navigation */}
      {step > 1 && (
        <div className="fixed bottom-0 left-0 right-0 bg-[#1a1210] border-t border-[#c8a96e]/20 p-6">
          <div className="max-w-md mx-auto">
            <div className="flex gap-2 mb-4">
              {[1, 2, 3, 4, 5].map((s) => (
                <div
                  key={s}
                  className={`h-1 flex-1 rounded-full transition-all ${
                    s <= step ? 'bg-[#c8a96e]' : 'bg-[#8a7e6e]/20'
                  }`}
                />
              ))}
            </div>

            <div className="flex gap-3">
              {step > 2 && (
                <button
                  onClick={() => setStep(step - 1)}
                  className="px-6 py-3 border-2 border-[#c8a96e]/30 text-[#c8a96e] rounded-full"
                >
                  Voltar
                </button>
              )}
              <button
                onClick={handleNext}
                disabled={!canProceed()}
                className={`flex-1 py-3 px-6 rounded-full font-medium flex items-center justify-center gap-2 transition-all ${
                  canProceed()
                    ? 'bg-gradient-to-r from-[#c8a96e] to-[#e8d4a8] text-[#1a1210]'
                    : 'bg-[#8a7e6e]/20 text-[#8a7e6e] cursor-not-allowed'
                }`}
              >
                {step === 5 ? 'Começar a explorar' : 'Continuar'}
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
