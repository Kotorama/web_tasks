import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';

@Schema({ collection: 'users' })
export class Users {
  @Prop({ type: String, required: true })
  email: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: String, required: true })
  apiKey: string;
}

export const UsersSchema = SchemaFactory.createForClass(Users);

export type UsersLeanDoc = Users & { _id: Types.ObjectId };
export type UsersDoc = Users & Document;