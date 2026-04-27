// eslint-disable-next-line @typescript-eslint/no-explicit-any
const BASE_URL = ((import.meta as any).env?.VITE_API_URL as string | undefined) ?? 'http://localhost:8000'

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

function getToken(): string | null {
  return localStorage.getItem('ww:token')
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const token = getToken()
  const res = await fetch(`${BASE_URL}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...init?.headers,
    },
  })

  if (res.status === 204) return undefined as T

  const body = await res.json().catch(() => ({ detail: res.statusText }))

  if (!res.ok) {
    throw new ApiError(
      typeof body.detail === 'string' ? body.detail : 'Erro na requisição',
      res.status,
    )
  }

  return body as T
}

export const api = {
  get:    <T>(path: string)                    => request<T>(path),
  post:   <T>(path: string, body?: unknown)    => request<T>(path, { method: 'POST',  body: JSON.stringify(body) }),
  patch:  <T>(path: string, body?: unknown)    => request<T>(path, { method: 'PATCH', body: JSON.stringify(body) }),
  delete: <T = void>(path: string)             => request<T>(path, { method: 'DELETE' }),
}
