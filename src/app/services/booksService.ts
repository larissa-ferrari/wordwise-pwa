/**
 * booksService
 *
 * Abstraction layer for all book-related data fetching.
 * Currently returns mock data. Replace the implementations with real API
 * calls (Google Books, Open Library, or a custom backend) without changing
 * any hook or component that consumes this service.
 */

import type { Book, PaginatedResponse } from '../types'
import { MOCK_BOOKS } from './mockData'

const SIMULATED_LATENCY = 0 // set to e.g. 300ms to test loading states

async function wait(ms: number) {
  if (ms > 0) return new Promise((r) => setTimeout(r, ms))
}

export const booksService = {
  async getAll(): Promise<Book[]> {
    await wait(SIMULATED_LATENCY)
    return MOCK_BOOKS
  },

  async getById(id: string): Promise<Book | null> {
    await wait(SIMULATED_LATENCY)
    return MOCK_BOOKS.find((b) => b.id === id) ?? null
  },

  async search(query: string): Promise<Book[]> {
    await wait(SIMULATED_LATENCY)
    const q = query.toLowerCase()
    return MOCK_BOOKS.filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q) ||
        b.genres.some((g) => g.toLowerCase().includes(q))
    )
  },

  async getByGenre(genre: string): Promise<Book[]> {
    await wait(SIMULATED_LATENCY)
    return MOCK_BOOKS.filter((b) => b.genres.includes(genre as Book['genres'][number]))
  },

  async getFeed(cursor?: string): Promise<PaginatedResponse<Book>> {
    await wait(SIMULATED_LATENCY)
    return {
      data: MOCK_BOOKS,
      nextCursor: null,
      total: MOCK_BOOKS.length,
    }
  },
}
