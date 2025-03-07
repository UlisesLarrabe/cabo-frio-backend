import { IsDateString, IsNumber, IsString } from 'class-validator';

export class CreateMovementDto {
  @IsString()
  local: string;
  @IsString()
  type: 'income' | 'outcome';
  @IsNumber()
  amount: number;
  @IsString()
  paymentMethod: 'cash' | 'mercado_pago' | 'pedidos_ya';
  @IsString()
  reason: string;
  @IsDateString()
  createdAt: Date;
}
