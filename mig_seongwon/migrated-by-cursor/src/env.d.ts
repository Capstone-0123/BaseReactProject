// Next.js 환경 변수 타입 정의
// VITE_ 접두사가 NEXT_PUBLIC_로 변경됨

declare namespace NodeJS {
  interface ProcessEnv {
    readonly NEXT_PUBLIC_TMDB_API_KEY: string
    readonly NEXT_PUBLIC_TMDB_IMAGE_BASE_URL: string
    readonly NEXT_PUBLIC_TMDB_API_BASE_URL: string
  }
}

