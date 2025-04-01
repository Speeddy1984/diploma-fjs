import { Body, Controller, Put, Post, UseGuards, UseInterceptors, UploadedFiles, Param } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { HotelsService } from './hotels.service';
import { CreateHotelRoomDto } from './dto/create-hotel-room.dto';
import { UpdateHotelRoomDto } from './dto/update-hotel-room.dto';
import { AuthenticatedGuard } from '../auth/guards/authenticated.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { SetMetadata,NotFoundException } from '@nestjs/common';
// import { Express } from 'express';
import { Types } from 'mongoose';

@Controller('api/admin/hotel-rooms')
@UseGuards(AuthenticatedGuard, RolesGuard)
@SetMetadata('roles', ['admin'])
export class HotelRoomsAdminController {
  constructor(private readonly hotelsService: HotelsService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('images'))
  async createHotelRoom(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() createHotelRoomDto: CreateHotelRoomDto,
  ) {
    // Преобразуем hotelId из строки в ObjectId
    const hotelObjectId = new Types.ObjectId(createHotelRoomDto.hotelId);
    // Формируем ссылки для файлов в uploads
    const imageUrls = files.map(file => `/uploads/${file.filename}`);
    const room = await this.hotelsService.createHotelRoom({
      description: createHotelRoomDto.description,
      hotel: hotelObjectId,
      images: imageUrls,
      isEnabled: true,
    });
    return {
      id: (room as any)._id,
      description: room.description,
      images: room.images,
      isEnabled: room.isEnabled,
      hotel: {
        id: ((room.hotel as any)?._id) || room.hotel,
        title: (room.hotel as any)?.title,
        description: (room.hotel as any)?.description,
      },
    };
  }

  @Put(':id')
  @UseInterceptors(FilesInterceptor('images'))
    async updateHotelRoom(
    @Param('id') id: string,
    @UploadedFiles() files: Express.Multer.File[],
    @Body() updateHotelRoomDto: UpdateHotelRoomDto,
    ) {
    // Получаем текущие данные комнаты из базы
    const existingRoom = await this.hotelsService.findHotelRoomById(id);
    if (!existingRoom) {
      throw new NotFoundException('Hotel room not found');
    }

    // Получаем текущие изображения из базы
    const existingImages = existingRoom.images || [];
    const newImages = files.map(file => `/uploads/${file.filename}`);

    // Объединяем старые и новые изображения
    const updatedImages = [...existingImages, ...newImages];

    let updateData: any = { ...updateHotelRoomDto, images: updatedImages };

    if (updateData.hotelId) {
      updateData.hotel = new Types.ObjectId(updateData.hotelId);
      delete updateData.hotelId;
    }

    const room = await this.hotelsService.updateHotelRoom(id, updateData);
    return {
      id: (room as any)._id,
      description: room.description,
      images: room.images,
      isEnabled: room.isEnabled,
      hotel: {
        id: ((room.hotel as any)?._id) || room.hotel,
        title: (room.hotel as any)?.title,
        description: (room.hotel as any)?.description,
      },
    };
  }
}
