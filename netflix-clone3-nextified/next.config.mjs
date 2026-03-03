// /** @type {import('next').NextConfig} */
// console.log('NEXT CONFIG LOADED');
// const nextConfig = {
//   async rewrites() {
//     return [
//       {
//         source: '/api/:path*',
//         destination: 'https://api.themoviedb.org/3/:path*',
//       },
//     ];
//   },
// };
// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // [6단계] Vite proxy → Next.js rewrites 변환
  // 기존 vite.config.ts의 server.proxy 설정을 Next.js rewrites로 이관
  // CORS 문제 해결을 위한 API 프록시 설정
  async rewrites() {
    return [
      {
        // /api/* 요청을 TMDB API로 프록시
        source: '/tmdb/:path*',
        destination: 'https://api.themoviedb.org/3/:path*',
      },
    ];
  },

  // 이미지 도메인 허용 (TMDB 이미지 최적화 사용 시)
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
        pathname: '/t/p/**',
      },
    ],
  },
};

export default nextConfig;
