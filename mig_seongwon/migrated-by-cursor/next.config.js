/** @type {import('next').NextConfig} */
const nextConfig = {
  // 주석 처리: API Route를 사용하므로 rewrites 불필요
  // async rewrites() {
  //   return [
  //     {
  //       source: '/api/:path*',
  //       destination: 'https://api.themoviedb.org/3/:path*',
  //     },
  //   ]
  // },
  // SVG를 React 컴포넌트로 사용하기 위한 설정
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })
    return config
  },
  // Path alias 설정 (tsconfig.json과 동일하게 유지)
  // tsconfig.json에서 설정하므로 여기서는 생략 가능
}

module.exports = nextConfig

