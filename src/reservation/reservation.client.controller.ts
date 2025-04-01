import { Body, Controller, Delete, Get, Param, Post, UseGuards, Req } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { AuthenticatedGuard } from '../auth/guards/authenticated.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { SetMetadata } from '@nestjs/common';
import { Request } from 'express';
import { CreateReservationDto } from './dto/create-reservation.dto';

@Controller('api/client/reservations')
@UseGuards(AuthenticatedGuard, RolesGuard)
@SetMetadata('roles', ['client'])
export class ReservationClientController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  async addReservation(
    @Body() createReservationDto: CreateReservationDto,
    @Req() req: Request,
  ) {
    const userId = (req.user as any)['_id'];
    const reservation = await this.reservationService.addReservation({
      userId,
      hotelId: createReservationDto.hotelId,
      roomId: createReservationDto.hotelRoom,
      dateStart: new Date(createReservationDto.startDate),
      dateEnd: new Date(createReservationDto.endDate),
    });
    return reservation;
  }

  @Get()
  async getReservations(@Req() req: Request) {
    const userId = (req.user as any)['_id'];
    const reservations = await this.reservationService.getReservations({ userId });
    return reservations;
  }

  @Delete(':id')
  async removeReservation(@Param('id') id: string, @Req() req: Request) {
    await this.reservationService.removeReservation(id);
    return {};
  }
}
