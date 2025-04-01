import { Controller, Get, Param, Query } from '@nestjs/common';
import { HotelsService } from './hotels.service';
import { SearchHotelRoomDto } from './dto/search-hotel-room.dto';

@Controller('api/common/hotel-rooms')
export class HotelsCommonController {
  constructor(private readonly hotelsService: HotelsService) {}

  @Get()
  async searchHotelRooms(@Query() searchHotelRoomDto: SearchHotelRoomDto) {
    const rooms = await this.hotelsService.searchHotelRooms({
      limit: searchHotelRoomDto.limit || 10,
      offset: searchHotelRoomDto.offset || 0,
      hotel: searchHotelRoomDto.hotel,
      isEnabled:
        typeof searchHotelRoomDto.isEnabled === 'boolean'
          ? searchHotelRoomDto.isEnabled
          : true,
    });
    return rooms.map(room => ({
      id: (room as any)._id,
      description: room.description,
      images: room.images,
      hotel: {
        id: ((room.hotel as any)?._id) || room.hotel,
        title: (room.hotel as any)?.title,
      },
    }));
  }

  @Get(':id')
  async getHotelRoomById(@Param('id') id: string) {
    const room = await this.hotelsService.findHotelRoomById(id);
    return {
      id: (room as any)._id,
      description: room.description,
      images: room.images,
      hotel: {
        id: ((room.hotel as any)?._id) || room.hotel,
        title: (room.hotel as any)?.title,
        description: (room.hotel as any)?.description,
      },
    };
  }
}
