import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { UsersModule } from './users/users.module';
import { HotelsModule } from './hotels/hotels.module';
import { ReservationModule } from './reservation/reservation.module';
import { SupportModule } from './support/support.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    EventEmitterModule.forRoot(),
    MongooseModule.forRoot(`${process.env.MONGODB_URI}${process.env.USER_MONGO}:${process.env.PASSWORD_MONGO}${process.env.MONGODB_DB}?retryWrites=true&w=majority&appName=diploma-cluster`),
    UsersModule,    // Модуль пользователей
    HotelsModule,   // Модуль гостиниц
    ReservationModule, // Модуль бронирования
    SupportModule,  // Модуль чата поддержки
    AuthModule,     // Модуль аутентификации
  ],
})
export class AppModule {}
