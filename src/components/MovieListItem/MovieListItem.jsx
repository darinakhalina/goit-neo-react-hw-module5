import { Link, useLocation } from 'react-router-dom';
import css from './MovieListItem.module.css';
import { DEFAULT_IMAGE, IMAGE_BASE_URL } from '../../constants/imageConstants';

const MovieListItem = ({ movie }) => {
  const location = useLocation();

  return (
    <li className={css['movie-list-item']}>
      <Link to={`/movies/${movie.id}`} state={location} className={css['movie-list-item-link']}>
        <img
          width={220}
          height={350}
          className={css['movie-list-item-img']}
          src={movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : DEFAULT_IMAGE}
        />
        <p className={css['movie-list-item-title']}>{movie.title}</p>
      </Link>
    </li>
  );
};

export default MovieListItem;
