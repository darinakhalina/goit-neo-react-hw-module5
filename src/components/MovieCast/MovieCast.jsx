import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { fetchMovieCredits } from '../../api/tmdb-api';
import Loader from '../Loader/Loader';
import css from './MovieCast.module.css';
import { DEFAULT_IMAGE, IMAGE_BASE_URL } from '../../constants/imageConstants';

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
    return <Loader />;
  }

  if (error) {
    return (
      <h3 className="centered-text-block">
        Something went wrong, we couldn&apos;t find any details for this film cast.
      </h3>
    );
  }

  if (castList.length === 0) {
    return (
      <h3 className="centered-text-block">
        There is no cast information available for this movie.
      </h3>
    );
  }

  return (
    <div>
      <ul className={css['cast-list']}>
        {castList.map(castMember => (
          <li className={css['cast-list-item']} key={castMember.id}>
            <img
              width={220}
              height={350}
              className={css['cast-list-item-img']}
              src={
                castMember.profile_path
                  ? `${IMAGE_BASE_URL}${castMember.profile_path}`
                  : DEFAULT_IMAGE
              }
            />
            <div className={css['cast-list-item-info']}>
              <p className={css['cast-list-item-name']}>{castMember.name}</p>
              <p className={css['cast-list-item-character']}>{castMember.character}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCast;
