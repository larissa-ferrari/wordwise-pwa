import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Home, Compass, PlusCircle, Feather, PenLine, Star, X } from 'lucide-react'
import { useReviewModal } from '../../context/ReviewModalContext'
import { ROUTES } from '../../constants'

const TABS = [
  { id: 'feed',     path: '/feed',     Icon: Home,    label: 'Feed'      },
  { id: 'discover', path: '/discover', Icon: Compass, label: 'Descobrir' },
  { id: 'create',   path: null,        Icon: PlusCircle, label: 'Criar'  },
  { id: 'stories',  path: '/stories',  Icon: Feather, label: 'Histórias' },
  { id: 'my-works', path: '/my-works', Icon: PenLine, label: 'Escrever'  },
] as const

export function BottomNav() {
  const navigate        = useNavigate()
  const { pathname }    = useLocation()
  const { open }        = useReviewModal()
  const [sheet, setSheet] = useState(false)

  const activeId = TABS.find(t => t.path && pathname.startsWith(t.path))?.id ?? ''

  function handlePress(tab: (typeof TABS)[number]) {
    if (tab.id === 'create') {
      setSheet(true)
    } else if (tab.path) {
      navigate(tab.path)
    }
  }

  return (
    <>
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-[var(--ww-bg-raised)] border-t border-[var(--ww-accent)]/20 px-4 pb-safe z-50">
        <div className="max-w-md mx-auto flex items-center justify-around h-16">
          {TABS.map((tab) => {
            const { Icon } = tab
            const isActive = activeId === tab.id
            const isCreate = tab.id === 'create'

            return (
              <button
                key={tab.id}
                onClick={() => handlePress(tab)}
                className={`flex flex-col items-center justify-center min-w-[52px] transition-all ${isCreate ? 'relative -mt-8' : ''}`}
              >
                <div className={`flex items-center justify-center transition-all ${
                  isCreate
                    ? 'w-14 h-14 rounded-full bg-gradient-to-r from-[#c8a96e] to-[#e8d4a8] shadow-lg shadow-[#c8a96e]/30'
                    : isActive
                      ? 'w-10 h-10 rounded-full bg-[var(--ww-accent)]/10'
                      : 'w-10 h-10'
                }`}>
                  <Icon
                    size={isCreate ? 26 : 21}
                    className={isCreate ? 'text-[#1a1210]' : isActive ? 'text-[var(--ww-accent)]' : 'text-[var(--ww-muted)]'}
                    strokeWidth={isActive ? 2.5 : 2}
                  />
                </div>
                <span className={`text-[10px] mt-1 transition-colors ${isCreate ? 'hidden' : isActive ? 'text-[var(--ww-accent)]' : 'text-[var(--ww-muted)]'}`}>
                  {tab.label}
                </span>
              </button>
            )
          })}
        </div>
      </nav>

      {/* Create bottom sheet */}
      {sheet && (
        <div className="lg:hidden fixed inset-0 z-[60] flex flex-col justify-end">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSheet(false)} />
          <div className="relative bg-[var(--ww-bg-raised)] border-t border-[var(--ww-accent)]/20 rounded-t-2xl px-6 pt-5 pb-safe">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-medium text-[var(--ww-text)]" style={{ fontFamily: 'Playfair Display, serif' }}>O que você quer criar?</h2>
              <button onClick={() => setSheet(false)} className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-[var(--ww-accent)]/10 transition-colors">
                <X size={15} className="text-[var(--ww-muted)]" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-5">
              <button
                onClick={() => { setSheet(false); open() }}
                className="flex flex-col items-center gap-3 p-4 bg-[var(--ww-bg)] border border-[var(--ww-accent)]/20 rounded-xl hover:border-[var(--ww-accent)]/50 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-[var(--ww-accent)]/10 flex items-center justify-center">
                  <Star size={18} className="text-[var(--ww-accent)]" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-[var(--ww-text)]">Nova review</p>
                  <p className="text-[10px] text-[var(--ww-muted)] mt-0.5">Avaliar um livro</p>
                </div>
              </button>
              <button
                onClick={() => { setSheet(false); navigate(ROUTES.storyEditorNew) }}
                className="flex flex-col items-center gap-3 p-4 bg-[var(--ww-bg)] border border-[var(--ww-accent)]/20 rounded-xl hover:border-[var(--ww-accent)]/50 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-[#b87cde]/10 flex items-center justify-center">
                  <PenLine size={18} className="text-[#b87cde]" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-[var(--ww-text)]">Nova história</p>
                  <p className="text-[10px] text-[var(--ww-muted)] mt-0.5">Escrever e publicar</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
