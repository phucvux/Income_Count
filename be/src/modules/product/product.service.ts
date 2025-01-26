import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EditProduct } from './dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  //them san pham
  async addProduct(addProduct: EditProduct) {
    try {
      const newProduct = await this.prisma.product.create({
        data: {
          name: addProduct.name,
          unitPay: addProduct.unitPay,
        },
      });
      return newProduct;
    } catch (error) {
      throw new Error(error);
    }
  }

  async listAllProduct() {
    return await this.prisma.product.findMany();
  }
}
