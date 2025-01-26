import { Body, Controller, Get, Post } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { editEmployee } from './dto';

@Controller('employee')
export class EmployeeController {
  constructor(readonly employeeService: EmployeeService) {}

  @Post()
  async createEmployee(@Body() createEmployeeDto: editEmployee) {
    return await this.employeeService.addEmployee(createEmployeeDto);
  }

  @Get()
  async getAllEmployee() {
    return await this.employeeService.listEmployee();
  }
}
