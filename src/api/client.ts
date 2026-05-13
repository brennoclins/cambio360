import { BASE_URL } from '../constants'

export class ApiError extends Error {
  status: number
  code?: string

  constructor(message: string, status: number, code?: string) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.code = code
  }
}

export async function apiGet<T>(path: string): Promise<T> {
  const headers: HeadersInit = {}
  const apiKey = import.meta.env.VITE_AWESOMEAPI_KEY as string | undefined
  if (apiKey) {
    headers['x-api-key'] = apiKey
  }

  const response = await fetch(`${BASE_URL}${path}`, { headers })

  if (!response.ok) {
    const body = await response.json().catch(() => ({}))
    throw new ApiError(
      body.message || `Erro ${response.status}`,
      response.status,
      body.code,
    )
  }

  const text = await response.text()
  if (!text) return [] as unknown as T

  return JSON.parse(text) as T
}
