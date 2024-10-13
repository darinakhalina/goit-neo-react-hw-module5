import MovieListItem from '../MovieListItem/MovieListItem';

const MovieList = ({ movies }) => {
  if (!movies) {
    return null;
  }

  if (movies.length === 0) {
    return <div>No movies found.</div>;
  }

  return (
    <ul>
      {movies.map(movie => (
        <MovieListItem key={movie.id} movie={movie} />
      ))}
    </ul>
  );
};

export default MovieList;
