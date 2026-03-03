'use client';
import { useRef } from 'react';
import MovieCard from './MovieCard';
import type { Movie } from '@/hooks/useMovies';
import styles from './MovieRow.module.css';

// Intentional SSR-breaking: window access at module top-level

interface MovieRowProps {
  title: string;
  movies: Movie[];
}

export default function MovieRow({ title, movies }: MovieRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);
  const scrollSpeed = typeof window !== 'undefined' && window.innerWidth > 768 ? 500 : 300;
  const scroll = (direction: 'left' | 'right') => {
    if (rowRef.current) {
      const scrollAmount = scrollSpeed;
      rowRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  if (movies.length === 0) {
    return null;
  }

  return (
    <div className={`${styles.movieRow} mb-8`}>
      <div className="flex items-center justify-between px-8 mb-4">
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        <div className="flex gap-2">
          <button
            onClick={() => scroll('left')}
            className="px-4 py-2 text-white transition rounded bg-netflix-red hover:bg-red-600"
          >
            ‹
          </button>
          <button
            onClick={() => scroll('right')}
            className="px-4 py-2 text-white transition rounded bg-netflix-red hover:bg-red-600"
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
  );
}
