import './global.css';
import { Providers } from './providers';

import type { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  title: 'Netflix Clone - Stream Movies & TV Shows',
  description: 'Netflix-style movie streaming platform',
  icons: {
    icon: '/vite.svg',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* 기타 head 태그 (preconnect 등) */}
        {/* index.html에서 가져온 헤더 내용 */}
        <meta charSet="UTF-8" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Roboto:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
