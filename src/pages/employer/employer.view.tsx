import { Header } from '@/components/header';
import styles from './employer.module.scss';
import { Input } from '@/components';

export const EmployerView = () => {
  return (
    <>
      <Header />

      <main className={styles.container}>
        <div className={styles.headerGrid}>
          <h2 className={styles.title}>Funcionários</h2>
          <div className={styles.searchWrapper}>
            <Input name="search" placeholder="Pesquisar" />
          </div>
        </div>
      </main>
    </>
    // <div className={styles.container}>
    //   <div className={styles.headerGrid}>
    //     <h2 className={styles.title}>Funcionários</h2>
    //     <div className={styles.searchWrapper}>
    //       {/* <SearchBar
    //         value={search}
    //         onChange={(e) => setSearch(e.target.value)}
    //       /> */}
    //     </div>
    //   </div>
    //   {/* <EmployeeTable employees={filteredEmployees} /> */}
    // </div>
  );
};
