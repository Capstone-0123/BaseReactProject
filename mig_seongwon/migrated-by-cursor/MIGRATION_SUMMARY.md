# React → Next.js 마이그레이션 완료 요약

## ✅ 완료된 작업

### 0단계: 기본 환경/초기 상태 준비
- ✅ 프로젝트 존재 여부 확인
- ✅ src/index.html, main.tsx 확인
- ✅ React/Vite 프로젝트 판별

### 1단계: 환경/빌드 시스템 변환
- ✅ Next.js 설치 및 설정
- ✅ Vite 플러그인 제거
- ✅ next.config.js 생성 (rewrites, webpack 설정 포함)
- ✅ package.json scripts 수정 (dev, build, start, lint)
- ✅ vite.config.ts 삭제
- ✅ tsconfig.json 재생성 (Next.js 호환)

### 2단계: 구조 기반 Layer
- ✅ /app 디렉토리 생성
- ✅ components, hooks, stores, utils는 src에 유지
- ✅ /public 구조 정리
- ✅ app/layout.tsx 생성 (Root Layout)
- ✅ app/providers.tsx 생성 (Global Context 이관용)
- ✅ app/page.tsx 생성 (메인 페이지)
- ✅ app/not-found.tsx 생성 (404 페이지)
- ✅ app/globals.css 생성 (index.css + App.css + global.css 병합)
- ✅ index.html → layout.tsx로 metadata 이관
- ✅ main.tsx → providers.tsx로 Providers 이관
- ✅ 전역 CSS import를 layout.tsx로 이관

### 3단계: 라우팅/페이지 변환
- ✅ React Router → Next.js App Router 변환
- ✅ 파일 기반 라우팅 생성:
  - `/` → app/page.tsx
  - `/login` → app/login/page.tsx
  - `/browse` → app/browse/page.tsx
  - `/movie/[id]` → app/movie/[id]/page.tsx
  - `/dashboard` → app/dashboard/layout.tsx
  - `/dashboard/profile` → app/dashboard/profile/page.tsx
  - `/dashboard/posts` → app/dashboard/posts/page.tsx
- ✅ 각 페이지를 Next.js page.tsx로 변환
- ✅ 동적 라우팅 (`[id]`) 구현
- ✅ 중첩 라우팅 (dashboard) 구현

### 4단계: 스타일 / 리소스 Layer
- ✅ CSS 자동 변환 및 병합 (globals.css)
- ✅ Tailwind config 업데이트 (app 디렉토리 포함)
- ✅ 정적 파일 이동 준비 (src/assets → public)

### 5단계: 코드 변환 Layer
- ✅ React Router import → Next.js Link, useRouter 변환
- ✅ `Link to=` → `Link href=` 변환
- ✅ `useNavigate` → `useRouter().push()` 변환
- ✅ `useParams` → Next.js `useParams` 변환
- ✅ `NavLink` → `Link` + `usePathname` 변환
- ✅ `import.meta.env` → `process.env` 변환
- ✅ 'use client' 자동 삽입 (필요한 컴포넌트에)
- ✅ SSR-breaking 코드 보호 (typeof window !== 'undefined' 체크)

### 6단계: API / ENV / SEO Layer
- ✅ API 경로 rewrite (import.meta.env → process.env)
- ✅ axios baseURL 정리
- ✅ 환경변수 rewrite (VITE_ → NEXT_PUBLIC_)
- ✅ .env.local.example 생성
- ✅ env.d.ts 생성 (Next.js 환경 변수 타입)
- ✅ SEO/metadata 변환 (layout.tsx에 metadata 객체)
- ✅ favicon 설정

## 📝 주요 변경사항

### 패키지 변경
- **추가**: `next`, `@svgr/webpack`, `eslint-config-next`
- **제거**: `react-router-dom`, `@vitejs/plugin-react`, `vite-plugin-svgr`, `vite`

### 파일 구조 변경
```
기존:
src/
  pages/
  components/
  App.tsx
  main.tsx
index.html

변경 후:
app/
  layout.tsx
  page.tsx
  login/page.tsx
  browse/page.tsx
  movie/[id]/page.tsx
  dashboard/layout.tsx
  dashboard/profile/page.tsx
  dashboard/posts/page.tsx
src/
  components/ (유지)
  hooks/ (유지)
  stores/ (유지)
  utils/ (유지)
```

### 환경 변수 변경
- `VITE_TMDB_API_KEY` → `NEXT_PUBLIC_TMDB_API_KEY`
- `VITE_TMDB_IMAGE_BASE_URL` → `NEXT_PUBLIC_TMDB_IMAGE_BASE_URL`
- `VITE_TMDB_API_BASE_URL` → `NEXT_PUBLIC_TMDB_API_BASE_URL`

### 라우팅 변경
- `BrowserRouter`, `Routes`, `Route` → 파일 기반 라우팅
- `Link to=` → `Link href=`
- `useNavigate()` → `useRouter().push()`
- `useParams()` → Next.js `useParams()`
- `NavLink` → `Link` + `usePathname()`

## ⚠️ 주의사항

1. **환경 변수 설정 필요**: `.env.local` 파일을 생성하고 `NEXT_PUBLIC_` 접두사를 사용하세요.
2. **Favicon**: `/app/favicon.ico` 또는 `/app/icon.png` 파일을 추가하세요.
3. **SSR 호환성**: 일부 컴포넌트는 'use client'로 표시되어 클라이언트에서만 실행됩니다.
4. **백업 파일**: 원본 파일들은 `.backup` 확장자로 보관되었습니다.

## 🚀 다음 단계

1. `.env.local` 파일 생성 및 환경 변수 설정
2. `npm install` 실행하여 Next.js 의존성 설치
3. `npm run dev` 실행하여 개발 서버 시작
4. 빌드 테스트: `npm run build`
5. 필요시 추가 최적화 (이미지 최적화, 메타데이터 개선 등)

## 📚 참고 파일

- 백업 파일: `*.backup` (원본 파일 보관)
- 설정 파일: `next.config.js`, `tsconfig.json`, `tailwind.config.js`
- 환경 변수 예제: `.env.local.example`

