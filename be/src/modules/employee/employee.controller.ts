import { Body, Controller, Post } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { editEmployee } from './dto';

@Controller('employee')
export class EmployeeController {
  constructor(readonly employeeService: EmployeeService) {}

  @Post()
  async createEmployee(@Body() createEmployeeDto: editEmployee) {
    return await this.employeeService.addEmployee(createEmployeeDto);
  }
}
