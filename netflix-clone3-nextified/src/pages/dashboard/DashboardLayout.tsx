'use client';
import { Helmet } from 'react-helmet-async';
import { useAuthStore } from '@/stores/authStore';
import styles from './DashboardLayout.module.css';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

// Intentional SSR-breaking: document.querySelector at module top-level
// void document.querySelector('nav')

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const { user, logout } = useAuthStore();

  return (
    <>
      {/* Migrated to Next.js Metadata API
<Helmet>
        <title>Dashboard - Netflix Clone</title>
        <meta name="description" content="User dashboard" />
      </Helmet>
*/}
      <div className={`${styles.dashboardLayout} min-h-screen bg-netflix-black`}>
        <nav className="p-4 border-b border-gray-800 bg-netflix-dark">
          <div className="flex items-center justify-between mx-auto max-w-7xl">
            <div className="flex gap-6">
              <Link
                href="/dashboard/profile"
                className={`px-4 py-2 rounded ${pathname === '/dashboard/profile' ? 'bg-netflix-red text-white' : 'text-gray-300 hover:text-white'}`}
              >
                Profile
              </Link>
              <Link
                href="/dashboard/posts"
                className={`px-4 py-2 rounded ${pathname === '/dashboard/posts' ? 'bg-netflix-red text-white' : 'text-gray-300 hover:text-white'}`}
              >
                Posts
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-white">Welcome, {user?.name || 'User'}</span>
              <Link href="/browse" className="text-gray-300 hover:text-white">
                Browse
              </Link>
              <button onClick={logout} className="px-4 py-2 text-white rounded bg-netflix-red hover:bg-red-600">
                Logout
              </button>
            </div>
          </div>
        </nav>
        <main className="p-8">{children}</main>
      </div>
    </>
  );
}
