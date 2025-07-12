import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

export const sutMockProvider = (children: ReactNode) => {
  return render(
    <MemoryRouter>
      <QueryClientProvider client={new QueryClient()}>
        {children}
      </QueryClientProvider>
    </MemoryRouter>
  );
};
