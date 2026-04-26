import { useState } from 'react'
import { BookOpen, CheckCircle, Clock, Plus, Grid3x3, List, Star } from 'lucide-react'

const readingBooks = [
  { title: 'O Nome do Vento',  author: 'Patrick Rothfuss', cover: 'from-[#c8a96e] to-[#e8635a]', progress: 67, currentPage: 450, totalPages: 672 },
  { title: 'Neuromancer',       author: 'William Gibson',   cover: 'from-[#6a9fcf] to-[#b87cde]', progress: 34, currentPage: 89,  totalPages: 271 },
  { title: 'A Casa no Cerrado', author: 'Carla Madeira',    cover: 'from-[#7c9e7a] to-[#c8a96e]', progress: 12, currentPage: 31,  totalPages: 264 },
]

const readBooks = [
  { title: 'Fourth Wing',                author: 'Rebecca Yarros',       cover: 'from-[#e8635a] to-[#b87cde]', rating: 5 },
  { title: 'Project Hail Mary',          author: 'Andy Weir',            cover: 'from-[#6a9fcf] to-[#b87cde]', rating: 5 },
  { title: 'The Housemaid',              author: 'Freida McFadden',       cover: 'from-[#1a1210] to-[#e8635a]', rating: 4 },
  { title: 'The Seven Husbands',         author: 'Taylor Jenkins Reid',   cover: 'from-[#c8a96e] to-[#e8635a]', rating: 5 },
  { title: 'Tomorrow x3',               author: 'Gabrielle Zevin',       cover: 'from-[#6a9fcf] to-[#c8a96e]', rating: 4 },
  { title: 'Cem Anos de Solidão',        author: 'García Márquez',        cover: 'from-[#7c9e7a] to-[#c8a96e]', rating: 5 },
]

const shelves = [
  { id: 'reading', label: 'Lendo',     Icon: BookOpen,    count: 3,  color: '#c8a96e' },
  { id: 'read',    label: 'Lidos',     Icon: CheckCircle, count: 47, color: '#7c9e7a' },
  { id: 'want',    label: 'Quero ler', Icon: Clock,       count: 23, color: '#6a9fcf' },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(rating)].map((_, i) => (
        <Star key={i} size={12} className="fill-[#c8a96e] text-[#c8a96e]" />
      ))}
    </div>
  )
}

