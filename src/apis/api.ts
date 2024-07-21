const BASE_URL = "https://movies-api.nomadcoders.workers.dev";

export interface IMovieItem {
  id: number;
  title: string;
  overview: string;
  backdrop_path: string;
  poster_path: string;
}

export interface IGetMovieResult {
  page: number;
  results: IMovieItem[];
  total_pages: number;
  total_results: number;
}

export interface IDetailMovie {
  id: number;
  backdrop_path: string;
  budget: number;
  homepage: string;
  overview: string;
  poster_path: string;
  revenue: number;
  runtime: number;
  title: string;
}

export function getPopular() {
  return fetch(`${BASE_URL}/popular`).then((r) => r.json());
}

export function getNowPlaying() {
  return fetch(`${BASE_URL}/now-playing`).then((r) => r.json());
}

export function getComingSoon() {
  return fetch(`${BASE_URL}/coming-soon`).then((r) => r.json());
}

export function getMovie(id: string | undefined) {
  return fetch(`${BASE_URL}/movie?id=${id}`).then((r) => r.json());
}

export function makeImagePath(image: string) {
  return `https://image.tmdb.org/t/p/w500/${image}`;
}

export function makeBgPath(image: string) {
  return `https://image.tmdb.org/t/p/original/${image}`;
}
