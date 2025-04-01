import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { IUserService, SearchUserParams } from './interfaces/user.interface';

@Injectable()
export class UsersService implements IUserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  // Создать пользователя
  async create(data: CreateUserDto): Promise<User> {
    // Хешируем пароль
    const hashedPassword = await bcrypt.hash(data.passwordHash, 10);
    const newUser = new this.userModel({
      ...data,
      passwordHash: hashedPassword,
      role: data.role || 'client',
    });
    return newUser.save();
  }

  // Найти пользователя по id
  async findById(id: string): Promise<User | null> {
    return this.userModel.findById(id);
  }

  // Найти пользователя по email
  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email });
  }

  // Найти пользователей по email, имени и телефону
  async findAll(params: SearchUserParams): Promise<User[]> {
    const filter: any = {};
    if (params.email) filter.email = { $regex: params.email, $options: 'i' };
    if (params.name) filter.name = { $regex: params.name, $options: 'i' };
    if (params.contactPhone) filter.contactPhone = { $regex: params.contactPhone, $options: 'i' };

    return this.userModel
      .find(filter)
      .limit(params.limit || 10)
      .skip(params.offset || 0);
  }
}
