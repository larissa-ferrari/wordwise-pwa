import { api } from './api'
import type { ApiBookOut, ApiBookSummary, ApiEmotionBreakdown, ApiPaginatedResponse } from './apiTypes'

export const booksService = {
  getAll(params?: { q?: string; genre?: string; page?: number }) {
    const qs = new URLSearchParams()
    if (params?.q)     qs.set('q',     params.q)
    if (params?.genre) qs.set('genre', params.genre)
    if (params?.page)  qs.set('page',  String(params.page))
    const query = qs.toString()
    return api.get<ApiPaginatedResponse<ApiBookSummary>>(`/books${query ? `?${query}` : ''}`)
  },

  getTrending(limit = 8) {
    return api.get<ApiBookSummary[]>(`/books/trending?limit=${limit}`)
  },

  getById(id: string) {
    return api.get<ApiBookOut>(`/books/${id}`)
  },

  getEmotions(id: string) {
    return api.get<ApiEmotionBreakdown[]>(`/books/${id}/emotions`)
  },
}
