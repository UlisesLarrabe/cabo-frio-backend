import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type FlavoursDocument = HydratedDocument<Flavour>;

@Schema()
export class Flavour {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  stock: number;
  @Prop({ required: true })
  local: string;
  @Prop({ required: true })
  refrigerator: string;
}

export const FlavourSchema = SchemaFactory.createForClass(Flavour);
