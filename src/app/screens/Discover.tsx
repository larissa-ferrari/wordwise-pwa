import { useState } from 'react'
import { Search, TrendingUp, Sparkles, Heart, Zap } from 'lucide-react'
import { MoodIcon } from '../components/icons'
import type { MoodId } from '../components/icons'

const moods: { id: MoodId; label: string; color: string }[] = [
  { id: 'escape',    label: 'Escapismo',   color: '#b87cde' },
  { id: 'learn',     label: 'Aprender',    color: '#6a9fcf' },
  { id: 'cry',       label: 'Chorar',      color: '#e8635a' },
  { id: 'laugh',     label: 'Rir',         color: '#c8a96e' },
  { id: 'thrill',    label: 'Adrenalina',  color: '#7c9e7a' },
]

const tropes = [
  'Enemies to Lovers',
  'Chosen One',
  'Slow Burn',
  'Found Family',
  'Redemption Arc',
  'Unreliable Narrator',
  'Time Travel',
  'Second Chance',
]

const trendingBooks = [
  { title: 'Fourth Wing',                        author: 'Rebecca Yarros',       genre: 'Fantasy Romance',   cover: 'from-[#e8635a] to-[#b87cde]' },
  { title: 'Tomorrow, and Tomorrow, and Tomorrow', author: 'Gabrielle Zevin',    genre: 'Ficção Literária',  cover: 'from-[#6a9fcf] to-[#c8a96e]' },
  { title: 'The Housemaid',                      author: 'Freida McFadden',      genre: 'Thriller',          cover: 'from-[#1a1210] to-[#e8635a]' },
  { title: 'A Hundred Years of Solitude',        author: 'Gabriel García Márquez', genre: 'Realismo Mágico', cover: 'from-[#7c9e7a] to-[#c8a96e]' },
  { title: 'Project Hail Mary',                  author: 'Andy Weir',            genre: 'Sci-Fi',            cover: 'from-[#6a9fcf] to-[#b87cde]' },
  { title: 'The Seven Husbands of Evelyn Hugo',  author: 'Taylor Jenkins Reid',  genre: 'Drama',             cover: 'from-[#c8a96e] to-[#e8635a]' },
]

const curatedLists = [
  { name: 'Dark Academia Essentials',       count: 24, curator: 'WordWise'     },
  { name: 'Thrillers Psicológicos',         count: 18, curator: '@ana_reads'   },
  { name: 'Fantasia com Romances Lentos',   count: 31, curator: '@pedro_lit'   },
]

const FILTER_TABS = [
  { id: 'trending', label: 'Em alta',        Icon: TrendingUp },
  { id: 'mood',     label: 'Por Mood',       Icon: Sparkles   },
  { id: 'tropes',   label: 'Por Trope',      Icon: Heart      },
  { id: 'curated',  label: 'Listas Curadas', Icon: Zap        },
] as const

const FILTER_TITLE: Record<string, string> = {
  trending: 'Livros em alta',
  mood:     'Baseado no seu mood',
  tropes:   'Para você',
  curated:  'Listas populares',
}

export function Discover() {
  const [activeFilter, setActiveFilter] = useState<string>('trending')

  return (
    <div className="min-h-screen bg-[#0a0807] text-white pb-20">
      {/* Header */}
      <header className="sticky top-0 bg-[#0a0807]/95 backdrop-blur-sm border-b border-[#c8a96e]/20 px-6 py-4 z-40">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            Descobrir
          </h1>

          <div className="relative">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8a7e6e]"
              size={20}
            />
            <input
              type="text"
              placeholder="Buscar por título, autor, mood, trope..."
              className="w-full bg-[#1a1210] border border-[#c8a96e]/20 rounded-full py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-[#c8a96e] transition-colors"
            />
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-6 py-6">
        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2 -mx-6 px-6 scrollbar-hide">
          {FILTER_TABS.map(({ id, label, Icon }) => (
            <button
              key={id}
              onClick={() => setActiveFilter(id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                activeFilter === id
                  ? 'bg-[#c8a96e] text-[#1a1210]'
                  : 'bg-[#1a1210]/50 border border-[#c8a96e]/20 text-[#8a7e6e]'
              }`}
            >
              <Icon size={16} />
              <span className="text-sm font-medium">{label}</span>
            </button>
          ))}
        </div>

        {/* Mood Filter */}
        {activeFilter === 'mood' && (
          <div className="mb-6">
            <h2 className="text-sm text-[#8a7e6e] uppercase tracking-wider mb-3">
              Como você quer se sentir?
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {moods.map((mood) => (
                <button
                  key={mood.id}
                  className="p-4 bg-[#1a1210]/50 border border-[#c8a96e]/20 rounded-xl hover:border-[#c8a96e]/40 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: `${mood.color}20` }}
                    >
                      <MoodIcon id={mood.id} size={24} />
                    </div>
                    <span className="text-sm font-medium">{mood.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Tropes Filter */}
        {activeFilter === 'tropes' && (
          <div className="mb-6">
            <h2 className="text-sm text-[#8a7e6e] uppercase tracking-wider mb-3">
              Escolha seu trope favorito
            </h2>
            <div className="flex flex-wrap gap-2">
              {tropes.map((trope) => (
                <button
                  key={trope}
                  className="px-4 py-2 bg-[#1a1210]/50 border border-[#c8a96e]/20 rounded-full text-sm hover:border-[#c8a96e] hover:bg-[#c8a96e]/10 transition-all"
                >
                  {trope}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Books Grid */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg" style={{ fontFamily: 'Playfair Display, serif' }}>
              {FILTER_TITLE[activeFilter] ?? 'Livros em alta'}
            </h2>
            <button className="text-sm text-[#c8a96e]">Ver todos</button>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            {trendingBooks.map((book, i) => (
              <button key={i} className="text-left">
                <div
                  className={`w-full aspect-[2/3] rounded-lg bg-gradient-to-br ${book.cover} mb-2 hover:scale-105 transition-transform`}
                />
                <h3 className="text-xs line-clamp-2 mb-1">{book.title}</h3>
                <p className="text-[10px] text-[#8a7e6e] line-clamp-1">{book.author}</p>
              </button>
            ))}
          </div>

          {/* Curated Lists */}
          <div>
            <h2 className="text-lg mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              Listas Curadas
            </h2>
            <div className="space-y-3">
              {curatedLists.map((list, i) => (
                <button
                  key={i}
                  className="w-full p-4 bg-[#1a1210]/50 border border-[#c8a96e]/20 rounded-xl hover:border-[#c8a96e]/40 transition-all text-left"
                >
                  <h3 className="text-sm font-medium mb-1">{list.name}</h3>
                  <p className="text-xs text-[#8a7e6e]">
                    {list.count} livros · por {list.curator}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
