import { createBrowserRouter } from 'react-router-dom';
import { EmployeesPage } from '@/pages';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <EmployeesPage />,
  },
]);
