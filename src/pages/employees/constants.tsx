import { Avatar, TableColumnProps } from '@/components';

export const employeesColumns: TableColumnProps[] = [
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
    title: 'CARGO',
    key: 'job',
  },
  {
    title: 'DATA DE ADMISSÃO',
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
    title: 'TELEFONE',
    key: 'phone',
    options: {
      customBodyRender: (data) => {
        if (!data) return '-';

        return data.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
      },
    },
  },
];
