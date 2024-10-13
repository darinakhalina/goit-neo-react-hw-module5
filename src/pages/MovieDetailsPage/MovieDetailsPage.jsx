import { useState, useEffect, useRef, Suspense } from 'react';
import { useParams, useLocation, useNavigate, Link, Outlet } from 'react-router-dom';
import toast from 'react-hot-toast';
import { fetchMovieDetails } from '../../api/tmdb-api';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const location = useLocation();
  const backPath = useRef(location.state ?? '/movies');
  const navigate = useNavigate();

  useEffect(() => {
    if (!movieId) {
      setMovie(null);
      setError(false);
      return;
    }

    const fetchMovie = async () => {
      try {
        setIsLoading(true);
        setError(false);
        const response = await fetchMovieDetails(movieId);
        setMovie(response);
      } catch {
        setError(true);
        toast.error('It seems there was an error loading the movie info. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovie();
  }, [movieId]);

  if (isLoading) {
    return <div>LOADING</div>;
  }

  if (error) {
    return <div>ERROR</div>;
  }

  if (!movie) {
    return null;
  }

  return (
    <div>
      <div>
        <button onClick={() => navigate(backPath.current)}>Go Back</button>
      </div>
      <div>
        <div>{movie.title}</div>
        <div>{movie.release_date}</div>
        <div>{movie.vote_average}</div>
      </div>
      <ul>
        <li>
          <Link to={`/movies/${movieId}/cast`}>Cast</Link>
        </li>
        <li>
          <Link to={`/movies/${movieId}/reviews`}>Reviews</Link>
        </li>
      </ul>
      <Suspense fallback={<div>LOADER FOR COMPONENTS</div>}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default MovieDetailsPage;
