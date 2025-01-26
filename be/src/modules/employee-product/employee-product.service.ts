import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Income } from './dto';
import * as moment from 'moment-timezone';

@Injectable()
export class EmployeeProductService {
  constructor(private prisma: PrismaService) {}

  async addIncomeByDay(
    incomeDto: Income,
    employeeId: string,
    productId: string,
  ) {
    try {
      // Kiểm tra xem ngày có hợp lệ không
      const date = moment(incomeDto.date, 'DD/MM/YYYY', true);
      if (!date.isValid()) {
        throw new Error('Ngày không hợp lệ');
      }

      // Tính tiền công (giả sử có bảng "Product" lưu thông tin về giá tiền của mỗi sản phẩm)
      const product = await this.prisma.product.findUnique({
        where: { id: productId },
      });
      if (!product) {
        throw new Error('Sản phẩm không tồn tại');
      }

      const totalIncome = product.unitPay * incomeDto.quantity;

      // Tạo bản ghi thu nhập cho nhân viên
      const income = await this.prisma.employeeProduct.create({
        data: {
          employeeId,
          productId,
          date: date.toDate(), // Chuyển ngày sang định dạng Date
          quantity: incomeDto.quantity,
          totalIncome, // Thêm tổng tiền công
        },
      });

      return income;
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
        .format('DD/MM/YYYY');
      const lastDay = moment
        .tz(`${year}-${month}-01`, 'Asia/Ho_Chi_Minh')
        .endOf('month')
        .format('DD/MM/YYYY');

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

      return findByEmployee;
    } catch (error) {
      throw new Error(error);
    }
  }
}
