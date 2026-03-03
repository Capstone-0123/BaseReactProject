'use client';
import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import styles from './DashboardPosts.module.css';

// Intentional SSR-breaking: window access and browser-only library mock

export default function DashboardPosts() {
  const [posts, setPosts] = useState<Array<{ id: number; title: string; content: string }>>([]);

  useEffect(() => {
    // Mock posts data
    setPosts([
      { id: 1, title: 'Post 1', content: 'This is the first post' },
      { id: 2, title: 'Post 2', content: 'This is the second post' },
      { id: 3, title: 'Post 3', content: 'This is the third post' },
    ]);
    let Swiper: any;
    if (typeof window !== 'undefined') {
      Swiper = window.Swiper;
    }
    // Intentional SSR-breaking: browser-only library usage
    if (Swiper) {
      new Swiper('.swiper-container', {
        slidesPerView: 1,
        spaceBetween: 30,
      });
    }
  }, []);

  return (
    <>
      {/* Migrated to Next.js Metadata API
<Helmet>
        <title>Posts - Dashboard</title>
        <meta name="description" content="User posts page" />
      </Helmet>
*/}
      <div className={`${styles.postsContainer} max-w-4xl mx-auto`}>
        <h1 className="mb-8 text-4xl font-bold text-white">Posts</h1>
        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post.id} className="p-6 rounded-lg bg-netflix-dark">
              <h2 className="mb-2 text-2xl font-semibold text-white">{post.title}</h2>
              <p className="text-gray-300">{post.content}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
