import { useCallback, useEffect, useRef, useState } from 'react'
import { Search, BookOpen, Heart, Eye, Bookmark, SortAsc } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { storiesService } from '../services'
import type { StoriesFilter } from '../services'
import type { Story, StoryRating, StoryStatus } from '../types'
import { ROUTES, STORY_RATINGS, STORY_STATUS, TAG_COLORS } from '../constants'

// ─── Tag chip ─────────────────────────────────────────────────────────────────

function TagChip({ name, type }: { name: string; type: string }) {
  const color = TAG_COLORS[type as keyof typeof TAG_COLORS] ?? '#8a7e6e'
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] border whitespace-nowrap"
      style={{ color, borderColor: `${color}40`, backgroundColor: `${color}10` }}
    >
      {name}
    </span>
  )
}

// ─── Rating badge ─────────────────────────────────────────────────────────────

function RatingBadge({ rating }: { rating: StoryRating }) {
  const cfg = STORY_RATINGS[rating]
  return (
    <span
      className="inline-flex items-center justify-center w-6 h-6 rounded text-[11px] font-bold border flex-shrink-0"
      style={{ color: cfg.color, borderColor: `${cfg.color}60`, backgroundColor: cfg.bg }}
      title={`Rating: ${rating}`}
    >
      {cfg.label}
    </span>
  )
}

// ─── Status badge ─────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: StoryStatus }) {
  const cfg = STORY_STATUS[status]
  return (
    <span className="text-[10px] font-medium" style={{ color: cfg.color }}>
      {cfg.label}
    </span>
  )
}

// ─── Story card ───────────────────────────────────────────────────────────────

