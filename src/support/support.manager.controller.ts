import { Controller, Get, Query, UseGuards, DefaultValuePipe, ParseIntPipe } from '@nestjs/common';
import { SupportService } from './support.service';
import { AuthenticatedGuard } from '../auth/guards/authenticated.guard';
import { SetMetadata } from '@nestjs/common';
import { RolesGuard } from '../auth/guards/roles.guard';

@Controller('api/manager/support-requests')
@UseGuards(AuthenticatedGuard, RolesGuard)
@SetMetadata('roles', ['manager'])
export class SupportManagerController {
  constructor(private readonly supportService: SupportService) {}

  // Получение списка обращений от клиентов
  @Get()
  async getSupportRequests(
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('offset', new DefaultValuePipe(0), ParseIntPipe) offset: number,
    @Query('isActive') isActive: string,
  ) {
    const filter: any = {};
    if (isActive !== undefined) {
      filter.isActive = isActive === 'true';
    }
    const supportRequests = await this.supportService.getSupportRequests({
      isActive: filter.isActive,
      limit,
      offset,
    });
    return supportRequests.map(supportReq => {
      const reqAny = supportReq as any;
      const client = reqAny.user;
      return {
        id: reqAny._id.toString(),
        createdAt: reqAny.createdAt,
        isActive: reqAny.isActive,
        hasNewMessages: reqAny.messages.some((msg: any) => !msg.readAt),
        client: client
          ? {
              id: client._id.toString(),
              name: client.name,
              email: client.email,
              contactPhone: client.contactPhone,
            }
          : null,
      };
    });
  }
  
}
