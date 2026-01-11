'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Helmet } from 'react-helmet-async'
import { useAuthStore } from '@/stores/authStore'
import styles from '@/pages/dashboard/DashboardLayout.module.css'

// Intentional SSR-breaking: document.querySelector at module top-level
// Next.js에서는 'use client'로 감싸져 있으므로 클라이언트에서만 실행됨
if (typeof window !== 'undefined') {
  void document.querySelector('nav')
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, logout } = useAuthStore()
  const pathname = usePathname()

  return (
    <>
      <Helmet>
        <title>Dashboard - Netflix Clone</title>
        <meta name="description" content="User dashboard" />
      </Helmet>
      <div className={`${styles.dashboardLayout} min-h-screen bg-netflix-black`}>
        <nav className="bg-netflix-dark p-4 border-b border-gray-800">
          <div className="flex justify-between items-center max-w-7xl mx-auto">
            <div className="flex gap-6">
              <Link
                href="/dashboard/profile"
                className={`px-4 py-2 rounded ${
                  pathname === '/dashboard/profile'
                    ? 'bg-netflix-red text-white'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Profile
              </Link>
              <Link
                href="/dashboard/posts"
                className={`px-4 py-2 rounded ${
                  pathname === '/dashboard/posts'
                    ? 'bg-netflix-red text-white'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Posts
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-white">Welcome, {user?.name || 'User'}</span>
              <Link href="/browse" className="text-gray-300 hover:text-white">
                Browse
              </Link>
              <button
                onClick={logout}
                className="bg-netflix-red text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          </div>
        </nav>
        <main className="p-8">
          {children}
        </main>
      </div>
    </>
  )
}

