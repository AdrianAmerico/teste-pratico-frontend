import styles from './header.module.scss';

export const Header = () => {
  return (
    <div className={styles.header}>
      <img
        src={'betech-logo.png'}
        alt={'BeTalent Logo'}
        className={styles.logo}
      />
    </div>
  );
};
