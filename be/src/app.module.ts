import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './modules/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { EmployeeModule } from './modules/employee/employee.module';
import { ProductModule } from './modules/product/product.module';
import { EmployeeProductModule } from './modules/employee-product/employee-product.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    EmployeeModule,
    ProductModule,
    EmployeeProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
