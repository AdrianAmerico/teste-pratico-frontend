import { screen, fireEvent } from '@testing-library/react';
import { Table, TableProps } from './table';
import { sutMockProvider } from '@/__test__';

const makeData = () => [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
];

const defaultColumns: TableProps['columns'] = [
  { key: 'name', title: 'Nome' },
  { key: 'email', title: 'E-mail' },
];

const customColumns: TableProps['columns'] = [
  {
    key: 'name',
    title: 'Nome',
    options: {
      customBodyRender: (value) => (
        <span data-testid="custom-name">{value}</span>
      ),
    },
  },
  {
    key: 'email',
    title: 'E-mail',
  },
];

const makeSut = (props?: Partial<TableProps>) => {
  const sutProps: TableProps = {
    columns: defaultColumns,
    data: makeData(),
    isLoading: false,
    ...props,
  };

  const sut = sutMockProvider(<Table {...sutProps} />);

  return {
    sut,
    sutProps,
  };
};

describe('Table component', () => {
  it('should render column headers', () => {
    const { sut } = makeSut();

    expect(sut.getByText('Nome')).toBeInTheDocument();
    expect(sut.getByText('E-mail')).toBeInTheDocument();
  });

  it('should render all rows and cells', () => {
    const { sut } = makeSut();

    expect(sut.getByText('John Doe')).toBeInTheDocument();
    expect(sut.getByText('jane@example.com')).toBeInTheDocument();
  });

  it('should render with custom body renderers', () => {
    const { sut } = makeSut({
      columns: customColumns,
    });

    const customCells = sut.getAllByTestId('custom-name');
    expect(customCells).toHaveLength(2);
    expect(customCells[0]).toHaveTextContent('John Doe');
  });

  it('should render skeletons while loading', () => {
    makeSut({
      data: [],
      isLoading: true,
      skeletonRows: 3,
    });

    const skeletons = screen.getAllByTestId(/skeleton-row-/i);
    expect(skeletons).toHaveLength(3);
  });

  it('should show empty state when data is empty and not loading', () => {
    makeSut({
      data: [],
      isLoading: false,
      emptyText: 'Sem registros',
    });

    expect(screen.getByText('Sem registros')).toBeInTheDocument();
  });

  it('should expand and collapse mobile row details', () => {
    const { sut } = makeSut();

    const expandables = sut.container.querySelectorAll(
      '[class*=table__mobile-row-header]'
    );

    expect(expandables.length).toBeGreaterThan(0);

    fireEvent.click(expandables[0]);

    expect(
      sut.container.querySelector('[class*=table__mobile-row-details]')
    ).toBeInTheDocument();

    fireEvent.click(expandables[0]);

    expect(
      sut.container.querySelector('[class*=table__mobile-row-details]')
    ).not.toBeInTheDocument();
  });

  it('should render default cell value if customBodyRender is not provided', () => {
    makeSut({
      columns: [
        {
          key: 'name',
          title: 'Nome',
        },
      ],
      data: [{ name: 'John Doe' }],
    });

    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('should use customBodyRender if provided', () => {
    makeSut({
      columns: [
        {
          key: 'name',
          title: 'Nome',
          options: {
            customBodyRender: () => (
              <span data-testid="custom-render">Custom</span>
            ),
          },
        },
      ],
      data: [{ name: 'Ignored' }],
    });

    expect(screen.getByTestId('custom-render')).toHaveTextContent('Custom');
  });

  it('should render avatar as <img> when avatarColumn value is a string', () => {
    const columns: TableProps['columns'] = [
      {
        key: 'avatar',
        title: 'Avatar',
        options: {
          customBodyRender: (value) => value,
        },
      },
      {
        key: 'name',
        title: 'Nome',
      },
    ];

    const data = [
      {
        avatar: '/avatar.png',
        name: 'John Doe',
      },
    ];

    const { sut } = makeSut({
      columns,
      data,
      avatarColumn: 'avatar',
      primaryColumn: 'name',
    });

    const img = sut.container.querySelector('img');
    expect(img).toBeInTheDocument();
    expect(img?.getAttribute('src')).toBe('/avatar.png');
  });
});
