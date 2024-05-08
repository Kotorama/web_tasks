import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';

interface Location {
  longitude: number;
  latitude: number;
}

@Schema({ collection: 'addresses' })
export class Addresses {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  longitude: string;

  @Prop({ type: String, required: true })
  latitude: Location;
}

export const AddressSchema = SchemaFactory.createForClass(Addresses);

export type AddressLeanDoc = Addresses & { _id: Types.ObjectId };
export type AddressDoc = Addresses & Document;