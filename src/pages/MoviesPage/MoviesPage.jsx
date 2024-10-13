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
      } catch (e) {
        setError(true);
        toast.error(e.message);
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
      {error && !isLoading && <div>ERROR</div>}
    </div>
  );
};

export default MoviesPage;
