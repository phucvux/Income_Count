import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class Income {
  @IsDate()
  date: string;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @IsString()
  productId: string;
}
