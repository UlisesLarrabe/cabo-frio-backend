import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type OrdersDocument = HydratedDocument<Order>;

@Schema()
export class Order {
  @Prop({ required: true })
  local: string;
  @Prop({ required: true })
  totalPrice: number;
  @Prop({ required: true })
  createdAt: Date;
  @Prop({ required: true })
  paymentMethod: 'cash' | 'mercado_pago' | 'pedidos_ya';
  @Prop({ required: true })
  description: Array<{ item: string; quantity: number }>;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
