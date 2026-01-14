# React → Next.js 마이그레이션 완전 가이드

## 📋 원본 프롬프트 vs 실제 구현 비교

### ✅ 완료된 단계 (원본 프롬프트)

#### 0단계: 기본 환경/초기 상태 준비 ✅
- 프로젝트 존재 여부 확인
- src/index.html, main.tsx 확인
- React/Vite 프로젝트 판별

#### 1단계: 환경/빌드 시스템 변환 ✅
- Next.js 설치 및 설정
- Vite 플러그인 제거
- next.config.js 생성
- package.json scripts 수정
- vite.config.ts 삭제
- tsconfig.json 재생성

#### 2단계: 구조 기반 Layer ✅
- /app 디렉토리 생성
- app/layout.tsx 생성
- app/providers.tsx 생성
- app/page.tsx 생성
- app/not-found.tsx 생성
- app/globals.css 생성
- index.html, main.tsx 제거 및 이관

#### 3단계: 라우팅/페이지 변환 ✅
- React Router → Next.js App Router 변환
- 파일 기반 라우팅 생성
- 동적/중첩 라우팅 구현
- 각 페이지를 page.tsx로 변환

#### 4단계: 스타일 / 리소스 Layer ✅
- CSS 병합 (globals.css)
- Tailwind config 업데이트
- 정적 파일 이동 준비

#### 5단계: 코드 변환 Layer ✅
- React Router → Next.js Link/useRouter 변환
- import.meta.env → process.env 변환
- 'use client' 자동 삽입
- SSR-breaking 코드 보호

#### 6단계: API / ENV / SEO Layer ✅
- 환경변수 rewrite (VITE_ → NEXT_PUBLIC_)
- SEO/metadata 변환
- favicon 설정

---

## 🆕 추가로 필요한 단계 (실제 구현 중 발견)

### 7단계: PostCSS 설정 변환 ⚠️ **필수**

**문제**: Next.js 15에서 PostCSS 설정 형식 요구사항

**해결**:
```javascript
// postcss.config.js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

**체크리스트**:
- [ ] `module.exports` 형식 사용 (CommonJS)
- [ ] `plugins` 키가 객체 형식인지 확인
- [ ] 배열 형식 `[require('tailwindcss')]`는 Next.js 15에서 문제 발생 가능

---

### 8단계: next/font 설정 최적화 ⚠️ **필수**

**문제**: Google Fonts 로딩 방식 차이

**해결**:
```typescript
// app/layout.tsx
const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap', // 추가
})

// CSS 변수 사용
// globals.css
body {
  font-family: var(--font-inter), var(--font-roboto), sans-serif;
}
```

**체크리스트**:
- [ ] `display: 'swap'` 추가
- [ ] `variable` 사용 시 CSS 변수로 적용
- [ ] `className`과 `variable` 동시 사용 금지

---

### 9단계: API Route 생성 (서버 사이드 프록시) ⚠️ **필수**

**문제**: 클라이언트에서 직접 TMDB API 호출 시 "Host not permitted" (403) 오류

**해결**:
```typescript
// app/api/[...path]/route.ts
export async function GET(request: NextRequest, { params }) {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY
  const path = params.path.join('/')
  const searchParams = request.nextUrl.searchParams
  searchParams.set('api_key', apiKey)
  
  const url = `https://api.themoviedb.org/3/${path}?${searchParams.toString()}`
  const response = await fetch(url)
  return NextResponse.json(await response.json())
}
```

**체크리스트**:
- [ ] `/app/api/[...path]/route.ts` 생성
- [ ] 서버 사이드에서 API 키 사용
- [ ] 클라이언트는 `/api`로 요청
- [ ] next.config.js의 rewrites 제거 (API Route 사용 시)

---

### 10단계: Hydration 오류 방지 ⚠️ **필수**

**문제**: 서버와 클라이언트 렌더링 불일치

**해결**:
```typescript
// 컴포넌트에서
const [mounted, setMounted] = useState(false)

useEffect(() => {
  setMounted(true)
}, [])

