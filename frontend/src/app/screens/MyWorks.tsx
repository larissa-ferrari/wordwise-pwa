import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  PenLine, Plus, BookOpen, Heart, Eye,
  Edit3, Trash2, ChevronRight, BarChart2,
} from 'lucide-react'
import { storiesService } from '../services'
import type { Story } from '../types'
import { ROUTES, STORY_RATINGS, STORY_STATUS } from '../constants'
import { useAuth } from '../context/AuthContext'

// ─── Stat card ────────────────────────────────────────────────────────────────

function StatCard({ label, value, Icon, color }: { label: string; value: number | string; Icon: React.ElementType; color: string }) {
  return (
    <div className="flex flex-col items-center bg-[#1a1210]/50 border border-[#c8a96e]/15 rounded-xl p-4 gap-1">
      <Icon size={16} style={{ color }} />
      <span className="text-lg font-medium text-[#e8d4a8]">{value}</span>
      <span className="text-[10px] text-[#8a7e6e] uppercase tracking-wider">{label}</span>
    </div>
  )
}

// ─── Story row ────────────────────────────────────────────────────────────────

function StoryRow({ story, onDelete }: { story: Story; onDelete: (id: string) => void }) {
  const navigate   = useNavigate()
  const ratingCfg  = STORY_RATINGS[story.rating]
  const statusCfg  = STORY_STATUS[story.status]

  return (
    <div className="flex items-center gap-4 p-4 bg-[#1a1210]/50 border border-[#c8a96e]/15 rounded-2xl hover:border-[#c8a96e]/30 transition-colors">
      {/* Cover */}
      <div
        className={`w-12 h-18 rounded-lg flex-shrink-0 bg-gradient-to-br ${story.coverGradient} shadow-md cursor-pointer`}
        style={{ height: 72 }}
        onClick={() => navigate(ROUTES.storyDetails(story.id))}
      />

      {/* Info */}
      <div className="flex-1 min-w-0 cursor-pointer" onClick={() => navigate(ROUTES.storyDetails(story.id))}>
        <div className="flex items-center gap-2 mb-0.5">
          <span
            className="inline-flex items-center justify-center w-5 h-5 rounded text-[10px] font-bold border flex-shrink-0"
            style={{ color: ratingCfg.color, borderColor: `${ratingCfg.color}50`, backgroundColor: ratingCfg.bg }}
          >
            {ratingCfg.label}
          </span>
          <h3
            className="text-sm font-medium truncate group-hover:text-[#c8a96e]"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            {story.title}
          </h3>
        </div>
        <div className="flex items-center gap-3 text-[11px] text-[#8a7e6e]">
          <span style={{ color: statusCfg.color }}>{statusCfg.label}</span>
          <span>·</span>
          <span>{story.chaptersCount} cap.</span>
          <span>·</span>
          <span>{(story.wordCount / 1000).toFixed(1)}k palavras</span>
        </div>
        <div className="flex items-center gap-3 mt-1 text-[11px] text-[#8a7e6e]">
          <span className="flex items-center gap-1"><Heart size={10} />{story.kudosCount}</span>
          <span className="flex items-center gap-1"><Eye size={10} />{story.hitsCount}</span>
          <span>Atualizada {new Date(story.updatedAt).toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' })}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 flex-shrink-0">
        <button
          onClick={() => navigate(ROUTES.chapterEditorNew(story.id))}
          title="Novo capítulo"
          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#c8a96e]/10 transition-colors"
        >
          <Plus size={15} className="text-[#c8a96e]" />
        </button>
        <button
          onClick={() => navigate(ROUTES.storyEditorEdit(story.id))}
          title="Editar história"
          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#c8a96e]/10 transition-colors"
        >
          <Edit3 size={15} className="text-[#8a7e6e]" />
        </button>
        <button
          onClick={() => onDelete(story.id)}
          title="Excluir"
          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#e8635a]/10 transition-colors"
        >
          <Trash2 size={15} className="text-[#8a7e6e] hover:text-[#e8635a]" />
        </button>
        <ChevronRight size={14} className="text-[#8a7e6e]/40 ml-1" />
      </div>
    </div>
  )
}

// ─── Delete confirm modal ─────────────────────────────────────────────────────

function DeleteModal({ title, onConfirm, onCancel }: { title: string; onConfirm: () => void; onCancel: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onCancel} />
      <div className="relative bg-[#1a1210] border border-[#c8a96e]/20 rounded-2xl p-6 w-full max-w-sm">
        <h3 className="text-base font-medium mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
          Excluir história?
        </h3>
        <p className="text-sm text-[#8a7e6e] mb-6">
          "<span className="text-[#e8d4a8]">{title}</span>" será excluída permanentemente, incluindo todos os capítulos.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 rounded-xl border border-[#c8a96e]/20 text-[#8a7e6e] text-sm hover:border-[#c8a96e]/40 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2.5 rounded-xl bg-[#e8635a]/10 border border-[#e8635a]/30 text-[#e8635a] text-sm hover:bg-[#e8635a]/20 transition-colors"
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Main screen ──────────────────────────────────────────────────────────────

export function MyWorks() {
  const navigate              = useNavigate()
  const { user }              = useAuth()
  const [stories, setStories] = useState<Story[]>([])
  const [loading, setLoading] = useState(true)
  const [toDelete, setToDelete] = useState<Story | null>(null)

  useEffect(() => {
    if (!user) return
    storiesService.getMyStories(user.id)
      .then(setStories)
      .finally(() => setLoading(false))
  }, [user])

  const handleDelete = async () => {
    if (!toDelete) return
    await storiesService.deleteStory(toDelete.id)
    setStories(prev => prev.filter(s => s.id !== toDelete.id))
    setToDelete(null)
  }

  const totalWords  = stories.reduce((acc, s) => acc + s.wordCount, 0)
  const totalKudos  = stories.reduce((acc, s) => acc + s.kudosCount, 0)
  const totalChaps  = stories.reduce((acc, s) => acc + s.chaptersCount, 0)

  return (
    <div className="min-h-screen bg-[#0a0807] text-white">

      {/* Header */}
      <header className="sticky top-0 bg-[#0a0807]/95 backdrop-blur-sm border-b border-[#c8a96e]/20 px-6 lg:px-8 py-4 z-30 flex items-center justify-between">
        <div>
          <h1 className="text-2xl" style={{ fontFamily: 'Playfair Display, serif' }}>Meus Trabalhos</h1>
          <p className="text-[11px] text-[#8a7e6e] mt-0.5">Suas histórias e rascunhos</p>
        </div>
        <button
          onClick={() => navigate(ROUTES.storyEditorNew)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#c8a96e] to-[#e8d4a8] text-[#1a1210] rounded-xl font-medium text-sm hover:opacity-90 transition-opacity"
        >
          <Plus size={15} />
          Nova história
        </button>
      </header>

      <div className="max-w-2xl lg:max-w-3xl mx-auto px-6 lg:px-8 py-6 space-y-6">

        {/* Stats */}
        {!loading && stories.length > 0 && (
          <div className="grid grid-cols-4 gap-3">
            <StatCard label="Histórias" value={stories.length}                      Icon={PenLine}   color="#c8a96e" />
            <StatCard label="Capítulos" value={totalChaps}                           Icon={BookOpen}  color="#6a9fcf" />
            <StatCard label="Palavras"  value={`${(totalWords / 1000).toFixed(1)}k`} Icon={BarChart2} color="#b87cde" />
            <StatCard label="Kudos"     value={totalKudos}                           Icon={Heart}     color="#e8635a" />
          </div>
        )}

        {/* Stories list */}
        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex gap-4 p-4 bg-[#1a1210]/50 border border-[#c8a96e]/10 rounded-2xl animate-pulse">
                <div className="w-12 rounded-lg bg-[#c8a96e]/10 flex-shrink-0" style={{ height: 72 }} />
                <div className="flex-1 space-y-2 pt-1">
                  <div className="h-3.5 bg-[#c8a96e]/10 rounded w-2/3" />
                  <div className="h-2.5 bg-[#c8a96e]/10 rounded w-1/3" />
                </div>
              </div>
            ))}
          </div>
        ) : stories.length === 0 ? (
          <div className="text-center py-20 space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-[#c8a96e]/10 border border-[#c8a96e]/20 flex items-center justify-center mx-auto">
              <PenLine size={28} className="text-[#c8a96e]/60" />
            </div>
            <div>
              <p className="text-sm text-[#e8d4a8] mb-1">Você ainda não tem histórias</p>
              <p className="text-xs text-[#8a7e6e]">Comece a escrever a sua primeira obra agora.</p>
            </div>
            <button
              onClick={() => navigate(ROUTES.storyEditorNew)}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#c8a96e] to-[#e8d4a8] text-[#1a1210] rounded-xl font-medium text-sm hover:opacity-90 transition-opacity"
            >
              <Plus size={15} />
              Criar primeira história
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {stories.map(s => (
              <StoryRow key={s.id} story={s} onDelete={id => setToDelete(stories.find(x => x.id === id)!)} />
            ))}
          </div>
        )}

        {/* Quick tip */}
        {!loading && stories.length > 0 && (
          <div className="p-4 bg-[#1a1210]/30 border border-[#c8a96e]/15 rounded-xl">
            <p className="text-xs text-[#8a7e6e] leading-relaxed">
              <span className="text-[#c8a96e] font-medium">Dica:</span>{' '}
              Clique no <span className="text-[#e8d4a8]">+</span> ao lado de uma história para adicionar um novo capítulo diretamente.
              Use o lápis para editar a capa e as tags.
            </p>
          </div>
        )}
      </div>

      {/* Delete modal */}
      {toDelete && (
        <DeleteModal
          title={toDelete.title}
          onConfirm={handleDelete}
          onCancel={() => setToDelete(null)}
        />
      )}
    </div>
  )
}