function StoryCard({ story }: { story: Story }) {
  const navigate = useNavigate()

  const fandomTags      = story.tags.filter(t => t.type === 'fandom')
  const relationshipTags = story.tags.filter(t => t.type === 'relationship')
  const freeTags        = story.tags.filter(t => t.type === 'freeform').slice(0, 4)

  return (
    <article
      onClick={() => navigate(ROUTES.storyDetails(story.id))}
      className="flex gap-4 p-4 bg-[#1a1210]/50 border border-[#c8a96e]/20 rounded-2xl hover:border-[#c8a96e]/40 transition-colors cursor-pointer group"
    >
      {/* Cover */}
      <div className={`w-16 h-24 rounded-lg flex-shrink-0 bg-gradient-to-br ${story.coverGradient} shadow-md`} />

      {/* Content */}
      <div className="flex-1 min-w-0">
        {/* Header row */}
        <div className="flex items-start gap-2 mb-1">
          <RatingBadge rating={story.rating} />
          <div className="flex-1 min-w-0">
            <h3
              className="text-sm font-medium leading-snug group-hover:text-[#c8a96e] transition-colors line-clamp-2"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              {story.title}
            </h3>
            <p className="text-[11px] text-[#8a7e6e] mt-0.5">
              por <span className="text-[#c8a96e]/80">@{story.author.username}</span>
              {' · '}
              <StatusBadge status={story.status} />
              {' · '}
              <span>{story.chaptersCount} cap.</span>
              {' · '}
              <span>{(story.wordCount / 1000).toFixed(0)}k palavras</span>
            </p>
          </div>
        </div>

        {/* Summary */}
        <p className="text-xs text-[#e8d4a8]/70 leading-relaxed line-clamp-2 mb-2">
          {story.summary}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-2">
          {fandomTags.map(t => <TagChip key={t.id} name={t.name} type={t.type} />)}
          {relationshipTags.map(t => <TagChip key={t.id} name={t.name} type={t.type} />)}
          {freeTags.map(t => <TagChip key={t.id} name={t.name} type={t.type} />)}
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1 text-[11px] text-[#8a7e6e]">
            <Heart size={11} />
            {story.kudosCount.toLocaleString('pt-BR')}
          </span>
          <span className="flex items-center gap-1 text-[11px] text-[#8a7e6e]">
            <Eye size={11} />
            {story.hitsCount.toLocaleString('pt-BR')}
          </span>
          <span className="flex items-center gap-1 text-[11px] text-[#8a7e6e]">
            <Bookmark size={11} />
            {story.bookmarksCount.toLocaleString('pt-BR')}
          </span>
          <span className="text-[11px] text-[#8a7e6e] ml-auto">
            {new Date(story.updatedAt).toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' })}
          </span>
        </div>
      </div>
    </article>
  )
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div className="flex gap-4 p-4 bg-[#1a1210]/50 border border-[#c8a96e]/10 rounded-2xl animate-pulse">
      <div className="w-16 h-24 rounded-lg bg-[#c8a96e]/10 flex-shrink-0" />
      <div className="flex-1 space-y-2 pt-1">
        <div className="h-3.5 bg-[#c8a96e]/10 rounded w-3/4" />
        <div className="h-2.5 bg-[#c8a96e]/10 rounded w-1/2" />
        <div className="h-2.5 bg-[#c8a96e]/10 rounded w-full" />
        <div className="h-2.5 bg-[#c8a96e]/10 rounded w-5/6" />
        <div className="flex gap-1.5 pt-1">
          {[60, 80, 70].map((w, i) => (
            <div key={i} className="h-4 bg-[#c8a96e]/10 rounded-full" style={{ width: w }} />
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Filter sidebar content ───────────────────────────────────────────────────

const RATING_OPTIONS: { value: StoryRating; label: string }[] = [
  { value: 'general', label: 'General (G)' },
  { value: 'teen',    label: 'Teen (T)'    },
  { value: 'mature',  label: 'Mature (M)'  },
  { value: 'explicit', label: 'Explicit (E)'},
]

const STATUS_OPTIONS: { value: StoryStatus; label: string }[] = [
  { value: 'complete', label: 'Completa'     },
  { value: 'ongoing',  label: 'Em andamento' },
  { value: 'hiatus',   label: 'Hiato'        },
]

const SORT_OPTIONS = [
  { value: 'hits',      label: 'Mais lidos'    },
  { value: 'kudos',     label: 'Mais kudos'    },
  { value: 'updated',   label: 'Mais recentes' },
  { value: 'published', label: 'Mais antigos'  },
] as const

interface FilterPanelProps {
  ratings: StoryRating[]
  status: string
  sort: string
  onRating: (r: StoryRating) => void
  onStatus: (s: string) => void
  onSort: (s: string) => void
}

function FilterPanel({ ratings, status, sort, onRating, onStatus, onSort }: FilterPanelProps) {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-[10px] text-[#8a7e6e] uppercase tracking-wider mb-2">Rating</p>
        <div className="space-y-1">
          {RATING_OPTIONS.map(({ value, label }) => {
            const cfg = STORY_RATINGS[value]
            const active = ratings.includes(value)
            return (
              <button
                key={value}
                onClick={() => onRating(value)}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition-all text-xs ${
                  active ? 'bg-[#c8a96e]/10' : 'hover:bg-[#c8a96e]/5'
                }`}
              >
                <span
                  className="w-5 h-5 rounded text-[10px] font-bold border flex items-center justify-center flex-shrink-0"
                  style={{ color: cfg.color, borderColor: `${cfg.color}60`, backgroundColor: active ? cfg.bg : 'transparent' }}
                >
                  {cfg.label}
                </span>
                <span className={active ? 'text-[#e8d4a8]' : 'text-[#8a7e6e]'}>{label}</span>
              </button>
            )
          })}
        </div>
      </div>

      <div>
        <p className="text-[10px] text-[#8a7e6e] uppercase tracking-wider mb-2">Status</p>
        <div className="space-y-1">
          {STATUS_OPTIONS.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => onStatus(status === value ? '' : value)}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition-all text-xs ${
                status === value
                  ? 'bg-[#c8a96e]/10 text-[#e8d4a8]'
                  : 'text-[#8a7e6e] hover:bg-[#c8a96e]/5 hover:text-[#e8d4a8]'
              }`}
            >
              <span
                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: STORY_STATUS[value].color }}
              />
              {label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-[10px] text-[#8a7e6e] uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <SortAsc size={10} />
          Ordenar por
        </p>
        <div className="space-y-1">
          {SORT_OPTIONS.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => onSort(value)}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition-all text-xs ${
                sort === value
                  ? 'bg-[#c8a96e]/10 text-[#e8d4a8]'
                  : 'text-[#8a7e6e] hover:bg-[#c8a96e]/5 hover:text-[#e8d4a8]'
              }`}
            >
              {label}
              {sort === value && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#c8a96e]" />}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Main screen ──────────────────────────────────────────────────────────────

export function Stories() {
  const [stories, setStories]         = useState<Story[]>([])
  const [isLoading, setLoading]       = useState(true)
  const [query, setQuery]             = useState('')
  const [ratings, setRatings]         = useState<StoryRating[]>([])
  const [status, setStatus]           = useState('')
  const [sort, setSort]               = useState('hits')
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const loadStories = useCallback((filter: StoriesFilter) => {
    setLoading(true)
    storiesService.getAll(filter)
      .then(setStories)
      .catch(() => setStories([]))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    loadStories({ sort: sort as StoriesFilter['sort'] })
  }, [loadStories, sort])

  const handleSearch = (value: string) => {
    setQuery(value)
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      loadStories({ q: value || undefined, rating: ratings.length ? ratings : undefined, status: status || undefined, sort: sort as StoriesFilter['sort'] })
    }, 350)
  }

  const handleRating = (r: StoryRating) => {
    const next = ratings.includes(r) ? ratings.filter(x => x !== r) : [...ratings, r]
    setRatings(next)
    loadStories({ q: query || undefined, rating: next.length ? next : undefined, status: status || undefined, sort: sort as StoriesFilter['sort'] })
  }

  const handleStatus = (s: string) => {
    setStatus(s)
    loadStories({ q: query || undefined, rating: ratings.length ? ratings : undefined, status: s || undefined, sort: sort as StoriesFilter['sort'] })
  }

  const handleSort = (s: string) => {
    setSort(s)
    loadStories({ q: query || undefined, rating: ratings.length ? ratings : undefined, status: status || undefined, sort: s as StoriesFilter['sort'] })
  }

  const activeFiltersCount = ratings.length + (status ? 1 : 0)

  return (
    <div className="min-h-screen bg-[#0a0807] text-white">
      {/* Header */}
      <header className="sticky top-0 bg-[#0a0807]/95 backdrop-blur-sm border-b border-[#c8a96e]/20 px-6 lg:px-8 py-4 z-30">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl" style={{ fontFamily: 'Playfair Display, serif' }}>Histórias</h1>
            <p className="text-[11px] text-[#8a7e6e] mt-0.5">Ficções e fanfics da comunidade</p>
          </div>
          {/* Mobile filter toggle */}
          <button
            onClick={() => setShowMobileFilters(v => !v)}
            className={`lg:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs border transition-colors ${
              activeFiltersCount > 0
                ? 'border-[#c8a96e] bg-[#c8a96e]/10 text-[#c8a96e]'
                : 'border-[#c8a96e]/30 text-[#8a7e6e]'
            }`}
          >
            Filtros {activeFiltersCount > 0 && <span className="bg-[#c8a96e] text-[#1a1210] rounded-full w-4 h-4 flex items-center justify-center font-bold">{activeFiltersCount}</span>}
          </button>
        </div>
        <div className="relative max-w-2xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8a7e6e]" size={16} />
          <input
            type="text"
            value={query}
            onChange={e => handleSearch(e.target.value)}
            placeholder="Buscar por título, autor, tag, fandom..."
            className="w-full bg-[#1a1210] border border-[#c8a96e]/20 rounded-full py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-[#c8a96e] transition-colors"
          />
        </div>
      </header>

      {/* Mobile filter drawer */}
      {showMobileFilters && (
        <div className="lg:hidden px-6 py-4 border-b border-[#c8a96e]/10 bg-[#1a1210]/30">
          <FilterPanel
            ratings={ratings}
            status={status}
            sort={sort}
            onRating={handleRating}
            onStatus={handleStatus}
            onSort={handleSort}
          />
        </div>
      )}

      <div className="lg:grid lg:grid-cols-[200px_1fr]">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block lg:sticky lg:top-[105px] lg:self-start lg:h-[calc(100vh-105px)] lg:overflow-y-auto border-r border-[#c8a96e]/10 px-4 py-6">
          <FilterPanel
            ratings={ratings}
            status={status}
            sort={sort}
            onRating={handleRating}
            onStatus={handleStatus}
            onSort={handleSort}
          />
        </aside>

        {/* Story list */}
        <main className="px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm text-[#8a7e6e]">
              {isLoading ? 'Buscando...' : `${stories.length} ${stories.length === 1 ? 'história' : 'histórias'}`}
            </h2>
          </div>

          <div className="space-y-4 max-w-2xl">
            {isLoading
              ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
              : stories.length === 0
                ? (
                  <div className="text-center py-20 text-[#8a7e6e]">
                    <BookOpen size={40} className="mx-auto mb-4 opacity-40" />
                    <p className="text-sm">Nenhuma história encontrada.</p>
                    <p className="text-xs mt-1 opacity-60">Tente ajustar os filtros ou a busca.</p>
                  </div>
                )
                : stories.map(s => <StoryCard key={s.id} story={s} />)
            }
          </div>
        </main>
      </div>
    </div>
  )
}
