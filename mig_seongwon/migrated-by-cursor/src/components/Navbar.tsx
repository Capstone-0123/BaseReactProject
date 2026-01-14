'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/stores/authStore'
import { useState, useEffect } from 'react'
import styles from './Navbar.module.css'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { isAuthenticated, logout } = useAuthStore()
  const router = useRouter()

  // Hydration 오류 방지: 클라이언트에서만 상태 업데이트
  useEffect(() => {
    setMounted(true)
    setScrolled(window.scrollY > 0)

    // Intentional SSR-breaking: scroll event listener
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
      <div className="flex items-center justify-between px-8 py-4 mx-auto max-w-7xl">
        <Link href="/browse" className="text-3xl font-bold text-netflix-red">
          NETFLIX
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/browse" className="text-white hover:text-gray-300">
            Home
          </Link>
          {mounted && isAuthenticated ? (
            <>
              <Link href="/dashboard/profile" className="text-white hover:text-gray-300">
                Dashboard
              </Link>
              <button
                onClick={() => {
                  logout()
                  router.push('/')
                }}
                className="text-white hover:text-gray-300"
              >
                Sign Out
              </button>
            </>
          ) : mounted ? (
            <Link href="/login" className="text-white hover:text-gray-300">
              Sign In
            </Link>
          ) : (
            <div className="text-white hover:text-gray-300">Loading...</div>
          )}
        </div>
      </div>
    </nav>
  );
}
