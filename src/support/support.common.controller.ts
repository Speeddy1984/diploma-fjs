import { Body, Controller, Get, Param, Post, UseGuards, Req, ForbiddenException } from '@nestjs/common';
import { SupportService } from './support.service';
import { AuthenticatedGuard } from '../auth/guards/authenticated.guard';
import { SetMetadata } from '@nestjs/common';
import { Request } from 'express';
import { SendMessageDto } from './dto/send-message.dto';
import { MarkMessagesAsReadDto } from './dto/mark-messages-as-read.dto';

@Controller('api/common/support-requests')
@UseGuards(AuthenticatedGuard) // Дополнительная проверка по ролям будет вручную
export class SupportCommonController {
  constructor(private readonly supportService: SupportService) {}

  // Получение истории сообщений из обращения
  @Get(':id/messages')
  async getMessages(@Param('id') supportRequestId: string, @Req() req: Request) {
    const supportReq = await this.supportService.getSupportRequestById(supportRequestId);
    
    // Сравниваем id (преобразуем в строки)
    if (
      req.user &&
      (req.user as any)['role'] === 'client' &&
      (req.user as any)['_id'].toString() !== (supportReq.user as any)._id.toString()
    ) {
      throw new ForbiddenException('Доступ запрещен');
    }
    
    return supportReq.messages.map(msg => ({
      id: (msg as any)._id.toString(),
      createdAt: (msg as any).sentAt,
      text: msg.text,
      readAt: msg.readAt,
      author: {
        id: (msg.author as any)._id.toString(),
        name: (msg.author as any).name,
      },
    }));
  }

   // Отправка сообщения
   @Post(':id/messages')
async sendMessage(
  @Param('id') supportRequestId: string,
  @Body() sendMessageDto: SendMessageDto,
  @Req() req: Request,
) {
  const supportReq = await this.supportService.getSupportRequestById(supportRequestId);
  
  if (!supportReq.user) {
    throw new ForbiddenException('Пользователь не является автором обращения');
  }
  if (
    req.user &&
    (req.user as any)['role'] === 'client' &&
    (req.user as any)['_id'].toString() !== (supportReq.user as any)._id.toString()
  ) {
    throw new ForbiddenException('Доступ запрещен');
  }
  const authorId = sendMessageDto.author || (req.user as any)['_id'];
  const message = await this.supportService.sendMessage({
    author: authorId,
    supportRequest: supportRequestId,
    text: sendMessageDto.text,
  });

  return {
    id: (message as any)._id.toString(),
    createdAt: (message as any).sentAt,
    text: message.text,
    readAt: message.readAt,
    author: {
      id: (message.author as any)._id.toString(),
      name: (message.author as any).name,
    },
  };
}

  // Отправка события, что сообщения прочитаны
  @Post(':id/messages/read')
    async markMessagesAsRead(
      @Param('id') supportRequestId: string,
      @Body() markDto: MarkMessagesAsReadDto,
      @Req() req: Request,
    ) {
      await this.supportService.markMessagesAsReadClient({
        user: markDto.user,
        supportRequest: supportRequestId,
        createdBefore: new Date(markDto.createdBefore),
      });
      return { success: true };
    }
}
