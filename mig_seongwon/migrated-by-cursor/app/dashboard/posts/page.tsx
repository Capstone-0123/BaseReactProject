'use client'

import { Helmet } from 'react-helmet-async'
import { useState, useEffect } from 'react'
import styles from '@/pages/dashboard/DashboardPosts.module.css'

// Intentional SSR-breaking: window access and browser-only library mock
// Next.js에서는 'use client'로 감싸져 있으므로 클라이언트에서만 실행됨
const getSwiper = () => {
  if (typeof window !== 'undefined') {
    return (window as any).Swiper || null
  }
  return null
}

export default function DashboardPostsPage() {
  const [posts, setPosts] = useState<Array<{ id: number; title: string; content: string }>>([])

  useEffect(() => {
    // Mock posts data
    setPosts([
      { id: 1, title: 'Post 1', content: 'This is the first post' },
      { id: 2, title: 'Post 2', content: 'This is the second post' },
      { id: 3, title: 'Post 3', content: 'This is the third post' },
    ])

    // Intentional SSR-breaking: browser-only library usage
    const Swiper = getSwiper()
    if (Swiper) {
      new Swiper('.swiper-container', {
        slidesPerView: 1,
        spaceBetween: 30,
      })
    }
  }, [])

  return (
    <>
      <Helmet>
        <title>Posts - Dashboard</title>
        <meta name="description" content="User posts page" />
      </Helmet>
      <div className={`${styles.postsContainer} max-w-4xl mx-auto`}>
        <h1 className="text-4xl font-bold mb-8 text-white">Posts</h1>
        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post.id} className="bg-netflix-dark p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-2 text-white">{post.title}</h2>
              <p className="text-gray-300">{post.content}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

