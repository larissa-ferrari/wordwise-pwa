import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Plus, X, Check, ChevronDown } from 'lucide-react'
import { storiesService } from '../services'
import type { StoryFormData } from '../services'
import type { StoryRating, StoryStatus, StoryCategory, StoryWarning, TagType } from '../types'
import { ROUTES, STORY_RATINGS, STORY_STATUS, STORY_WARNINGS, COVER_GRADIENTS, TAG_COLORS } from '../constants'
import { useAuth } from '../context/AuthContext'

// ─── Cover picker ─────────────────────────────────────────────────────────────

function CoverPicker({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="block text-xs text-[#8a7e6e] uppercase tracking-wider mb-2">Capa</label>
      <div className="grid grid-cols-6 gap-2">
        {COVER_GRADIENTS.map(g => (
          <button
            key={g}
            type="button"
            onClick={() => onChange(g)}
            className={`aspect-[2/3] rounded-lg bg-gradient-to-br ${g} transition-all ${
              value === g ? 'ring-2 ring-[#c8a96e] ring-offset-2 ring-offset-[#0a0807] scale-105' : 'hover:scale-105 opacity-70 hover:opacity-100'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

// ─── Toggle group ─────────────────────────────────────────────────────────────

function ToggleGroup<T extends string>({
  label, options, value, onChange,
}: {
  label: string
  options: { value: T; label: string; color?: string; bg?: string }[]
  value: T
  onChange: (v: T) => void
}) {
  return (
    <div>
      <label className="block text-xs text-[#8a7e6e] uppercase tracking-wider mb-2">{label}</label>
      <div className="flex flex-wrap gap-2">
        {options.map(opt => {
          const active = value === opt.value
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange(opt.value)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                active
                  ? 'border-[#c8a96e] bg-[#c8a96e]/15 text-[#c8a96e]'
                  : 'border-[#c8a96e]/20 text-[#8a7e6e] hover:border-[#c8a96e]/40 hover:text-[#e8d4a8]'
              }`}
              style={active && opt.color ? {
                borderColor: `${opt.color}80`,
                backgroundColor: opt.bg ?? `${opt.color}15`,
                color: opt.color,
              } : undefined}
            >
              {opt.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ─── Warnings checkboxes ──────────────────────────────────────────────────────

const WARNING_OPTIONS: StoryWarning[] = ['violence', 'character_death', 'non_con', 'underage', 'no_warnings', 'choose_not_to_warn']

function WarningsPicker({ value, onChange }: { value: StoryWarning[]; onChange: (v: StoryWarning[]) => void }) {
  const toggle = (w: StoryWarning) => {
    onChange(value.includes(w) ? value.filter(x => x !== w) : [...value, w])
  }
  return (
    <div>
      <label className="block text-xs text-[#8a7e6e] uppercase tracking-wider mb-2">Avisos</label>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
        {WARNING_OPTIONS.map(w => {
          const active = value.includes(w)
          return (
            <button
              key={w}
              type="button"
              onClick={() => toggle(w)}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-left border transition-all ${
                active
                  ? 'border-[#c8a96e]/50 bg-[#c8a96e]/10 text-[#e8d4a8]'
                  : 'border-[#c8a96e]/15 text-[#8a7e6e] hover:border-[#c8a96e]/30'
              }`}
            >
              <span className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 transition-all ${active ? 'bg-[#c8a96e] border-[#c8a96e]' : 'border-[#8a7e6e]/40'}`}>
                {active && <Check size={10} className="text-[#1a1210]" />}
              </span>
              {STORY_WARNINGS[w]}
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ─── Tag input ────────────────────────────────────────────────────────────────

type TagDraft = { name: string; type: TagType }

const TAG_SECTIONS: { type: TagType; label: string; placeholder: string }[] = [
  { type: 'fandom',       label: 'Fandom / Universo',   placeholder: 'ex: Ficção Original, Harry Potter...' },
  { type: 'relationship', label: 'Relacionamentos',      placeholder: 'ex: Harry/Ginny, Hermione & Ron...'  },
  { type: 'character',    label: 'Personagens',          placeholder: 'ex: Hermione Granger...'             },
  { type: 'freeform',     label: 'Tags Adicionais',      placeholder: 'ex: Slow Burn, Magia...'             },
]

function TagSection({
  section, tags, onAdd, onRemove,
}: {
  section: typeof TAG_SECTIONS[number]
  tags: TagDraft[]
  onAdd: (t: TagDraft) => void
  onRemove: (name: string, type: TagType) => void
}) {
  const [input, setInput] = useState('')
  const color = TAG_COLORS[section.type]

  const add = () => {
    const name = input.trim()
    if (!name) return
    onAdd({ name, type: section.type })
    setInput('')
  }

  return (
    <div>
      <label className="block text-xs uppercase tracking-wider mb-1.5" style={{ color }}>
        {section.label}
      </label>
      <div className="flex gap-2 mb-2">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); add() } }}
          placeholder={section.placeholder}
          className="flex-1 bg-[#1a1210] border border-[#c8a96e]/20 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#c8a96e]/50 transition-colors placeholder:text-[#8a7e6e]/50"
        />
        <button
          type="button"
          onClick={add}
          className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#c8a96e]/20 hover:bg-[#c8a96e]/10 transition-colors flex-shrink-0"
        >
          <Plus size={14} className="text-[#c8a96e]" />
        </button>
      </div>
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {tags.map(t => (
            <span
              key={t.name}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] border"
              style={{ color, borderColor: `${color}40`, backgroundColor: `${color}12` }}
            >
              {t.name}
              <button type="button" onClick={() => onRemove(t.name, t.type)} className="opacity-60 hover:opacity-100 transition-opacity">
                <X size={10} />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Live preview card ────────────────────────────────────────────────────────

function PreviewCard({ form }: { form: StoryFormData }) {
  const ratingCfg = STORY_RATINGS[form.rating]
  const statusCfg = STORY_STATUS[form.status]
  return (
    <div className="p-4 bg-[#1a1210]/50 border border-[#c8a96e]/20 rounded-2xl space-y-3">
      <p className="text-[10px] text-[#8a7e6e] uppercase tracking-wider">Pré-visualização</p>
      <div className="flex gap-3">
        <div className={`w-14 h-20 rounded-lg flex-shrink-0 bg-gradient-to-br ${form.coverGradient} shadow-md`} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-1">
            <span
              className="inline-flex items-center justify-center w-5 h-5 rounded text-[10px] font-bold border flex-shrink-0"
              style={{ color: ratingCfg.color, borderColor: `${ratingCfg.color}50`, backgroundColor: ratingCfg.bg }}
            >
              {ratingCfg.label}
            </span>
            <h3 className="text-xs font-medium line-clamp-2 leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
              {form.title || 'Título da história'}
            </h3>
          </div>
          <p className="text-[10px] text-[#8a7e6e] mb-1.5">
            <span style={{ color: statusCfg.color }}>{statusCfg.label}</span>
            {' · '}
            <span className="uppercase">{form.category}</span>
          </p>
          <p className="text-[10px] text-[#e8d4a8]/60 line-clamp-3 leading-relaxed">
            {form.summary || 'Sinopse da história...'}
          </p>
        </div>
      </div>
      {form.tags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {form.tags.slice(0, 6).map((t, i) => {
            const c = TAG_COLORS[t.type]
            return (
              <span key={i} className="inline-flex px-2 py-0.5 rounded-full text-[10px] border" style={{ color: c, borderColor: `${c}40`, backgroundColor: `${c}10` }}>
                {t.name}
              </span>
            )
          })}
          {form.tags.length > 6 && <span className="text-[10px] text-[#8a7e6e]">+{form.tags.length - 6}</span>}
        </div>
      )}
    </div>
  )
}

// ─── Collapsible section ──────────────────────────────────────────────────────

function Section({ title, children, defaultOpen = true }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border border-[#c8a96e]/15 rounded-xl overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-[#c8a96e]/5 transition-colors"
      >
        <span className="text-xs font-medium text-[#8a7e6e] uppercase tracking-wider">{title}</span>
        <ChevronDown size={14} className={`text-[#8a7e6e] transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && <div className="px-4 pb-4 pt-1 space-y-4">{children}</div>}
    </div>
  )
}

// ─── Options ──────────────────────────────────────────────────────────────────

const RATING_OPTS = (Object.entries(STORY_RATINGS) as [StoryRating, typeof STORY_RATINGS[StoryRating]][]).map(
  ([value, cfg]) => ({ value, label: `${cfg.label} — ${value.charAt(0).toUpperCase() + value.slice(1)}`, color: cfg.color, bg: cfg.bg })
)
const STATUS_OPTS = (Object.entries(STORY_STATUS) as [StoryStatus, typeof STORY_STATUS[StoryStatus]][]).map(
  ([value, cfg]) => ({ value, label: cfg.label, color: cfg.color })
)
const CATEGORY_OPTS: { value: StoryCategory; label: string }[] = [
  { value: 'gen',   label: 'Gen'   },
  { value: 'f/f',   label: 'F/F'   },
  { value: 'f/m',   label: 'F/M'   },
  { value: 'm/m',   label: 'M/M'   },
  { value: 'multi', label: 'Multi' },
  { value: 'other', label: 'Outro' },
]

// ─── Main screen ──────────────────────────────────────────────────────────────

const EMPTY_FORM: StoryFormData = {
  title: '',
  summary: '',
  coverGradient: COVER_GRADIENTS[0],
  rating: 'general',
  status: 'ongoing',
  category: 'gen',
  warnings: ['no_warnings'],
  tags: [],
}

export function StoryEditor() {
  const navigate          = useNavigate()
  const { storyId }       = useParams<{ storyId: string }>()
  const { user }          = useAuth()
  const isEdit            = Boolean(storyId)
  const [form, setForm]   = useState<StoryFormData>(EMPTY_FORM)
  const [saving, setSaving] = useState(false)
  const [error, setError]   = useState('')
  const titleRef            = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isEdit && storyId) {
      storiesService.getById(storyId).then(story => {
        if (!story) return
        setForm({
          title:         story.title,
          summary:       story.summary,
          coverGradient: story.coverGradient,
          rating:        story.rating,
          status:        story.status,
          category:      story.category,
          warnings:      story.warnings,
          tags:          story.tags.map(t => ({ name: t.name, type: t.type })),
        })
      })
    } else {
      setTimeout(() => titleRef.current?.focus(), 100)
    }
  }, [isEdit, storyId])

  const setField = <K extends keyof StoryFormData>(key: K, value: StoryFormData[K]) =>
    setForm(f => ({ ...f, [key]: value }))

  const addTag = (t: { name: string; type: TagType }) => {
    if (form.tags.some(x => x.name === t.name && x.type === t.type)) return
    setForm(f => ({ ...f, tags: [...f.tags, t] }))
  }

  const removeTag = (name: string, type: TagType) =>
    setForm(f => ({ ...f, tags: f.tags.filter(t => !(t.name === name && t.type === type)) }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.title.trim()) { setError('O título é obrigatório.'); return }
    if (!user) return
    setSaving(true)
    try {
      if (isEdit && storyId) {
        await storiesService.updateStory(storyId, form)
        navigate(ROUTES.storyDetails(storyId))
      } else {
        const story = await storiesService.createStory(
          { id: user.id, name: user.display_name, username: user.username, avatar: '' },
          form,
        )
        navigate(ROUTES.storyDetails(story.id))
      }
    } catch {
      setError('Erro ao salvar. Tente novamente.')
    } finally {
      setSaving(false)
    }
  }

  const tagsByType = (type: TagType) => form.tags.filter(t => t.type === type)

  return (
    <div className="min-h-screen bg-[#0a0807] text-white">

      {/* Header */}
      <header className="sticky top-0 bg-[#0a0807]/95 backdrop-blur-sm border-b border-[#c8a96e]/20 px-6 lg:px-8 py-4 z-30 flex items-center gap-3">
        <button
          type="button"
          onClick={() => navigate(isEdit && storyId ? ROUTES.storyDetails(storyId) : ROUTES.myWorks)}
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#c8a96e]/10 transition-colors flex-shrink-0"
        >
          <ArrowLeft size={18} className="text-[#c8a96e]" />
        </button>
        <h1 className="flex-1 text-lg" style={{ fontFamily: 'Playfair Display, serif' }}>
          {isEdit ? 'Editar história' : 'Nova história'}
        </h1>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={saving}
          className="px-5 py-2 bg-gradient-to-r from-[#c8a96e] to-[#e8d4a8] text-[#1a1210] rounded-xl font-medium text-sm hover:opacity-90 disabled:opacity-50 transition-opacity"
        >
          {saving ? 'Salvando...' : isEdit ? 'Salvar' : 'Criar história'}
        </button>
      </header>

      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto px-6 lg:px-8 py-6">
        <div className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-6">

          {/* Left: main form */}
          <div className="space-y-4">

            {/* Title */}
            <div>
              <label className="block text-xs text-[#8a7e6e] uppercase tracking-wider mb-1.5">
                Título <span className="text-[#e8635a]">*</span>
              </label>
              <input
                ref={titleRef}
                type="text"
                value={form.title}
                onChange={e => setField('title', e.target.value)}
                placeholder="Nome da sua história"
                className="w-full bg-[#1a1210] border border-[#c8a96e]/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#c8a96e] transition-colors"
                style={{ fontFamily: 'Playfair Display, serif' }}
              />
            </div>

            {/* Summary */}
            <div>
              <label className="block text-xs text-[#8a7e6e] uppercase tracking-wider mb-1.5">Sinopse</label>
              <textarea
                value={form.summary}
                onChange={e => setField('summary', e.target.value)}
                placeholder="Apresente a sua história em alguns parágrafos. Esse é o texto que aparece no browser."
                rows={4}
                className="w-full bg-[#1a1210] border border-[#c8a96e]/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#c8a96e] transition-colors resize-none leading-relaxed"
              />
            </div>

            {/* Metadata section */}
            <Section title="Classificação e categoria">
              <ToggleGroup
                label="Rating"
                options={RATING_OPTS}
                value={form.rating}
                onChange={v => setField('rating', v)}
              />
              <ToggleGroup
                label="Status"
                options={STATUS_OPTS}
                value={form.status}
                onChange={v => setField('status', v)}
              />
              <ToggleGroup
                label="Categoria"
                options={CATEGORY_OPTS}
                value={form.category}
                onChange={v => setField('category', v)}
              />
              <WarningsPicker value={form.warnings} onChange={v => setField('warnings', v)} />
            </Section>

            {/* Tags section */}
            <Section title="Tags" defaultOpen>
              {TAG_SECTIONS.map(sec => (
                <TagSection
                  key={sec.type}
                  section={sec}
                  tags={tagsByType(sec.type)}
                  onAdd={addTag}
                  onRemove={removeTag}
                />
              ))}
              <p className="text-[10px] text-[#8a7e6e] leading-relaxed pt-1">
                Pressione <kbd className="px-1 py-0.5 bg-[#c8a96e]/10 rounded text-[10px]">Enter</kbd> para adicionar cada tag.
                Tags de relacionamento usam o formato <span className="text-[#e8d4a8]">Personagem A/Personagem B</span>.
              </p>
            </Section>

            {/* Cover section */}
            <Section title="Capa">
              <CoverPicker value={form.coverGradient} onChange={v => setField('coverGradient', v)} />
            </Section>

            {/* Error */}
            {error && (
              <p className="text-sm text-[#e8635a] bg-[#e8635a]/10 border border-[#e8635a]/20 rounded-xl px-4 py-3">
                {error}
              </p>
            )}

            {/* Submit mobile */}
            <button
              type="submit"
              disabled={saving}
              className="lg:hidden w-full py-3.5 bg-gradient-to-r from-[#c8a96e] to-[#e8d4a8] text-[#1a1210] rounded-xl font-medium text-sm hover:opacity-90 disabled:opacity-50 transition-opacity"
            >
              {saving ? 'Salvando...' : isEdit ? 'Salvar alterações' : 'Criar história'}
            </button>
          </div>

          {/* Right: live preview (desktop) */}
          <div className="hidden lg:block">
            <div className="sticky top-[73px] space-y-4">
              <PreviewCard form={form} />
              <p className="text-[10px] text-[#8a7e6e] text-center leading-relaxed">
                Assim que você salvar, a história aparecerá no browser e em Meus Trabalhos.
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
