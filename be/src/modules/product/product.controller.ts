import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { EditProduct } from './dto';

@Controller('product')
export class ProductController {
  constructor(readonly productService: ProductService) {}

  @Post()
  async addProduct(@Body() addProductDto: EditProduct) {
    return await this.productService.addProduct(addProductDto);
  }

  @Get()
  async getAllProduct() {
    return await this.productService.listAllProduct();
  }
}
