import { useState } from 'react'
import { Search, TrendingUp, Sparkles, Heart, Zap } from 'lucide-react'
import { MoodIcon } from '../components/icons'
import type { MoodId } from '../components/icons'

const moods: { id: MoodId; label: string; color: string }[] = [
  { id: 'escape',  label: 'Escapismo',  color: '#b87cde' },
  { id: 'learn',   label: 'Aprender',   color: '#6a9fcf' },
  { id: 'cry',     label: 'Chorar',     color: '#e8635a' },
  { id: 'laugh',   label: 'Rir',        color: '#c8a96e' },
  { id: 'thrill',  label: 'Adrenalina', color: '#7c9e7a' },
]

const tropes = [
  'Enemies to Lovers', 'Chosen One', 'Slow Burn', 'Found Family',
  'Redemption Arc', 'Unreliable Narrator', 'Time Travel', 'Second Chance',
  'Forbidden Love', 'Dark Academia',
]

const trendingBooks = [
  { title: 'Fourth Wing',                          author: 'Rebecca Yarros',         cover: 'from-[#e8635a] to-[#b87cde]', genre: 'Fantasy' },
  { title: 'Tomorrow, and Tomorrow, and Tomorrow', author: 'Gabrielle Zevin',         cover: 'from-[#6a9fcf] to-[#c8a96e]', genre: 'Literária' },
  { title: 'The Housemaid',                        author: 'Freida McFadden',         cover: 'from-[#1a1210] to-[#e8635a]', genre: 'Thriller' },
  { title: 'Cem Anos de Solidão',                  author: 'Gabriel García Márquez',  cover: 'from-[#7c9e7a] to-[#c8a96e]', genre: 'Realismo' },
  { title: 'Project Hail Mary',                    author: 'Andy Weir',               cover: 'from-[#6a9fcf] to-[#b87cde]', genre: 'Sci-Fi' },
  { title: 'The Seven Husbands of Evelyn Hugo',    author: 'Taylor Jenkins Reid',     cover: 'from-[#c8a96e] to-[#e8635a]', genre: 'Drama' },
  { title: 'Iron Flame',                           author: 'Rebecca Yarros',          cover: 'from-[#b87cde] to-[#e8635a]', genre: 'Fantasy' },
  { title: 'Intermezzo',                           author: 'Sally Rooney',            cover: 'from-[#6a9fcf] to-[#7c9e7a]', genre: 'Literária' },
]

