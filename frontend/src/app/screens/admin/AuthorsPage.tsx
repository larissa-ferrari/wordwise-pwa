import { useEffect, useState } from 'react'
import { Plus, Pencil, Trash2, X } from 'lucide-react'
import { adminAuthorsService } from '@/app/services/adminService'
import type { ApiAuthorOut } from '@/app/services/apiTypes'
import { ApiError } from '@/app/services/api'

type FormData = {
  name: string
  bio: string
  photo_url: string
  birth_year: string
  nationality: string
}
const empty: FormData = { name: '', bio: '', photo_url: '', birth_year: '', nationality: '' }

export default function AuthorsPage() {
  const [items, setItems]     = useState<ApiAuthorOut[]>([])
  const [loading, setLoading] = useState(true)
  const [open, setOpen]       = useState(false)
  const [editing, setEditing] = useState<ApiAuthorOut | null>(null)
  const [form, setForm]       = useState<FormData>(empty)
  const [error, setError]     = useState('')
  const [saving, setSaving]   = useState(false)

  async function load() {
    setLoading(true)
    try { setItems(await adminAuthorsService.list()) } finally { setLoading(false) }
  }
  useEffect(() => { load() }, [])

  function openNew() { setEditing(null); setForm(empty); setError(''); setOpen(true) }
  function openEdit(a: ApiAuthorOut) {
    setEditing(a)
    setForm({
      name: a.name,
      bio: a.bio ?? '',
      photo_url: a.photo_url ?? '',
      birth_year: a.birth_year ? String(a.birth_year) : '',
      nationality: a.nationality ?? '',
    })
    setError('')
    setOpen(true)
  }

  function set(key: keyof FormData) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm(f => ({ ...f, [key]: e.target.value }))
  }

  async function handleSave() {
    if (!form.name.trim()) { setError('Nome é obrigatório'); return }
    setSaving(true); setError('')
    try {
      const payload = {
        name: form.name.trim(),
        bio: form.bio.trim() || undefined,
        photo_url: form.photo_url.trim() || undefined,
        birth_year: form.birth_year ? Number(form.birth_year) : undefined,
        nationality: form.nationality.trim() || undefined,
      }
      if (editing) {
        await adminAuthorsService.update(editing.id, payload)
      } else {
        await adminAuthorsService.create(payload as Parameters<typeof adminAuthorsService.create>[0])
      }
      setOpen(false); load()
    } catch (e) {
      setError(e instanceof ApiError ? e.message : 'Erro ao salvar')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Remover autor "${name}"? Os livros vinculados perderão a referência.`)) return
    try { await adminAuthorsService.remove(id); load() } catch { /* ignore */ }
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-[#e8d5b0]">Autores</h1>
          <p className="text-[#6b5c45] text-sm mt-1">{items.length} cadastrados</p>
        </div>
        <button
          onClick={openNew}
          className="flex items-center gap-2 px-4 py-2 bg-[#c8a96e] text-[#0a0807] rounded-lg text-sm font-medium hover:bg-[#d4b87a] transition-colors"
        >
          <Plus size={16} /> Novo autor
        </button>
      </div>

      {loading ? (
        <div className="text-[#6b5c45] text-sm">Carregando...</div>
      ) : (
        <div className="bg-[#120e09] border border-[#2a2016] rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#2a2016]">
                <th className="text-left px-5 py-3 text-[#6b5c45] font-medium">Nome</th>
                <th className="text-left px-5 py-3 text-[#6b5c45] font-medium">Nacionalidade</th>
                <th className="text-left px-5 py-3 text-[#6b5c45] font-medium">Nascimento</th>
                <th className="text-right px-5 py-3 text-[#6b5c45] font-medium">Livros</th>
                <th className="w-20 px-5 py-3" />
              </tr>
            </thead>
            <tbody>
              {items.map(a => (
                <tr key={a.id} className="border-b border-[#1a140e] hover:bg-white/2 transition-colors">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      {a.photo_url ? (
                        <img src={a.photo_url} alt={a.name} className="w-7 h-7 rounded-full object-cover" />
                      ) : (
                        <div className="w-7 h-7 rounded-full bg-[#2a2016] flex items-center justify-center text-[#6b5c45] text-xs font-bold">
                          {a.name[0]}
                        </div>
                      )}
                      <span className="text-[#e8d5b0]">{a.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-[#9a8a74]">{a.nationality ?? '—'}</td>
                  <td className="px-5 py-3 text-[#6b5c45]">{a.birth_year ?? '—'}</td>
                  <td className="px-5 py-3 text-[#6b5c45] text-right">{a.books_count}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2 justify-end">
                      <button onClick={() => openEdit(a)} className="text-[#6b5c45] hover:text-[#c8a96e] transition-colors">
                        <Pencil size={14} />
                      </button>
                      <button onClick={() => handleDelete(a.id, a.name)} className="text-[#6b5c45] hover:text-red-400 transition-colors">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {open && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-[#120e09] border border-[#2a2016] rounded-xl w-full max-w-lg p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold text-[#e8d5b0]">
                {editing ? 'Editar autor' : 'Novo autor'}
              </h2>
              <button onClick={() => setOpen(false)} className="text-[#6b5c45] hover:text-[#9a8a74]">
                <X size={18} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-xs text-[#6b5c45] mb-1">Nome *</label>
                <input
                  className="w-full bg-[#1a140e] border border-[#2a2016] rounded-lg px-3 py-2 text-sm text-[#e8d5b0] focus:outline-none focus:border-[#c8a96e]"
                  value={form.name}
                  onChange={set('name')}
                  placeholder="Nome completo do autor"
                />
              </div>
              <div>
                <label className="block text-xs text-[#6b5c45] mb-1">Nacionalidade</label>
                <input
                  className="w-full bg-[#1a140e] border border-[#2a2016] rounded-lg px-3 py-2 text-sm text-[#e8d5b0] focus:outline-none focus:border-[#c8a96e]"
                  value={form.nationality}
                  onChange={set('nationality')}
                  placeholder="ex: Brasileira"
                />
              </div>
              <div>
                <label className="block text-xs text-[#6b5c45] mb-1">Ano de nascimento</label>
                <input
                  type="number"
                  className="w-full bg-[#1a140e] border border-[#2a2016] rounded-lg px-3 py-2 text-sm text-[#e8d5b0] focus:outline-none focus:border-[#c8a96e]"
                  value={form.birth_year}
                  onChange={set('birth_year')}
                  placeholder="ex: 1980"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-xs text-[#6b5c45] mb-1">URL da foto</label>
                <input
                  className="w-full bg-[#1a140e] border border-[#2a2016] rounded-lg px-3 py-2 text-sm text-[#e8d5b0] focus:outline-none focus:border-[#c8a96e]"
                  value={form.photo_url}
                  onChange={set('photo_url')}
                  placeholder="https://..."
                />
              </div>
              <div className="col-span-2">
                <label className="block text-xs text-[#6b5c45] mb-1">Biografia</label>
                <textarea
                  className="w-full bg-[#1a140e] border border-[#2a2016] rounded-lg px-3 py-2 text-sm text-[#e8d5b0] focus:outline-none focus:border-[#c8a96e] resize-none"
                  rows={4}
                  value={form.bio}
                  onChange={set('bio')}
                  placeholder="Breve biografia do autor..."
                />
              </div>
              {error && <p className="col-span-2 text-red-400 text-xs">{error}</p>}
            </div>

            <div className="flex gap-3 mt-6 justify-end">
              <button onClick={() => setOpen(false)} className="px-4 py-2 text-sm text-[#6b5c45] hover:text-[#9a8a74]">
                Cancelar
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-4 py-2 text-sm bg-[#c8a96e] text-[#0a0807] rounded-lg font-medium hover:bg-[#d4b87a] disabled:opacity-50 transition-colors"
              >
                {saving ? 'Salvando...' : 'Salvar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
