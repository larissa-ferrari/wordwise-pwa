import { api } from './api'
import type { ApiTokenResponse } from './apiTypes'

export interface RegisterData {
  username:     string
  email:        string
  password:     string
  display_name: string
}

export const authService = {
  login(email: string, password: string) {
    return api.post<ApiTokenResponse>('/auth/login', { email, password })
  },

  register(data: RegisterData) {
    return api.post<ApiTokenResponse>('/auth/register', data)
  },
}
