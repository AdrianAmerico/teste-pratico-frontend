import { useCallback, useRef, useState } from 'react';
import { EmployeeService } from '@/services/employees';
import { useQuery } from '@tanstack/react-query';

export const useEmployeesModel = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const debounceTimer = useRef(0);

  const handleSearchQuery = useCallback((newSearch?: string) => {
    window.clearTimeout(debounceTimer.current);
    debounceTimer.current = window.setTimeout(() => {
      const search = newSearch?.trim().toLowerCase();

      setSearchQuery(search || '');
    }, 500);
  }, []);

  const employeeList = useQuery({
    queryKey: ['employeeList', searchQuery],
    queryFn: async () => {
      const response = await EmployeeService.getEmployees();

      const filteredEmployees = EmployeeService.filterEmployees(
        response,
        searchQuery
      );

      return filteredEmployees;
    },
  });

  return {
    employeeList: {
      data: employeeList.data,
      isLoading: employeeList.isLoading,
      isSuccess: employeeList.isSuccess,
    },
    handleSearchQuery,
    searchQuery,
  };
};

export type EmployeesModel = ReturnType<typeof useEmployeesModel>;
