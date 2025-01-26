import { Module } from '@nestjs/common';
import { EmployeeProductService } from './employee-product.service';
import { EmployeeProductController } from './employee-product.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [EmployeeProductService],
  controllers: [EmployeeProductController],
})
export class EmployeeProductModule {}
