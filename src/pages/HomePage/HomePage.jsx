import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { fetchTrendingMovies } from '../../api/tmdb-api';
import MovieList from '../../components/MovieList/MovieList';

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const response = await fetchTrendingMovies();
        setMovies(response.results);
      } catch (e) {
        toast.error(e.message);
      }
    };

    fetchTrending();
  }, []);

  return (
    <>
      <div>HomePage</div>
      <MovieList movies={movies} />
    </>
  );
};

export default HomePage;
