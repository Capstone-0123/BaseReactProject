import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Movie } from '../types/movie'
import {
  fetchNetflixOriginals,
  fetchTrending,
  fetchPopular,
  fetchTopRated,
  fetchActionMovies,
  fetchComedyMovies,
  fetchHorrorMovies,
  fetchDocumentaries,
  fetchTvPopular,
} from '../api/tmdb'
import MovieRow from '../components/MovieRow'
import styles from './Browse.module.css'

interface MovieSection {
  title: string
  movies: Movie[]
  showNetflixLogo?: boolean
}

const categoryTitles: Record<string, string> = {
  tv: 'TV 프로그램',
  movie: '영화',
  originals: '넷플릭스 오리지널',
  new: '최신 등록 콘텐츠',
}

const Browse = () => {
  const { category } = useParams<{ category?: string }>()
  const [sections, setSections] = useState<MovieSection[]>([])
  const [loading, setLoading] = useState(true)

  const pageTitle = category ? categoryTitles[category] || '탐색' : '탐색'

  useEffect(() => {
    const fetchMoviesByCategory = async () => {
      setLoading(true)
      try {
        let fetchedSections: MovieSection[] = []

        switch (category) {
          case 'tv':
            const [tvPopular, tvNetflix] = await Promise.all([
              fetchTvPopular(),
              fetchNetflixOriginals(),
            ])
            fetchedSections = [
              { title: '인기 TV 프로그램', movies: tvPopular, showNetflixLogo: true },
              { title: '넷플릭스 시리즈', movies: tvNetflix, showNetflixLogo: true },
            ]
            break

          case 'movie':
            const [popular, topRated, action, comedy, horror] = await Promise.all([
              fetchPopular(),
              fetchTopRated(),
              fetchActionMovies(),
              fetchComedyMovies(),
              fetchHorrorMovies(),
            ])
            fetchedSections = [
              { title: '인기 영화', movies: popular, showNetflixLogo: false },
              { title: '최고 평점 영화', movies: topRated, showNetflixLogo: false },
              { title: '액션 & 어드벤처', movies: action, showNetflixLogo: false },
              { title: '코미디', movies: comedy, showNetflixLogo: false },
              { title: '공포', movies: horror, showNetflixLogo: false },
            ]
            break

          case 'originals':
            const [originals, trending] = await Promise.all([
              fetchNetflixOriginals(),
              fetchTrending(),
            ])
            fetchedSections = [
              { title: 'Netflix 오리지널', movies: originals, showNetflixLogo: true },
              { title: '지금 뜨는 콘텐츠', movies: trending, showNetflixLogo: true },
            ]
            break

          case 'new':
            const [newPopular, newDocs] = await Promise.all([
              fetchPopular(),
              fetchDocumentaries(),
            ])
            fetchedSections = [
              { title: '새로 올라온 콘텐츠', movies: newPopular, showNetflixLogo: true },
              { title: '다큐멘터리', movies: newDocs, showNetflixLogo: false },
            ]
            break

          default:
            const [allTrending, allPopular, allTopRated] = await Promise.all([
              fetchTrending(),
              fetchPopular(),
              fetchTopRated(),
            ])
            fetchedSections = [
              { title: '지금 뜨는 콘텐츠', movies: allTrending, showNetflixLogo: true },
              { title: '인기 콘텐츠', movies: allPopular, showNetflixLogo: false },
              { title: '최고 평점', movies: allTopRated, showNetflixLogo: false },
            ]
        }

        setSections(fetchedSections)
      } catch (error) {
        console.error('Error fetching movies:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchMoviesByCategory()
  }, [category])

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loader}></div>
      </div>
    )
  }

  return (
    <main className={styles.main}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>{pageTitle}</h1>
      </div>

      <div className={styles.content}>
        {sections.map((section, index) => (
          <MovieRow
            key={index}
            title={section.title}
            movies={section.movies}
            showNetflixLogo={section.showNetflixLogo}
          />
        ))}
      </div>
    </main>
  )
}

export default Browse

