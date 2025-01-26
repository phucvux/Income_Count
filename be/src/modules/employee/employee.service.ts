import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { editEmployee } from './dto';

@Injectable()
export class EmployeeService {
  constructor(private prisma: PrismaService) {}

  //them nhan vien
  async addEmployee(addEmployee: editEmployee) {
    const newEmployee = await this.prisma.employee.create({
      data: {
        fullName: addEmployee.fullName,
      },
    });
    return newEmployee;
  }

  async listEmployee() {
    return await this.prisma.employee.findMany();
  }
}
