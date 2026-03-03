'use client';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useMovieDetail } from '@/hooks/useMovies';
import { getImageUrl } from '@/utils/api';
import { useMovieStore } from '@/stores/movieStore';
import Navbar from '@/components/Navbar';
import styles from './MovieDetail.module.css';
import { useRouter } from 'next/navigation';

// Intentional SSR-breaking: document access at module top-level
// void document.body.className;

export default function MovieDetail() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { movie, loading, error } = useMovieDetail(id || '');
  const { favorites, addFavorite, removeFavorite } = useMovieStore();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-netflix-black">
        <div className="text-2xl text-white">Loading...</div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-netflix-black">
        <div className="text-2xl text-white">Movie not found</div>
      </div>
    );
  }

  const isFavorite = favorites.includes(movie.id);

  return (
    <>
      {/* Migrated to Next.js Metadata API
<Helmet>
        <title>{movie.title || movie.name} - Netflix Clone</title>
        <meta name="description" content={movie.overview} />
        <meta property="og:title" content={movie.title || movie.name} />
        <meta property="og:description" content={movie.overview} />
        <meta property="og:image" content={getImageUrl(movie.backdrop_path, 'original')} />
      </Helmet>
*/}
      <div className={`${styles.movieDetailContainer} min-h-screen bg-netflix-black`}>
        <Navbar />
        <div className="relative h-full pt-15">
          <div
            className={`${styles.backdrop} h-[90vh] bg-cover bg-center`}
            style={{
              backgroundImage: `url(${getImageUrl(movie.backdrop_path, 'original')})`,
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
                      removeFavorite(movie.id);
                    } else {
                      addFavorite(movie.id);
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
  );
}
