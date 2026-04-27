import { useEffect, useState } from 'react'
import { Plus, Pencil, Trash2, X } from 'lucide-react'
import { adminTropesService } from '@/app/services/adminService'
import type { ApiTrope } from '@/app/services/apiTypes'
import { ApiError } from '@/app/services/api'

type FormData = { name: string; slug: string }
const empty: FormData = { name: '', slug: '' }

function slugify(text: string) {
  return text.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
}

export default function TropesPage() {
  const [items, setItems]       = useState<ApiTrope[]>([])
  const [loading, setLoading]   = useState(true)
  const [open, setOpen]         = useState(false)
  const [editing, setEditing]   = useState<ApiTrope | null>(null)
  const [form, setForm]         = useState<FormData>(empty)
  const [error, setError]       = useState('')
  const [saving, setSaving]     = useState(false)

  async function load() {
    setLoading(true)
    try { setItems(await adminTropesService.list()) } finally { setLoading(false) }
  }
  useEffect(() => { load() }, [])

  function openNew() { setEditing(null); setForm(empty); setError(''); setOpen(true) }
  function openEdit(t: ApiTrope) { setEditing(t); setForm({ name: t.name, slug: t.slug }); setError(''); setOpen(true) }

  function handleNameChange(name: string) {
    setForm(f => ({ name, slug: editing ? f.slug : slugify(name) }))
  }

  async function handleSave() {
    if (!form.name.trim() || !form.slug.trim()) { setError('Nome e slug são obrigatórios'); return }
    setSaving(true); setError('')
    try {
      if (editing) {
        await adminTropesService.update(editing.id, form)
      } else {
        await adminTropesService.create(form)
      }
      setOpen(false)
      load()
    } catch (e) {
      setError(e instanceof ApiError ? e.message : 'Erro ao salvar')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Remover trope "${name}"?`)) return
    try { await adminTropesService.remove(id); load() } catch { /* ignore */ }
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-[#e8d5b0]">Tropes</h1>
          <p className="text-[#6b5c45] text-sm mt-1">{items.length} cadastrados</p>
        </div>
        <button
          onClick={openNew}
          className="flex items-center gap-2 px-4 py-2 bg-[#c8a96e] text-[#0a0807] rounded-lg text-sm font-medium hover:bg-[#d4b87a] transition-colors"
        >
          <Plus size={16} /> Novo trope
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
                <th className="text-left px-5 py-3 text-[#6b5c45] font-medium">Slug</th>
                <th className="w-20 px-5 py-3" />
              </tr>
            </thead>
            <tbody>
              {items.map(t => (
                <tr key={t.id} className="border-b border-[#1a140e] hover:bg-white/2 transition-colors">
                  <td className="px-5 py-3 text-[#e8d5b0]">{t.name}</td>
                  <td className="px-5 py-3 text-[#6b5c45] font-mono text-xs">{t.slug}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2 justify-end">
                      <button onClick={() => openEdit(t)} className="text-[#6b5c45] hover:text-[#c8a96e] transition-colors">
                        <Pencil size={14} />
                      </button>
                      <button onClick={() => handleDelete(t.id, t.name)} className="text-[#6b5c45] hover:text-red-400 transition-colors">
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

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-[#120e09] border border-[#2a2016] rounded-xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold text-[#e8d5b0]">
                {editing ? 'Editar trope' : 'Novo trope'}
              </h2>
              <button onClick={() => setOpen(false)} className="text-[#6b5c45] hover:text-[#9a8a74]">
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs text-[#6b5c45] mb-1">Nome</label>
                <input
                  className="w-full bg-[#1a140e] border border-[#2a2016] rounded-lg px-3 py-2 text-sm text-[#e8d5b0] focus:outline-none focus:border-[#c8a96e]"
                  value={form.name}
                  onChange={e => handleNameChange(e.target.value)}
                  placeholder="ex: Enemies to Lovers"
                />
              </div>
              <div>
                <label className="block text-xs text-[#6b5c45] mb-1">Slug</label>
                <input
                  className="w-full bg-[#1a140e] border border-[#2a2016] rounded-lg px-3 py-2 text-sm text-[#e8d5b0] font-mono focus:outline-none focus:border-[#c8a96e]"
                  value={form.slug}
                  onChange={e => setForm(f => ({ ...f, slug: e.target.value }))}
                  placeholder="ex: enemies-to-lovers"
                />
              </div>
              {error && <p className="text-red-400 text-xs">{error}</p>}
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
