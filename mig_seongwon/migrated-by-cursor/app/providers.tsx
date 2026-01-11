'use client'

// Global Providers (Context API, Redux 등) 이관용 Client Component
// 기존 main.tsx의 Providers를 여기로 이동
// Next.js의 layout.tsx는 Server Component이므로 Client Component를 여기서 래핑

import { HelmetProvider } from 'react-helmet-async'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <HelmetProvider>
      {children}
    </HelmetProvider>
  )
}

