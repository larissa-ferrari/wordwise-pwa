import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  ArrowLeft, ArrowRight, ChevronLeft, Heart, List, BookOpen,
  Settings2, Sun, Moon, MessageCircle, Send, X,
} from 'lucide-react'
import { storiesService, commentsService } from '../services'
import type { StoryChapter } from '../types'
import type { Comment } from '../services/commentsService'
import { ROUTES } from '../constants'
import { useReadingPrefs } from '../context/ReadingPrefsContext'
import type { FontSize, ReadingBg, LineSpacing } from '../context/ReadingPrefsContext'
import { useTheme } from '../context/ThemeContext'
import { useAuth } from '../context/AuthContext'

// ─── Reading background configs ───────────────────────────────────────────────

const BG_STYLE: Record<ReadingBg, { bg: string; text: string; textMuted: string; border: string; headerBg: string }> = {
  dark:  { bg: '#0a0807',  text: '#e8d4a8e6', textMuted: '#8a7e6e', border: 'rgba(200,169,110,0.15)', headerBg: 'rgba(10,8,7,0.95)'  },
  sepia: { bg: '#1c1007',  text: '#d4a96ee6', textMuted: '#9a7e50', border: 'rgba(180,130,60,0.2)',   headerBg: 'rgba(28,16,7,0.95)'  },
  paper: { bg: '#f5f0e8',  text: '#2d1f0e',   textMuted: '#7a6650', border: 'rgba(139,100,36,0.2)',   headerBg: 'rgba(245,240,232,0.95)' },
}

const FONT_SIZE: Record<FontSize, string> = { sm: '13px', md: '15px', lg: '17px', xl: '20px' }

const LINE_SPACING: Record<LineSpacing, string> = { compact: '1.65', normal: '1.9', relaxed: '2.2' }

// ─── Reading progress bar ─────────────────────────────────────────────────────

function ReadingProgress({ color }: { color: string }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handler = () => {
      const el = document.documentElement
      const total = el.scrollHeight - el.clientHeight
      setProgress(total > 0 ? (el.scrollTop / total) * 100 : 0)
    }
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 h-0.5 z-50" style={{ backgroundColor: `${color}20` }}>
      <div className="h-full transition-none" style={{ width: `${progress}%`, backgroundColor: color }} />
    </div>
  )
}

// ─── Chapter nav button ───────────────────────────────────────────────────────

