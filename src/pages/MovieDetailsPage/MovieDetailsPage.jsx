import { useState, useEffect, useRef, Suspense } from 'react';
import { useParams, useLocation, useNavigate, Outlet, NavLink } from 'react-router-dom';
import clsx from 'clsx';
import dayjs from 'dayjs';
import toast from 'react-hot-toast';
import { GoArrowLeft } from 'react-icons/go';
import { MdOutlineRecentActors } from 'react-icons/md';
import { GoCodeReview } from 'react-icons/go';
import { fetchMovieDetails } from '../../api/tmdb-api';
import Loader from '../../components/Loader/Loader';
import css from './MovieDetailsPage.module.css';
import { DEFAULT_IMAGE, IMAGE_BASE_URL } from '../../constants/imageConstants';

const navigationLinkClassNames = ({ isActive }) => {
  return clsx(css['movie-details-page-nav-link'], {
    [css['is-active']]: isActive,
  });
};

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
        <div className={css['movie-details-page-back-bnt-holder']}>
          <button
            className={css['movie-details-page-back-bnt']}
            onClick={() => navigate(backPath.current)}
          >
            <GoArrowLeft className={css['movie-details-page-back-bnt-icon']} />
            Go Back
          </button>
        </div>
        <h2 className="centered-text-block">
          Something went wrong, we couldn&apos;t find any details for this film.
        </h2>
      </div>
    );
  }

  if (!movie) {
    return (
      <div>
        <div className={css['movie-details-page-back-bnt-holder']}>
          <button
            className={css['movie-details-page-back-bnt']}
            onClick={() => navigate(backPath.current)}
          >
            <GoArrowLeft className={css['movie-details-page-back-bnt-icon']} />
            Go Back
          </button>
        </div>
        <h2 className="centered-text-block">
          Sorry, we couldn&apos;t find any details for this film.
        </h2>
      </div>
    );
  }

  return (
    <div>
      <div className={css['movie-details-page-back-bnt-holder']}>
        <button
          className={css['movie-details-page-back-bnt']}
          onClick={() => navigate(backPath.current)}
        >
          <GoArrowLeft className={css['movie-details-page-back-bnt-icon']} />
          Go Back
        </button>
      </div>
      <div className={css['movie-details']}>
        <img
          width={300}
          height={450}
          className={css['movie-details-img']}
          src={movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : DEFAULT_IMAGE}
        />
        <div className={css['movie-details-info']}>
          <h1 className={css['movie-details-title']}>
            <span>{movie.title}</span>
            <span>({dayjs(movie.release_date).year()})</span>
          </h1>
          <p>Vote average: {Math.floor(movie.vote_average * 10)}%</p>
          <h2 className={css['movie-details-subtitle']}>Overview:</h2>
          <p className={css['movie-details-overview']}>{movie.overview}</p>
          <h2 className={css['movie-details-subtitle']}>Genres:</h2>
          <ul className={css['movie-details-genre-list']}>
            {movie.genres.map(genre => (
              <li className={css['movie-details-genre-item']} key={genre.id}>
                {genre.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <ul className={css['movie-details-page-nav']}>
        <li>
          <NavLink to={`/movies/${movieId}/cast`} className={navigationLinkClassNames}>
            <MdOutlineRecentActors className={css['movie-details-page-nav-link-icon']} />
            <span>Cast</span>
          </NavLink>
        </li>
        <li>
          <NavLink to={`/movies/${movieId}/reviews`} className={navigationLinkClassNames}>
            <GoCodeReview className={css['movie-details-page-nav-link-icon']} />
            <span>Reviews</span>
          </NavLink>
        </li>
      </ul>
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default MovieDetailsPage;
