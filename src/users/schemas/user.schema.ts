import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true, unique: true })
  email!: string;

  @Prop({ required: true })
  passwordHash!: string;

  @Prop({ required: true })
  name!: string;

  @Prop()
  contactPhone?: string;

  @Prop({ required: true, default: 'client' })
  role!: 'client' | 'admin' | 'manager';
}

export const UserSchema = SchemaFactory.createForClass(User);
export type UserDocument = User & Document;