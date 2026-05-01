import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Check, Clock, BookOpen } from 'lucide-react'
import { storiesService } from '../services'
import type { Story } from '../types'
import { ROUTES } from '../constants'

// ─── Word / reading stats ─────────────────────────────────────────────────────

function countWords(text: string) {
  return text.trim().split(/\s+/).filter(Boolean).length
}

function Stats({ content }: { content: string }) {
  const words = countWords(content)
  const mins  = Math.max(1, Math.ceil(words / 200))
  return (
    <div className="flex items-center gap-4 text-xs text-[#8a7e6e]">
      <span className="flex items-center gap-1.5">
        <BookOpen size={12} />
        {words.toLocaleString('pt-BR')} palavras
      </span>
      <span className="flex items-center gap-1.5">
        <Clock size={12} />
        ~{mins} min de leitura
      </span>
    </div>
  )
}

// ─── Auto-resizing textarea ───────────────────────────────────────────────────

function AutoTextarea({
  value,
  onChange,
  placeholder,
  className,
}: {
  value: string
  onChange: (v: string) => void
  placeholder?: string
  className?: string
}) {
  const ref = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (!ref.current) return
    ref.current.style.height = 'auto'
    ref.current.style.height = `${ref.current.scrollHeight}px`
  }, [value])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault()
      const el    = e.currentTarget
      const start = el.selectionStart
      const end   = el.selectionEnd
      const next  = value.substring(0, start) + '  ' + value.substring(end)
      onChange(next)
      requestAnimationFrame(() => {
        el.selectionStart = el.selectionEnd = start + 2
      })
    }
  }

  return (
    <textarea
      ref={ref}
      value={value}
      onChange={e => onChange(e.target.value)}
      onKeyDown={handleKeyDown}
      placeholder={placeholder}
      className={className}
      rows={1}
    />
  )
}

// ─── Save status indicator ────────────────────────────────────────────────────

type SaveStatus = 'idle' | 'saving' | 'saved' | 'error'

function SaveIndicator({ status }: { status: SaveStatus }) {
  if (status === 'idle')   return null
  if (status === 'saving') return <span className="text-xs text-[#8a7e6e] animate-pulse">Salvando...</span>
  if (status === 'saved')  return (
    <span className="flex items-center gap-1 text-xs text-[#7c9e7a]">
      <Check size={11} />
      Salvo
    </span>
  )
  return <span className="text-xs text-[#e8635a]">Erro ao salvar</span>
}

// ─── Main screen ──────────────────────────────────────────────────────────────

