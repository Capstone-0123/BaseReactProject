import axios from 'axios'

// Intentional SSR-breaking: window access
const isBrowser = typeof window !== 'undefined'

// 환경 변수 확인 (디버깅용)
if (typeof window !== 'undefined') {
  console.log('API Key exists:', !!process.env.NEXT_PUBLIC_TMDB_API_KEY)
  console.log('Base URL:', process.env.NEXT_PUBLIC_TMDB_API_BASE_URL || '/api')
}

// API 키 확인
const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY || ''
// Next.js API Route를 통해 서버 사이드에서 요청 처리
// /api/[...path] route가 TMDB API로 프록시함
const baseURL = '/api'

if (typeof window !== 'undefined') {
  console.log('API Configuration:', {
    apiKeyExists: !!apiKey,
    apiKeyLength: apiKey.length,
    apiKeyPreview: apiKey ? apiKey.substring(0, 8) + '...' : 'missing',
    baseURL,
  })
}

export const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  // CORS 문제 해결을 위한 설정
  withCredentials: false,
})

// 요청 인터셉터: API Route를 통해 요청하므로 API 키는 서버에서 추가됨
api.interceptors.request.use(
  (config) => {
    // 디버깅: 실제 요청 URL과 파라미터 확인
    if (typeof window !== 'undefined') {
      const fullURL = `${config.baseURL}${config.url}`
      const paramsString = config.params ? new URLSearchParams(config.params).toString() : ''
      console.log('API Request:', {
        url: config.url,
        baseURL: config.baseURL,
        params: config.params,
        fullURL: paramsString ? `${fullURL}?${paramsString}` : fullURL,
      })
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)


// 응답 인터셉터: 오류 처리
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (typeof window !== 'undefined') {
      // 에러 객체의 모든 속성 확인
      const errorDetails: any = {
        message: error?.message,
        code: error?.code,
        name: error?.name,
        status: error?.response?.status,
        statusText: error?.response?.statusText,
        data: error?.response?.data,
        url: error?.config?.url,
        baseURL: error?.config?.baseURL,
        params: error?.config?.params,
        method: error?.config?.method,
        headers: error?.config?.headers,
        hasResponse: !!error?.response,
        hasRequest: !!error?.request,
      }
      
      // fullURL 구성
      if (error?.config) {
        const params = error.config.params || {}
        const paramsString = new URLSearchParams(params).toString()
        errorDetails.fullURL = paramsString 
          ? `${error.config.baseURL}${error.config.url}?${paramsString}`
          : `${error.config.baseURL}${error.config.url}`
      }
      
      // API 키 마스킹
      if (error?.config?.params?.api_key) {
        const apiKey = String(error.config.params.api_key)
        errorDetails.apiKey = '***' + apiKey.slice(-4)
        errorDetails.apiKeyLength = apiKey.length
      } else {
        errorDetails.apiKey = 'missing'
      }
      
      console.error('=== API Error Full Object ===', error)
      console.error('=== API Error Type ===', error?.constructor?.name)
      console.error('API Error Details:', errorDetails)
      
      // 응답 데이터가 있으면 별도로 로깅
      if (error?.response?.data) {
        console.error('API Error Response Data:', error.response.data)
      }
    }
    return Promise.reject(error)
  }
)

// Intentional SSR-breaking: document access
if (isBrowser) {
  document.addEventListener('DOMContentLoaded', () => {
    console.log('API client initialized')
  })
}

export const getImageUrl = (path: string | null | undefined, size: 'w500' | 'w780' | 'original' = 'w500') => {
  if (!path) {
    return '/placeholder-image.jpg' // 기본 이미지 또는 빈 문자열
  }
  const baseUrl = process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL || 'https://image.tmdb.org/t/p'
  return `${baseUrl}/${size}${path}`
}

