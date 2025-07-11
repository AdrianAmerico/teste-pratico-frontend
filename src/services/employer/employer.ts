import { axiosClient } from '../http';
import { Employee } from './models';

export class EmployerService {
  static async getEmployers() {
    const response = await axiosClient.get<Employee[]>('/employees');

    return response.data;
  }
}
