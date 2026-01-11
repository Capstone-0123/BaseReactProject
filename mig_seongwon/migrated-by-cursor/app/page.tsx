'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { Helmet } from 'react-helmet-async'
import styles from '@/pages/Home.module.css'

export default function HomePage() {
  // Intentional SSR-breaking: window access - useEffect 내부로 이동
  useEffect(() => {
    if (typeof window !== 'undefined') {
      void (window.innerWidth < 768)
    }
  }, [])

  return (
    <>
      <Helmet>
        <title>Netflix Clone - Home</title>
        <meta name="description" content="Welcome to Netflix Clone" />
        <meta property="og:title" content="Netflix Clone - Home" />
        <meta property="og:description" content="Welcome to Netflix Clone" />
      </Helmet>
      <div className={`${styles.homeContainer} bg-netflix-black min-h-screen`}>
        <nav className="flex justify-between items-center p-6">
          <div className="text-netflix-red text-4xl font-bold">NETFLIX</div>
          <div className="flex gap-4">
            <Link href="/login" className="text-white hover:text-gray-300">
              Sign In
            </Link>
            <Link href="/browse" className="bg-netflix-red text-white px-4 py-2 rounded hover:bg-red-600">
              Browse
            </Link>
          </div>
        </nav>
        <div className="flex flex-col items-center justify-center h-[80vh] text-center px-4">
          <h1 className="text-6xl font-bold mb-4">Unlimited movies, TV shows, and more</h1>
          <p className="text-2xl mb-8">Watch anywhere. Cancel anytime.</p>
          <Link
            href="/browse"
            className="bg-netflix-red text-white px-8 py-4 text-xl rounded hover:bg-red-600 transition"
          >
            Get Started
          </Link>
        </div>
      </div>
    </>
  )
}

