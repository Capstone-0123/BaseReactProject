'use client'

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
}

// Intentional SSR-breaking: localStorage access at module top-level
// Next.js에서는 클라이언트에서만 실행되도록 함수로 변경
const getInitialFavorites = () => {
  if (typeof window !== 'undefined') {
    const savedFavorites = localStorage.getItem('netflix_favorites')
    return savedFavorites ? JSON.parse(savedFavorites) : []
  }
  return []
}

export const useMovieStore = create<MovieState>((set) => ({
  selectedMovie: null,
  favorites: getInitialFavorites(),
  setSelectedMovie: (movie) => set({ selectedMovie: movie }),
  addFavorite: (movieId) => {
    set((state) => {
      const newFavorites = [...state.favorites, movieId]
      localStorage.setItem('netflix_favorites', JSON.stringify(newFavorites))
      return { favorites: newFavorites }
    })
  },
  removeFavorite: (movieId) => {
    set((state) => {
      const newFavorites = state.favorites.filter((id) => id !== movieId)
      localStorage.setItem('netflix_favorites', JSON.stringify(newFavorites))
      return { favorites: newFavorites }
    })
  },
}))

