import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <h2 className="centered-text-block">
      Sorry, this page doesn&apos;t exist.
      <p>
        <Link className="link" to="/">
          Go back to the homepage.
        </Link>
      </p>
    </h2>
  );
};

export default NotFoundPage;
