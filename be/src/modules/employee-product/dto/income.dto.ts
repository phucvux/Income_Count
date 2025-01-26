import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';

export class Income {
  @IsDate()
  date: Date;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}
