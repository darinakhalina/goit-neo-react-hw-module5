import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { fetchTrendingMovies } from '../../api/tmdb-api';
import MovieList from '../../components/MovieList/MovieList';
import Loader from '../../components/Loader/Loader';

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
      <h1 className="centered-text-block">Trending today</h1>
      {!isLoading && !error && <MovieList movies={movies} />}
      {isLoading && <Loader />}
      {error && !isLoading && (
        <h2 className="centered-text-block">
          We couldn&apos;t load the movies for you. Please try again.
        </h2>
      )}
    </div>
  );
};

export default HomePage;