function ChapterNavBtn({
  label, sublabel, direction, onClick, disabled, color, border,
}: {
  label: string; sublabel: string; direction: 'prev' | 'next'
  onClick: () => void; disabled: boolean; color: string; border: string
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all flex-1 ${direction === 'next' ? 'flex-row-reverse text-right' : 'text-left'}`}
      style={{
        borderColor: disabled ? `${border}` : border,
        opacity: disabled ? 0.3 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer',
      }}
    >
      {direction === 'prev'
        ? <ArrowLeft size={16} style={{ color: disabled ? undefined : color }} />
        : <ArrowRight size={16} style={{ color: disabled ? undefined : color }} />
      }
      <div>
        <p className="text-[10px] uppercase tracking-wider" style={{ color: BG_STYLE.dark.textMuted }}>{label}</p>
        <p className="text-xs line-clamp-1" style={{ color: BG_STYLE.dark.text }}>{sublabel}</p>
      </div>
    </button>
  )
}

// ─── Reading preferences panel ────────────────────────────────────────────────

function PrefsPanel({ onClose }: { onClose: () => void }) {
  const { prefs, set } = useReadingPrefs()
  const { theme, toggle } = useTheme()

  const BG_OPTIONS: { value: ReadingBg; label: string; swatch: string }[] = [
    { value: 'dark',  label: 'Escuro',  swatch: '#0a0807' },
    { value: 'sepia', label: 'Sépia',   swatch: '#1c1007' },
    { value: 'paper', label: 'Claro',   swatch: '#f5f0e8' },
  ]

  const SIZE_OPTIONS: { value: FontSize; label: string }[] = [
    { value: 'sm', label: 'A' },
    { value: 'md', label: 'A' },
    { value: 'lg', label: 'A' },
    { value: 'xl', label: 'A' },
  ]

  const SPACING_OPTIONS: { value: LineSpacing; label: string }[] = [
    { value: 'compact',  label: 'Compacto'  },
    { value: 'normal',   label: 'Normal'    },
    { value: 'relaxed',  label: 'Espaçado'  },
  ]

  return (
    <div className="fixed inset-0 z-[70] flex flex-col justify-end lg:justify-center lg:items-end">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-[var(--ww-bg-raised)] border border-[var(--ww-accent)]/20 rounded-t-2xl lg:rounded-2xl lg:mr-8 lg:mb-8 w-full lg:w-80 px-5 pt-5 pb-8 shadow-2xl">

        <div className="flex items-center justify-between mb-5">
          <h3 className="text-sm font-medium text-[var(--ww-text)]" style={{ fontFamily: 'Playfair Display, serif' }}>
            Preferências de leitura
          </h3>
          <button onClick={onClose} className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-[var(--ww-accent)]/10 transition-colors">
            <X size={14} className="text-[var(--ww-muted)]" />
          </button>
        </div>

        {/* Background */}
        <div className="mb-4">
          <p className="text-[10px] text-[var(--ww-muted)] uppercase tracking-wider mb-2">Fundo</p>
          <div className="flex gap-2">
            {BG_OPTIONS.map(opt => (
              <button
                key={opt.value}
                onClick={() => set('bg', opt.value)}
                className="flex-1 flex flex-col items-center gap-1.5 py-2 rounded-xl border transition-all"
                style={{
                  borderColor: prefs.bg === opt.value ? '#c8a96e' : 'rgba(200,169,110,0.15)',
                  backgroundColor: prefs.bg === opt.value ? 'rgba(200,169,110,0.08)' : 'transparent',
                }}
              >
                <div className="w-8 h-5 rounded border border-white/20" style={{ backgroundColor: opt.swatch }} />
                <span className="text-[10px] text-[var(--ww-muted)]">{opt.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Font size */}
        <div className="mb-4">
          <p className="text-[10px] text-[var(--ww-muted)] uppercase tracking-wider mb-2">Tamanho da fonte</p>
          <div className="flex gap-1.5">
            {SIZE_OPTIONS.map((opt, i) => (
              <button
                key={opt.value}
                onClick={() => set('fontSize', opt.value)}
                className="flex-1 flex items-center justify-center py-2 rounded-lg border transition-all"
                style={{
                  fontSize: ['12px', '14px', '16px', '19px'][i],
                  fontFamily: prefs.serif ? 'Georgia, serif' : 'system-ui, sans-serif',
                  borderColor: prefs.fontSize === opt.value ? '#c8a96e' : 'rgba(200,169,110,0.15)',
                  color: prefs.fontSize === opt.value ? '#c8a96e' : 'var(--ww-muted)',
                  backgroundColor: prefs.fontSize === opt.value ? 'rgba(200,169,110,0.08)' : 'transparent',
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Line spacing */}
        <div className="mb-4">
          <p className="text-[10px] text-[var(--ww-muted)] uppercase tracking-wider mb-2">Espaçamento</p>
          <div className="flex gap-1.5">
            {SPACING_OPTIONS.map(opt => (
              <button
                key={opt.value}
                onClick={() => set('lineSpacing', opt.value)}
                className="flex-1 py-2 rounded-lg border text-[11px] transition-all"
                style={{
                  borderColor: prefs.lineSpacing === opt.value ? '#c8a96e' : 'rgba(200,169,110,0.15)',
                  color: prefs.lineSpacing === opt.value ? '#c8a96e' : 'var(--ww-muted)',
                  backgroundColor: prefs.lineSpacing === opt.value ? 'rgba(200,169,110,0.08)' : 'transparent',
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Font family */}
        <div className="mb-5">
          <p className="text-[10px] text-[var(--ww-muted)] uppercase tracking-wider mb-2">Fonte</p>
          <div className="flex gap-1.5">
            {[
              { label: 'Serif', value: true,  style: 'Georgia, serif'          },
              { label: 'Sans',  value: false, style: 'system-ui, sans-serif'   },
            ].map(opt => (
              <button
                key={String(opt.value)}
                onClick={() => set('serif', opt.value)}
                className="flex-1 py-2 rounded-lg border text-[12px] transition-all"
                style={{
                  fontFamily: opt.style,
                  borderColor: prefs.serif === opt.value ? '#c8a96e' : 'rgba(200,169,110,0.15)',
                  color: prefs.serif === opt.value ? '#c8a96e' : 'var(--ww-muted)',
                  backgroundColor: prefs.serif === opt.value ? 'rgba(200,169,110,0.08)' : 'transparent',
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Global theme toggle */}
        <button
          onClick={toggle}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-[var(--ww-accent)]/20 text-[var(--ww-muted)] hover:border-[var(--ww-accent)]/40 hover:text-[var(--ww-accent)] transition-all text-sm"
        >
          {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
          {theme === 'dark' ? 'Mudar para tema claro' : 'Mudar para tema escuro'}
        </button>
      </div>
    </div>
  )
}

// ─── Line comment thread ──────────────────────────────────────────────────────

function LineCommentThread({
  storyId, chapterNumber, lineIndex, bgStyle, onClose,
}: {
  storyId: string; chapterNumber: number; lineIndex: number
  bgStyle: typeof BG_STYLE[ReadingBg]; onClose: () => void
}) {
  const { user } = useAuth()
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading]   = useState(true)
  const [text, setText]         = useState('')
  const [sending, setSending]   = useState(false)

  useEffect(() => {
    commentsService.getLineComments(storyId, chapterNumber, lineIndex)
      .then(setComments)
      .finally(() => setLoading(false))
  }, [storyId, chapterNumber, lineIndex])

  const handleSend = async () => {
    if (!text.trim() || !user) return
    setSending(true)
    const c = await commentsService.addComment({
      content: text.trim(),
      level: 'line',
      storyId,
      chapterNumber,
      lineIndex,
      authorName: user.display_name ?? user.username,
      authorUsername: user.username,
    })
    setComments(p => [...p, c])
    setText('')
    setSending(false)
  }

  return (
    <div
      className="mt-2 mb-3 rounded-xl p-3 border"
      style={{ backgroundColor: `${bgStyle.bg}cc`, borderColor: bgStyle.border }}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] uppercase tracking-wider" style={{ color: bgStyle.textMuted }}>
          Comentários neste trecho
        </span>
        <button onClick={onClose}>
          <X size={12} style={{ color: bgStyle.textMuted }} />
        </button>
      </div>

      {loading ? (
        <p className="text-[11px] py-1" style={{ color: bgStyle.textMuted }}>Carregando...</p>
      ) : comments.length === 0 ? (
        <p className="text-[11px] py-1" style={{ color: bgStyle.textMuted }}>Nenhum comentário ainda. Seja o primeiro!</p>
      ) : (
        <div className="space-y-2 mb-2">
          {comments.map(c => (
            <div key={c.id} className="flex gap-2">
              <span className="text-[11px] font-medium shrink-0" style={{ color: '#c8a96e' }}>@{c.authorUsername}</span>
              <p className="text-[11px]" style={{ color: bgStyle.text }}>{c.content}</p>
            </div>
          ))}
        </div>
      )}

      <div className="flex gap-2 mt-2">
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && !e.shiftKey && handleSend()}
          placeholder="Comentar neste trecho..."
          className="flex-1 bg-transparent outline-none text-[12px] border-b"
          style={{ color: bgStyle.text, borderColor: bgStyle.border, caretColor: '#c8a96e' }}
        />
        <button
          onClick={handleSend}
          disabled={!text.trim() || sending}
          className="disabled:opacity-40 transition-opacity"
        >
          <Send size={13} style={{ color: '#c8a96e' }} />
        </button>
      </div>
    </div>
  )
}

// ─── Chapter comment section ──────────────────────────────────────────────────

function ChapterComments({
  storyId, chapterNumber, bgStyle,
}: {
  storyId: string; chapterNumber: number
  bgStyle: typeof BG_STYLE[ReadingBg]
}) {
  const { user } = useAuth()
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading]   = useState(true)
  const [text, setText]         = useState('')
  const [sending, setSending]   = useState(false)
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    commentsService.getChapterComments(storyId, chapterNumber)
      .then(c => { setComments(c); if (c.length > 0) setExpanded(true) })
      .finally(() => setLoading(false))
  }, [storyId, chapterNumber])

  const handleSend = async () => {
    if (!text.trim() || !user) return
    setSending(true)
    const c = await commentsService.addComment({
      content: text.trim(),
      level: 'chapter',
      storyId,
      chapterNumber,
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
    <div className="mt-6">
      <button
        onClick={() => setExpanded(v => !v)}
        className="flex items-center gap-2 mb-3 text-[11px] uppercase tracking-wider transition-opacity hover:opacity-80"
        style={{ color: '#c8a96e' }}
      >
        <MessageCircle size={13} />
        {loading ? 'Carregando...' : `${comments.length} comentário${comments.length !== 1 ? 's' : ''} do capítulo`}
      </button>

      {expanded && (
        <>
          {comments.length > 0 && (
            <div className="space-y-3 mb-4">
              {comments.map(c => (
                <div key={c.id} className="flex gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#c8a96e]/15 flex items-center justify-center shrink-0">
                    <span className="text-[10px] font-bold text-[#c8a96e]">
                      {c.authorName.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-baseline gap-2 mb-0.5">
                      <span className="text-[11px] font-medium" style={{ color: '#c8a96e' }}>@{c.authorUsername}</span>
                      <span className="text-[10px]" style={{ color: bgStyle.textMuted }}>
                        {new Date(c.createdAt).toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' })}
                      </span>
                    </div>
                    <p className="text-[13px] leading-relaxed" style={{ color: bgStyle.text }}>{c.content}</p>
                    <button
                      onClick={() => handleLike(c.id)}
                      className="flex items-center gap-1 mt-1 text-[10px] transition-colors"
                      style={{ color: c.isLiked ? '#e8635a' : bgStyle.textMuted }}
                    >
                      <Heart size={10} className={c.isLiked ? 'fill-[#e8635a]' : ''} />
                      {c.likes}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div
            className="flex gap-2 p-3 rounded-xl border"
            style={{ borderColor: bgStyle.border, backgroundColor: `${bgStyle.bg}80` }}
          >
            <input
              value={text}
              onChange={e => setText(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && !e.shiftKey && handleSend()}
              placeholder="Deixe um comentário sobre este capítulo..."
              className="flex-1 bg-transparent outline-none text-[13px]"
              style={{ color: bgStyle.text, caretColor: '#c8a96e' }}
            />
            <button
              onClick={handleSend}
              disabled={!text.trim() || sending}
              className="disabled:opacity-40 transition-opacity"
            >
              <Send size={14} style={{ color: '#c8a96e' }} />
            </button>
          </div>
        </>
      )}
    </div>
  )
}

// ─── Main screen ──────────────────────────────────────────────────────────────

export function ChapterReader() {
  const navigate = useNavigate()
  const { storyId, chapterNum } = useParams<{ storyId: string; chapterNum: string }>()
  const [chapter, setChapter]     = useState<StoryChapter | null>(null)
  const [loading, setLoading]     = useState(true)
  const [kudosGiven, setKudosGiven] = useState(false)
  const [showToc, setShowToc]     = useState(false)
  const [showPrefs, setShowPrefs] = useState(false)
  const [story, setStory]         = useState<import('../types').Story | null>(null)
  const [openLineIdx, setOpenLineIdx] = useState<number | null>(null)
  const [lineCounts, setLineCounts]   = useState<Record<number, number>>({})
  const topRef = useRef<HTMLDivElement>(null)

  const { prefs } = useReadingPrefs()
  const bgStyle   = BG_STYLE[prefs.bg]

  useEffect(() => {
    if (!storyId || !chapterNum) return
    setLoading(true)
    setKudosGiven(false)
    setOpenLineIdx(null)
    topRef.current?.scrollIntoView()

    storiesService.getChapter(storyId, Number(chapterNum))
      .then(ch => {
        setChapter(ch)
        if (ch) {
          storiesService.getById(ch.storyId).then(setStory)
          commentsService.getLineCommentCounts(storyId, Number(chapterNum)).then(setLineCounts)
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [storyId, chapterNum])

  const goToChapter = (num: number) => {
    navigate(ROUTES.chapterReader(storyId!, num))
    window.scrollTo({ top: 0 })
  }

  const accentColor = '#c8a96e'

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: bgStyle.bg }}>
        <div className="w-10 h-10 rounded-full border-2 animate-spin" style={{ borderColor: `${accentColor}30`, borderTopColor: accentColor }} />
      </div>
    )
  }

  if (!chapter) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: bgStyle.bg, color: bgStyle.textMuted }}>
        <p>Capítulo não encontrado.</p>
      </div>
    )
  }

  const wordCount = chapter.wordCount
  const readMins  = Math.ceil(wordCount / 200)
  const bodyFont  = prefs.serif ? 'Georgia, "Times New Roman", serif' : 'system-ui, -apple-system, sans-serif'

  const paragraphs = chapter.content.split('\n\n').filter(p => p.trim())

  return (
    <div className="min-h-screen text-white" style={{ backgroundColor: bgStyle.bg }} ref={topRef}>
      <ReadingProgress color={accentColor} />

      {/* Top nav */}
      <header
        className="sticky top-0 backdrop-blur-sm border-b px-4 lg:px-8 py-3 z-40 flex items-center gap-3"
        style={{ backgroundColor: bgStyle.headerBg, borderColor: bgStyle.border }}
      >
        <button
          onClick={() => navigate(ROUTES.storyDetails(chapter.storyId))}
          className="flex items-center gap-1.5 transition-colors flex-shrink-0 hover:opacity-80"
          style={{ color: bgStyle.textMuted }}
        >
          <ChevronLeft size={16} />
          <span className="text-xs hidden sm:inline truncate max-w-[160px]">{chapter.story.title}</span>
        </button>

        <div className="flex-1 text-center">
          <p className="text-xs" style={{ color: bgStyle.textMuted }}>
            Capítulo {chapter.chapterNumber} de {chapter.story.chaptersCount}
          </p>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setShowPrefs(v => !v)}
            className="w-8 h-8 flex items-center justify-center rounded-full transition-colors hover:opacity-80"
            style={{ color: bgStyle.textMuted }}
            title="Preferências de leitura"
          >
            <Settings2 size={15} />
          </button>
          <button
            onClick={() => setShowToc(v => !v)}
            className="w-8 h-8 flex items-center justify-center rounded-full transition-colors hover:opacity-80"
            style={{ color: bgStyle.textMuted }}
            title="Índice"
          >
            <List size={16} />
          </button>
        </div>
      </header>

      {/* Table of contents drawer */}
      {showToc && story && (
        <div className="fixed inset-0 z-50 flex">
          <div className="flex-1 bg-black/60 backdrop-blur-sm" onClick={() => setShowToc(false)} />
          <aside className="w-72 bg-[var(--ww-bg-raised)] border-l border-[var(--ww-accent)]/20 flex flex-col overflow-y-auto">
            <div className="px-5 py-4 border-b border-[var(--ww-accent)]/15 flex items-center justify-between">
              <h2 className="text-sm font-medium text-[var(--ww-text)]" style={{ fontFamily: 'Playfair Display, serif' }}>
                Capítulos
              </h2>
              <button onClick={() => setShowToc(false)} className="text-[var(--ww-muted)] hover:text-[var(--ww-text)] transition-colors">✕</button>
            </div>
            <div className="flex-1 px-2 py-3 space-y-0.5">
              {story.chapters.map(ch => (
                <button
                  key={ch.id}
                  onClick={() => { goToChapter(ch.chapterNumber); setShowToc(false) }}
                  className={`w-full flex items-start gap-3 px-3 py-2.5 rounded-lg text-left transition-all ${
                    ch.chapterNumber === chapter.chapterNumber
                      ? 'bg-[var(--ww-accent)]/15 text-[var(--ww-accent)]'
                      : 'text-[var(--ww-muted)] hover:bg-[var(--ww-accent)]/5 hover:text-[var(--ww-text)]'
                  }`}
                >
                  <span className="text-[10px] mt-0.5 w-4 flex-shrink-0 opacity-60">{ch.chapterNumber}.</span>
                  <span className="text-xs leading-snug">{ch.title}</span>
                </button>
              ))}
            </div>
          </aside>
        </div>
      )}

      {/* Reading preferences panel */}
      {showPrefs && <PrefsPanel onClose={() => setShowPrefs(false)} />}

      {/* Chapter content */}
      <article className="max-w-[680px] mx-auto px-6 lg:px-8 py-10">

        {/* Chapter header */}
        <div className="mb-10 pb-6" style={{ borderBottom: `1px solid ${bgStyle.border}` }}>
          <p className="text-xs uppercase tracking-widest mb-2" style={{ color: accentColor }}>
            Capítulo {chapter.chapterNumber}
          </p>
          <h1
            className="text-2xl lg:text-3xl leading-snug mb-4"
            style={{ fontFamily: 'Playfair Display, serif', color: bgStyle.text }}
          >
            {chapter.title}
          </h1>
          <div className="flex items-center gap-4 text-xs" style={{ color: bgStyle.textMuted }}>
            <span className="flex items-center gap-1">
              <BookOpen size={12} />
              {wordCount.toLocaleString('pt-BR')} palavras
            </span>
            <span>~{readMins} min de leitura</span>
            <span className="ml-auto">
              {new Date(chapter.publishedAt).toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
          </div>
        </div>

        {/* Body with line comments */}
        <div className="space-y-1">
          {paragraphs.map((para, i) => {
            const isItalic = para.startsWith('*') && para.endsWith('*')
            const text     = isItalic ? para.slice(1, -1) : para
            const count    = lineCounts[i] ?? 0
            const isOpen   = openLineIdx === i

            return (
              <div key={i} className="group relative">
                <div className="flex items-start gap-2">
                  <p
                    className={`flex-1 ${isItalic ? 'italic' : ''}`}
                    style={{
                      fontFamily: bodyFont,
                      fontSize: FONT_SIZE[prefs.fontSize],
                      lineHeight: LINE_SPACING[prefs.lineSpacing],
                      color: bgStyle.text,
                      paddingTop: '0.3em',
                      paddingBottom: '0.3em',
                    }}
                  >
                    {text}
                  </p>
                  <button
                    onClick={() => setOpenLineIdx(isOpen ? null : i)}
                    className="opacity-0 group-hover:opacity-100 flex-shrink-0 flex items-center gap-0.5 pt-2 transition-opacity"
                    style={{ color: count > 0 ? accentColor : bgStyle.textMuted }}
                    title="Comentar neste trecho"
                  >
                    <MessageCircle size={13} />
                    {count > 0 && <span className="text-[10px]">{count}</span>}
                  </button>
                </div>

                {isOpen && (
                  <LineCommentThread
                    storyId={chapter.storyId}
                    chapterNumber={chapter.chapterNumber}
                    lineIndex={i}
                    bgStyle={bgStyle}
                    onClose={() => setOpenLineIdx(null)}
                  />
                )}
              </div>
            )
          })}
        </div>

        {/* End of chapter actions */}
        <div className="mt-14 pt-8 space-y-6" style={{ borderTop: `1px solid ${bgStyle.border}` }}>

          {/* Kudos */}
          <div className="text-center space-y-2">
            <button
              onClick={() => setKudosGiven(true)}
              disabled={kudosGiven}
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full border transition-all"
              style={{
                borderColor: kudosGiven ? 'rgba(232,99,90,0.5)' : bgStyle.border,
                color: kudosGiven ? '#e8635a' : bgStyle.textMuted,
                backgroundColor: kudosGiven ? 'rgba(232,99,90,0.1)' : 'transparent',
                cursor: kudosGiven ? 'default' : 'pointer',
              }}
            >
              <Heart size={16} className={kudosGiven ? 'fill-[#e8635a]' : ''} />
              <span className="text-sm font-medium">{kudosGiven ? 'Kudos enviado!' : 'Deixar Kudos'}</span>
            </button>
            {kudosGiven && (
              <p className="text-xs" style={{ color: bgStyle.textMuted }}>Obrigado por apoiar a autora ✦</p>
            )}
          </div>

          {/* Chapter comments */}
          <ChapterComments
            storyId={chapter.storyId}
            chapterNumber={chapter.chapterNumber}
            bgStyle={bgStyle}
          />

          {/* Navigation */}
          <div className="flex gap-3">
            <ChapterNavBtn
              direction="prev"
              label="Capítulo anterior"
              sublabel={chapter.prevChapter?.title ?? '—'}
              disabled={!chapter.prevChapter}
              onClick={() => chapter.prevChapter && goToChapter(chapter.prevChapter.chapterNumber)}
              color={accentColor}
              border={bgStyle.border}
            />
            <ChapterNavBtn
              direction="next"
              label="Próximo capítulo"
              sublabel={chapter.nextChapter?.title ?? 'Fim da história'}
              disabled={!chapter.nextChapter}
              onClick={() => chapter.nextChapter && goToChapter(chapter.nextChapter.chapterNumber)}
              color={accentColor}
              border={bgStyle.border}
            />
          </div>

          {/* Back to story */}
          <button
            onClick={() => navigate(ROUTES.storyDetails(chapter.storyId))}
            className="w-full flex items-center justify-center gap-2 py-2.5 transition-colors text-sm hover:opacity-80"
            style={{ color: bgStyle.textMuted }}
          >
            <ArrowLeft size={14} />
            Voltar para a história
          </button>
        </div>
      </article>
    </div>
  )
}
