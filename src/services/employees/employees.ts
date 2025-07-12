import { axiosClient } from '../http';
import { Employee } from './models';

export class EmployeeService {
  private static normalize(query: string): string {
    return query
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }

  static async getEmployees() {
    const response = await axiosClient.get<Employee[]>('/employees');

    return response.data;
  }

  static filterEmployees(employees: Employee[], query: string): Employee[] {
    const normalizedQuery = this.normalize(query);

    return employees.filter((employee) => {
      const combined = this.normalize(
        `${employee.name} ${employee.job} ${employee.phone}`
      );

      return combined.includes(normalizedQuery);
    });
  }
}
