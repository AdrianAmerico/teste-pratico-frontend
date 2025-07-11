import { EmployerService } from '@/services/employer';
import { useQuery } from '@tanstack/react-query';

export const useEmployerModel = () => {
  const employerList = useQuery({
    queryKey: ['employerList'],
    queryFn: async () => {
      const response = await EmployerService.getEmployers();

      return response;
    },
  });

  return {
    employerList,
  };
};

export type EmployerModel = ReturnType<typeof useEmployerModel>;
