import { Body, Controller, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { EditProduct } from './dto';

@Controller('product')
export class ProductController {
  constructor(readonly productService: ProductService) {}

  @Post()
  async addProduct(@Body() addProductDto: EditProduct) {
    return await this.productService.addProduct(addProductDto);
  }
}
