/**
 * reviewsService
 *
 * Abstraction layer for review CRUD and social actions.
 * Replace implementations with real API calls when backend is ready.
 */

import type { Review, PaginatedResponse } from '../types'
import { MOCK_REVIEWS } from './mockData'

export const reviewsService = {
  async getFeed(): Promise<PaginatedResponse<Review>> {
    return { data: MOCK_REVIEWS, nextCursor: null, total: MOCK_REVIEWS.length }
  },

  async getByBook(bookId: string): Promise<Review[]> {
    return MOCK_REVIEWS.filter((r) => r.bookId === bookId)
  },

  async getByUser(userId: string): Promise<Review[]> {
    return MOCK_REVIEWS.filter((r) => r.userId === userId)
  },

  async create(data: Omit<Review, 'id' | 'likesCount' | 'commentsCount' | 'isLiked' | 'createdAt'>): Promise<Review> {
    const review: Review = {
      ...data,
      id: `review-${Date.now()}`,
      likesCount: 0,
      commentsCount: 0,
      isLiked: false,
      createdAt: new Date().toISOString(),
    }
    // In production: POST /api/reviews
    return review
  },

  async toggleLike(reviewId: string): Promise<{ liked: boolean; count: number }> {
    // In production: POST /api/reviews/:id/like
    return { liked: true, count: 1 }
  },
}
