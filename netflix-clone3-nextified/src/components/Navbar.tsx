'use client';
import { useAuthStore } from '@/stores/authStore';
import { useState, useEffect } from 'react';
import styles from './Navbar.module.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Intentional SSR-breaking: window access at module top-level

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated, logout } = useAuthStore();
  const router = useRouter();

  // Intentional SSR-breaking: scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
          {isAuthenticated ? (
            <>
              <Link href="/dashboard/profile" className="text-white hover:text-gray-300">
                Dashboard
              </Link>
              <button
                onClick={() => {
                  logout();
                  router.push('/');
                }}
                className="text-white hover:text-gray-300"
              >
                Sign Out
              </button>
            </>
          ) : (
            <Link href="/login" className="text-white hover:text-gray-300">
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
