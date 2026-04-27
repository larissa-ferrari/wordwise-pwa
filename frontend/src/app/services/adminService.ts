import { api } from './api'
import type { ApiAuthorOut, ApiCategoryOut, ApiTrope, ApiBookSummary, ApiPaginatedResponse } from './apiTypes'

// ── Tropes ──────────────────────────────────────────────────────────────────

export const adminTropesService = {
  list: () =>
    api.get<ApiTrope[]>('/admin/tropes'),

  create: (data: { name: string; slug: string }) =>
    api.post<ApiTrope>('/admin/tropes', data),

  update: (id: string, data: { name?: string; slug?: string }) =>
    api.patch<ApiTrope>(`/admin/tropes/${id}`, data),

  remove: (id: string) =>
    api.delete(`/admin/tropes/${id}`),
}

// ── Categories ───────────────────────────────────────────────────────────────

export const adminCategoriesService = {
  list: () =>
    api.get<ApiCategoryOut[]>('/admin/categories'),

  create: (data: { name: string; slug: string; description?: string }) =>
    api.post<ApiCategoryOut>('/admin/categories', data),

  update: (id: string, data: { name?: string; slug?: string; description?: string }) =>
    api.patch<ApiCategoryOut>(`/admin/categories/${id}`, data),

  remove: (id: string) =>
    api.delete(`/admin/categories/${id}`),
}

// ── Authors ──────────────────────────────────────────────────────────────────

export const adminAuthorsService = {
  list: () =>
    api.get<ApiAuthorOut[]>('/admin/authors'),

  create: (data: {
    name: string
    bio?: string
    photo_url?: string
    birth_year?: number
    nationality?: string
  }) => api.post<ApiAuthorOut>('/admin/authors', data),

  update: (id: string, data: {
    name?: string
    bio?: string
    photo_url?: string
    birth_year?: number
    nationality?: string
  }) => api.patch<ApiAuthorOut>(`/admin/authors/${id}`, data),

  remove: (id: string) =>
    api.delete(`/admin/authors/${id}`),
}

// ── Books (read + manage) ────────────────────────────────────────────────────

export const adminBooksService = {
  list: (params?: { q?: string; page?: number; page_size?: number }) => {
    const qs = new URLSearchParams()
    if (params?.q) qs.set('q', params.q)
    if (params?.page) qs.set('page', String(params.page))
    if (params?.page_size) qs.set('page_size', String(params.page_size))
    return api.get<ApiPaginatedResponse<ApiBookSummary>>(`/admin/books?${qs}`)
  },

  update: (id: string, data: {
    author_id?: string | null
    category_ids?: string[]
    trope_ids?: string[]
    genres?: string[]
    title?: string
    author?: string
    series?: string | null
    description?: string | null
    pages?: number | null
    published_year?: number | null
  }) => api.patch(`/admin/books/${id}`, data),

  remove: (id: string) =>
    api.delete(`/admin/books/${id}`),
}
