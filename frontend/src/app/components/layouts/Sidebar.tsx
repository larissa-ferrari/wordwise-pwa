import { useNavigate, useLocation } from 'react-router-dom'
import {
  Home,
  Compass,
  BookMarked,
  User,
  PlusCircle,
  Settings,
  TrendingUp,
  Feather,
  PenLine,
  Sun,
  Moon,
} from 'lucide-react'
import { useReviewModal } from '../../context/ReviewModalContext'
import { useTheme } from '../../context/ThemeContext'
import { UserAvatar } from '../icons'
import { ROUTES } from '../../constants'

const NAV_ITEMS = [
  { path: '/feed',      Icon: Home,       label: 'Feed'           },
  { path: '/discover',  Icon: Compass,    label: 'Descobrir'      },
  { path: '/stories',   Icon: Feather,    label: 'Histórias'      },
  { path: '/my-works',  Icon: PenLine,    label: 'Meus Trabalhos' },
  { path: '/shelves',   Icon: BookMarked, label: 'Estantes'       },
  { path: '/profile',   Icon: User,       label: 'Perfil'         },
] as const

const trendingNow = [
  { title: 'Fourth Wing',      cover: 'from-[#e8635a] to-[#b87cde]' },
  { title: 'Project Hail Mary', cover: 'from-[#6a9fcf] to-[#b87cde]' },
  { title: 'The Housemaid',    cover: 'from-[#1a1210] to-[#e8635a]' },
]

export function Sidebar() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { open } = useReviewModal()
  const { theme, toggle } = useTheme()

  return (
    <aside className="hidden lg:flex flex-col fixed left-0 top-0 h-full w-64 bg-[var(--ww-bg-raised)] border-r border-[var(--ww-accent)]/15 z-40 overflow-y-auto">
      {/* Logo */}
      <div className="px-6 pt-8 pb-6 border-b border-[var(--ww-accent)]/10">
        <h1
          className="text-2xl tracking-tight"
          style={{ fontFamily: 'Playfair Display, serif' }}
        >
          <span className="text-[var(--ww-accent)]">Word</span>
          <span className="text-[var(--ww-text)]">Wise</span>
        </h1>
        <p className="text-[11px] text-[var(--ww-muted)] mt-0.5 italic">
          "Seus livros, sua história."
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {NAV_ITEMS.map(({ path, Icon, label }) => {
          const isActive = pathname.startsWith(path)
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all text-left group ${
                isActive
                  ? 'bg-[var(--ww-accent)]/10 text-[var(--ww-accent)]'
                  : 'text-[var(--ww-muted)] hover:bg-[var(--ww-accent)]/5 hover:text-[var(--ww-text)]'
              }`}
            >
              <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-sm font-medium">{label}</span>
              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[var(--ww-accent)]" />
              )}
            </button>
          )
        })}

        {/* CTAs */}
        <div className="pt-3 space-y-2">
          <button
            onClick={open}
            className="w-full flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-[#c8a96e] to-[#e8d4a8] text-[#1a1210] rounded-xl font-medium text-sm hover:opacity-90 transition-opacity"
          >
            <PlusCircle size={16} />
            Nova Review
          </button>
          <button
            onClick={() => navigate(ROUTES.storyEditorNew)}
            className="w-full flex items-center justify-center gap-2 py-2.5 border border-[var(--ww-accent)]/30 text-[var(--ww-accent)] rounded-xl font-medium text-sm hover:bg-[var(--ww-accent)]/10 transition-colors"
          >
            <PenLine size={16} />
            Escrever história
          </button>
        </div>

        {/* Trending mini-section */}
        <div className="pt-6">
          <div className="flex items-center gap-2 px-4 mb-3">
            <TrendingUp size={13} className="text-[var(--ww-accent)]" />
            <span className="text-[11px] text-[var(--ww-muted)] uppercase tracking-wider font-medium">
              Em alta
            </span>
          </div>
          <div className="space-y-2 px-1">
            {trendingNow.map((book, i) => (
              <button
                key={i}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[var(--ww-accent)]/5 transition-colors text-left"
              >
                <div
                  className={`w-8 h-11 rounded flex-shrink-0 bg-gradient-to-br ${book.cover}`}
                />
                <span className="text-xs text-[var(--ww-text)]/80 line-clamp-2 leading-tight">
                  {book.title}
                </span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* User section */}
      <div className="px-4 py-4 border-t border-[var(--ww-accent)]/15 mt-auto">
        <div className="flex items-center gap-3">
          <UserAvatar name="Ana Silva" size="md" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-[var(--ww-text)] truncate">Ana Silva</p>
            <p className="text-[11px] text-[var(--ww-muted)] truncate">@ana_reads</p>
          </div>
          <button
            onClick={toggle}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[var(--ww-accent)]/10 transition-colors flex-shrink-0"
            title={theme === 'dark' ? 'Modo claro' : 'Modo escuro'}
          >
            {theme === 'dark'
              ? <Sun size={15} className="text-[var(--ww-muted)]" />
              : <Moon size={15} className="text-[var(--ww-muted)]" />
            }
          </button>
          <button
            onClick={() => navigate(ROUTES.profile)}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[var(--ww-accent)]/10 transition-colors flex-shrink-0"
            title="Configurações"
          >
            <Settings size={15} className="text-[var(--ww-muted)]" />
          </button>
        </div>
      </div>
    </aside>
  )
}
