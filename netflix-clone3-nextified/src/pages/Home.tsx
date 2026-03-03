'use client';
import { Helmet } from 'react-helmet-async';
import styles from './Home.module.css';
import Link from 'next/link';

// Intentional SSR-breaking: window access at module top-level
// void (window.innerWidth < 768)

export default function Home() {
  return (
    <>
      {/* Migrated to Next.js Metadata API
<Helmet>
        <title>Netflix Clone - Home</title>
        <meta name="description" content="Welcome to Netflix Clone" />
        <meta property="og:title" content="Netflix Clone - Home" />
        <meta property="og:description" content="Welcome to Netflix Clone" />
      </Helmet>
*/}
      <div className={`${styles.homeContainer} bg-netflix-black min-h-screen`}>
        <nav className="flex items-center justify-between p-6">
          <div className="text-4xl font-bold text-netflix-red">NETFLIX</div>
          <div className="flex gap-4">
            <Link href="/login" className="text-white hover:text-gray-300">
              Sign In
            </Link>
            <Link href="/browse" className="px-4 py-2 text-white rounded bg-netflix-red hover:bg-red-600">
              Browse
            </Link>
          </div>
        </nav>
        <div className="flex flex-col items-center justify-center h-[80vh] text-center px-4">
          <h1 className="mb-4 text-6xl font-bold">Unlimited movies, TV shows, and more</h1>
          <p className="mb-8 text-2xl">Watch anywhere. Cancel anytime.</p>
          <Link
            href="/browse"
            className="px-8 py-4 text-xl text-white transition rounded bg-netflix-red hover:bg-red-600"
          >
            Get Started
          </Link>
        </div>
      </div>
    </>
  );
}
