import { Header } from '@/components/header';
import styles from './employer.module.scss';
import { Input, Table, TableColumnProps } from '@/components';
import { mergeClassNames } from '@/utils';
import { EmployerModel } from './employer.model';
import { Avatar } from '@/components/avatar/avatar';

const columns: TableColumnProps[] = [
  {
    title: 'FOTO',
    key: 'image',
    options: {
      customBodyRender: (data) => {
        return (
          <Avatar
            src={data || '/placeholder.svg'}
            // alt="Profile"
            // className={styles['table__avatar']}
            // loading="lazy"
            // decoding="async"
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

interface EmployerViewProps {
  model: EmployerModel;
}

export const EmployerView = (employerModel: EmployerViewProps) => {
  const { employerList } = employerModel.model;
  console.log(employerList.data);

  return (
    <>
      <Header />

      <main className={mergeClassNames(styles.container, 'scrollbar')}>
        <div className={styles.headerGrid}>
          <h2 className={styles.title}>Funcionários</h2>
          <div className={styles.searchWrapper}>
            <Input name="search" placeholder="Pesquisar" />
          </div>
        </div>

        <Table
          columns={columns}
          data={employerList.data ?? []}
          isLoading={employerList.isLoading}
          skeletonRows={10}
          primaryColumn="name"
          avatarColumn="image"
        />
      </main>
    </>
  );
};
