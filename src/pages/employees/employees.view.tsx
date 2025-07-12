import { Header } from '@/components/header';
import styles from './employees.module.scss';
import { Input, Table, TableColumnProps, Avatar } from '@/components';
import { mergeClassNames } from '@/utils';
import { EmployeesModel } from './employees.model';

const columns: TableColumnProps[] = [
  {
    title: 'FOTO',
    key: 'image',
    options: {
      customBodyRender: (data, rowData) => {
        return (
          <Avatar
            src={data || '/placeholder.svg'}
            alt={`Imagem de perfil do(a) ${rowData?.name}`}
            style={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          />
        );
      },
    },
  },
  {
    title: 'NOME',
    key: 'name',
  },
  {
    title: 'Cargo',
    key: 'job',
  },
  {
    title: 'Data de admissão',
    key: 'admission_date',
    options: {
      customBodyRender: (data) => {
        if (!data) return '-';

        return new Date(data)?.toLocaleDateString('pt-BR', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        });
      },
    },
  },
  {
    title: 'Telefone',
    key: 'phone',
    options: {
      customBodyRender: (data) => {
        if (!data) return '-';

        return data.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
      },
    },
  },
];

interface EmployeesViewProps {
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
              onChange={(e) => handleSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </div>
        </div>

        <Table
          columns={columns}
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
