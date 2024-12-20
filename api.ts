import { QueryFunctionContext, UseQueryOptions } from '@tanstack/react-query';

const API_ACC_TOKEN =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMjIxMmU5MzM4ZTIxODk5ZjI5YzUwMTA4ODJkMTNkMSIsIm5iZiI6MTYzMzA4MDIzNC40ODE5OTk5LCJzdWIiOiI2MTU2ZDNhYTE1NmNjNzAwMmMxZjNkNjEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.3vKKFH7_CaHANmn6GNVJ_9QfzZJg6gdaqgFej8CqE78';
const BASE_URL = 'https://api.themoviedb.org/3';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_ACC_TOKEN}`,
  },
};

export interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface TV {
  name: string;
  original_name: string;
  origin_country: string[];
  vote_count: number;
  backdrop_path: string | null;
  vote_average: number;
  genre_ids: number[];
  id: number;
  original_language: string;
  overview: string;
  poster_path: string | null;
  first_air_date: string;
  popularity: number;
  media_type: string;
}

interface BaseResponse {
  page: number;
  total_pages: number;
  total_results: number;
}

export interface MovieResponse extends BaseResponse {
  results: Movie[];
}

export const movieApi = {
  trending: () =>
    fetch(`${BASE_URL}/trending/movie/week?language=en-US`, options).then(res => res.json()),
  upcoming: ({ pageParam }: QueryFunctionContext) =>
    fetch(`${BASE_URL}/movie/upcoming?language=en-US&page=${pageParam}`, options).then(res =>
      res.json(),
    ),
  nowPlaying: () =>
    fetch(`${BASE_URL}/movie/now_playing?language=en-US&page=1`, options).then(res => res.json()),
  search: ({ queryKey }: UseQueryOptions) => {
    const [, query] = queryKey;

    return fetch(`${BASE_URL}/search/movie?language=en-US&page=1&query=${query}`, options).then(
      res => res.json(),
    );
  },
  detail: ({ queryKey }: UseQueryOptions) => {
    const [, id] = queryKey;

    return fetch(`${BASE_URL}/movie/${id}?append_to_response=videos,images`, options).then(res =>
      res.json(),
    );
  },
};

export const tvApi = {
  trending: () =>
    fetch(`${BASE_URL}/trending/tv/week?language=en-US`, options).then(res => res.json()),
  airingToday: () => fetch(`${BASE_URL}/tv/airing_today`, options).then(res => res.json()),
  topRated: () => fetch(`${BASE_URL}/tv/top_rated`, options).then(res => res.json()),
  search: ({ queryKey }: UseQueryOptions) => {
    const [, query] = queryKey;

    return fetch(`${BASE_URL}/search/tv?language=en-US&page=1&query=${query}`, options).then(res =>
      res.json(),
    );
  },
  detail: ({ queryKey }: UseQueryOptions) => {
    const [, id] = queryKey;

    return fetch(`${BASE_URL}/tv/${id}?append_to_response=videos,images`, options).then(res =>
      res.json(),
    );
  },
};
