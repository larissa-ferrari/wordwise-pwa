import { useCallback, useEffect, useState } from 'react'
import { booksService } from '../services'
import type { ApiBookSummary, ApiBookOut } from '../services'

export function useBooks(initialGenre?: string) {
  const [books, setBooks]     = useState<ApiBookSummary[]>([])
  const [isLoading, setLoading] = useState(true)
  const [error, setError]     = useState<string | null>(null)

  const fetch = useCallback(async (q?: string, genre?: string) => {
    setLoading(true)
    setError(null)
    try {
      const res = await booksService.getAll({ q, genre: genre ?? initialGenre })
      setBooks(res.items)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Erro ao carregar livros')
    } finally {
      setLoading(false)
    }
  }, [initialGenre])

  useEffect(() => { fetch() }, [fetch])

  const getBook = useCallback(
    (id: string): Promise<ApiBookOut> => booksService.getById(id),
    [],
  )

  return { books, isLoading, error, refetch: fetch, getBook }
}

export function useTrendingBooks(limit = 8) {
  const [books, setBooks]       = useState<ApiBookSummary[]>([])
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    booksService.getTrending(limit)
      .then(setBooks)
      .catch(() => setBooks([]))
      .finally(() => setLoading(false))
  }, [limit])

  return { books, isLoading }
}
