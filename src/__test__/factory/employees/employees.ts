import { Employee } from '@/services/employees/models';
import { faker } from '@faker-js/faker';

export const makeEmployee = (props?: Partial<Employee>): Employee => {
  return {
    id: faker.number.int({ min: 1, max: 1000 }),
    name: faker.person.fullName(),
    admission_date: faker.date.past().toISOString(),
    job: faker.person.jobTitle(),
    phone: faker.phone.number(),
    image: faker.image.avatar(),
    ...props,
  };
};
