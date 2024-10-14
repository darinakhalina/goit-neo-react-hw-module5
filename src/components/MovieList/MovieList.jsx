import MovieListItem from '../MovieListItem/MovieListItem';
import css from './MovieList.module.css';

const MovieList = ({ movies }) => {
  if (!movies) {
    return null;
  }

  if (movies.length === 0) {
    return (
      <h2 className="centered-text-block">
        No movies found. Please enter a movie title to search.
      </h2>
    );
  }

  return (
    <ul className={css['movie-list']}>
      {movies.map(movie => (
        <MovieListItem key={movie.id} movie={movie} />
      ))}
    </ul>
  );
};

export default MovieList;
