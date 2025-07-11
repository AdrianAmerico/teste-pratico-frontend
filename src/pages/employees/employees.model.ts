import { EmployeeService } from '@/services/employees';
import { useQuery } from '@tanstack/react-query';

export const useEmployeesModel = () => {
  const employeeList = useQuery({
    queryKey: ['employeeList'],
    queryFn: async () => {
      const response = await EmployeeService.getEmployees();

      return response;
    },
  });

  return {
    employeeList,
  };
};

export type EmployeesModel = ReturnType<typeof useEmployeesModel>;
