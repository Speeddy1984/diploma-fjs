import { Body, Controller, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { HotelsService } from './hotels.service';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { SearchHotelDto } from './dto/search-hotel.dto';
import { AuthenticatedGuard } from '../auth/guards/authenticated.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { SetMetadata } from '@nestjs/common';

@Controller('api/admin/hotels')
@UseGuards(AuthenticatedGuard, RolesGuard)
@SetMetadata('roles', ['admin'])
export class HotelsAdminController {
  constructor(private readonly hotelsService: HotelsService) {}

  @Post()
  async createHotel(@Body() createHotelDto: CreateHotelDto) {
    const hotel = await this.hotelsService.createHotel(createHotelDto);
    return {
      id: (hotel as any)._id,
      title: hotel.title,
      description: hotel.description,
    };
  }

  @Get()
  async getHotels(@Query() searchHotelDto: SearchHotelDto) {
    const hotels = await this.hotelsService.searchHotels({
      limit: searchHotelDto.limit || 10,
      offset: searchHotelDto.offset || 0,
      title: searchHotelDto.title,
    });
    return hotels.map(hotel => ({
      id: (hotel as any)._id,
      title: hotel.title,
      description: hotel.description,
    }));
  }

  @Put(':id')
  async updateHotel(
    @Param('id') id: string,
    @Body() updateHotelDto: UpdateHotelDto,
  ) {
    const hotel = await this.hotelsService.updateHotel(id, updateHotelDto);
    return {
      id: (hotel as any)._id,
      title: hotel.title,
      description: hotel.description,
    };
  }
}
