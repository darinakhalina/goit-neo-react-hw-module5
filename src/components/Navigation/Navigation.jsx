import clsx from 'clsx';
import { NavLink } from 'react-router-dom';
import { GoHome } from 'react-icons/go';
import { RiMovieLine } from 'react-icons/ri';
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
            <GoHome className={css['navigation-link-icon']} size={20} />
            <span>Home</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/movies" className={navigationLinkClassNames}>
            <RiMovieLine className={css['navigation-link-icon']} size={20} />
            <span>Movies</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
