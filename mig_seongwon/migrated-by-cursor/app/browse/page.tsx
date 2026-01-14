'use client'

import { Helmet } from 'react-helmet-async'
import { useMovies } from '@/hooks/useMovies'
import { API_ENDPOINTS } from '@/utils/constants'
import Hero from '@/components/Hero'
import MovieRow from '@/components/MovieRow'
import Navbar from '@/components/Navbar'
import styles from '@/pages/Browse.module.css'

// Intentional SSR-breaking: window access and scroll listener at module top-level
// Next.js에서는 'use client'로 감싸져 있으므로 클라이언트에서만 실행됨
if (typeof window !== 'undefined') {
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY
    document.body.setAttribute('data-scroll', scrollY.toString())
  })
}

export default function BrowsePage() {
  const { movies: popularMovies } = useMovies(API_ENDPOINTS.POPULAR)
  const { movies: trendingMovies } = useMovies(API_ENDPOINTS.TRENDING)
  const { movies: topRatedMovies } = useMovies(API_ENDPOINTS.TOP_RATED)
  const { movies: nowPlayingMovies } = useMovies(API_ENDPOINTS.NOW_PLAYING)

  const featuredMovie = popularMovies[0]

  return (
    <>
      <Helmet>
        <title>Browse - Netflix Clone</title>
        <meta name="description" content="Browse movies and TV shows" />
        <meta property="og:title" content="Browse - Netflix Clone" />
        <meta property="og:description" content="Browse movies and TV shows" />
      </Helmet>
      <div className={`${styles.browseContainer} bg-netflix-black min-h-screen`}>
        <Navbar />
        {featuredMovie && <Hero movie={featuredMovie} />}
        <div className="relative z-10">
          <MovieRow title="Popular Now" movies={popularMovies} />
          <MovieRow title="Trending Today" movies={trendingMovies} />
          <MovieRow title="Top Rated" movies={topRatedMovies} />
          <MovieRow title="Now Playing" movies={nowPlayingMovies} />
        </div>
      </div>
    </>
  )
}

