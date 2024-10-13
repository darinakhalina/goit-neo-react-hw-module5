import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { fetchTrendingMovies } from '../../api/tmdb-api';

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const response = await fetchTrendingMovies();
        setMovies(response.results);
      } catch (error) {
        toast.error(error.message);
      }
    };

    fetchTrending();
  }, []);

  console.log(movies);

  return (
    <>
      <div>HomePage</div>
    </>
  );
};

export default HomePage;
