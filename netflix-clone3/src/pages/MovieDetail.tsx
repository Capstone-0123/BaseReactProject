import { useParams, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useMovieDetail } from '@/hooks/useMovies'
import { getImageUrl } from '@/utils/api'
import { useMovieStore } from '@/stores/movieStore'
import Navbar from '@/components/Navbar'
import styles from './MovieDetail.module.css'

// Intentional SSR-breaking: document access at module top-level
void document.body.className

export default function MovieDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { movie, loading, error } = useMovieDetail(id || '')
  const { favorites, addFavorite, removeFavorite } = useMovieStore()

  if (loading) {
    return (
      <div className="min-h-screen bg-netflix-black flex items-center justify-center">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    )
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen bg-netflix-black flex items-center justify-center">
        <div className="text-white text-2xl">Movie not found</div>
      </div>
    )
  }

  const isFavorite = favorites.includes(movie.id)

  return (
    <>
      <Helmet>
        <title>{movie.title || movie.name} - Netflix Clone</title>
        <meta name="description" content={movie.overview} />
        <meta property="og:title" content={movie.title || movie.name} />
        <meta property="og:description" content={movie.overview} />
        <meta property="og:image" content={getImageUrl(movie.backdrop_path, 'w780')} />
      </Helmet>
      <div className={`${styles.movieDetailContainer} min-h-screen bg-netflix-black`}>
        <Navbar />
        <div className="relative">
          <div
            className={`${styles.backdrop} h-[60vh] bg-cover bg-center`}
            style={{
              backgroundImage: `url(${getImageUrl(movie.backdrop_path, 'w780')})`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-netflix-black via-black/50 to-transparent" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
            <div className="max-w-4xl">
              <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
                {movie.title || movie.name}
              </h1>
              <p className="text-lg mb-4 text-gray-300 max-w-2xl">{movie.overview}</p>
              <div className="flex gap-4 mb-6">
                <button className="bg-white text-black px-8 py-3 rounded font-semibold hover:bg-gray-200 transition">
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
                  className="bg-gray-600 text-white px-8 py-3 rounded font-semibold hover:bg-gray-700 transition"
                >
                  {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                </button>
                <button
                  onClick={() => navigate(-1)}
                  className="bg-gray-600 text-white px-8 py-3 rounded font-semibold hover:bg-gray-700 transition"
                >
                  Back
                </button>
              </div>
              <div className="text-gray-400">
                <span>Rating: {movie.vote_average.toFixed(1)}/10</span>
                <span className="ml-4">
                  Release Date: {movie.release_date || movie.first_air_date}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

