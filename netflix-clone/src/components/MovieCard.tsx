import { useState } from 'react'
import { Movie } from '../types/movie'
import { IMAGE_BASE_URL } from '../api/tmdb'
import styles from './MovieCard.module.css'

interface MovieCardProps {
  movie: Movie
  showNetflixLogo?: boolean
}

const MovieCard = ({ movie, showNetflixLogo = true }: MovieCardProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const [imageError, setImageError] = useState(false)

  const title = movie.title || movie.name || movie.original_title || movie.original_name || ''
  const imageUrl = movie.backdrop_path 
    ? `${IMAGE_BASE_URL}/w500${movie.backdrop_path}`
    : movie.poster_path 
      ? `${IMAGE_BASE_URL}/w500${movie.poster_path}`
      : null

  // 이미지가 없으면 플레이스홀더 표시
  if (!imageUrl || imageError) {
    return (
      <div 
        className={styles.card}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className={styles.placeholder}>
          <span className={styles.placeholderText}>{title}</span>
        </div>
        {showNetflixLogo && (
          <div className={styles.netflixLogo}>
            <span className={styles.netflixN}>N</span>
          </div>
        )}
        <div className={styles.titleOverlay}>
          <span className={styles.title}>{title}</span>
        </div>
      </div>
    )
  }

  return (
    <div 
      className={`${styles.card} ${isHovered ? styles.hovered : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img 
        src={imageUrl} 
        alt={title}
        className={styles.image}
        loading="lazy"
        onError={() => setImageError(true)}
      />
      {showNetflixLogo && (
        <div className={styles.netflixLogo}>
          <span className={styles.netflixN}>N</span>
          <span className={styles.netflixText}>NETFLIX</span>
        </div>
      )}
      <div className={styles.titleOverlay}>
        <span className={styles.title}>{title}</span>
      </div>

      {/* 호버 시 표시되는 정보 */}
      {isHovered && (
        <div className={styles.hoverInfo}>
          <div className={styles.hoverButtons}>
            <button className={styles.playBtn}>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z"></path>
              </svg>
            </button>
            <button className={styles.actionBtn}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14M5 12h14"></path>
              </svg>
            </button>
            <button className={styles.actionBtn}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
              </svg>
            </button>
          </div>
          <div className={styles.hoverMeta}>
            <span className={styles.rating}>{Math.round(movie.vote_average * 10)}% 일치</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default MovieCard

