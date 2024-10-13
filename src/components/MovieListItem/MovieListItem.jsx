import { Link, useLocation } from 'react-router-dom';

const MovieListItem = ({ movie }) => {
  const location = useLocation();

  return (
    <li>
      <Link to={`/movies/${movie.id}`} state={location}>
        {movie.title}
      </Link>
    </li>
  );
};

export default MovieListItem;
