import { IsArray, IsDateString, IsNumber, IsString } from 'class-validator';
import { paymentOptions } from 'const/paymentOptions';

export class CreateOrderDto {
  @IsString()
  local: string;
  @IsNumber()
  totalPrice: number;
  @IsString()
  paymentMethod: paymentOptions;
  @IsDateString()
  createdAt: Date;
  @IsArray()
  description: Array<{ item: string; quantity: number | string; type: string }>;
  idMovement: string;
  client?: { name: string; value: string };
}