const curatedLists = [
  { name: 'Dark Academia Essentials',      count: 24, curator: 'WordWise'    },
  { name: 'Thrillers Psicológicos',        count: 18, curator: '@ana_reads'  },
  { name: 'Fantasia com Romances Lentos',  count: 31, curator: '@pedro_lit'  },
  { name: 'Sci-Fi para Iniciantes',        count: 15, curator: 'WordWise'    },
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

  const gridColsClass =
    activeFilter === 'curated'
      ? ''
      : 'grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-5'

  return (
    <div className="min-h-screen bg-[#0a0807] text-white">
      {/* Header */}
      <header className="sticky top-0 bg-[#0a0807]/95 backdrop-blur-sm border-b border-[#c8a96e]/20 px-6 lg:px-8 py-4 z-30">
        <div className="lg:max-w-none">
          <h1 className="text-2xl mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            Descobrir
          </h1>
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8a7e6e]" size={18} />
            <input
              type="text"
              placeholder="Buscar por título, autor, mood, trope..."
              className="w-full bg-[#1a1210] border border-[#c8a96e]/20 rounded-full py-2.5 pl-11 pr-4 text-sm focus:outline-none focus:border-[#c8a96e] transition-colors"
            />
          </div>
        </div>
      </header>

      {/* ── Body: mobile = stacked, desktop = sidebar + main ── */}
      <div className="lg:grid lg:grid-cols-[220px_1fr]">

        {/* ── Filter panel ── */}
        <aside className="lg:sticky lg:top-[105px] lg:self-start lg:h-[calc(100vh-105px)] lg:overflow-y-auto lg:border-r lg:border-[#c8a96e]/10">

          {/* Mobile: horizontal scroll tabs */}
          <div className="lg:hidden flex gap-2 px-6 py-4 overflow-x-auto scrollbar-hide">
            {FILTER_TABS.map(({ id, label, Icon }) => (
              <button
                key={id}
                onClick={() => setActiveFilter(id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all flex-shrink-0 ${
                  activeFilter === id
                    ? 'bg-[#c8a96e] text-[#1a1210]'
                    : 'bg-[#1a1210]/50 border border-[#c8a96e]/20 text-[#8a7e6e]'
                }`}
              >
                <Icon size={14} />
                <span className="text-sm font-medium">{label}</span>
              </button>
            ))}
          </div>

          {/* Desktop: vertical nav */}
          <nav className="hidden lg:block px-4 py-6 space-y-1">
            <p className="text-[10px] text-[#8a7e6e] uppercase tracking-wider px-3 mb-3">Filtros</p>
            {FILTER_TABS.map(({ id, label, Icon }) => (
              <button
                key={id}
                onClick={() => setActiveFilter(id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all text-sm ${
                  activeFilter === id
                    ? 'bg-[#c8a96e]/10 text-[#c8a96e] font-medium'
                    : 'text-[#8a7e6e] hover:bg-[#c8a96e]/5 hover:text-[#e8d4a8]'
                }`}
              >
                <Icon size={16} />
                {label}
                {activeFilter === id && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#c8a96e]" />
                )}
              </button>
            ))}

            {/* Desktop mood pills (always visible on desktop) */}
            <div className="pt-6">
              <p className="text-[10px] text-[#8a7e6e] uppercase tracking-wider px-3 mb-3">Mood</p>
              <div className="space-y-1">
                {moods.map((mood) => (
                  <button
                    key={mood.id}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-[#8a7e6e] hover:bg-[#c8a96e]/5 hover:text-[#e8d4a8] transition-all text-sm"
                  >
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${mood.color}20` }}
                    >
                      <MoodIcon id={mood.id} size={14} />
                    </div>
                    {mood.label}
                  </button>
                ))}
              </div>
            </div>
          </nav>
        </aside>

        {/* ── Main content ── */}
        <main className="px-6 lg:px-8 py-6">

          {/* Mobile: mood grid */}
          {activeFilter === 'mood' && (
            <div className="lg:hidden mb-6">
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
                        className="w-10 h-10 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: `${mood.color}20` }}
                      >
                        <MoodIcon id={mood.id} size={20} />
                      </div>
                      <span className="text-sm font-medium">{mood.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Tropes (mobile) */}
          {activeFilter === 'tropes' && (
            <div className="lg:hidden mb-6">
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

          {/* Tropes desktop (always visible, styled differently) */}
          <div className="hidden lg:block mb-6">
            <h2 className="text-sm text-[#8a7e6e] uppercase tracking-wider mb-3">Tropes populares</h2>
            <div className="flex flex-wrap gap-2">
              {tropes.map((trope) => (
                <button
                  key={trope}
                  className="px-3 py-1.5 bg-[#1a1210]/50 border border-[#c8a96e]/20 rounded-full text-xs hover:border-[#c8a96e] hover:bg-[#c8a96e]/10 transition-all"
                >
                  {trope}
                </button>
              ))}
            </div>
          </div>

          {/* Books grid */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg" style={{ fontFamily: 'Playfair Display, serif' }}>
                {FILTER_TITLE[activeFilter] ?? 'Livros em alta'}
              </h2>
              <button className="text-sm text-[#c8a96e]">Ver todos</button>
            </div>

            {activeFilter === 'curated' ? (
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
            ) : (
              <div className={gridColsClass}>
                {trendingBooks.map((book, i) => (
                  <button key={i} className="text-left group">
                    <div
                      className={`w-full aspect-[2/3] rounded-lg bg-gradient-to-br ${book.cover} mb-2 group-hover:scale-105 transition-transform`}
                    />
                    <h3 className="text-xs line-clamp-2 mb-0.5 leading-tight">{book.title}</h3>
                    <p className="text-[10px] text-[#8a7e6e] line-clamp-1">{book.author}</p>
                    <p className="hidden lg:block text-[10px] text-[#c8a96e]/70 mt-0.5">{book.genre}</p>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Curated lists (desktop, always shown below grid) */}
          {activeFilter !== 'curated' && (
            <div className="mt-8">
              <h2 className="text-lg mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                Listas Curadas
              </h2>
              <div className="grid lg:grid-cols-2 gap-3">
                {curatedLists.map((list, i) => (
                  <button
                    key={i}
                    className="p-4 bg-[#1a1210]/50 border border-[#c8a96e]/20 rounded-xl hover:border-[#c8a96e]/40 transition-all text-left"
                  >
                    <h3 className="text-sm font-medium mb-1">{list.name}</h3>
                    <p className="text-xs text-[#8a7e6e]">
                      {list.count} livros · por {list.curator}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
