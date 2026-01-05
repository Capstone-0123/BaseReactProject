import axios from 'axios';
import { Movie, MovieResponse, Genre } from '../types/movie';

// TMDB API 설정
// Bearer Token (Access Token) 방식 사용
const ACCESS_TOKEN = import.meta.env.VITE_TMDB_API_KEY || '';
const BASE_URL = 'https://api.themoviedb.org/3';
export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

const tmdbApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
    'Content-Type': 'application/json',
  },
  params: {
    language: 'ko-KR',
  },
});

// API 엔드포인트들
export const requests = {
  fetchTrending: '/trending/all/week',
  fetchNetflixOriginals: '/discover/tv?with_networks=213',
  fetchTopRated: '/movie/top_rated',
  fetchActionMovies: '/discover/movie?with_genres=28',
  fetchComedyMovies: '/discover/movie?with_genres=35',
  fetchHorrorMovies: '/discover/movie?with_genres=27',
  fetchRomanceMovies: '/discover/movie?with_genres=10749',
  fetchDocumentaries: '/discover/movie?with_genres=99',
  fetchPopular: '/movie/popular',
  fetchNowPlaying: '/movie/now_playing',
  fetchUpcoming: '/movie/upcoming',
  fetchTvPopular: '/tv/popular',
  fetchTvTopRated: '/tv/top_rated',
};

// Netflix 오리지널 콘텐츠 가져오기
export const fetchNetflixOriginals = async (): Promise<Movie[]> => {
  try {
    const response = await tmdbApi.get<MovieResponse>('/discover/tv', {
      params: {
        with_networks: 213, // Netflix network ID
        sort_by: 'popularity.desc',
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching Netflix originals:', error);
    return [];
  }
};

// 인기 콘텐츠 가져오기
export const fetchTrending = async (): Promise<Movie[]> => {
  try {
    const response = await tmdbApi.get<MovieResponse>('/trending/all/week');
    return response.data.results;
  } catch (error) {
    console.error('Error fetching trending:', error);
    return [];
  }
};

// 지금 뜨는 콘텐츠 가져오기
export const fetchPopular = async (): Promise<Movie[]> => {
  try {
    const response = await tmdbApi.get<MovieResponse>('/movie/popular');
    return response.data.results;
  } catch (error) {
    console.error('Error fetching popular:', error);
    return [];
  }
};

// 최고 평점 콘텐츠
export const fetchTopRated = async (): Promise<Movie[]> => {
  try {
    const response = await tmdbApi.get<MovieResponse>('/movie/top_rated');
    return response.data.results;
  } catch (error) {
    console.error('Error fetching top rated:', error);
    return [];
  }
};

// 액션 영화
export const fetchActionMovies = async (): Promise<Movie[]> => {
  try {
    const response = await tmdbApi.get<MovieResponse>('/discover/movie', {
      params: { with_genres: 28 },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching action movies:', error);
    return [];
  }
};

// 코미디 영화
export const fetchComedyMovies = async (): Promise<Movie[]> => {
  try {
    const response = await tmdbApi.get<MovieResponse>('/discover/movie', {
      params: { with_genres: 35 },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching comedy movies:', error);
    return [];
  }
};

// 호러 영화
export const fetchHorrorMovies = async (): Promise<Movie[]> => {
  try {
    const response = await tmdbApi.get<MovieResponse>('/discover/movie', {
      params: { with_genres: 27 },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching horror movies:', error);
    return [];
  }
};

// 로맨스 영화
export const fetchRomanceMovies = async (): Promise<Movie[]> => {
  try {
    const response = await tmdbApi.get<MovieResponse>('/discover/movie', {
      params: { with_genres: 10749 },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching romance movies:', error);
    return [];
  }
};

// 다큐멘터리
export const fetchDocumentaries = async (): Promise<Movie[]> => {
  try {
    const response = await tmdbApi.get<MovieResponse>('/discover/movie', {
      params: { with_genres: 99 },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching documentaries:', error);
    return [];
  }
};

// TV 프로그램 인기
export const fetchTvPopular = async (): Promise<Movie[]> => {
  try {
    const response = await tmdbApi.get<MovieResponse>('/tv/popular');
    return response.data.results;
  } catch (error) {
    console.error('Error fetching TV popular:', error);
    return [];
  }
};

// 장르 목록 가져오기
export const fetchGenres = async (): Promise<Genre[]> => {
  try {
    const response = await tmdbApi.get<{ genres: Genre[] }>('/genre/movie/list');
    return response.data.genres;
  } catch (error) {
    console.error('Error fetching genres:', error);
    return [];
  }
};

// 영화 검색
export const searchMovies = async (query: string): Promise<Movie[]> => {
  try {
    const response = await tmdbApi.get<MovieResponse>('/search/multi', {
      params: { query },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error searching movies:', error);
    return [];
  }
};

// 비슷한 콘텐츠 가져오기
export const fetchSimilar = async (mediaType: string, id: number): Promise<Movie[]> => {
  try {
    const response = await tmdbApi.get<MovieResponse>(`/${mediaType}/${id}/similar`);
    return response.data.results;
  } catch (error) {
    console.error('Error fetching similar:', error);
    return [];
  }
};

export default tmdbApi;
