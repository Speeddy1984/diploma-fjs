import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type MessageDocument = Message & Document;

@Schema({ timestamps: { createdAt: 'sentAt', updatedAt: false } })
export class Message {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  author!: Types.ObjectId;

  @Prop({ required: true })
  text!: string;

  @Prop()
  readAt?: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