// 렌더링 시
{mounted && condition ? <ComponentA /> : <ComponentB />}
```

**체크리스트**:
- [ ] 클라이언트 전용 상태는 `mounted` 체크 후 렌더링
- [ ] `localStorage`, `window` 접근은 `useEffect` 내부에서만
- [ ] 서버/클라이언트 분기 코드 제거

---

### 11단계: 환경 변수 검증 및 디버깅 ⚠️ **권장**

**문제**: 환경 변수가 로드되지 않거나 잘못된 값

**해결**:
```typescript
// src/utils/api.ts
if (typeof window !== 'undefined') {
  console.log('API Configuration:', {
    apiKeyExists: !!process.env.NEXT_PUBLIC_TMDB_API_KEY,
    apiKeyLength: process.env.NEXT_PUBLIC_TMDB_API_KEY?.length,
    baseURL: process.env.NEXT_PUBLIC_TMDB_API_BASE_URL,
  })
}
```

**체크리스트**:
- [ ] `.env.local` 파일 존재 확인
- [ ] 변수명이 `NEXT_PUBLIC_` 접두사로 시작하는지 확인
- [ ] 서버 재시작 후 환경 변수 로드 확인
- [ ] 디버깅 로그 추가

---

### 12단계: 에러 처리 개선 ⚠️ **권장**

**문제**: 에러 객체가 비어있거나 정보 부족

**해결**:
```typescript
// 상세한 에러 로깅
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error Details:', {
      message: error?.message,
      status: error?.response?.status,
      data: error?.response?.data,
      url: error?.config?.url,
      fullURL: `${error.config.baseURL}${error.config.url}`,
    })
    return Promise.reject(error)
  }
)
```

**체크리스트**:
- [ ] 요청/응답 인터셉터 추가
- [ ] 상세한 에러 로깅
- [ ] 사용자 친화적 에러 메시지

---

### 13단계: Stores 초기화 최적화 ⚠️ **권장**

**문제**: 모듈 레벨에서 localStorage 접근 시 SSR 오류

**해결**:
```typescript
// stores/authStore.ts
'use client'

const getInitialUser = () => {
  if (typeof window !== 'undefined') {
    const savedUser = localStorage.getItem('netflix_user')
    return savedUser ? JSON.parse(savedUser) : null
  }
  return null
}

export const useAuthStore = create((set) => ({
  user: getInitialUser(), // store 생성 시점에 호출
  // ...
}))
```

**체크리스트**:
- [ ] stores에 'use client' 추가
- [ ] 모듈 레벨 초기화 제거
- [ ] 함수를 store 생성 시점에 호출

---

## 🐛 발생한 오류 및 해결 방법

### 오류 1: PostCSS Configuration Error
**증상**: `Error: Your custom PostCSS configuration must export a plugins key`

**원인**: Next.js 15가 특정 PostCSS 형식을 요구

**해결**: `module.exports` 형식으로 변경, `plugins`를 객체로 설정

---

### 오류 2: next/font Error
**증상**: `An error occurred in next/font`

**원인**: PostCSS 설정 문제 또는 폰트 설정 오류

**해결**: PostCSS 수정 + `display: 'swap'` 추가

---

### 오류 3: Internal Server Error (500)
**증상**: 페이지 로드 시 500 오류

**원인**: 
- 모듈 레벨에서 `window`/`localStorage` 접근
- Stores 초기화 문제

**해결**: 
- 모든 클라이언트 전용 코드를 `useEffect`로 이동
- Stores 초기화를 함수로 변경

---

### 오류 4: 401/403 API 오류
**증상**: `Request failed with status code 401/403`, `Host not permitted`

**원인**: 
- 환경 변수 미설정 또는 잘못된 변수명
- 클라이언트에서 직접 외부 API 호출

**해결**:
- 환경 변수명을 `NEXT_PUBLIC_` 접두사로 변경
- API Route 생성하여 서버 사이드 프록시 사용

---

### 오류 5: Hydration Error
**증상**: `Hydration failed because the server rendered text didn't match the client`

**원인**: 서버와 클라이언트에서 다른 내용 렌더링

**해결**: `mounted` 상태로 클라이언트 전용 렌더링 제어

---

### 오류 6: 환경 변수 로딩 실패
**증상**: API 키가 `undefined` 또는 빈 문자열

**원인**: 
- `.env` 파일의 변수명이 `VITE_` 접두사 사용
- 서버 재시작 안 함

