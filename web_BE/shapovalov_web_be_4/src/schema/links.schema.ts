import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';

@Schema({ collection: 'Links' })
export class Links {
  @Prop({ type: String, required: true })
  user: string;

  @Prop({ type: String, required: true })
  link: string;

  @Prop({ type: String, required: true })
  shortLink: string;

  @Prop({ type: Date, required: true })
  expireAt: Date;
}

export const LinksSchema = SchemaFactory.createForClass(Links);
LinksSchema.index({ expireAt: 1 }, { expireAfterSeconds: 1 });
export type LinksLeanDoc = Links & { _id: Types.ObjectId };
export type LinksDoc = Links & Document;