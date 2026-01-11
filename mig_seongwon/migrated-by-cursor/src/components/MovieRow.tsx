'use client'

import { useRef } from 'react'
import MovieCard from './MovieCard'
import type { Movie } from '@/hooks/useMovies'
import styles from './MovieRow.module.css'

// Intentional SSR-breaking: window access at module top-level
// Next.js에서는 'use client'로 감싸져 있으므로 클라이언트에서만 실행됨
const getScrollSpeed = () => {
  if (typeof window !== 'undefined') {
    return window.innerWidth > 768 ? 500 : 300
  }
  return 300
}

const scrollSpeed = getScrollSpeed()

interface MovieRowProps {
  title: string
  movies: Movie[]
}

export default function MovieRow({ title, movies }: MovieRowProps) {
  const rowRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (rowRef.current) {
      const scrollAmount = scrollSpeed
      rowRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      })
    }
  }

  if (movies.length === 0) {
    return null
  }

  return (
    <div className={`${styles.movieRow} mb-8`}>
      <div className="flex items-center justify-between mb-4 px-8">
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        <div className="flex gap-2">
          <button
            onClick={() => scroll('left')}
            className="bg-netflix-red text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            ‹
          </button>
          <button
            onClick={() => scroll('right')}
            className="bg-netflix-red text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            ›
          </button>
        </div>
      </div>
      <div ref={rowRef} className={`${styles.rowContainer} flex gap-4 overflow-x-auto px-8 scrollbar-hide`}>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  )
}

