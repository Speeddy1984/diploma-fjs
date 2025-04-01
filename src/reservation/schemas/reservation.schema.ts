import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ReservationDocument = Reservation & Document;

@Schema({ timestamps: true })
export class Reservation {
  @Prop({ required: true, type: Types.ObjectId })
  userId!: Types.ObjectId;

  @Prop({ required: true, type: Types.ObjectId })
  hotelId!: Types.ObjectId;

  @Prop({ required: true, type: Types.ObjectId })
  roomId!: Types.ObjectId;

  @Prop({ required: true })
  dateStart!: Date;

  @Prop({ required: true })
  dateEnd!: Date;
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);
