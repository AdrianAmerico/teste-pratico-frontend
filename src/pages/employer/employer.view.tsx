import { Header } from '@/components/header';
import styles from './employer.module.scss';
import { Input, Table, TableColumnProps } from '@/components';
import { mergeClassNames } from '@/utils';

const TableColumns: TableColumnProps[] = [
  {
    key: 'photo',
    title: 'Foto',
    options: {
      customBodyRender: (data) => (
        <div className={styles.photoWrapper}>
          <img src={data} alt="Foto do Funcionário" />
        </div>
      ),
    },
  },
  { key: 'name', title: 'Nome' },
  { key: 'position', title: 'Cargo' },
  { key: 'admissionDate', title: 'Data de Admissão' },
  { key: 'phone', title: 'Telefone' },
];

const mockData = [
  {
    photo: 'foto1.png',
    name: 'João Silva',
    position: 'Desenvolvedor',
    admissionDate: '2022-01-10',
    phone: '(81) 99999-9999',
  },
];

export const EmployerView = () => {
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

        <Table data={mockData} columns={TableColumns} />
      </main>
    </>
  );
};
