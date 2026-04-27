import { api } from './api'
import type { ApiShelfEntryOut } from './apiTypes'

export const shelvesService = {
  getAll(shelf?: string) {
    const qs = shelf ? `?shelf=${shelf}` : ''
    return api.get<ApiShelfEntryOut[]>(`/shelves${qs}`)
  },

  add(data: { book_id: string; shelf: string; current_page?: number }) {
    return api.post<ApiShelfEntryOut>('/shelves', data)
  },

  update(entryId: string, data: { shelf?: string; current_page?: number }) {
    return api.patch<ApiShelfEntryOut>(`/shelves/${entryId}`, data)
  },

  remove(entryId: string) {
    return api.delete(`/shelves/${entryId}`)
  },
}
