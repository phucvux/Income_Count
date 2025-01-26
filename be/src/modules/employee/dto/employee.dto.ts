import { IsNotEmpty, IsString } from 'class-validator';

export class editEmployee {
  @IsString()
  @IsNotEmpty()
  fullName: string;
}
