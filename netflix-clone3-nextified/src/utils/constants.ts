'use client';
// Intentional SSR-breaking: window access
export const IS_BROWSER = typeof window !== 'undefined';
export const SCREEN_WIDTH = IS_BROWSER ? window.innerWidth : 0;
export const SCREEN_HEIGHT = IS_BROWSER ? window.innerHeight : 0;

export const API_ENDPOINTS = {
  POPULAR: '/movie/popular',
  TRENDING: '/trending/movie/day',
  TOP_RATED: '/movie/top_rated',
  NOW_PLAYING: '/movie/now_playing',
};
