import { useState } from 'react'
import { BookOpen, CheckCircle, Clock, Plus, Grid3x3, List, Star } from 'lucide-react'
import { useShelves } from '../hooks/useShelves'
import type { ApiShelfEntryOut } from '../services'

const shelfTabs = [
  { id: 'reading', label: 'Lendo',     Icon: BookOpen,    color: '#c8a96e' },
  { id: 'read',    label: 'Lidos',     Icon: CheckCircle, color: '#7c9e7a' },
  { id: 'want',    label: 'Quero ler', Icon: Clock,       color: '#6a9fcf' },
]

function StarRating({ rating, size = 12 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(Math.round(rating))].map((_, i) => (
        <Star key={i} size={size} className="fill-[#c8a96e] text-[#c8a96e]" />
      ))}
    </div>
  )
}

function ReadingCard({ entry, onUpdateProgress, onMoveToRead }: {
  entry: ApiShelfEntryOut
  onUpdateProgress: (entryId: string, page: number) => void
  onMoveToRead: (entryId: string) => void
}) {
  const book = entry.book
  return (
    <div className="bg-[#1a1210]/50 border border-[#c8a96e]/20 rounded-2xl p-4 hover:border-[#c8a96e]/40 transition-all">
      <div className="flex gap-4 mb-4">
        <div className={`w-16 h-24 rounded-lg flex-shrink-0 shadow-lg ${book.cover_gradient ? `bg-gradient-to-br ${book.cover_gradient}` : 'bg-[#2a1f1a]'}`} />
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium mb-1 truncate">{book.title}</h3>
          <p className="text-xs text-[#8a7e6e] mb-2">{book.author}</p>
          {entry.current_page && book.pages && (
            <p className="text-xs text-[#8a7e6e]">Página {entry.current_page} de {book.pages}</p>
          )}
          <p className="text-xs text-[#c8a96e] mt-1 font-medium">{Math.round(entry.progress_percentage)}% lido</p>
        </div>
      </div>

      <div className="mb-3">
        <div className="h-1.5 bg-[#8a7e6e]/20 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-[#c8a96e] to-[#e8d4a8] rounded-full transition-all" style={{ width: `${entry.progress_percentage}%` }} />
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => {
            const page = prompt('Página atual:', String(entry.current_page ?? 0))
            if (page && !isNaN(Number(page))) onUpdateProgress(entry.id, Number(page))
          }}
          className="flex-1 py-2 bg-gradient-to-r from-[#c8a96e] to-[#e8d4a8] text-[#1a1210] rounded-full text-xs font-medium"
        >
          Atualizar progresso
        </button>
        <button
          onClick={() => onMoveToRead(entry.id)}
          className="px-3 py-2 border border-[#c8a96e]/30 text-[#c8a96e] rounded-full text-xs hover:bg-[#c8a96e]/10 transition-colors"
        >
          Lido
        </button>
      </div>
    </div>
  )
}

