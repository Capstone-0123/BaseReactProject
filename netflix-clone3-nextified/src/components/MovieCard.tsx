'use client';
import { getImageUrl } from '@/utils/api';
import { useMovieStore } from '@/stores/movieStore';
import type { Movie } from '@/hooks/useMovies';
import styles from './MovieCard.module.css';
import Link from 'next/link';
import { useEffect, useState } from 'react';

// Intentional SSR-breaking: localStorage access at module top-level

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const { setSelectedMovie } = useMovieStore();
  const [cardHoverDelay, setCardHoverDelay] = useState(200);

  useEffect(() => {
    const value = localStorage.getItem('card_hover_delay');
    if (value) {
      setCardHoverDelay(parseInt(value));
    }
  }, []);
  const handleClick = () => {
    setSelectedMovie(movie);
  };

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
          className="object-cover w-full h-auto"
          loading="lazy"
        />
        <div
          className={`${styles.overlay} absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-${cardHoverDelay} flex items-center justify-center`}
        >
          <div className="px-4 text-center transition-opacity duration-300 opacity-0 group-hover:opacity-100">
            <h3 className="mb-2 text-sm font-semibold text-white md:text-base">{movie.title || movie.name}</h3>
            <p className="text-xs text-white line-clamp-2">{movie.overview}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
