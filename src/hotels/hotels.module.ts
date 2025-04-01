// src/hotels/hotels.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Hotel, HotelSchema } from './schemas/hotel.schema';
import { HotelRoom, HotelRoomSchema } from './schemas/hotel-room.schema';
import { HotelsService } from './hotels.service';
import { HotelsAdminController } from './hotels.admin.controller';
import { HotelRoomsAdminController } from './hotel-rooms.admin.controller';
import { HotelsCommonController } from './hotels.common.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Hotel.name, schema: HotelSchema }]),
    MongooseModule.forFeature([{ name: HotelRoom.name, schema: HotelRoomSchema }]),
    // Настройка Multer. Файлы будут сохраняться в src/uploads
    MulterModule.register({
      storage: diskStorage({
        destination: './src/uploads',
        filename: (req, file, callback) => {
          // имя файла будет уникальным
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          // вытаскиваем расширение
          const ext = extname(file.originalname);
          callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  ],
  providers: [HotelsService],
  exports: [HotelsService],
  controllers: [HotelsAdminController, HotelRoomsAdminController, HotelsCommonController],
})
export class HotelsModule {}
