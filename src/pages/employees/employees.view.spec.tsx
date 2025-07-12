import { cleanup, fireEvent, waitFor } from '@testing-library/react';
import { EmployeesView, EmployeesViewProps } from './employees.view';
import { makeEmployee, sutMockProvider } from '@/__test__';
import { vi } from 'vitest';
import { makeUseEmployeesModel } from '@/__test__/factory/employees/employees-model';

describe('EmployeesView', () => {
  afterEach(cleanup);

  const makeSut = (props?: Partial<EmployeesViewProps>) => {
    const sutProps: EmployeesViewProps = {
      model: {
        ...makeUseEmployeesModel({
          employeeList: {
            data: [makeEmployee(), makeEmployee()],
            isLoading: false,
            isSuccess: true,
          },
          handleSearchQuery: vi.fn(),
        }),
      },
      ...props,
    };

    const sut = sutMockProvider(<EmployeesView {...sutProps} />);

    return {
      sut,
      sutProps,
    };
  };

  it('should render the component', () => {
    const { sut } = makeSut();

    expect(sut.getByText(/Funcionários/i)).toBeInTheDocument();

    const searchInput = sut.getByPlaceholderText(/Pesquisar/i);

    expect(searchInput).toBeInTheDocument();
  });

  it('should call handleSearchQuery when search input changes', async () => {
    const handleSearchQuery = vi.fn();

    const { sut, sutProps } = makeSut({
      model: {
        ...makeUseEmployeesModel({
          handleSearchQuery,
        }),
      },
    });

    const searchInput = sut.getByPlaceholderText(/Pesquisar/i);

    fireEvent.change(searchInput, {
      target: { value: sutProps.model.employeeList.data?.[0]?.name ?? '' },
    });

    await waitFor(() => {
      expect(handleSearchQuery).toHaveBeenCalledWith(
        sutProps.model.employeeList.data?.[0]?.name
      );

      expect(handleSearchQuery).toHaveBeenCalledTimes(1);
    });
  });
});
