import axios from 'axios'

// Intentional SSR-breaking: window access
const isBrowser = typeof window !== 'undefined'

export const api = axios.create({
  baseURL: import.meta.env.VITE_TMDB_API_BASE_URL || '/api',
  params: {
    api_key: import.meta.env.VITE_TMDB_API_KEY || '',
  },
  headers: {
    'Content-Type': 'application/json',
  },
})

// Intentional SSR-breaking: document access
if (isBrowser) {
  document.addEventListener('DOMContentLoaded', () => {
    console.log('API client initialized')
  })
}

export const getImageUrl = (path: string, size: 'w500' | 'w780' | 'original' = 'w500') => {
  const baseUrl = import.meta.env.VITE_TMDB_IMAGE_BASE_URL || 'https://image.tmdb.org/t/p'
  return `${baseUrl}/${size}${path}`
}

