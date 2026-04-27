import { useCallback, useEffect, useState } from 'react'
import { shelvesService } from '../services'
import type { ApiShelfEntryOut } from '../services'

export function useShelves(shelf?: string) {
  const [entries, setEntries]   = useState<ApiShelfEntryOut[]>([])
  const [isLoading, setLoading] = useState(true)
  const [error, setError]       = useState<string | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const data = await shelvesService.getAll(shelf)
      setEntries(data)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Erro ao carregar estante')
    } finally {
      setLoading(false)
    }
  }, [shelf])

  useEffect(() => { load() }, [load])

  const addToShelf = async (bookId: string, shelfType: string, currentPage?: number) => {
    await shelvesService.add({ book_id: bookId, shelf: shelfType, current_page: currentPage })
    await load()
  }

  const updateProgress = async (entryId: string, currentPage: number) => {
    await shelvesService.update(entryId, { current_page: currentPage })
    await load()
  }

  const moveToShelf = async (entryId: string, newShelf: string) => {
    await shelvesService.update(entryId, { shelf: newShelf })
    await load()
  }

  const removeFromShelf = async (entryId: string) => {
    await shelvesService.remove(entryId)
    await load()
  }

  const getByShelf = (shelfType: string) => entries.filter(e => e.shelf === shelfType)
  const getEntry = (bookId: string) => entries.find(e => e.book.id === bookId) ?? null

  return { entries, isLoading, error, addToShelf, updateProgress, moveToShelf, removeFromShelf, getByShelf, getEntry }
}
