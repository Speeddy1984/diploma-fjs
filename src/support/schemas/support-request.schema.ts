import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Message, MessageSchema } from './message.schema';

export type SupportRequestDocument = SupportRequest & Document;

@Schema({ timestamps: true })
export class SupportRequest {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user!: Types.ObjectId;

  @Prop({ type: [MessageSchema], default: [] })
  messages!: Message[];

  @Prop({ default: true })
  isActive!: boolean;
}

export const SupportRequestSchema = SchemaFactory.createForClass(SupportRequest);
