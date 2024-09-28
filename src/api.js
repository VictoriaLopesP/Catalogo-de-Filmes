const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '6bd46496fcd511555f5fa0b740f3098b'; 

export async function getPopularMovies() {
  const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&page=1`);
  return response.json();
}

export async function getTrendingMovies() {
  const response = await fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`);
  return response.json();
}