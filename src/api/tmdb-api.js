import axios from 'axios';

const readAccessToken =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzODZkMWE2YmE2YjQ0MjYxNzk1YmMyNTdhNzVmODkxNSIsIm5iZiI6MTcyODc1NjEyOS42ODY5NTMsInN1YiI6IjY3MGFiN2VhMzdkODZkNTIwYmIwOGYxMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TsXiqWtNTSpQqWjFVq6ycukWoefbo19T23boTpmtkoA';
axios.defaults.baseURL = 'https://api.themoviedb.org/3';
axios.defaults.headers = {
  authorization: `Bearer ${readAccessToken}`,
};

export const fetchTrendingMovies = async () => {
  const response = await axios.get('/trending/movie/day');
  return response.data;
};

export const fetchMoviesByQuery = async query => {
  const config = {
    params: {
      query: query,
    },
  };
  const response = await axios.get('/search/movie', config);
  return response.data;
};

export const fetchMovieDetails = async movieId => {
  const response = await axios.get(`/movie/${movieId}`);
  return response.data;
};

export const fetchMovieCredits = async movieId => {
  const response = await axios.get(`/movie/${movieId}/credits`);
  return response.data;
};
