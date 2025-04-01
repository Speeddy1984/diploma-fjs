import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { SearchUserDto } from './dto/search-user.dto';
import { RolesGuard } from '../auth/guards/roles.guard';
import { AuthenticatedGuard } from '../auth/guards/authenticated.guard';
import { SetMetadata } from '@nestjs/common';

@Controller('api/admin/users')
@UseGuards(AuthenticatedGuard, RolesGuard)
@SetMetadata('roles', ['admin'])
export class UsersAdminController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() data: CreateUserDto) {
    const user = await this.usersService.create(data);
    return {
      id: user._id,
      email: user.email,
      name: user.name,
      contactPhone: user.contactPhone,
      role: user.role,
    };
  }

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
