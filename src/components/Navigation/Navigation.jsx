import clsx from 'clsx';
import { NavLink } from 'react-router-dom';
import css from './Navigation.module.css';

const navigationLinkClassNames = ({ isActive }) => {
  return clsx(css['navigation-link'], {
    [css['is-active']]: isActive,
  });
};

const Navigation = () => {
  return (
    <nav className={css['navigation']}>
      <ul className={css['navigation-list']}>
        <li>
          <NavLink to="/" className={navigationLinkClassNames}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/movies" className={navigationLinkClassNames}>
            Movies
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
