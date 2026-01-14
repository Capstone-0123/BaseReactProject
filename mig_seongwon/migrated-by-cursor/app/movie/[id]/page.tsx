'use client'

import { useParams, useRouter } from 'next/navigation'
import { Helmet } from 'react-helmet-async'
import { useMovieDetail } from '@/hooks/useMovies'
import { getImageUrl } from '@/utils/api'
import { useMovieStore } from '@/stores/movieStore'
import Navbar from '@/components/Navbar'
import styles from '@/pages/MovieDetail.module.css'

// Intentional SSR-breaking: document access at module top-level
// Next.js에서는 'use client'로 감싸져 있으므로 클라이언트에서만 실행됨
if (typeof window !== 'undefined') {
  void document.body.className
}

export default function MovieDetailPage() {
  const params = useParams()
  const id = params?.id as string
  const router = useRouter()
  const { movie, loading, error } = useMovieDetail(id || '')
  const { favorites, addFavorite, removeFavorite } = useMovieStore()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-netflix-black">
        <div className="text-2xl text-white">Loading...</div>
      </div>
    )
  }

  if (error || !movie) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-netflix-black">
        <div className="text-2xl text-white">
          {error || 'Movie not found'}
        </div>
      </div>
    )
  }

  const isFavorite = favorites.includes(movie.id)
  
  // backdrop_path가 없을 경우 처리
  const backdropUrl = movie.backdrop_path ? getImageUrl(movie.backdrop_path, 'original') : ''

  return (
    <>
      <Helmet>
        <title>{movie.title || movie.name} - Netflix Clone</title>
        <meta name="description" content={movie.overview} />
        <meta property="og:title" content={movie.title || movie.name} />
        <meta property="og:description" content={movie.overview} />
        {movie.backdrop_path && (
          <meta property="og:image" content={getImageUrl(movie.backdrop_path, 'original')} />
        )}
      </Helmet>
      <div className={`${styles.movieDetailContainer} min-h-screen bg-netflix-black`}>
        <Navbar />
        <div className="relative h-full pt-15">
          <div
            className={`${styles.backdrop} h-[90vh] bg-cover bg-center`}
            style={{
              backgroundImage: backdropUrl ? `url(${backdropUrl})` : 'none',
              backgroundColor: backdropUrl ? 'transparent' : '#141414',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-netflix-black via-black/50 to-transparent" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
            <div className="max-w-4xl">
              <h1 className="mb-4 text-4xl font-bold text-white md:text-6xl">{movie.title || movie.name}</h1>
              <p className="max-w-2xl mb-4 text-lg text-gray-300">{movie.overview}</p>
              <div className="flex gap-4 mb-6">
                <button className="px-8 py-3 font-semibold text-black transition bg-white rounded hover:bg-gray-200">
                  Play
                </button>
                <button
                  onClick={() => {
                    if (isFavorite) {
                      removeFavorite(movie.id)
                    } else {
                      addFavorite(movie.id)
                    }
                  }}
                  className="px-8 py-3 font-semibold text-white transition bg-gray-600 rounded hover:bg-gray-700"
                >
                  {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                </button>
                <button
                  onClick={() => router.back()}
                  className="px-8 py-3 font-semibold text-white transition bg-gray-600 rounded hover:bg-gray-700"
                >
                  Back
                </button>
              </div>
              <div className="text-gray-400">
                <span>Rating: {movie.vote_average.toFixed(1)}/10</span>
                <span className="ml-4">Release Date: {movie.release_date || movie.first_air_date}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

