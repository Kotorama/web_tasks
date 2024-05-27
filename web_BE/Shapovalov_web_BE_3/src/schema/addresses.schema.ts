import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';

// interface Location {
//   longitude: number;
//   latitude: number;
// }

@Schema({})
export class Location {
  @Prop({ type: Number, required: true })
  longitude: number;

  @Prop({ type: Number, required: true })
  latitude: number;
}

export const LocationSchema = SchemaFactory.createForClass(Location);

@Schema({ collection: 'addresses' })
export class Addresses {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: Object, required: true })
  location: Location;
}

export const AddressSchema = SchemaFactory.createForClass(Addresses);

export type AddressLeanDoc = Addresses & { _id: Types.ObjectId };
export type AddressDoc = Addresses & Document;