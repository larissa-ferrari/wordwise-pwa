import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { BookOpen, Tag, Layers, Users, LayoutDashboard, ChevronLeft } from 'lucide-react'
import { useAuth } from '@/app/context'

const nav = [
  { to: '/admin',           label: 'Dashboard',  icon: LayoutDashboard, end: true },
  { to: '/admin/tropes',    label: 'Tropes',      icon: Tag },
  { to: '/admin/categories',label: 'Categorias',  icon: Layers },
  { to: '/admin/authors',   label: 'Autores',     icon: Users },
]

export default function AdminLayout() {
  const { user } = useAuth()
  const navigate = useNavigate()

  return (
    <div className="flex min-h-screen bg-[#0a0807]">
      {/* Sidebar */}
      <aside className="w-60 flex-shrink-0 border-r border-[#2a2016] flex flex-col">
        {/* Brand */}
        <div className="px-6 py-5 border-b border-[#2a2016]">
          <div className="flex items-center gap-2 mb-1">
            <BookOpen size={18} className="text-[#c8a96e]" />
            <span className="text-[#c8a96e] font-semibold text-sm tracking-wide">WordWise</span>
          </div>
          <p className="text-[#6b5c45] text-xs">CMS Admin</p>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {nav.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                  isActive
                    ? 'bg-[#c8a96e]/15 text-[#c8a96e]'
                    : 'text-[#9a8a74] hover:text-[#e8d5b0] hover:bg-white/5'
                }`
              }
            >
              <Icon size={16} />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-3 py-4 border-t border-[#2a2016]">
          <button
            onClick={() => navigate('/feed')}
            className="flex items-center gap-2 px-3 py-2 w-full text-sm text-[#6b5c45] hover:text-[#9a8a74] transition-colors"
          >
            <ChevronLeft size={14} />
            Voltar ao app
          </button>
          <p className="px-3 mt-2 text-xs text-[#4a3e30] truncate">{user?.email ?? user?.display_name}</p>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  )
}
