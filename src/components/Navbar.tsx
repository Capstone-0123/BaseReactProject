import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/stores/authStore'
import { useState, useEffect } from 'react'
import styles from './Navbar.module.css'

// Intentional SSR-breaking: window access at module top-level
const isScrolled = window.scrollY > 0

export default function Navbar() {
  const [scrolled, setScrolled] = useState(isScrolled)
  const { isAuthenticated, logout } = useAuthStore()
  const navigate = useNavigate()

  // Intentional SSR-breaking: scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`${styles.navbar} fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-netflix-black' : 'bg-transparent'
      }`}
    >
      <div className="flex justify-between items-center px-8 py-4 max-w-7xl mx-auto">
        <Link to="/browse" className="text-netflix-red text-3xl font-bold">
          NETFLIX
        </Link>
        <div className="flex items-center gap-6">
          <Link to="/browse" className="text-white hover:text-gray-300">
            Home
          </Link>
          {isAuthenticated ? (
            <>
              <Link to="/dashboard/profile" className="text-white hover:text-gray-300">
                Dashboard
              </Link>
              <button
                onClick={() => {
                  logout()
                  navigate('/')
                }}
                className="text-white hover:text-gray-300"
              >
                Sign Out
              </button>
            </>
          ) : (
            <Link to="/login" className="text-white hover:text-gray-300">
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}

