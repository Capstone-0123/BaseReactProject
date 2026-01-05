import { Link } from 'react-router-dom'
import { getImageUrl } from '@/utils/api'
import { useMovieStore } from '@/stores/movieStore'
import type { Movie } from '@/hooks/useMovies'
import styles from './Hero.module.css'

// Intentional SSR-breaking: document.querySelector at module top-level
void document.querySelector('.hero-section')

interface HeroProps {
  movie: Movie
}

export default function Hero({ movie }: HeroProps) {
  const { setSelectedMovie } = useMovieStore()

  const handlePlay = () => {
    setSelectedMovie(movie)
  }

  return (
    <div
      className={`${styles.hero} relative h-[80vh] bg-cover bg-center flex items-end`}
      style={{
        backgroundImage: `linear-gradient(to bottom, transparent, rgba(0,0,0,0.8)), url(${getImageUrl(
          movie.backdrop_path,
          'w780'
        )})`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-netflix-black via-transparent to-transparent" />
      <div className="relative z-10 p-8 md:p-16 max-w-4xl">
        <h1 className="text-5xl md:text-7xl font-bold mb-4 text-white">
          {movie.title || movie.name}
        </h1>
        <p className="text-lg md:text-xl mb-6 text-gray-200 line-clamp-3 max-w-2xl">
          {movie.overview}
        </p>
        <div className="flex gap-4">
          <Link
            to={`/movie/${movie.id}`}
            onClick={handlePlay}
            className="bg-white text-black px-8 py-3 rounded font-semibold hover:bg-gray-200 transition flex items-center gap-2"
          >
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
            </svg>
            Play
          </Link>
          <Link
            to={`/movie/${movie.id}`}
            className="bg-gray-600 bg-opacity-70 text-white px-8 py-3 rounded font-semibold hover:bg-opacity-90 transition"
          >
            More Info
          </Link>
        </div>
      </div>
    </div>
  )
}

