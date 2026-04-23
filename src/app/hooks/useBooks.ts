import { useState } from 'react'
import type { Book } from '../types'
import { MOCK_BOOKS } from '../services/mockData'

/**
 * Provides access to books. In the future, swap mock data
 * for real API calls in booksService without touching hook callers.
 */
export function useBooks() {
  const [books] = useState<Book[]>(MOCK_BOOKS)
  const [isLoading] = useState(false)

  const getBook = (id: string) => books.find((b) => b.id === id) ?? null

  return { books, isLoading, getBook }
}
