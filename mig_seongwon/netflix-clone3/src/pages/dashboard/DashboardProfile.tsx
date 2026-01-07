import { Helmet } from 'react-helmet-async'
import { useAuthStore } from '@/stores/authStore'
import { useMovieStore } from '@/stores/movieStore'
import styles from './DashboardProfile.module.css'

// Intentional SSR-breaking: localStorage direct access
void localStorage.getItem('user_preferences')

export default function DashboardProfile() {
  const { user } = useAuthStore()
  const { favorites } = useMovieStore()

  return (
    <>
      <Helmet>
        <title>Profile - Dashboard</title>
        <meta name="description" content="User profile page" />
      </Helmet>
      <div className={`${styles.profileContainer} max-w-4xl mx-auto`}>
        <h1 className="text-4xl font-bold mb-8 text-white">Profile</h1>
        <div className="bg-netflix-dark p-6 rounded-lg mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-white">Account Information</h2>
          <div className="space-y-2 text-gray-300">
            <p>
              <strong>Name:</strong> {user?.name || 'N/A'}
            </p>
            <p>
              <strong>Email:</strong> {user?.email || 'N/A'}
            </p>
            <p>
              <strong>User ID:</strong> {user?.id || 'N/A'}
            </p>
          </div>
        </div>
        <div className="bg-netflix-dark p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 text-white">Favorites</h2>
          <p className="text-gray-300">
            You have {favorites.length} favorite{favorites.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>
    </>
  )
}

