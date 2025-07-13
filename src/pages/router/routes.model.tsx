import { createBrowserRouter } from 'react-router-dom';
import { EmployeesPage, NotFoundPage } from '@/pages';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <EmployeesPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
