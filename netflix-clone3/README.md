# Netflix Clone - Vite → Next.js Migration Test Project

This is a comprehensive React + Vite + TypeScript project designed to stress-test automated Vite → Next.js (App Router) migration tooling.

## 🎯 Purpose

This project intentionally includes numerous migration edge cases and SSR-breaking patterns to test migration tools. **Do NOT simplify or optimize** - these patterns are intentional.

## 🛠️ Tech Stack

- **React 18**
- **Vite**
- **TypeScript**
- **React Router v6** (BrowserRouter, Routes, Route, Outlet)
- **Tailwind CSS**
- **CSS Modules**
- **Axios**
- **Zustand**
- **React Helmet Async**
- **SVGR** (SVG as React Components)
- **Environment variables** via `import.meta.env`
- **Vite dev server proxy**
- **Aliased imports** (`@/*`)

## 📁 Project Structure

```
/src
  /pages              # Page components (default exports)
    /dashboard        # Nested route group
      DashboardLayout.tsx
      DashboardProfile.tsx
      DashboardPosts.tsx
    Home.tsx
    Login.tsx
    Browse.tsx
    MovieDetail.tsx
  /components         # Reusable components
    Navbar.tsx
    Hero.tsx
    MovieRow.tsx
    MovieCard.tsx
  /hooks              # Custom hooks
    useMovies.ts
  /stores             # Zustand stores
    authStore.ts
    movieStore.ts
  /utils              # Utilities
    api.ts
    constants.ts
  /assets             # Static assets
    netflix-logo.svg
  /styles             # Global styles
    global.css
  /types              # TypeScript types
    global.d.ts
  App.tsx
  main.tsx
  index.css
  vite-env.d.ts
```

## 🚀 Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   Create a `.env` file in the root directory:
   ```env
   VITE_TMDB_API_KEY=your_api_key_here
   VITE_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p
   VITE_TMDB_API_BASE_URL=/api
   ```
   
   **설명:**
   - `VITE_TMDB_API_KEY`: **필수** - TMDB API 키 (무료 발급 가능)
   - `VITE_TMDB_IMAGE_BASE_URL`: **필수** - 영화 포스터/이미지 URL (기본값 있지만 명시 권장)
   - `VITE_TMDB_API_BASE_URL`: **필수** - `/api`로 설정 (Vite proxy 사용). 직접 호출하려면 `https://api.themoviedb.org/3` 사용 가능
   
   **How to get TMDB API key:**
   1. Go to https://www.themoviedb.org/
   2. Sign up for a free account
   3. Go to Settings → API
   4. Request an API key (it's free)
   5. Copy your API key and paste it in `.env` file
   
   **Important:** After creating/updating `.env` file, restart the dev server!

3. **Run development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

## 🎬 Features

### Routes
- `/` - Home page
- `/login` - Login page (fake auth)
- `/browse` - Main Netflix-style browse page
- `/movie/:id` - Movie detail page (dynamic route)
- `/dashboard` - Dashboard layout (nested routes)
  - `/dashboard/profile` - User profile
  - `/dashboard/posts` - User posts

### Netflix Clone Features
- Hero banner with featured movie
- Horizontal scrolling movie rows
- Movie cards with hover effects
- Movie detail pages
- Fake authentication
- Favorites system

## ⚠️ Intentional Migration Edge Cases

This project includes **intentional SSR-breaking patterns** for migration testing:

1. **Unguarded window/document access at module top-level:**
   - `window.innerWidth`, `window.scrollY`
   - `document.querySelector`, `document.body`
   - `localStorage` access outside components

2. **Browser-only event listeners:**
   - Scroll listeners at module level
   - DOMContentLoaded listeners

3. **Client-only libraries:**
   - Mock Swiper usage (browser-only)

4. **Vite-specific patterns:**
   - `import.meta.env` for environment variables
   - Vite proxy configuration
   - SVGR imports (`?react` suffix)
   - CSS Modules
   - Aliased imports (`@/*`)

5. **React Router v6 patterns:**
   - BrowserRouter (not compatible with SSR)
   - useNavigate, useParams, useLocation hooks
   - Nested routes with Outlet

6. **State management:**
   - Zustand stores accessing localStorage directly
   - Client-side state persistence

## 🔧 Configuration Files

- `vite.config.ts` - Vite configuration with aliases and proxy
- `tsconfig.json` - TypeScript configuration with path aliases
- `tailwind.config.js` - Tailwind CSS configuration
- `postcss.config.js` - PostCSS configuration

## 📝 Notes

- All pages use **default exports** (Vite convention)
- API calls use TMDB (The Movie Database) free API
- Images are loaded via `<img>` tags (not Next.js Image component)
- Styling uses Tailwind + CSS Modules + Global CSS
- SEO handled via react-helmet-async

## 🧪 Migration Testing

This project is designed to test:
- Route conversion (React Router → Next.js App Router)
- Environment variable migration (`import.meta.env` → `process.env`)
- Client component detection
- SSR compatibility fixes
- Asset import handling
- CSS Module conversion
- State management migration
- API route handling

---

**Remember:** This project intentionally includes problematic patterns for migration testing. Do not "fix" them - they are the test cases!
