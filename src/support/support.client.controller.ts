import { Body, Controller, Get, Post, Query, UseGuards, Req, ParseIntPipe, DefaultValuePipe } from '@nestjs/common';
import { SupportService } from './support.service';
import { AuthenticatedGuard } from '../auth/guards/authenticated.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { SetMetadata } from '@nestjs/common';
import { Request } from 'express';
import { CreateSupportRequestDto } from './dto/create-support-request.dto';

@Controller('api/client/support-requests')
@UseGuards(AuthenticatedGuard, RolesGuard) // доступ для аутентифицированных пользователей (роль проверяется отдельно, если нужно)
@SetMetadata('roles', ['client'])
export class SupportClientController {
  constructor(private readonly supportService: SupportService) {}

  // Создание обращения в поддержку
  @Post()
  async createSupportRequest(
    @Body() createSupportRequestDto: CreateSupportRequestDto,
    @Req() req: Request,
  ) {
    // Берем user из сессии
    const userId = (req.user as any)['_id'];
    const supportRequest = await this.supportService.createSupportRequest({
      user: userId,
      text: createSupportRequestDto.text,
    });
    return [{
      id: (supportRequest as any)._id,
      createdAt: (supportRequest as any).createdAt,
      isActive: supportRequest.isActive,
      hasNewMessages: supportRequest.messages.some(msg => !msg.readAt),
    }];
  }

  // Получение списка обращений для клиента
  @Get()
  async getSupportRequests(
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('offset', new DefaultValuePipe(0), ParseIntPipe) offset: number,
    @Query('isActive') isActive: string,
    @Req() req: Request,
  ) {
    const userId = (req.user as any)['_id'];
    const filter: any = { user: userId };
    if (isActive !== undefined) {
      filter.isActive = isActive === 'true';
    }
    console.log('Filter:', filter, 'limit:', limit, 'offset:', offset);
    const supportRequests = await this.supportService.getSupportRequests({
      user: userId,
      isActive: filter.isActive,
      limit,
      offset,
    });
    return supportRequests.map(supportReq => ({
      id: (supportReq as any)._id,
      createdAt: (supportReq as any).createdAt,
      isActive: supportReq.isActive,
      hasNewMessages: supportReq.messages.some(msg => !msg.readAt),
    }));
  }
}
