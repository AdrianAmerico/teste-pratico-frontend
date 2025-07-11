import { RouterProvider as Provider } from 'react-router-dom';
import { router } from './routes.model';

export const RouterProvider = () => {
  return <Provider router={router} />;
};
