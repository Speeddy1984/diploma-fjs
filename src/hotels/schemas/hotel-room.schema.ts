import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type HotelRoomDocument = HotelRoom & Document;

@Schema({ timestamps: true })
export class HotelRoom {
  @Prop({ type: Types.ObjectId, ref: 'Hotel', required: true })
  hotel!: Types.ObjectId;

  @Prop()
  description?: string;

  @Prop({ type: [String], default: [] })
  images!: string[];

  @Prop({ required: true, default: true })
  isEnabled!: boolean;
}

export const HotelRoomSchema = SchemaFactory.createForClass(HotelRoom);
