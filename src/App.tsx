import { ReactQueryProvider } from './components/query-provider';
import { RouterProvider } from './pages/router';

const App = () => {
  return (
    <ReactQueryProvider>
      <RouterProvider />
    </ReactQueryProvider>
  );
};

export default App;
