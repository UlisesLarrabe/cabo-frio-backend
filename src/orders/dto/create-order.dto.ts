import { IsArray, IsDateString, IsNumber, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  local: string;
  @IsNumber()
  totalPrice: number;
  @IsString()
  paymentMethod: 'cash' | 'mercado_pago' | 'pedidos_ya' | 'rappi';
  @IsDateString()
  createdAt: Date;
  @IsArray()
  description: Array<{ item: string; quantity: number | string; type: string }>;
}
