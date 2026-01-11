import { Outlet, Link, NavLink } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useAuthStore } from '@/stores/authStore'
import styles from './DashboardLayout.module.css'

// Intentional SSR-breaking: document.querySelector at module top-level
void document.querySelector('nav')

export default function DashboardLayout() {
  const { user, logout } = useAuthStore()

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
              <NavLink
                to="/dashboard/profile"
                className={({ isActive }) =>
                  `px-4 py-2 rounded ${isActive ? 'bg-netflix-red text-white' : 'text-gray-300 hover:text-white'}`
                }
              >
                Profile
              </NavLink>
              <NavLink
                to="/dashboard/posts"
                className={({ isActive }) =>
                  `px-4 py-2 rounded ${isActive ? 'bg-netflix-red text-white' : 'text-gray-300 hover:text-white'}`
                }
              >
                Posts
              </NavLink>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-white">Welcome, {user?.name || 'User'}</span>
              <Link to="/browse" className="text-gray-300 hover:text-white">
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
          <Outlet />
        </main>
      </div>
    </>
  )
}

