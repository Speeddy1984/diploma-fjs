import { Body, Controller, Post, BadRequestException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Controller('api/client')
export class ClientController {
  constructor(private readonly usersService: UsersService) {}

  // POST /api/client/register – регистрация
  @Post('register')
  async register(@Body() data: CreateUserDto) {
    const existingUser = await this.usersService.findByEmail(data.email);
    if (existingUser) {
      throw new BadRequestException('Email уже занят');
    }
    // Принудительно устанавливаем роль client, даже если будет другая роль
    data.role = 'client';
    const user = await this.usersService.create(data);
    return {
      id: user._id,
      email: user.email,
      name: user.name,
    };
  }
}
