import { IsNotEmpty, IsString, IsDateString } from 'class-validator';

export class MarkMessagesAsReadDto {
  @IsNotEmpty()
  @IsString()
  user!: string; // ID пользователя, который не является автором

  @IsNotEmpty()
  @IsString()
  supportRequest!: string;

  @IsNotEmpty()
  @IsDateString()
  createdBefore!: string; // Все сообщения, отправленные до этой даты, будут отмечены прочитанными
}
