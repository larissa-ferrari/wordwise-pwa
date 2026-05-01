import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  ArrowLeft, Heart, Eye, Bookmark, BookOpen,
  AlertTriangle, CheckCircle, ChevronRight, MessageCircle, Send,
} from 'lucide-react'
import { storiesService, commentsService } from '../services'
import type { Story } from '../types'
import type { Comment } from '../services/commentsService'
import {
  ROUTES,
  STORY_RATINGS,
  STORY_STATUS,
  STORY_WARNINGS,
  TAG_COLORS,
} from '../constants'
import { useAuth } from '../context/AuthContext'

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmt(n: number) {
  return n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n)
}

function readingTime(words: number) {
  const mins = Math.ceil(words / 200)
  return mins < 60 ? `~${mins} min` : `~${Math.round(mins / 60)}h`
}

// ─── Tag section ──────────────────────────────────────────────────────────────

function TagGroup({ label, tags, type }: { label: string; tags: { id: string; name: string }[]; type: string }) {
  if (!tags.length) return null
  const color = TAG_COLORS[type as keyof typeof TAG_COLORS] ?? '#8a7e6e'
  return (
    <div className="flex flex-wrap items-baseline gap-1.5">
      <span className="text-[10px] text-[var(--ww-muted)] uppercase tracking-wider flex-shrink-0 mr-1">{label}:</span>
      {tags.map(t => (
        <button
          key={t.id}
          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs border hover:opacity-80 transition-opacity"
          style={{ color, borderColor: `${color}40`, backgroundColor: `${color}10` }}
        >
          {t.name}
        </button>
      ))}
    </div>
  )
}

// ─── Warnings ─────────────────────────────────────────────────────────────────

function WarningsSection({ warnings }: { warnings: string[] }) {
  const hasWarnings = warnings.some(w => w !== 'no_warnings' && w !== 'choose_not_to_warn')
  if (!hasWarnings && warnings.includes('no_warnings')) return null

  return (
    <div className={`flex flex-wrap gap-2 p-3 rounded-xl border ${hasWarnings ? 'border-[#e8635a]/30 bg-[#e8635a]/5' : 'border-[var(--ww-accent)]/20 bg-[var(--ww-accent)]/5'}`}>
      {hasWarnings
        ? <AlertTriangle size={13} className="text-[#e8635a] flex-shrink-0 mt-0.5" />
        : <CheckCircle size={13} className="text-[#7c9e7a] flex-shrink-0 mt-0.5" />
      }
      <div className="flex flex-wrap gap-1.5">
        {warnings.map(w => (
          <span
            key={w}
            className="text-xs"
            style={{ color: hasWarnings && w !== 'no_warnings' ? '#e8635a' : 'var(--ww-muted)' }}
          >
            {STORY_WARNINGS[w] ?? w}
          </span>
        ))}
      </div>
    </div>
  )
}

// ─── Chapter list ─────────────────────────────────────────────────────────────

