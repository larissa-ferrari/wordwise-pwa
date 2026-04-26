import { useNavigate, useLocation } from 'react-router-dom'
import {
  Home,
  Compass,
  BookMarked,
  User,
  PlusCircle,
  Settings,
  TrendingUp,
} from 'lucide-react'
import { useReviewModal } from '../../context/ReviewModalContext'
import { UserAvatar } from '../icons'
import { ROUTES } from '../../constants'

const NAV_ITEMS = [
  { path: '/feed',     Icon: Home,       label: 'Feed'      },
  { path: '/discover', Icon: Compass,    label: 'Descobrir' },
  { path: '/shelves',  Icon: BookMarked, label: 'Estantes'  },
  { path: '/profile',  Icon: User,       label: 'Perfil'    },
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

  return (
    <aside className="hidden lg:flex flex-col fixed left-0 top-0 h-full w-64 bg-[#1a1210] border-r border-[#c8a96e]/15 z-40 overflow-y-auto">
      {/* Logo */}
      <div className="px-6 pt-8 pb-6 border-b border-[#c8a96e]/10">
        <h1
          className="text-2xl tracking-tight"
          style={{ fontFamily: 'Playfair Display, serif' }}
        >
          <span className="text-[#c8a96e]">Word</span>
          <span className="text-[#e8d4a8]">Wise</span>
        </h1>
        <p className="text-[11px] text-[#8a7e6e] mt-0.5 italic">
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
                  ? 'bg-[#c8a96e]/10 text-[#c8a96e]'
                  : 'text-[#8a7e6e] hover:bg-[#c8a96e]/5 hover:text-[#e8d4a8]'
              }`}
            >
              <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-sm font-medium">{label}</span>
              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#c8a96e]" />
              )}
            </button>
          )
        })}

        {/* Nova Review CTA */}
        <div className="pt-3">
          <button
            onClick={open}
            className="w-full flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-[#c8a96e] to-[#e8d4a8] text-[#1a1210] rounded-xl font-medium text-sm hover:opacity-90 transition-opacity"
          >
            <PlusCircle size={16} />
            Nova Review
          </button>
        </div>

        {/* Trending mini-section */}
        <div className="pt-6">
          <div className="flex items-center gap-2 px-4 mb-3">
            <TrendingUp size={13} className="text-[#c8a96e]" />
            <span className="text-[11px] text-[#8a7e6e] uppercase tracking-wider font-medium">
              Em alta
            </span>
          </div>
          <div className="space-y-2 px-1">
            {trendingNow.map((book, i) => (
              <button
                key={i}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#c8a96e]/5 transition-colors text-left"
              >
                <div
                  className={`w-8 h-11 rounded flex-shrink-0 bg-gradient-to-br ${book.cover}`}
                />
                <span className="text-xs text-[#e8d4a8]/80 line-clamp-2 leading-tight">
                  {book.title}
                </span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* User section */}
      <div className="px-4 py-4 border-t border-[#c8a96e]/15 mt-auto">
        <div className="flex items-center gap-3">
          <UserAvatar name="Ana Silva" size="md" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-[#e8d4a8] truncate">Ana Silva</p>
            <p className="text-[11px] text-[#8a7e6e] truncate">@ana_reads</p>
          </div>
          <button
            onClick={() => navigate(ROUTES.profile)}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#c8a96e]/10 transition-colors flex-shrink-0"
            title="Configurações"
          >
            <Settings size={15} className="text-[#8a7e6e]" />
          </button>
        </div>
      </div>
    </aside>
  )
}