**해결**: 
- 변수명을 `NEXT_PUBLIC_`로 변경
- 서버 재시작

---

## 🚀 최종 체크리스트

### 필수 단계
- [x] 0-6단계: 기본 마이그레이션
- [x] 7단계: PostCSS 설정
- [x] 8단계: next/font 최적화
- [x] 9단계: API Route 생성
- [x] 10단계: Hydration 오류 방지
- [x] 11단계: 환경 변수 검증
- [x] 12단계: 에러 처리 개선
- [x] 13단계: Stores 최적화

### 추가 권장 사항
- [ ] 이미지 최적화 (next/image 사용)
- [ ] 메타데이터 개선 (동적 metadata)
- [ ] 로딩 상태 UI 개선
- [ ] 에러 바운더리 추가
- [ ] 성능 모니터링 추가

---

## ⚡ Next.js가 빠르지 않은 이유

### 1. 개발 모드 특성
**Vite vs Next.js 개발 모드**:
- **Vite**: ESM 기반, 매우 빠른 HMR (Hot Module Replacement)
- **Next.js**: Webpack 기반, 더 무거운 빌드 프로세스

**Next.js가 느린 이유**:
- 서버 사이드 렌더링(SSR)을 위한 추가 처리
- API Route 컴파일
- 타입 체크 및 번들링
- Fast Refresh (HMR보다 느림)

### 2. 현재 프로젝트 설정
**느려지는 요인**:
- **API Route**: 매 요청마다 서버 사이드 처리
- **클라이언트 컴포넌트 많음**: 'use client'가 많으면 번들 크기 증가
- **디버깅 로그**: 콘솔 로그가 많으면 성능 저하
- **환경 변수 체크**: 매번 환경 변수 검증

### 3. 최적화 방법

#### 즉시 적용 가능:
```typescript
// 1. 프로덕션 모드에서 디버깅 로그 제거
if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
  console.log('Debug info')
}

// 2. 불필요한 리렌더링 방지
const memoizedComponent = useMemo(() => <Component />, [deps])

// 3. 이미지 최적화
import Image from 'next/image'
<Image src={url} width={500} height={300} />
```

#### 설정 최적화:
```javascript
// next.config.js
const nextConfig = {
  // 프로덕션 빌드 최적화
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // 실험적 기능 (더 빠른 빌드)
  experimental: {
    optimizeCss: true,
  },
}
```

### 4. 성능 비교

**Vite 개발 모드**:
- 초기 로드: ~500ms
- HMR: ~50ms
- 빌드: 매우 빠름

**Next.js 개발 모드**:
- 초기 로드: ~2-3초
- Fast Refresh: ~200-500ms
- 빌드: 느림 (Webpack)

**Next.js 프로덕션 모드**:
- 초기 로드: 매우 빠름 (최적화됨)
- 페이지 전환: 매우 빠름 (클라이언트 사이드)
- SSR: 빠름

### 5. 결론

**Next.js가 느린 이유**:
1. 개발 모드에서 SSR 처리 오버헤드
2. Webpack 기반 빌드 시스템
3. API Route 서버 사이드 처리
4. 타입 체크 및 번들링

**하지만 프로덕션에서는**:
- 최적화된 번들
- 코드 스플리팅
- 이미지 최적화
- SSR/SSG로 인한 빠른 초기 로드

**개발 경험 개선**:
- 프로덕션 빌드로 테스트: `npm run build && npm start`
- Turbopack 사용 (Next.js 13+): `next dev --turbo`
- 불필요한 로그 제거
- API Route 캐싱 추가

---

## 📝 마이그레이션 완료 체크리스트

### 기본 변환
- [x] Next.js 설치 및 설정
- [x] 폴더 구조 변환
- [x] 라우팅 변환
- [x] 환경 변수 변환

### 오류 해결
- [x] PostCSS 설정
- [x] next/font 설정
- [x] API Route 생성
- [x] Hydration 오류
- [x] 환경 변수 검증
- [x] 에러 처리

### 최적화 (선택)
- [ ] 이미지 최적화
- [ ] 메타데이터 개선
- [ ] 성능 모니터링
- [ ] 에러 바운더리

---

**마이그레이션 완료! 🎉**

