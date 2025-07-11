import { useEmployeesModel } from './employees.model';
import { EmployeesView } from './employees.view';

export const EmployeesPage = () => {
  const employeeModel = useEmployeesModel();

  return <EmployeesView model={employeeModel} />;
};
