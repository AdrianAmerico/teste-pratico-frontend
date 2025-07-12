import { Header } from '@/components/header';
import styles from './employees.module.scss';
import { Input, Table } from '@/components';
import { mergeClassNames } from '@/utils';
import { EmployeesModel } from './employees.model';
import { employeesColumns } from './constants';

export interface EmployeesViewProps {
  model: EmployeesModel;
}

export const EmployeesView = (employerModel: EmployeesViewProps) => {
  const { employeeList, handleSearchQuery } = employerModel.model;

  return (
    <>
      <Header />

      <main className={mergeClassNames(styles.container, 'scrollbar')}>
        <div className={styles.headerGrid}>
          <h2 className={styles.title}>Funcionários</h2>
          <div className={styles.searchWrapper}>
            <Input
              name="search"
              placeholder="Pesquisar"
              onChange={(e) => {
                handleSearchQuery(e.target.value);
              }}
              className={styles.searchInput}
            />
          </div>
        </div>

        <Table
          columns={employeesColumns}
          data={employeeList.data ?? []}
          isLoading={employeeList.isLoading}
          skeletonRows={10}
          primaryColumn="name"
          avatarColumn="image"
        />
      </main>
    </>
  );
};
