import { ColorRing } from 'react-loader-spinner';
import css from './Loader.module.css';

const Loader = () => {
  return (
    <ColorRing
      visible={true}
      height="80"
      width="80"
      ariaLabel="color-ring-loading"
      wrapperStyle={{}}
      wrapperClass={css['loader']}
      colors={['#d6056a', '#f41c84', '#ef3e93', '#f89fca', '#fdd7e9']}
    />
  );
};

export default Loader;
