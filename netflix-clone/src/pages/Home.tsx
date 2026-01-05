import { useState, useEffect } from 'react'
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
import styles from './Home.module.css'

interface MovieSection {
  title: string
  movies: Movie[]
  showNetflixLogo?: boolean
}

const Home = () => {
  const [sections, setSections] = useState<MovieSection[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAllMovies = async () => {
      try {
        const [
          netflixOriginals,
          trending,
          popular,
          topRated,
          actionMovies,
          comedyMovies,
          horrorMovies,
          documentaries,
          tvPopular,
        ] = await Promise.all([
          fetchNetflixOriginals(),
          fetchTrending(),
          fetchPopular(),
          fetchTopRated(),
          fetchActionMovies(),
          fetchComedyMovies(),
          fetchHorrorMovies(),
          fetchDocumentaries(),
          fetchTvPopular(),
        ])

        setSections([
          { title: 'Netflix 인기 콘텐츠', movies: netflixOriginals, showNetflixLogo: true },
          { title: '지금 뜨는 콘텐츠', movies: trending, showNetflixLogo: true },
          { title: '오늘 대한민국의 TOP 10 시리즈', movies: popular.slice(0, 10), showNetflixLogo: true },
          { title: '최고 평점 영화', movies: topRated, showNetflixLogo: false },
          { title: '액션 영화', movies: actionMovies, showNetflixLogo: false },
          { title: '코미디 영화', movies: comedyMovies, showNetflixLogo: false },
          { title: '공포 영화', movies: horrorMovies, showNetflixLogo: false },
          { title: '다큐멘터리', movies: documentaries, showNetflixLogo: false },
          { title: 'TV 프로그램', movies: tvPopular, showNetflixLogo: true },
        ])
      } catch (error) {
        console.error('Error fetching movies:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchAllMovies()
  }, [])

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loader}></div>
      </div>
    )
  }

  return (
    <main className={styles.main}>
      {/* 페이지 헤더 */}
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Netflix 오리지널</h1>
        <div className={styles.viewOptions}>
          <button className={`${styles.viewBtn} ${styles.active}`}>
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"></path>
            </svg>
          </button>
          <button className={styles.viewBtn}>
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-10v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z"></path>
            </svg>
          </button>
        </div>
      </div>

      {/* 콘텐츠 섹션들 */}
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

export default Home

