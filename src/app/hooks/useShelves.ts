import { useLocalStorage } from './useLocalStorage'
import { STORAGE_KEYS } from '../constants'
import type { ShelfEntry, ShelfType } from '../types'

/**
 * Manages the user's book shelves with local persistence.
 * Replace localStorage with API calls when backend is ready.
 */
export function useShelves() {
  const [entries, setEntries] = useLocalStorage<ShelfEntry[]>(STORAGE_KEYS.shelves, [])

  const addToShelf = (entry: ShelfEntry) => {
    setEntries((prev) => {
      const existing = prev.findIndex((e) => e.bookId === entry.bookId)
      if (existing >= 0) {
        // Move to new shelf
        const updated = [...prev]
        updated[existing] = { ...updated[existing], shelf: entry.shelf }
        return updated
      }
      return [...prev, entry]
    })
  }

  const removeFromShelf = (bookId: string) => {
    setEntries((prev) => prev.filter((e) => e.bookId !== bookId))
  }

  const updateProgress = (bookId: string, currentPage: number) => {
    setEntries((prev) =>
      prev.map((e) => (e.bookId === bookId ? { ...e, currentPage } : e))
    )
  }

  const getByShelf = (shelf: ShelfType) => entries.filter((e) => e.shelf === shelf)

  const getEntry = (bookId: string) => entries.find((e) => e.bookId === bookId) ?? null

  return { entries, addToShelf, removeFromShelf, updateProgress, getByShelf, getEntry }
}
