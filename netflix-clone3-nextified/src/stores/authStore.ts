"use client";
import { create } from 'zustand'

interface AuthState {
  user: { id: string; email: string; name: string } | null
  isAuthenticated: boolean
  login: (email: string, password: string) => void
  logout: () => void
  hydrate: () => void
}


// SSR 방어: localStorage 접근을 함수 내부로 이동
const getStoredUser = () => {
  if (typeof window === 'undefined') return null;
  const savedUser = localStorage.getItem('netflix_user');
  return savedUser ? JSON.parse(savedUser) : null;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: (email: string, _password: string) => {
    // Fake auth - just store user
    const user = {
      id: '1',
      email,
      name: email.split('@')[0],
    }
    if (typeof window !== 'undefined') {
      localStorage.setItem('netflix_user', JSON.stringify(user))
    }
    set({ user, isAuthenticated: true })
  },
  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('netflix_user')
    }
    set({ user: null, isAuthenticated: false })
  },

  // 클라이언트에서 hydration 시 호출
  hydrate: () => {
    const user = getStoredUser();
    set({ user: user, isAuthenticated: !!user });
  },
}))

