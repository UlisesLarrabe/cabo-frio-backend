import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { paymentOptions } from 'const/paymentOptions';
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
  paymentMethod: paymentOptions;
  @Prop({ required: true })
  description: Array<{ item: string; quantity: number | string; type: string }>;
  @Prop({ required: true, type: String })
  idMovement: string;
  @Prop({ type: Object })
  client?: { name: string; value: string };
}

export const OrderSchema = SchemaFactory.createForClass(Order);
