import { useEmployerModel } from './employer.model';
import { EmployerView } from './employer.view';

export const EmployerPage = () => {
  const employerModel = useEmployerModel();

  return <EmployerView model={employerModel} />;
};
