import { Link } from 'react-router-dom';
import styles from './not-found.module.scss';
import { Header } from '@/components';

export const NotFoundPage = () => {
  return (
    <div className={styles.container}>
      <Header />

      {/* Main Content */}
      <main className={styles.main}>
        <div className={styles.contentWrapper}>
          <div className={styles.statusCode}>404</div>

          <h2 className={styles.title}>Página não encontrada</h2>

          <p className={styles.description}>
            Desculpe, a página que você está procurando não existe ou foi
            movida.
          </p>

          <div className={styles.actions}>
            <Link to="/" className={styles.backButton}>
              Ir para início
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};
