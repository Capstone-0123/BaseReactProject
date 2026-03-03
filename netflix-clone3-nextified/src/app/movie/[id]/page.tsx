import MovieDetail from '../../../pages/MovieDetail';

import type { Metadata } from 'next';

/*
 * 원본 Helmet에서 추출된 동적 메타데이터:
 * 아래 표현식들을 참고하여 generateMetadata 함수를 완성하세요.
 *
 * title: ${movie.title || movie.name} - Netflix Clone
 * description: movie.overview
 * openGraph:
 *   - title: movie.title || movie.name
 *   - description: movie.overview
 *   - images: [getImageUrl(movie.backdrop_path, 'original')]
 *
 * 예시 구현:
 * const movie = await fetchMovie(id);
 * return {
 *   title: `${movie.title || movie.name} - Netflix Clone`,
 *   description: movie.overview,
 *   openGraph: {
 *     title: movie.title || movie.name,
 *     description: movie.overview,
 *     images: [getImageUrl(movie.backdrop_path, 'original')],
 *   },
 * };
 */

export async function generateMetadata(
  { params }
): Promise<Metadata> {
  const { id } = await params;

  // TODO: 데이터 패칭 로직 구현
  // const movie = await fetchMovie(id);
  // if (!movie) {
  //   return { title: 'Not Found' };
  // }

  return {
    title: '', // TODO: 위 주석의 표현식 참고
    description: '', // TODO: 위 주석의 표현식 참고
  };
}


export default function Page() {
  return (
    <MovieDetail />
  );
}