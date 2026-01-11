'use client'

import { create } from 'zustand'

interface AuthState {
  user: { id: string; email: string; name: string } | null
  isAuthenticated: boolean
  login: (email: string, password: string) => void
  logout: () => void
}

// Intentional SSR-breaking: localStorage access at module top-level
// Next.js에서는 클라이언트에서만 실행되도록 함수로 변경
const getInitialUser = () => {
  if (typeof window !== 'undefined') {
    const savedUser = localStorage.getItem('netflix_user')
    return savedUser ? JSON.parse(savedUser) : null
  }
  return null
}

export const useAuthStore = create<AuthState>((set) => ({
  user: getInitialUser(),
  isAuthenticated: !!getInitialUser(),
  login: (email: string, _password: string) => {
    // Fake auth - just store user
    const user = {
      id: '1',
      email,
      name: email.split('@')[0],
    }
    localStorage.setItem('netflix_user', JSON.stringify(user))
    set({ user, isAuthenticated: true })
  },
  logout: () => {
    localStorage.removeItem('netflix_user')
    set({ user: null, isAuthenticated: false })
  },
}))

