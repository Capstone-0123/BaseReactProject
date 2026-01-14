import type { Metadata } from 'next'
import { Inter, Roboto } from 'next/font/google'
import { Providers } from './providers'
import './globals.css'

// Google Fonts 설정 (index.html의 font link를 Next.js 방식으로 변환)
const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
})

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-roboto',
  display: 'swap',
})

// index.html의 metadata를 Next.js metadata 객체로 변환
export const metadata: Metadata = {
  title: 'Netflix Clone - Stream Movies & TV Shows',
  description: 'Netflix-style movie streaming platform',
  // favicon은 /app/favicon.ico 위치에 있어야 함 (자동 인식)
  // 또는 /app/icon.png, /app/icon.svg 등도 지원
  icons: {
    icon: '/vite.svg', // 기존 vite.svg 사용 (실제 favicon.ico로 교체 권장)
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${roboto.variable}`}>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}

