import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { EmployeeProductService } from './employee-product.service';
import { Income } from './dto';

@Controller('employee-product')
export class EmployeeProductController {
  constructor(readonly incomeService: EmployeeProductService) {}

  @Post(':id')
  async addIncome(@Body() incomeDto: Income, @Param('id') employeeId: string) {
    return await this.incomeService.addIncomeByDay(incomeDto, employeeId);
  }

  @Get(':id')
  async getIncome(
    @Param('id') employeeId: string,
    @Query('month') month: string,
    @Query('year') year: string,
  ) {
    return await this.incomeService.getIncomeDetail(month, year, employeeId);
  }
}
