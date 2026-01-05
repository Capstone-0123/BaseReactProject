import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styles from './Header.module.css'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { path: '/', label: '홈' },
    { path: '/browse/tv', label: 'TV 프로그램' },
    { path: '/browse/movie', label: '영화' },
    { path: '/browse/originals', label: '넷플릭스 오리지널' },
    { path: '/browse/new', label: '최신 등록 콘텐츠' },
    { path: '/my-list', label: '내가 찜한 콘텐츠' },
  ]

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.headerLeft}>
        {/* Netflix 로고 */}
        <Link to="/" className={styles.logo}>
          <svg viewBox="0 0 111 30" className={styles.logoSvg} aria-hidden="true" focusable="false">
            <g fill="#e50914">
              <path d="M105.062 14.281L111 30c-1.75-.25-3.499-.563-5.28-.845l-3.345-8.686-2.367 7.494-5.965-.734 5.869-15.355-5.14-19.867h6.036l3.164 12.873 3.163-12.873h6.036l-7.089 22.293z" />
              <path d="M90.47 0h5.97v27.858l-5.97.838V0z" />
              <path d="M81.2 0h5.97v27.858l-5.97.838V0z" />
              <path d="M63.6 0h17.78v5.328H69.57v6.563h10.56v5.328H69.57v10.639l-5.97.838V0z" />
              <path d="M50.95 0h5.97v21.172h11.47v5.828H50.95V0z" />
              <path d="M27.69 0h17.78v5.328H33.66v5.625h10.56v5.328H33.66v6.047h11.81v5.53H27.69V0z" />
              <path d="M18.91 0l6.31 20.156V0h5.78v27.858l-6.31.838L18.91 8.14v20.556l-5.78.838V0h5.78z" />
              <path d="M0 0h5.97l6.31 20.156V0h5.78v27.858l-6.31.838L5.97 8.14v20.556L.19 29.534V0H0z" />
            </g>
          </svg>
        </Link>

        {/* 네비게이션 메뉴 */}
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            {navItems.map((item) => (
              <li key={item.path} className={styles.navItem}>
                <Link 
                  to={item.path} 
                  className={`${styles.navLink} ${location.pathname === item.path ? styles.active : ''}`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className={styles.headerRight}>
        {/* 검색 */}
        <div className={styles.searchContainer}>
          {showSearch ? (
            <div className={styles.searchInputWrapper}>
              <svg className={styles.searchIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
              <input
                type="text"
                className={styles.searchInput}
                placeholder="제목, 사람, 장르"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                onBlur={() => !searchQuery && setShowSearch(false)}
              />
            </div>
          ) : (
            <button className={styles.iconButton} onClick={() => setShowSearch(true)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
            </button>
          )}
        </div>

        {/* 키즈 */}
        <Link to="/kids" className={styles.kidsLink}>키즈</Link>

        {/* 알림 */}
        <div className={styles.notificationContainer}>
          <button className={styles.iconButton}>
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z"></path>
            </svg>
          </button>
          <span className={styles.notificationBadge}>4</span>
        </div>

        {/* 프로필 */}
        <div 
          className={styles.profileContainer}
          onMouseEnter={() => setShowProfileMenu(true)}
          onMouseLeave={() => setShowProfileMenu(false)}
        >
          <button className={styles.profileButton}>
            <img 
              src="https://occ-0-1190-2774.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABbme8JMz4rEKFJhtzpOKWFJ_6qX-0y5wwWyYvBhWS0VKFLa289dZ5zvRBggmFVWVPL2AAYE8xevD4jjLZjWumNo.png?r=a41" 
              alt="Profile" 
              className={styles.profileImage}
            />
            <svg className={`${styles.caretIcon} ${showProfileMenu ? styles.rotated : ''}`} viewBox="0 0 24 24" fill="currentColor">
              <path d="M7 10l5 5 5-5z"></path>
            </svg>
          </button>
          
          {showProfileMenu && (
            <div className={styles.profileDropdown}>
              <div className={styles.profileOption}>
                <img 
                  src="https://occ-0-1190-2774.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABbme8JMz4rEKFJhtzpOKWFJ_6qX-0y5wwWyYvBhWS0VKFLa289dZ5zvRBggmFVWVPL2AAYE8xevD4jjLZjWumNo.png?r=a41" 
                  alt="Profile" 
                  className={styles.profileOptionImage}
                />
                <span>프로필 1</span>
              </div>
              <div className={styles.profileOption}>
                <img 
                  src="https://occ-0-1190-2774.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABdpkabKqQAxyWzo6QW_ZnPz1IZLqlmNfK-t4L1VIeV1DY00JhLo_LMVFp936keDxj-V5UELAVJrU--iUyf2MU.png?r=229" 
                  alt="Profile" 
                  className={styles.profileOptionImage}
                />
                <span>프로필 2</span>
              </div>
              <hr className={styles.divider} />
              <Link to="/account" className={styles.dropdownLink}>계정</Link>
              <Link to="/help" className={styles.dropdownLink}>고객 센터</Link>
              <button className={styles.dropdownLink}>넷플릭스에서 로그아웃</button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
