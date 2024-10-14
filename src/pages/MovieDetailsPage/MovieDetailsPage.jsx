import { useState, useEffect, useRef, Suspense } from 'react';
import { useParams, useLocation, useNavigate, Link, Outlet } from 'react-router-dom';
import toast from 'react-hot-toast';
import { fetchMovieDetails } from '../../api/tmdb-api';
import Loader from '../../components/Loader/Loader';

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
    return <Loader />;
  }

  if (error) {
    return (
      <div>
        <h2 className="centered-text-block">
          Something went wrong, we couldn&apos;t find any details for this film.
          <p>
            <button onClick={() => navigate(backPath.current)}>Go Back</button>
          </p>
        </h2>
      </div>
    );
  }

  if (!movie) {
    return (
      <div>
        <h2 className="centered-text-block">
          Sorry, we couldn&apos;t find any details for this film.
          <p>
            <button onClick={() => navigate(backPath.current)}>Go Back</button>
          </p>
        </h2>
      </div>
    );
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
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default MovieDetailsPage;
