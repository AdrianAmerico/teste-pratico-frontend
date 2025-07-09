import { createBrowserRouter } from 'react-router-dom';
import { EmployerPage } from '../employer';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <EmployerPage />,
  },
]);
