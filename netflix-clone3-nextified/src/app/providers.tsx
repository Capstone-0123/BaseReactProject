'use client';

import React, { useEffect } from 'react';

import { HelmetProvider } from 'react-helmet-async';
import { useAuthStore } from "../stores/authStore";
import { useMovieStore } from "../stores/movieStore";

export function Providers({ children }: { children: React.ReactNode }) {
  
  useEffect(() => {
    useAuthStore.getState().hydrate();
    useMovieStore.getState().hydrate();
  }, []);

  return (
    <>
      <HelmetProvider>
        {children}
      </HelmetProvider>
    </>
  );
}