export function ChapterEditor() {
  const navigate     = useNavigate()
  const { storyId, chapterNum } = useParams<{ storyId: string; chapterNum: string }>()
  const isEdit       = Boolean(chapterNum)
  const chapterNumber = chapterNum ? Number(chapterNum) : null

  const [story, setStory]           = useState<Story | null>(null)
  const [title, setTitle]           = useState('')
  const [content, setContent]       = useState('')
  const [loading, setLoading]       = useState(true)
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle')
  const [publishing, setPublishing] = useState(false)

  const autoSaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (!storyId) return
    const loadStory = storiesService.getById(storyId)
    const loadChapter = isEdit && chapterNumber
      ? storiesService.getChapterForEditing(storyId, chapterNumber)
      : Promise.resolve(null)

    Promise.all([loadStory, loadChapter])
      .then(([s, ch]) => {
        setStory(s)
        if (ch) { setTitle(ch.title); setContent(ch.content) }
      })
      .finally(() => setLoading(false))
  }, [storyId, isEdit, chapterNumber])

  const autoSave = useCallback(() => {
    if (!storyId || !title.trim() || !content.trim()) return
    if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current)
    autoSaveTimer.current = setTimeout(async () => {
      setSaveStatus('saving')
      try {
        if (isEdit && chapterNumber) {
          await storiesService.updateChapter(storyId, chapterNumber, { title, content })
        } else {
          await storiesService.createChapter(storyId, { title, content })
        }
        setSaveStatus('saved')
      } catch {
        setSaveStatus('error')
      }
    }, 2000)
  }, [storyId, title, content, isEdit, chapterNumber])

  useEffect(() => {
    if (title || content) {
      setSaveStatus('idle')
      autoSave()
    }
    return () => { if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current) }
  }, [title, content, autoSave])

  const handlePublish = async () => {
    if (!storyId || !title.trim()) return
    setPublishing(true)
    try {
      if (isEdit && chapterNumber) {
        await storiesService.updateChapter(storyId, chapterNumber, { title, content })
        navigate(ROUTES.storyDetails(storyId))
      } else {
        const ch = await storiesService.createChapter(storyId, { title, content })
        navigate(ROUTES.chapterReader(storyId, ch.chapterNumber))
      }
    } catch {
      setSaveStatus('error')
    } finally {
      setPublishing(false)
    }
  }

  const handleSaveDraft = async () => {
    if (!storyId || !title.trim()) return
    setSaveStatus('saving')
    try {
      if (isEdit && chapterNumber) {
        await storiesService.updateChapter(storyId, chapterNumber, { title, content })
      } else {
        await storiesService.createChapter(storyId, { title, content })
      }
      setSaveStatus('saved')
    } catch {
      setSaveStatus('error')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0807] flex items-center justify-center">
        <div className="w-10 h-10 rounded-full border-2 border-[#c8a96e]/30 border-t-[#c8a96e] animate-spin" />
      </div>
    )
  }

  const newChapterNumber = isEdit ? chapterNumber : (story?.chaptersCount ?? 0) + 1

  return (
    <div className="min-h-screen bg-[#0a0807] text-white flex flex-col">

      {/* Top bar */}
      <header className="sticky top-0 bg-[#0a0807]/95 backdrop-blur-sm border-b border-[#c8a96e]/20 px-4 lg:px-8 z-30 flex-shrink-0">
        <div className="flex items-center gap-3 h-14">
          <button
            onClick={() => navigate(storyId ? ROUTES.storyDetails(storyId) : ROUTES.myWorks)}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#c8a96e]/10 transition-colors flex-shrink-0"
          >
            <ArrowLeft size={16} className="text-[#c8a96e]" />
          </button>

          <div className="flex-1 min-w-0">
            <p className="text-xs text-[#8a7e6e] truncate">
              {story?.title ?? 'Carregando...'} · Capítulo {newChapterNumber}
            </p>
          </div>

          <SaveIndicator status={saveStatus} />

          <div className="flex items-center gap-2 ml-2">
            <button
              onClick={handleSaveDraft}
              disabled={!title.trim()}
              className="px-3 py-1.5 text-xs border border-[#c8a96e]/25 text-[#8a7e6e] rounded-lg hover:border-[#c8a96e]/50 hover:text-[#e8d4a8] disabled:opacity-40 transition-all"
            >
              Rascunho
            </button>
            <button
              onClick={handlePublish}
              disabled={!title.trim() || publishing}
              className="px-4 py-1.5 text-xs bg-gradient-to-r from-[#c8a96e] to-[#e8d4a8] text-[#1a1210] rounded-lg font-medium disabled:opacity-40 hover:opacity-90 transition-opacity"
            >
              {publishing ? 'Publicando...' : 'Publicar'}
            </button>
          </div>
        </div>
      </header>

      {/* Editor area */}
      <main className="flex-1 max-w-[720px] w-full mx-auto px-6 lg:px-8 py-8 flex flex-col gap-6">

        {/* Chapter label */}
        <p className="text-xs text-[#c8a96e] uppercase tracking-widest">
          Capítulo {newChapterNumber}
        </p>

        {/* Chapter title */}
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Título do capítulo"
          className="w-full bg-transparent border-none outline-none text-2xl lg:text-3xl text-[#e8d4a8] placeholder:text-[#8a7e6e]/50 leading-snug"
          style={{ fontFamily: 'Playfair Display, serif' }}
        />

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-[#c8a96e]/15" />
          <Stats content={content} />
          <div className="flex-1 h-px bg-[#c8a96e]/15" />
        </div>

        {/* Content textarea */}
        <AutoTextarea
          value={content}
          onChange={setContent}
          placeholder={`Comece a escrever o capítulo aqui...\n\nDica: pressione Enter duas vezes para criar um novo parágrafo. Use Tab para recuar o texto.`}
          className="w-full bg-transparent border-none outline-none text-[15px] text-[#e8d4a8]/90 leading-[1.9] placeholder:text-[#8a7e6e]/40 resize-none min-h-[60vh]"
          // @ts-ignore
          style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
        />

        {/* Bottom bar */}
        <div className="border-t border-[#c8a96e]/15 pt-6 flex flex-col gap-4">
          <Stats content={content} />

          <div className="flex gap-3">
            <button
              onClick={handleSaveDraft}
              disabled={!title.trim()}
              className="flex-1 py-3 border border-[#c8a96e]/25 text-[#8a7e6e] text-sm rounded-xl hover:border-[#c8a96e]/50 hover:text-[#e8d4a8] disabled:opacity-40 transition-all"
            >
              Salvar rascunho
            </button>
            <button
              onClick={handlePublish}
              disabled={!title.trim() || publishing}
              className="flex-1 py-3 bg-gradient-to-r from-[#c8a96e] to-[#e8d4a8] text-[#1a1210] text-sm font-medium rounded-xl disabled:opacity-40 hover:opacity-90 transition-opacity"
            >
              {publishing
                ? 'Publicando...'
                : isEdit
                  ? 'Salvar e voltar'
                  : `Publicar capítulo ${newChapterNumber}`
              }
            </button>
          </div>

          {!title.trim() && (
            <p className="text-xs text-[#8a7e6e] text-center">
              Adicione um título para habilitar o salvamento.
            </p>
          )}
        </div>
      </main>
    </div>
  )
}
