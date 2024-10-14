import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { fetchMovieReviews } from '../../api/tmdb-api';

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviewsList, setReviewsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!movieId) {
      setReviewsList([]);
      setError(false);
      return;
    }

    const fetchReviews = async () => {
      try {
        setIsLoading(true);
        setError(false);
        const response = await fetchMovieReviews(movieId);
        setReviewsList(response.results);
      } catch {
        setError(true);
        toast.error('It seems there was an error loading the movie reviews. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, [movieId]);

  if (isLoading) {
    return <div>LOADING</div>;
  }

  if (error) {
    return (
      <div>Something went wrong, we couldn&apos;t find any details for this film reviews.</div>
    );
  }

  if (reviewsList.length === 0) {
    return <div>There is no reviews information available for this movie.</div>;
  }

  return (
    <div>
      <ul>
        {reviewsList.map(review => (
          <li key={review.id}>
            <p>{review.author}</p>
            <p>{review.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieReviews;
