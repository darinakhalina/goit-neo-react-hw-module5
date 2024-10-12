import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { fetchTrendingMovies } from '../../api/tmdb-api';

function App() {
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
      <div>Test App</div>
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
    </>
  );
}

export default App;
