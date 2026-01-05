# Netflix Clone

TMDB API를 사용한 Netflix UI 클론 프로젝트입니다.

## 기술 스택

- React 18
- TypeScript
- Vite
- React Router DOM
- Axios
- Swiper
- CSS Modules

## 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. TMDB API 키 설정

1. [TMDB](https://www.themoviedb.org/) 사이트에서 계정을 만듭니다.
2. [API 설정 페이지](https://www.themoviedb.org/settings/api)에서 API 키를 발급받습니다.
3. `.env.example` 파일을 `.env`로 복사하고 API 키를 입력합니다:

```bash
cp .env.example .env
```

```env
VITE_TMDB_API_KEY=your_actual_api_key_here
```

### 3. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 http://localhost:3000 으로 접속하세요.

## 프로젝트 구조

```
netflix-clone/
├── public/
│   └── netflix-icon.svg
├── src/
│   ├── api/
│   │   └── tmdb.ts          # TMDB API 함수들
│   ├── components/
│   │   ├── Header.tsx       # 네비게이션 헤더
│   │   ├── MovieCard.tsx    # 영화 카드 컴포넌트
│   │   └── MovieRow.tsx     # 영화 캐러셀 행
│   ├── pages/
│   │   ├── Home.tsx         # 메인 홈페이지
│   │   └── Browse.tsx       # 탐색 페이지
│   ├── styles/
│   │   └── globals.css      # 전역 스타일
│   ├── types/
│   │   └── movie.ts         # TypeScript 타입 정의
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 기능

- Netflix 스타일의 헤더 네비게이션
- TMDB API를 통한 실제 영화/TV 데이터 표시
- Swiper를 사용한 가로 스크롤 캐러셀
- 반응형 디자인
- 영화 카드 호버 효과

## 주의사항

API 키 없이도 프로젝트는 실행되지만, 영화 데이터를 가져오지 못합니다.
TMDB API 키를 반드시 설정해주세요.

