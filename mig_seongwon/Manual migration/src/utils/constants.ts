// Intentional SSR-breaking: window access
export const IS_BROWSER = typeof window !== 'undefined'
export const SCREEN_WIDTH = window.innerWidth || 0
export const SCREEN_HEIGHT = window.innerHeight || 0

export const API_ENDPOINTS = {
  POPULAR: '/movie/popular',
  TRENDING: '/trending/movie/day',
  TOP_RATED: '/movie/top_rated',
  NOW_PLAYING: '/movie/now_playing',
}

