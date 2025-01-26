import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class EditProduct {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  unitPay: number;
}
