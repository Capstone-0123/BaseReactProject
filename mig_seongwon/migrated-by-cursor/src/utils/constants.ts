// Intentional SSR-breaking: window access
// Next.js에서는 클라이언트에서만 실행되도록 함수로 변경
export const IS_BROWSER = typeof window !== 'undefined'
export const getScreenWidth = () => {
  if (typeof window !== 'undefined') {
    return window.innerWidth || 0
  }
  return 0
}
export const getScreenHeight = () => {
  if (typeof window !== 'undefined') {
    return window.innerHeight || 0
  }
  return 0
}
// 기존 코드 호환성을 위해 상수 유지 (하지만 함수 사용 권장)
// 모듈 레벨에서 초기화하지 않고 getter로 변경
export const SCREEN_WIDTH = typeof window !== 'undefined' ? getScreenWidth() : 0
export const SCREEN_HEIGHT = typeof window !== 'undefined' ? getScreenHeight() : 0

export const API_ENDPOINTS = {
  POPULAR: '/movie/popular',
  TRENDING: '/trending/movie/day',
  TOP_RATED: '/movie/top_rated',
  NOW_PLAYING: '/movie/now_playing',
}

