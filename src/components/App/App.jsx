import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import css from './App.module.css';
import Navigation from '../Navigation/Navigation';
import Loader from '../Loader/Loader';

const HomePage = lazy(() => import('../../pages/HomePage/HomePage'));
const MoviesPage = lazy(() => import('../../pages/MoviesPage/MoviesPage'));
const MovieDetailsPage = lazy(() => import('../../pages/MovieDetailsPage/MovieDetailsPage'));
const NotFoundPage = lazy(() => import('../../pages/NotFoundPage/NotFoundPage'));
const MovieCast = lazy(() => import('../../components/MovieCast/MovieCast'));
const MovieReviews = lazy(() => import('../../components/MovieReviews/MovieReviews'));

function App() {
  return (
    <div className="movie-scope">
      <header className={css['header']}>
        <Navigation />
      </header>
      <main className={css['main-container']}>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movies" element={<MoviesPage />} />
            <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
              <Route path="cast" element={<MovieCast />} />
              <Route path="reviews" element={<MovieReviews />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
    </div>
  );
}

export default App;
