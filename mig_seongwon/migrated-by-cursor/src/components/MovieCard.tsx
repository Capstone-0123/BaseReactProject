'use client'

import Link from 'next/link'
import { getImageUrl } from '@/utils/api'
import { useMovieStore } from '@/stores/movieStore'
import type { Movie } from '@/hooks/useMovies'
import styles from './MovieCard.module.css'

// Intentional SSR-breaking: localStorage access at module top-level
// Next.js에서는 'use client'로 감싸져 있으므로 클라이언트에서만 실행됨
const getCardHoverDelay = () => {
  if (typeof window !== 'undefined') {
    return parseInt(localStorage.getItem('card_hover_delay') || '200')
  }
  return 200
}

const cardHoverDelay = getCardHoverDelay()

interface MovieCardProps {
  movie: Movie
}

export default function MovieCard({ movie }: MovieCardProps) {
  const { setSelectedMovie } = useMovieStore()

  const handleClick = () => {
    setSelectedMovie(movie)
  }

  return (
    <Link
      href={`/movie/${movie.id}`}
      onClick={handleClick}
      className={`${styles.movieCard} flex-shrink-0 w-48 md:w-56 group cursor-pointer transition-transform duration-300 hover:scale-110`}
    >
      <div className="relative overflow-hidden rounded-lg">
        <img
          src={getImageUrl(movie.poster_path)}
          alt={movie.title || movie.name}
          className="w-full h-auto object-cover"
          loading="lazy"
        />
        <div
          className={`${styles.overlay} absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-${cardHoverDelay} flex items-center justify-center`}
        >
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center px-4">
            <h3 className="text-white font-semibold mb-2 text-sm md:text-base">
              {movie.title || movie.name}
            </h3>
            <p className="text-white text-xs line-clamp-2">{movie.overview}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}

