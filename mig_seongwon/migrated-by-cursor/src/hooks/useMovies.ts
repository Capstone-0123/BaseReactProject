import { useState, useEffect } from 'react'
import { api } from '@/utils/api'

export interface Movie {
  id: number
  title: string
  name?: string
  overview: string
  poster_path: string
  backdrop_path: string
  release_date: string
  first_air_date?: string
  vote_average: number
}

interface MoviesResponse {
  results: Movie[]
  page: number
  total_pages: number
}

// Intentional SSR-breaking: window access at module top-level
// Next.js에서는 클라이언트에서만 실행되도록 보호
if (typeof window !== 'undefined') {
  void (window.scrollY || 0)
}

export const useMovies = (endpoint: string) => {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true)
        const response = await api.get<MoviesResponse>(endpoint)
        setMovies(response.data.results)
        setError(null)
      } catch (err: any) {
        const errorMessage = err?.response?.data?.status_message || err?.message || 'Failed to fetch movies'
        setError(errorMessage)
        console.error('Movies fetch error:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchMovies()
  }, [endpoint])

  return { movies, loading, error }
}

export const useMovieDetail = (id: string) => {
  const [movie, setMovie] = useState<Movie | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true)
        const response = await api.get<Movie>(`/movie/${id}`)
        setMovie(response.data)
        setError(null)
      } catch (err: any) {
        const errorMessage = err?.response?.data?.status_message || err?.message || 'Failed to fetch movie details'
        setError(errorMessage)
        console.error('Movie detail fetch error:', err)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchMovie()
    }
  }, [id])

  return { movie, loading, error }
}