export function Shelves() {
  const [activeShelf, setActiveShelf] = useState<string>('reading')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  return (
    <div className="min-h-screen bg-[#0a0807] text-white pb-20">
      {/* Header */}
      <header className="sticky top-0 bg-[#0a0807]/95 backdrop-blur-sm border-b border-[#c8a96e]/20 px-6 py-4 z-40">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl" style={{ fontFamily: 'Playfair Display, serif' }}>
              Minhas Estantes
            </h1>
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  viewMode === 'grid' ? 'bg-[#c8a96e] text-[#1a1210]' : 'bg-[#1a1210] text-[#8a7e6e]'
                }`}
              >
                <Grid3x3 size={18} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  viewMode === 'list' ? 'bg-[#c8a96e] text-[#1a1210]' : 'bg-[#1a1210] text-[#8a7e6e]'
                }`}
              >
                <List size={18} />
              </button>
            </div>
          </div>

          {/* Shelf Tabs */}
          <div className="flex gap-2">
            {shelves.map(({ id, label, Icon, count }) => (
              <button
                key={id}
                onClick={() => setActiveShelf(id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                  activeShelf === id
                    ? 'bg-[#c8a96e] text-[#1a1210]'
                    : 'bg-[#1a1210]/50 border border-[#c8a96e]/20 text-[#8a7e6e]'
                }`}
              >
                <Icon size={16} />
                <span className="text-sm font-medium">{label}</span>
                <span className="text-xs opacity-80">({count})</span>
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-6 py-6">
        {/* Reading Shelf */}
        {activeShelf === 'reading' && (
          <div className="space-y-4">
            {readingBooks.map((book, i) => (
              <div
                key={i}
                className="bg-[#1a1210]/50 border border-[#c8a96e]/20 rounded-2xl p-4 hover:border-[#c8a96e]/40 transition-all"
              >
                <div className="flex gap-4 mb-4">
                  <div className={`w-16 h-24 rounded-lg bg-gradient-to-br ${book.cover} flex-shrink-0`} />
                  <div className="flex-1">
                    <h3 className="text-sm font-medium mb-1">{book.title}</h3>
                    <p className="text-xs text-[#8a7e6e] mb-3">{book.author}</p>
                    <p className="text-xs text-[#8a7e6e]">
                      Página {book.currentPage} de {book.totalPages}
                    </p>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="flex items-center justify-between text-xs text-[#8a7e6e] mb-1">
                    <span>{book.progress}% completo</span>
                    <span>{100 - book.progress}% restante</span>
                  </div>
                  <div className="h-2 bg-[#8a7e6e]/20 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#c8a96e] to-[#e8d4a8] rounded-full"
                      style={{ width: `${book.progress}%` }}
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 py-2 bg-gradient-to-r from-[#c8a96e] to-[#e8d4a8] text-[#1a1210] rounded-full text-sm font-medium">
                    Atualizar progresso
                  </button>
                  <button className="px-4 py-2 border-2 border-[#c8a96e]/30 text-[#c8a96e] rounded-full text-sm">
                    Marcar como lido
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Read Shelf */}
        {activeShelf === 'read' && (
          <div>
            <div className="grid grid-cols-3 gap-3 mb-6">
              {[
                { value: '47',  label: 'Livros lidos' },
                { value: '4.3', label: 'Nota média'   },
                { value: '12',  label: 'Este ano'     },
              ].map(({ value, label }) => (
                <div key={label} className="bg-[#1a1210]/50 border border-[#c8a96e]/20 rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-[#c8a96e] mb-1">{value}</p>
                  <p className="text-xs text-[#8a7e6e]">{label}</p>
                </div>
              ))}
            </div>

            {viewMode === 'grid' ? (
              <div className="grid grid-cols-3 gap-4">
                {readBooks.map((book, i) => (
                  <button key={i} className="text-left">
                    <div
                      className={`w-full aspect-[2/3] rounded-lg bg-gradient-to-br ${book.cover} mb-2 hover:scale-105 transition-transform relative`}
                    >
                      <div className="absolute top-2 right-2 w-6 h-6 bg-[#c8a96e] rounded-full flex items-center justify-center text-[#1a1210] text-xs font-bold">
                        {book.rating}
                      </div>
                    </div>
                    <h3 className="text-xs line-clamp-2 mb-1">{book.title}</h3>
                    <p className="text-[10px] text-[#8a7e6e] line-clamp-1">{book.author}</p>
                  </button>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {readBooks.map((book, i) => (
                  <button
                    key={i}
                    className="w-full p-3 bg-[#1a1210]/50 border border-[#c8a96e]/20 rounded-xl hover:border-[#c8a96e]/40 transition-all flex items-center gap-3"
                  >
                    <div className={`w-12 h-16 rounded bg-gradient-to-br ${book.cover} flex-shrink-0`} />
                    <div className="text-left flex-1">
                      <h3 className="text-sm font-medium mb-1">{book.title}</h3>
                      <p className="text-xs text-[#8a7e6e]">{book.author}</p>
                    </div>
                    <StarRating rating={book.rating} />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Want to Read Shelf */}
        {activeShelf === 'want' && (
          <div>
            <div className="mb-4">
              <button className="w-full py-3 border-2 border-dashed border-[#c8a96e]/30 text-[#c8a96e] rounded-xl hover:bg-[#c8a96e]/10 transition-colors flex items-center justify-center gap-2">
                <Plus size={20} />
                <span className="text-sm font-medium">Adicionar livro</span>
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {[...readBooks].reverse().slice(0, 9).map((book, i) => (
                <button key={i} className="text-left">
                  <div
                    className={`w-full aspect-[2/3] rounded-lg bg-gradient-to-br ${book.cover} mb-2 hover:scale-105 transition-transform`}
                  />
                  <h3 className="text-xs line-clamp-2 mb-1">{book.title}</h3>
                  <p className="text-[10px] text-[#8a7e6e] line-clamp-1">{book.author}</p>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
