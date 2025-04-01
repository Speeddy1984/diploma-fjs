import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { SearchUserDto } from './dto/search-user.dto';
import { RolesGuard } from '../auth/guards/roles.guard';
import { AuthenticatedGuard } from '../auth/guards/authenticated.guard';
import { SetMetadata } from '@nestjs/common';

@Controller('api/manager/users')
@UseGuards(AuthenticatedGuard, RolesGuard)
@SetMetadata('roles', ['manager'])
export class UsersManagerController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(@Query() params: SearchUserDto) {
    const users = await this.usersService.findAll(params);
    return users.map(user => ({
      id: user._id,
      email: user.email,
      name: user.name,
      contactPhone: user.contactPhone,
    }));
  }
}