export function Shelves() {
  const [activeShelf, setActiveShelf] = useState<string>('reading')
  const [viewMode, setViewMode]       = useState<'grid' | 'list'>('grid')

  const { entries, isLoading, updateProgress, moveToShelf } = useShelves()

  const readingEntries = entries.filter(e => e.shelf === 'reading')
  const readEntries    = entries.filter(e => e.shelf === 'read')
  const wantEntries    = entries.filter(e => e.shelf === 'want')

  const shelfCounts = { reading: readingEntries.length, read: readEntries.length, want: wantEntries.length }

  return (
    <div className="min-h-screen bg-[#0a0807] text-white pb-6">
      <header className="sticky top-0 bg-[#0a0807]/95 backdrop-blur-sm border-b border-[#c8a96e]/20 px-6 lg:px-8 py-4 z-30">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl" style={{ fontFamily: 'Playfair Display, serif' }}>Minhas Estantes</h1>
          <div className="flex gap-2">
            {(['grid', 'list'] as const).map(mode => (
              <button key={mode} onClick={() => setViewMode(mode)}
                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${viewMode === mode ? 'bg-[#c8a96e] text-[#1a1210]' : 'bg-[#1a1210] text-[#8a7e6e] hover:bg-[#c8a96e]/10'}`}
              >
                {mode === 'grid' ? <Grid3x3 size={16} /> : <List size={16} />}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-2">
          {shelfTabs.map(({ id, label, Icon }) => (
            <button key={id} onClick={() => setActiveShelf(id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${activeShelf === id ? 'bg-[#c8a96e] text-[#1a1210]' : 'bg-[#1a1210]/50 border border-[#c8a96e]/20 text-[#8a7e6e] hover:border-[#c8a96e]/40'}`}
            >
              <Icon size={15} />
              <span className="text-sm font-medium">{label}</span>
              <span className="text-xs opacity-70">({shelfCounts[id as keyof typeof shelfCounts]})</span>
            </button>
          ))}
        </div>
      </header>

      <div className="px-6 lg:px-8 py-6">
        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <div className="w-8 h-8 rounded-full border-2 border-[#c8a96e]/30 border-t-[#c8a96e] animate-spin" />
          </div>
        ) : (
          <>
            {/* Reading */}
            {activeShelf === 'reading' && (
              readingEntries.length === 0 ? (
                <div className="text-center py-16 text-[#8a7e6e]">
                  <BookOpen size={40} className="mx-auto mb-4 opacity-40" />
                  <p className="text-sm">Nenhum livro em leitura. Adicione um!</p>
                </div>
              ) : (
                <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-4">
                  {readingEntries.map(entry => (
                    <ReadingCard
                      key={entry.id}
                      entry={entry}
                      onUpdateProgress={updateProgress}
                      onMoveToRead={(id) => moveToShelf(id, 'read')}
                    />
                  ))}
                </div>
              )
            )}

            {/* Read */}
            {activeShelf === 'read' && (
              <div>
                <div className="grid grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
                  {[
                    { value: String(readEntries.length), label: 'Livros lidos' },
                    { value: readEntries.length > 0 ? (readEntries.reduce((s, e) => s + e.book.avg_rating, 0) / readEntries.length).toFixed(1) : '—', label: 'Nota média' },
                  ].map(({ value, label }) => (
                    <div key={label} className="bg-[#1a1210]/50 border border-[#c8a96e]/20 rounded-xl p-4 text-center">
                      <p className="text-2xl font-bold text-[#c8a96e] mb-1">{value}</p>
                      <p className="text-xs text-[#8a7e6e]">{label}</p>
                    </div>
                  ))}
                </div>

                {readEntries.length === 0 ? (
                  <div className="text-center py-12 text-[#8a7e6e]">
                    <p className="text-sm">Nenhum livro lido ainda.</p>
                  </div>
                ) : viewMode === 'grid' ? (
                  <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 lg:gap-4">
                    {readEntries.map(entry => (
                      <button key={entry.id} className="text-left group">
                        <div className={`w-full aspect-[2/3] rounded-lg mb-2 group-hover:scale-105 transition-transform relative shadow-md ${entry.book.cover_gradient ? `bg-gradient-to-br ${entry.book.cover_gradient}` : 'bg-[#2a1f1a]'}`}>
                          <div className="absolute top-1.5 right-1.5 w-5 h-5 bg-[#c8a96e] rounded-full flex items-center justify-center text-[#1a1210] text-[10px] font-bold">
                            {entry.book.avg_rating.toFixed(0)}
                          </div>
                        </div>
                        <h3 className="text-[10px] lg:text-xs line-clamp-2 mb-0.5 leading-tight">{entry.book.title}</h3>
                        <p className="text-[9px] lg:text-[10px] text-[#8a7e6e] line-clamp-1">{entry.book.author}</p>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-2 lg:grid lg:grid-cols-2 lg:gap-3 lg:space-y-0">
                    {readEntries.map(entry => (
                      <button key={entry.id} className="w-full p-3 bg-[#1a1210]/50 border border-[#c8a96e]/20 rounded-xl hover:border-[#c8a96e]/40 transition-all flex items-center gap-3">
                        <div className={`w-10 h-14 rounded flex-shrink-0 ${entry.book.cover_gradient ? `bg-gradient-to-br ${entry.book.cover_gradient}` : 'bg-[#2a1f1a]'}`} />
                        <div className="text-left flex-1 min-w-0">
                          <h3 className="text-sm font-medium mb-0.5 truncate">{entry.book.title}</h3>
                          <p className="text-xs text-[#8a7e6e] truncate">{entry.book.author}</p>
                        </div>
                        <StarRating rating={entry.book.avg_rating} />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Want */}
            {activeShelf === 'want' && (
              <div>
                <button className="w-full mb-4 py-3 border-2 border-dashed border-[#c8a96e]/30 text-[#c8a96e] rounded-xl hover:bg-[#c8a96e]/10 transition-colors flex items-center justify-center gap-2">
                  <Plus size={18} />
                  <span className="text-sm font-medium">Adicionar livro</span>
                </button>

                {wantEntries.length === 0 ? (
                  <div className="text-center py-12 text-[#8a7e6e]">
                    <p className="text-sm">Sua lista de desejos está vazia.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 lg:gap-4">
                    {wantEntries.map(entry => (
                      <button key={entry.id} className="text-left group">
                        <div className={`w-full aspect-[2/3] rounded-lg mb-2 group-hover:scale-105 transition-transform shadow-md ${entry.book.cover_gradient ? `bg-gradient-to-br ${entry.book.cover_gradient}` : 'bg-[#2a1f1a]'}`} />
                        <h3 className="text-[10px] lg:text-xs line-clamp-2 mb-0.5 leading-tight">{entry.book.title}</h3>
                        <p className="text-[9px] lg:text-[10px] text-[#8a7e6e] line-clamp-1">{entry.book.author}</p>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
