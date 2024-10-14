import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { fetchMoviesByQuery } from '../../api/tmdb-api';
import MovieList from '../../components/MovieList/MovieList';
import Filter from '../../components/Filter/Filter';

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const [params] = useSearchParams();

  const filterValue = params.get('query') ?? '';

  useEffect(() => {
    if (!filterValue) {
      setMovies([]);
      setError(false);
      return;
    }

    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        setError(false);
        const response = await fetchMoviesByQuery(filterValue);
        setMovies(response.results);
      } catch {
        setError(true);
        toast.error('It seems there was an error loading the movies. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [filterValue]);

  return (
    <div>
      <Filter />
      {!isLoading && !error && <MovieList movies={movies} />}
      {isLoading && <div>LOADING</div>}
      {error && !isLoading && (
        <h2 className="centered-text-block">
          We couldn&apos;t load the movies for you. Please try again.
        </h2>
      )}
    </div>
  );
};

export default MoviesPage;
