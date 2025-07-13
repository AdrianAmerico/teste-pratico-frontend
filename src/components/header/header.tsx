import { Link } from 'react-router-dom';
import styles from './header.module.scss';

export const Header = () => {
  return (
    <div className={styles.header}>
      <Link to="/" className={styles.logoLink}>
        <img
          src={'betech-logo.png'}
          alt={'BeTalent Logo'}
          className={styles.logo}
        />
      </Link>
    </div>
  );
};
