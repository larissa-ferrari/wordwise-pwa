import { useEffect, useState } from 'react'
import { Tag, Layers, Users, BookOpen } from 'lucide-react'
import { adminTropesService, adminCategoriesService, adminAuthorsService, adminBooksService } from '@/app/services/adminService'

interface Stats {
  tropes: number
  categories: number
  authors: number
  books: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ tropes: 0, categories: 0, authors: 0, books: 0 })

  useEffect(() => {
    Promise.allSettled([
      adminTropesService.list(),
      adminCategoriesService.list(),
      adminAuthorsService.list(),
      adminBooksService.list({ page_size: 1 }),
    ]).then(([tropes, cats, authors, books]) => {
      setStats({
        tropes:     tropes.status === 'fulfilled'  ? tropes.value.length    : 0,
        categories: cats.status === 'fulfilled'    ? cats.value.length      : 0,
        authors:    authors.status === 'fulfilled' ? authors.value.length   : 0,
        books:      books.status === 'fulfilled'   ? books.value.total      : 0,
      })
    })
  }, [])

  const cards = [
    { label: 'Tropes',     value: stats.tropes,     icon: Tag,     to: '/admin/tropes'     },
    { label: 'Categorias', value: stats.categories, icon: Layers,  to: '/admin/categories' },
    { label: 'Autores',    value: stats.authors,    icon: Users,   to: '/admin/authors'    },
    { label: 'Livros',     value: stats.books,      icon: BookOpen,to: '/admin/books'      },
  ]

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold text-[#e8d5b0] mb-1">Dashboard</h1>
      <p className="text-[#6b5c45] text-sm mb-8">Visão geral do conteúdo cadastrado</p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map(({ label, value, icon: Icon }) => (
          <div
            key={label}
            className="bg-[#120e09] border border-[#2a2016] rounded-xl p-5"
          >
            <div className="flex items-center gap-2 mb-3">
              <Icon size={16} className="text-[#c8a96e]" />
              <span className="text-xs text-[#6b5c45] uppercase tracking-wider">{label}</span>
            </div>
            <p className="text-3xl font-bold text-[#e8d5b0]">{value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
