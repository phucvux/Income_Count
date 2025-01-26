import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Income } from './dto';
import * as moment from 'moment-timezone';

@Injectable()
export class EmployeeProductService {
  constructor(private prisma: PrismaService) {}

  async addIncomeByDay(incomeDto: Income, employeeId: string) {
    try {
      // Kiểm tra xem ngày có hợp lệ không
      const date = moment.tz(incomeDto.date, 'Asia/Ho_Chi_Minh').format();

      // Tính tiền công (giả sử có bảng "Product" lưu thông tin về giá tiền của mỗi sản phẩm)
      const product = await this.prisma.product.findUnique({
        where: { id: incomeDto.productId },
      });
      if (!product) {
        throw new Error('Sản phẩm không tồn tại');
      }

      const totalIncome = product.unitPay * incomeDto.quantity;

      // Tạo bản ghi thu nhập cho nhân viên
      const income = await this.prisma.employeeProduct.create({
        data: {
          employeeId,
          productId: incomeDto.productId,
          date: date, // Giữ nguyên định dạng ISO 8601 với múi giờ
          quantity: incomeDto.quantity,
          totalIncome,
        },
      });

      return {
        income,
      };
    } catch (error) {
      throw new Error(error.message || 'Có lỗi xảy ra khi thêm thu nhập');
    }
  }

  async getIncomeDetail(month: string, year: string, employeeId: string) {
    try {
      // Tính toán ngày đầu và ngày cuối của tháng trong múi giờ Việt Nam
      const firstDay = moment
        .tz(`${year}-${month}-01`, 'Asia/Ho_Chi_Minh')
        .startOf('month')
        .format(); // Chuyển sang dạng Date
      const lastDay = moment
        .tz(`${year}-${month}-01`, 'Asia/Ho_Chi_Minh')
        .endOf('month')
        .format();

      // Tìm sản phẩm của nhân viên trong tháng
      const findByEmployee = await this.prisma.employeeProduct.findMany({
        where: {
          employeeId,
          date: {
            gte: firstDay, // Từ đầu tháng
            lte: lastDay, // Đến cuối tháng
          },
        },
      });

      const payment = await findByEmployee.reduce((sum, product) => {
        return sum + product.totalIncome;
      }, 0);

      return {
        findByEmployee,
        payment,
      };
    } catch (error) {
      throw new Error(error);
    }
  }
}
