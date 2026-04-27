import { api } from './api'
import type { ApiReviewOut, ApiCursorPage } from './apiTypes'

export interface CreateReviewData {
  book_id:        string
  rating:         number
  text?:          string
  favorite_quote?: string
  emotions?:      string[]
}

export const reviewsService = {
  getFeed(cursor?: string) {
    const qs = cursor ? `?cursor=${cursor}&limit=20` : '?limit=20'
    return api.get<ApiCursorPage<ApiReviewOut>>(`/feed${qs}`)
  },

  getByBook(bookId: string, cursor?: string) {
    const qs = new URLSearchParams({ book_id: bookId, limit: '20' })
    if (cursor) qs.set('cursor', cursor)
    return api.get<ApiCursorPage<ApiReviewOut>>(`/reviews?${qs}`)
  },

  create(data: CreateReviewData) {
    return api.post<ApiReviewOut>('/reviews', data)
  },

  like(reviewId: string) {
    return api.post<void>(`/reviews/${reviewId}/like`)
  },

  remove(reviewId: string) {
    return api.delete(`/reviews/${reviewId}`)
  },
}
