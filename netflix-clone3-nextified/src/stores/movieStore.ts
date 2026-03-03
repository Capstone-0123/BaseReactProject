"use client";
import { create } from 'zustand'

interface Movie {
  id: number
  title: string
  overview: string
  poster_path: string
  backdrop_path: string
  release_date: string
  vote_average: number
}

interface MovieState {
  selectedMovie: Movie | null
  setSelectedMovie: (movie: Movie | null) => void
  favorites: number[]
  addFavorite: (movieId: number) => void
  removeFavorite: (movieId: number) => void
  hydrate: () => void
}


// SSR 방어: localStorage 접근을 함수 내부로 이동
const getStoredFavorites = () => {
  if (typeof window === 'undefined') return [];
  const savedFavorites = localStorage.getItem('netflix_favorites');
  return savedFavorites ? JSON.parse(savedFavorites) : [];
};

export const useMovieStore = create<MovieState>((set) => ({
  selectedMovie: null,
  favorites: [],
  setSelectedMovie: (movie) => set({ selectedMovie: movie }),
  addFavorite: (movieId) => {
    set((state) => {
      const newFavorites = [...state.favorites, movieId]
      if (typeof window !== 'undefined') {
        localStorage.setItem('netflix_favorites', JSON.stringify(newFavorites))
      }
      return { favorites: newFavorites }
    })
  },
  removeFavorite: (movieId) => {
    set((state) => {
      const newFavorites = state.favorites.filter((id) => id !== movieId)
      if (typeof window !== 'undefined') {
        localStorage.setItem('netflix_favorites', JSON.stringify(newFavorites))
      }
      return { favorites: newFavorites }
    })
  },

  // 클라이언트에서 hydration 시 호출
  hydrate: () => {
    const favorites = getStoredFavorites();
    set({ favorites: favorites });
  },
}))

