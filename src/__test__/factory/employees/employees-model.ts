import { vi } from 'vitest';
import { makeEmployee } from '@/__test__';
import { EmployeesModel } from '@/pages/employees/employees.model';

type PartialEmployeesModel = Partial<EmployeesModel>;

export const makeUseEmployeesModel = (
  props?: PartialEmployeesModel
): EmployeesModel => {
  const defaultData = [makeEmployee()];

  const mockReturn: EmployeesModel = {
    employeeList: {
      data: defaultData,
      isLoading: false,
      isSuccess: true,
      ...props?.employeeList,
    },
    searchQuery: props?.searchQuery ?? '',
    handleSearchQuery: props?.handleSearchQuery ?? vi.fn(),
  };

  return mockReturn;
};
