import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersAdminController } from './users.admin.controller';
import { UsersManagerController } from './users.manager.controller';
import { UsersService } from './users.service';
import { User, UserSchema } from './schemas/user.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  controllers: [UsersAdminController, UsersManagerController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
