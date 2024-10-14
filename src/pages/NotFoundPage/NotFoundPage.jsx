import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div>
      <p>Sorry, this page doesn&apos;t exist.</p>
      <p>
        <Link to="/">Go back to the homepage.</Link>
      </p>
    </div>
  );
};

export default NotFoundPage;
