import { IsNotEmpty, IsString } from 'class-validator';

export class SendMessageDto {
  @IsNotEmpty()
  @IsString()
  author!: string; // ID автора сообщения

  @IsNotEmpty()
  @IsString()
  supportRequest!: string;

  @IsNotEmpty()
  @IsString()
  text!: string;
}
