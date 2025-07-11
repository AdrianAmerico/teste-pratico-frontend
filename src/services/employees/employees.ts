import { axiosClient } from '../http';
import { Employee } from './models';

export class EmployeeService {
  static async getEmployees() {
    const response = await axiosClient.get<Employee[]>('/employees');

    return response.data;
  }
}
