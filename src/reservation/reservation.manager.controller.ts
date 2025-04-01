import { Controller, Delete, Get, Param, UseGuards } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { AuthenticatedGuard } from '../auth/guards/authenticated.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { SetMetadata } from '@nestjs/common';

@Controller('api/manager/reservations')
@UseGuards(AuthenticatedGuard, RolesGuard)
@SetMetadata('roles', ['manager'])
export class ReservationManagerController {
  constructor(private readonly reservationService: ReservationService) {}

  @Get(':userId')
  async getReservationsByUser(@Param('userId') userId: string) {
    const reservations = await this.reservationService.getReservations({ userId });
    return reservations;
  }

  @Delete(':id')
  async removeReservation(@Param('id') id: string) {
    await this.reservationService.removeReservation(id);
    return {};
  }
}
