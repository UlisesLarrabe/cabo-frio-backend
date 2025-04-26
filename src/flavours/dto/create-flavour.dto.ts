import { IsArray, IsNumber, IsString } from 'class-validator';

export class CreateFlavourDto {
  @IsString()
  name: string;
  @IsString()
  local: string;
  @IsNumber()
  stock: number;
  @IsArray()
  refrigerator: string[];
}