function ChapterList({ story }: { story: Story }) {
  const navigate = useNavigate()

  return (
    <div>
      <h2 className="text-sm text-[var(--ww-muted)] uppercase tracking-wider mb-3 flex items-center gap-2">
        <BookOpen size={13} />
        Capítulos ({story.chaptersCount})
      </h2>
      <div className="space-y-1">
        {story.chapters.map(ch => (
          <button
            key={ch.id}
            onClick={() => navigate(ROUTES.chapterReader(story.id, ch.chapterNumber))}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-[var(--ww-bg-raised)]/50 border border-[var(--ww-accent)]/15 hover:border-[var(--ww-accent)]/35 hover:bg-[var(--ww-accent)]/5 transition-all text-left group"
          >
            <span className="text-[11px] text-[var(--ww-muted)] w-5 text-center flex-shrink-0">
              {ch.chapterNumber}
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-[var(--ww-text)] group-hover:text-[var(--ww-accent-pale)] transition-colors truncate">
                {ch.title}
              </p>
              <p className="text-[10px] text-[var(--ww-muted)] mt-0.5">
                {ch.wordCount.toLocaleString('pt-BR')} palavras · {readingTime(ch.wordCount)} · {new Date(ch.publishedAt).toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' })}
              </p>
            </div>
            <ChevronRight size={14} className="text-[var(--ww-muted)] group-hover:text-[var(--ww-accent)] transition-colors flex-shrink-0" />
          </button>
        ))}
      </div>
    </div>
  )
}

// ─── Story comments ───────────────────────────────────────────────────────────

function StoryComments({ storyId }: { storyId: string }) {
  const { user } = useAuth()
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading]   = useState(true)
  const [text, setText]         = useState('')
  const [sending, setSending]   = useState(false)

  useEffect(() => {
    commentsService.getStoryComments(storyId)
      .then(setComments)
      .finally(() => setLoading(false))
  }, [storyId])

  const handleSend = async () => {
    if (!text.trim() || !user) return
    setSending(true)
    const c = await commentsService.addComment({
      content: text.trim(),
      level: 'story',
      storyId,
      authorName: user.display_name ?? user.username,
      authorUsername: user.username,
    })
    setComments(p => [...p, c])
    setText('')
    setSending(false)
  }

  const handleLike = async (id: string) => {
    const res = await commentsService.toggleLike(id)
    setComments(p => p.map(c => c.id === id ? { ...c, ...res } : c))
  }

  return (
    <div>
      <h2 className="text-sm text-[var(--ww-muted)] uppercase tracking-wider mb-4 flex items-center gap-2">
        <MessageCircle size={13} />
        Comentários ({loading ? '…' : comments.length})
      </h2>

      {!loading && comments.length === 0 && (
        <p className="text-sm text-[var(--ww-muted)] text-center py-4">
          Nenhum comentário ainda. Seja o primeiro!
        </p>
      )}

      {comments.length > 0 && (
        <div className="space-y-4 mb-4">
          {comments.map(c => (
            <div key={c.id} className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-[var(--ww-accent)]/15 flex items-center justify-center shrink-0">
                <span className="text-xs font-bold text-[var(--ww-accent)]">
                  {c.authorName.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1">
                <div className="flex items-baseline gap-2 mb-0.5">
                  <span className="text-xs font-medium text-[var(--ww-accent)]">@{c.authorUsername}</span>
                  <span className="text-[10px] text-[var(--ww-muted)]">
                    {new Date(c.createdAt).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </span>
                </div>
                <p className="text-sm text-[var(--ww-text)] leading-relaxed">{c.content}</p>
                <button
                  onClick={() => handleLike(c.id)}
                  className="flex items-center gap-1 mt-1.5 text-[11px] transition-colors"
                  style={{ color: c.isLiked ? '#e8635a' : 'var(--ww-muted)' }}
                >
                  <Heart size={11} className={c.isLiked ? 'fill-[#e8635a]' : ''} />
                  {c.likes} {c.likes === 1 ? 'curtida' : 'curtidas'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add comment form */}
      <div className="flex gap-3 p-4 bg-[var(--ww-bg-raised)]/50 border border-[var(--ww-accent)]/15 rounded-xl">
        <div className="w-8 h-8 rounded-full bg-[var(--ww-accent)]/15 flex items-center justify-center shrink-0">
          <span className="text-xs font-bold text-[var(--ww-accent)]">
            {(user?.display_name ?? user?.username ?? 'A').charAt(0).toUpperCase()}
          </span>
        </div>
        <div className="flex-1 flex gap-2">
          <input
            value={text}
            onChange={e => setText(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && !e.shiftKey && handleSend()}
            placeholder="Escreva um comentário..."
            className="flex-1 bg-transparent outline-none text-sm text-[var(--ww-text)] placeholder:text-[var(--ww-muted)]/50"
          />
          <button
            onClick={handleSend}
            disabled={!text.trim() || sending}
            className="text-[var(--ww-accent)] disabled:opacity-40 transition-opacity hover:opacity-70"
          >
            <Send size={15} />
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Main screen ──────────────────────────────────────────────────────────────

export function StoryDetails() {
  const navigate        = useNavigate()
  const { storyId }     = useParams<{ storyId: string }>()
  const [story, setStory] = useState<Story | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!storyId) return
    storiesService.getById(storyId)
      .then(setStory)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [storyId])

  const handleKudos = async () => {
    if (!storyId || !story) return
    const res = await storiesService.toggleKudos(storyId)
    setStory(s => s ? { ...s, kudosCount: res.kudosCount, isKudosed: res.isKudosed } : s)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--ww-bg)] flex items-center justify-center">
        <div className="w-10 h-10 rounded-full border-2 border-[var(--ww-accent)]/30 border-t-[var(--ww-accent)] animate-spin" />
      </div>
    )
  }

  if (!story) {
    return (
      <div className="min-h-screen bg-[var(--ww-bg)] flex items-center justify-center text-[var(--ww-muted)]">
        <p>História não encontrada.</p>
      </div>
    )
  }

  const ratingCfg = STORY_RATINGS[story.rating]
  const statusCfg = STORY_STATUS[story.status]

  const fandomTags       = story.tags.filter(t => t.type === 'fandom')
  const relationshipTags = story.tags.filter(t => t.type === 'relationship')
  const characterTags    = story.tags.filter(t => t.type === 'character')
  const freeTags         = story.tags.filter(t => t.type === 'freeform')

  return (
    <div className="min-h-screen bg-[var(--ww-bg)] text-[var(--ww-text)]">
      {/* Header */}
      <header className="sticky top-0 bg-[var(--ww-bg)]/95 backdrop-blur-sm border-b border-[var(--ww-accent)]/20 px-6 lg:px-8 py-4 z-30 flex items-center gap-3">
        <button
          onClick={() => navigate(ROUTES.stories)}
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[var(--ww-accent)]/10 transition-colors flex-shrink-0"
        >
          <ArrowLeft size={18} className="text-[var(--ww-accent)]" />
        </button>
        <h1 className="text-lg truncate text-[var(--ww-text)]" style={{ fontFamily: 'Playfair Display, serif' }}>
          {story.title}
        </h1>
      </header>

      <div className="max-w-2xl lg:max-w-3xl mx-auto px-6 lg:px-8 py-6 space-y-6">

        {/* Story header block */}
        <div className="flex gap-5">
          <div className={`w-24 h-36 lg:w-32 lg:h-48 rounded-xl flex-shrink-0 bg-gradient-to-br ${story.coverGradient} shadow-xl`} />

          <div className="flex-1 min-w-0">
            <h2
              className="text-xl lg:text-2xl leading-snug mb-1 text-[var(--ww-text)]"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              {story.title}
            </h2>
            <p className="text-sm text-[var(--ww-muted)] mb-3">
              por <span className="text-[var(--ww-accent)]">@{story.author.username}</span>
            </p>

            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span
                className="inline-flex items-center justify-center w-7 h-7 rounded-lg text-sm font-bold border"
                style={{ color: ratingCfg.color, borderColor: `${ratingCfg.color}60`, backgroundColor: ratingCfg.bg }}
              >
                {ratingCfg.label}
              </span>
              <span
                className="px-2 py-0.5 rounded-full text-[11px] font-medium border"
                style={{ color: statusCfg.color, borderColor: `${statusCfg.color}40`, backgroundColor: `${statusCfg.color}15` }}
              >
                {statusCfg.label}
              </span>
              <span className="px-2 py-0.5 rounded-full text-[11px] border border-[var(--ww-accent)]/20 text-[var(--ww-muted)] uppercase">
                {story.category}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 mb-3">
              {[
                { Icon: Heart,    value: fmt(story.kudosCount),     label: 'Kudos'    },
                { Icon: Eye,      value: fmt(story.hitsCount),      label: 'Leituras' },
                { Icon: Bookmark, value: fmt(story.bookmarksCount), label: 'Salvos'   },
              ].map(({ Icon, value, label }) => (
                <div key={label} className="flex flex-col items-center bg-[var(--ww-bg-raised)]/50 border border-[var(--ww-accent)]/15 rounded-lg py-2">
                  <Icon size={13} className="text-[var(--ww-accent)] mb-0.5" />
                  <span className="text-sm font-medium text-[var(--ww-text)]">{value}</span>
                  <span className="text-[9px] text-[var(--ww-muted)] uppercase tracking-wider">{label}</span>
                </div>
              ))}
            </div>

            <p className="text-[11px] text-[var(--ww-muted)]">
              {story.chaptersCount} capítulos · {(story.wordCount / 1000).toFixed(0)}k palavras · {readingTime(story.wordCount)} de leitura
            </p>
          </div>
        </div>

        <WarningsSection warnings={story.warnings} />

        <div>
          <h2 className="text-sm text-[var(--ww-muted)] uppercase tracking-wider mb-2">Sinopse</h2>
          <p className="text-sm text-[var(--ww-text)]/90 leading-relaxed">{story.summary}</p>
        </div>

        <div className="bg-[var(--ww-bg-raised)]/30 border border-[var(--ww-accent)]/15 rounded-xl p-4 space-y-3">
          <TagGroup label="Fandom"        tags={fandomTags}       type="fandom"       />
          <TagGroup label="Relacionamento" tags={relationshipTags} type="relationship" />
          <TagGroup label="Personagens"    tags={characterTags}    type="character"    />
          <TagGroup label="Tags"           tags={freeTags}         type="freeform"     />
        </div>

        {/* Kudos CTA */}
        <button
          onClick={handleKudos}
          className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl border transition-all ${
            story.isKudosed
              ? 'bg-[#e8635a]/10 border-[#e8635a]/40 text-[#e8635a]'
              : 'border-[var(--ww-accent)]/30 text-[var(--ww-muted)] hover:border-[#e8635a]/40 hover:text-[#e8635a] hover:bg-[#e8635a]/5'
          }`}
        >
          <Heart size={16} className={story.isKudosed ? 'fill-[#e8635a]' : ''} />
          <span className="text-sm font-medium">
            {story.isKudosed ? 'Você deu kudos!' : 'Dar Kudos'}
          </span>
          <span className="text-xs opacity-60">({story.kudosCount.toLocaleString('pt-BR')})</span>
        </button>

        <ChapterList story={story} />

        {story.chapters.length > 0 && (
          <button
            onClick={() => navigate(ROUTES.chapterReader(story.id, 1))}
            className="w-full py-3.5 bg-gradient-to-r from-[#c8a96e] to-[#e8d4a8] text-[#1a1210] rounded-xl font-medium text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
          >
            <BookOpen size={16} />
            Começar a ler
          </button>
        )}

        {/* Story-level comments */}
        <StoryComments storyId={story.id} />

        <p className="text-center text-[11px] text-[var(--ww-muted)]/60">
          Publicada em {new Date(story.publishedAt).toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' })}
          {' · '}
          Atualizada em {new Date(story.updatedAt).toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

      </div>
    </div>
  )
}
