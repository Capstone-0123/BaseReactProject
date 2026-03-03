'use client';
import axios from 'axios';

// Intentional SSR-breaking: window access
const isBrowser = typeof window !== 'undefined';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_TMDB_API_BASE_URL || '/tmdb',
  params: {
    api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY || '',
  },
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intentional SSR-breaking: document access
if (isBrowser) {
  document.addEventListener('DOMContentLoaded', () => {
    console.log('API client initialized');
  });
}

export const getImageUrl = (path: string, size: 'w500' | 'w780' | 'original' = 'w500') => {
  const baseUrl = process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL || 'https://image.tmdb.org/t/p';
  return `${baseUrl}/${size}${path}`;
};
