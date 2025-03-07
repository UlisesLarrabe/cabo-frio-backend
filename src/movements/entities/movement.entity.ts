import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MovementsDocument = HydratedDocument<Movement>;

@Schema()
export class Movement {
  @Prop({ required: true })
  local: string;
  @Prop({ required: true })
  type: 'income' | 'outcome';
  @Prop({ required: true })
  amount: number;
  @Prop({ required: true })
  createdAt: Date;
  @Prop({ required: true })
  paymentMethod: 'cash' | 'mercado_pago' | 'pedidos_ya';
  @Prop()
  reason?: string;
}

export const MovementSchema = SchemaFactory.createForClass(Movement);
