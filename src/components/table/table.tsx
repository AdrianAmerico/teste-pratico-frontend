import { ReactNode } from 'react';
import styles from './table.module.scss';

export interface Column<T = any[]> {
  key: string;
  title: string;
  render?: (row: T) => ReactNode;
}

interface TableProps<T> {
  data: T[];
  columns: Array<Column<T>>;
}

export function Table<T>({ data, columns }: TableProps<T>) {
  return (
    <div className={styles.table__wrapper}>
      <table className={styles.table}>
        <thead className={styles.table__head}>
          <tr className={styles.table__row}>
            {columns?.map((col) => (
              <th key={col.key} className={styles.table__header}>
                {col.title}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className={styles.table__body}>
          {data.map((row, index) => (
            <tr
              key={index}
              className={`${styles.table__row} ${styles['table__row--responsive']}`}
            >
              {columns?.map((col) => (
                <td key={col.key} className={styles.table__cell}>
                  <span className={styles.table__label}>{col.title}:</span>
                  {col.render ? col.render(row) : col.title}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
