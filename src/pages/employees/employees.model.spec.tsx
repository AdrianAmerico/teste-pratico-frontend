/* eslint-disable react/display-name */
import { cleanup, renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEmployeesModel } from './employees.model';
import MockAdapter from 'axios-mock-adapter';
import { axiosClient } from '@/services/http';
import { makeEmployee } from '@/__test__';

describe('useEmployeesModel', () => {
  afterEach(cleanup);
  const axiosMock = new MockAdapter(axiosClient);

  const createWrapper = () => {
    const queryClient = new QueryClient();

    return ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  };

  const makeSut = () => {
    const sut = renderHook(() => useEmployeesModel(), {
      wrapper: createWrapper(),
    });

    return sut;
  };

  it('should initialize with empty search query', () => {
    const { result } = makeSut();

    expect(result.current.searchQuery).toBe('');
  });

  it('should update search query after debounce', async () => {
    const { result } = makeSut();
    const newSearch = 'John Doe';
    result.current.handleSearchQuery(newSearch);

    expect(result.current.searchQuery).toBe('');

    await waitFor(() => {
      expect(result.current.searchQuery).toBe(newSearch.toLowerCase());
    });

    result.current.handleSearchQuery('');
    expect(result.current.searchQuery).not.toBe('');

    await waitFor(() => {
      expect(result.current.searchQuery).toBe('');
    });
  });

  it('should fetch and filter employees', async () => {
    const mockEmployees = [makeEmployee(), makeEmployee()];

    axiosMock.onGet('/employees').reply(200, mockEmployees);

    const { result } = makeSut();

    await waitFor(() => {
      expect(result.current.employeeList.isSuccess).toBe(true);

      expect(result.current.employeeList.data).toEqual(mockEmployees);
    });
  });

  it('should filter employees based on search query', async () => {
    const mockEmployees = [
      makeEmployee({ name: 'John Doe' }),
      makeEmployee({ name: 'Jane Smith' }),
    ];

    axiosMock.onGet('/employees').reply(200, mockEmployees);

    const { result } = makeSut();

    await waitFor(() => {
      expect(result.current.employeeList.isSuccess).toBe(true);
      expect(result.current.employeeList.data).toEqual(mockEmployees);
    });

    result.current.handleSearchQuery('John');

    await waitFor(() => {
      expect(result.current.employeeList.data).toEqual([mockEmployees[0]]);
    });

    result.current.handleSearchQuery('Jane');

    await waitFor(() => {
      expect(result.current.employeeList.data).toEqual([mockEmployees[1]]);
    });
  });
});
