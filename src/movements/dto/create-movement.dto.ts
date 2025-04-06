import { IsDateString, IsNumber, IsString } from 'class-validator';
import { paymentOptions } from 'const/paymentOptions';

export class CreateMovementDto {
  @IsString()
  local: string;
  @IsString()
  type: 'income' | 'outcome';
  @IsNumber()
  amount: number;
  @IsString()
  paymentMethod: paymentOptions;
  @IsString()
  reason: string;
  @IsDateString()
  createdAt: Date;
  client?: { name: string; value: string };
}
