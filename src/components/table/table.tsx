// Table.tsx
import { HTMLAttributes, ReactNode } from 'react';
import styles from './table.module.scss';

export interface Column<T = any> {
  key: string;
  title: string;
  render?: (row: T) => ReactNode;
}

export type TableColumnProps = {
  title: string;
  key: string;
  options?: {
    customBodyRender: (
      data?: any,
      row?: Record<string, any>
    ) => string | number | ReactNode;
  };
};

export interface TableProps extends Partial<HTMLAttributes<HTMLTableElement>> {
  columns: TableColumnProps[];
  data: Array<Record<string, any>>;
  paginate?: boolean;
  linearPagination?: boolean;
  getPaginate?: (perPage?: number, page?: number) => void;
  total?: number;
  page?: number;
  perPage?: number;
  lastPage?: number;
  isLoading?: boolean;
  emptyText?: string;
  skeletonRows?: number;
  haveFocus?: boolean;
}

export const Table = ({ data, columns }: TableProps) => {
  return (
    <div className={styles.table__container}>
      <table className={styles.table}>
        <thead className={styles.table__head}>
          <tr className={styles.table__row}>
            {columns.map((col) => (
              <th key={col.key} className={styles.table__header}>
                {col.title}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className={styles.table__body}>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className={styles.table__row}>
              {columns.map((col, colIndex) => {
                const cellValue = row[col.key];

                return (
                  <td key={colIndex} className={styles.table__cell}>
                    {col.options?.customBodyRender
                      ? col.options.customBodyRender(cellValue, row)
                      : cellValue}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
