import { Body, Controller, Post } from '@nestjs/common';
import { EmployeeProductService } from './employee-product.service';
import { Income } from './dto';

@Controller('employee-product')
export class EmployeeProductController {
  constructor(readonly incomeService: EmployeeProductService) {}

  // @Post()
  // async addIncome (@Body() incomeDto: Income)
}
