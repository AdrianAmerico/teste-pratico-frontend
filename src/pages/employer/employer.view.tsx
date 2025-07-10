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

const sampleData = [
  {
    id: 1,
    foto: '/placeholder.svg?height=40&width=40',
    nome: 'Giovana L. Arruda',
    cargo: 'Front-end',
    dataAdmissao: '00/00/0000',
    telefone: '+55 (55) 55555-555',
  },
  {
    id: 2,
    foto: '/placeholder.svg?height=40&width=40',
    nome: 'Vanessa Machado',
    cargo: 'Back-end',
    dataAdmissao: '15/03/2023',
    telefone: '+55 (11) 99999-9999',
  },
  {
    id: 3,
    foto: '/placeholder.svg?height=40&width=40',
    nome: 'Juliana Borba',
    cargo: 'Designer',
    dataAdmissao: '22/01/2023',
    telefone: '+55 (21) 88888-8888',
  },
  {
    id: 4,
    foto: '/placeholder.svg?height=40&width=40',
    nome: 'Josiane Dias',
    cargo: 'Product Manager',
    dataAdmissao: '10/05/2023',
    telefone: '+55 (31) 77777-7777',
  },
  {
    id: 5,
    foto: '/placeholder.svg?height=40&width=40',
    nome: 'Reginaldo Felipe',
    cargo: 'DevOps',
    dataAdmissao: '08/02/2023',
    telefone: '+55 (41) 66666-6666',
  },
  {
    id: 6,
    foto: '/placeholder.svg?height=40&width=40',
    nome: 'Grabriel D.',
    cargo: 'Full Stack',
    dataAdmissao: '12/04/2023',
    telefone: '+55 (51) 55555-5555',
  },
];

const columns: TableColumnProps[] = [
  {
    title: 'FOTO',
    key: 'foto',
    options: {
      customBodyRender: (data) => (
        <img
          src={data || '/placeholder.svg'}
          alt="Profile"
          className="w-10 h-10 rounded-full object-cover"
        />
      ),
    },
  },
  {
    title: 'NOME',
    key: 'nome',
  },
  {
    title: 'Cargo',
    key: 'cargo',
  },
  {
    title: 'Data de admissão',
    key: 'dataAdmissao',
  },
  {
    title: 'Telefone',
    key: 'telefone',
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

        <Table
          columns={columns}
          data={sampleData}
          primaryColumn="nome"
          avatarColumn="foto"
        />
      </main>
    </>
  );
};
