import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { fetchTrendingMovies } from '../../api/tmdb-api';
import MovieList from '../../components/MovieList/MovieList';
import { DEFAULT_IMAGE } from '../../constants/imageConstants';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        setIsLoading(true);
        setError(false);
        const response = await fetchTrendingMovies();
        setMovies(response.results);
      } catch {
        setError(true);
        toast.error('It seems there was an error loading the movies. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrending();
  }, []);

  return (
    <div>
      <h2>Trending today</h2>
      <img src={DEFAULT_IMAGE} width={250} alt="poster" />
      {!isLoading && !error && <MovieList movies={movies} />}
      {isLoading && <h1>LOADER</h1>}
      {error && !isLoading && <h1>ERROR</h1>}
    </div>
  );
};

export default HomePage;
