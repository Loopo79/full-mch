const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export const api = {
  async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${API_URL}${endpoint}`)

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(`API request failed: ${response.status} - ${errorData.detail || response.statusText}`)
    }

    return response.json()
  },

  async post<T>(
    endpoint: string,
    data?: unknown,
  ): Promise<T> {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data ? JSON.stringify(data) : undefined,
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(`API request failed: ${response.status} - ${errorData.detail || response.statusText}`)
    }

    return response.json()
  },

  async uploadFile<T>(
    endpoint: string,
    file: File,
  ): Promise<T> {
    const formData = new FormData()
    formData.append('file', file)

    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(`API request failed: ${response.status} - ${errorData.detail || response.statusText}`)
    }

    return response.json()
  },
}