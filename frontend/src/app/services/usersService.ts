import { api } from './api'
import type { ApiUserProfile } from './apiTypes'

interface ApiUserCompatibility {
  user:          ApiUserProfile
  compatibility: number
}

export const usersService = {
  getMe() {
    return api.get<ApiUserProfile>('/users/me')
  },

  getByUsername(username: string) {
    return api.get<ApiUserProfile>(`/users/${username}`)
  },

  updateMe(data: { display_name?: string; bio?: string; aesthetic?: string }) {
    return api.patch<ApiUserProfile>('/users/me', data)
  },

  follow(username: string) {
    return api.post<void>(`/users/${username}/follow`)
  },

  unfollow(username: string) {
    return api.delete(`/users/${username}/follow`)
  },

  getSuggestions(limit = 10) {
    return api.get<ApiUserCompatibility[]>(`/users/me/suggestions?limit=${limit}`)
  },
}
