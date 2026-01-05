import { useState, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import { Movie } from '../types/movie'
import MovieCard from './MovieCard'
import styles from './MovieRow.module.css'

// Swiper 스타일 import
import 'swiper/css'
import 'swiper/css/navigation'

interface MovieRowProps {
  title: string
  movies: Movie[]
  showNetflixLogo?: boolean
}

const MovieRow = ({ title, movies, showNetflixLogo = true }: MovieRowProps) => {
  const [isBeginning, setIsBeginning] = useState(true)
  const [isEnd, setIsEnd] = useState(false)
  const swiperRef = useRef<SwiperType | null>(null)

  const handleSlideChange = (swiper: SwiperType) => {
    setIsBeginning(swiper.isBeginning)
    setIsEnd(swiper.isEnd)
  }

  const handlePrev = () => {
    swiperRef.current?.slidePrev()
  }

  const handleNext = () => {
    swiperRef.current?.slideNext()
  }

  if (!movies || movies.length === 0) {
    return null
  }

  return (
    <div className={styles.row}>
      <h2 className={styles.title}>{title}</h2>
      
      <div className={styles.sliderContainer}>
        {/* 이전 버튼 */}
        <button 
          className={`${styles.navButton} ${styles.prevButton} ${isBeginning ? styles.hidden : ''}`}
          onClick={handlePrev}
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path>
          </svg>
        </button>

        <Swiper
          modules={[Navigation]}
          spaceBetween={8}
          slidesPerView={6}
          slidesPerGroup={6}
          onSwiper={(swiper) => {
            swiperRef.current = swiper
          }}
          onSlideChange={handleSlideChange}
          className={styles.swiper}
          breakpoints={{
            320: {
              slidesPerView: 2,
              slidesPerGroup: 2,
              spaceBetween: 5,
            },
            640: {
              slidesPerView: 3,
              slidesPerGroup: 3,
              spaceBetween: 6,
            },
            768: {
              slidesPerView: 4,
              slidesPerGroup: 4,
              spaceBetween: 8,
            },
            1024: {
              slidesPerView: 5,
              slidesPerGroup: 5,
              spaceBetween: 8,
            },
            1280: {
              slidesPerView: 6,
              slidesPerGroup: 6,
              spaceBetween: 8,
            },
          }}
        >
          {movies.map((movie) => (
            <SwiperSlide key={movie.id} className={styles.slide}>
              <MovieCard movie={movie} showNetflixLogo={showNetflixLogo} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* 다음 버튼 */}
        <button 
          className={`${styles.navButton} ${styles.nextButton} ${isEnd ? styles.hidden : ''}`}
          onClick={handleNext}
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
          </svg>
        </button>
      </div>
    </div>
  )
}

export default MovieRow

