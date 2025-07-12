/* eslint-disable @typescript-eslint/no-explicit-any */
import { HTMLAttributes, ReactNode, useState } from 'react';
import { ChevronDown, ChevronUp } from '@/components';
import { mergeClassNames } from '@/utils';
import styles from './table.module.scss';
import { Typography } from '../typography';
import { Skeleton } from '@/components';

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
  primaryColumn?: string;
  avatarColumn?: string;
}

export const Table = ({
  data,
  columns,
  primaryColumn,
  avatarColumn,
  className,
  isLoading = false,
  skeletonRows = 5,
  emptyText = 'Nenhum dado encontrado',
  ...props
}: TableProps) => {
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());

  const toggleRow = (index: number) => {
    const newExpandedRows = new Set(expandedRows);
    if (newExpandedRows.has(index)) {
      newExpandedRows.delete(index);
    } else {
      newExpandedRows.add(index);
    }
    setExpandedRows(newExpandedRows);
  };

  const getPrimaryColumnData = (row: Record<string, any>) => {
    const column = columns.find((col) => col.key === primaryColumn);
    const cellValue = row[primaryColumn!];
    return column?.options?.customBodyRender
      ? column.options.customBodyRender(cellValue, row)
      : cellValue;
  };

  const getAvatarData = (row: Record<string, any>) => {
    const column = columns.find((col) => col.key === avatarColumn);
    const cellValue = row[avatarColumn!];
    return column?.options?.customBodyRender
      ? column.options.customBodyRender(cellValue, row)
      : cellValue;
  };

  const getOtherColumns = () =>
    columns.filter(
      (col) => col.key !== primaryColumn && col.key !== avatarColumn
    );

  return (
    <div className={styles.table__container}>
      {/* Desktop */}
      <div className={styles.table__scrollable}>
        <table className={mergeClassNames(styles.table, className)} {...props}>
          <thead className={styles.table__head}>
            <tr>
              {columns.map((col) => (
                <th key={col.key} className={styles['table__cell--head']}>
                  {col.title}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className={styles.table__body}>
            {isLoading
              ? Array.from({ length: skeletonRows }).map((_, lineIndex) => (
                  <tr
                    key={lineIndex}
                    data-testid={`skeleton-row-${lineIndex}`}
                    className={styles.table__row}
                  >
                    {columns.map((_, colIndex) => (
                      <td
                        key={colIndex}
                        className={styles.table__cell__skeleton}
                      >
                        <Skeleton />
                      </td>
                    ))}
                  </tr>
                ))
              : data.map((row, rowIndex) => (
                  <tr key={rowIndex} className={styles.table__row}>
                    {columns.map((col, colIndex) => {
                      const cellValue = row[col.key];

                      const content = col.options?.customBodyRender
                        ? col.options.customBodyRender(cellValue, row)
                        : cellValue;

                      return (
                        <td key={colIndex} className={styles.table__cell}>
                          <Typography as="span" variant="h3">
                            {content}
                          </Typography>
                        </td>
                      );
                    })}
                  </tr>
                ))}
          </tbody>
        </table>
      </div>

      {/* Mobile */}
      <div className={styles.table__mobile}>
        <div className={styles['table__mobile-header']}>
          <div className={styles['table__mobile-header-content']}>
            {avatarColumn && (
              <Typography as="span" variant="h2">
                {columns.find((col) => col.key === avatarColumn)?.title}
              </Typography>
            )}

            {primaryColumn && (
              <Typography as="span" variant="h2">
                {columns.find((col) => col.key === primaryColumn)?.title}
              </Typography>
            )}
          </div>
          <div className={styles['table__mobile-header-icon']} />
        </div>

        {isLoading
          ? Array.from({ length: skeletonRows }).map((_, lineIndex) => (
              <div
                key={lineIndex}
                className={styles['table__mobile-row']}
                data-testid={`skeleton-mobile-row-${lineIndex}`}
              >
                {columns.map((_, colIndex) => (
                  <div
                    key={colIndex}
                    className={styles['table__mobile-detail-row']}
                  >
                    <Skeleton />
                  </div>
                ))}
              </div>
            ))
          : data.map((row, rowIndex) => {
              const isExpanded = expandedRows.has(rowIndex);
              const avatar = getAvatarData(row);
              const primaryData = getPrimaryColumnData(row);
              const otherColumns = getOtherColumns();

              return (
                <div key={rowIndex} className={styles['table__mobile-row']}>
                  <div
                    className={styles['table__mobile-row-header']}
                    onClick={() => toggleRow(rowIndex)}
                  >
                    <div className={styles['table__mobile-row-content']}>
                      {avatar && (
                        <div
                          className={styles['table__mobile-row-content-avatar']}
                        >
                          {typeof avatar === 'string' ? (
                            <img
                              src={avatar || '/placeholder.svg'}
                              alt="Avatar"
                              className={styles['table__mobile-row-avatar']}
                            />
                          ) : (
                            avatar
                          )}
                        </div>
                      )}

                      <Typography as="span" variant="h3">
                        {primaryData}
                      </Typography>
                    </div>

                    {isExpanded ? <ChevronUp /> : <ChevronDown />}
                  </div>

                  {isExpanded && otherColumns.length > 0 && (
                    <div className={styles['table__mobile-row-details']}>
                      <div>
                        {otherColumns.map((col) => {
                          const cellValue = row[col.key];
                          const displayValue = col.options?.customBodyRender
                            ? col.options.customBodyRender(cellValue, row)
                            : cellValue;

                          return (
                            <div
                              key={col.key}
                              className={styles['table__mobile-detail-row']}
                            >
                              <Typography as="span" variant="h2">
                                {col.title}
                              </Typography>

                              <Typography as="span" variant="h3">
                                {displayValue}
                              </Typography>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
      </div>

      {/* Empty State */}
      {!isLoading && data.length === 0 && (
        <div className={styles.table__empty}>{emptyText}</div>
      )}
    </div>
  );
};
