import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { fetchMovieCredits } from '../../api/tmdb-api';

const MovieCast = () => {
  const { movieId } = useParams();
  const [castList, setCastList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!movieId) {
      setCastList([]);
      setError(false);
      return;
    }

    const fetchCredits = async () => {
      try {
        setIsLoading(true);
        setError(false);
        const response = await fetchMovieCredits(movieId);
        setCastList(response.cast);
      } catch {
        setError(true);
        toast.error('It seems there was an error loading the movie credits. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCredits();
  }, [movieId]);

  if (isLoading) {
    return <div>LOADING</div>;
  }

  if (error) {
    return <div>Something went wrong, we couldn&apos;t find any details for this film cast.</div>;
  }

  if (castList.length === 0) {
    return <div>There is no cast information available for this movie.</div>;
  }

  return (
    <div>
      <ul>
        {castList.map(castMember => (
          <li key={castMember.id}>
            <p>{castMember.name}</p>
            <p>{castMember.character}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCast;
