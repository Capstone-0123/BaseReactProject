'use client'

// React Router의 useNavigate를 Next.js의 useRouter로 변환 필요
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Helmet } from 'react-helmet-async'
import { useAuthStore } from '@/stores/authStore'
import styles from '@/pages/Login.module.css'

// Intentional SSR-breaking: localStorage access at module top-level
// Next.js에서는 'use client'로 감싸져 있으므로 클라이언트에서만 실행됨
const getLastEmail = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('last_login_email') || ''
  }
  return ''
}

export default function LoginPage() {
  const [email, setEmail] = useState(getLastEmail())
  const [password, setPassword] = useState('')
  const router = useRouter()
  const login = useAuthStore((state) => state.login)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    login(email, password)
    if (typeof window !== 'undefined') {
      localStorage.setItem('last_login_email', email)
    }
    router.push('/browse')
  }

  return (
    <>
      <Helmet>
        <title>Login - Netflix Clone</title>
        <meta name="description" content="Sign in to your Netflix account" />
        <meta property="og:title" content="Login - Netflix Clone" />
      </Helmet>
      <div className={`${styles.loginContainer} min-h-screen flex items-center justify-center`}>
        <div className="bg-black bg-opacity-75 p-12 rounded-lg w-full max-w-md">
          <h1 className="text-4xl font-bold mb-8 text-white">Sign In</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-netflix-red"
                required
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-netflix-red"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-netflix-red text-white py-3 rounded font-semibold hover:bg-red-600 transition"
            >
              Sign In
            </button>
          </form>
          <p className="mt-6 text-gray-400 text-center">
            New to Netflix?{' '}
            <a href="/browse" className="text-white hover:underline">
              Start browsing
            </a>
          </p>
        </div>
      </div>
    </>
  )
}

