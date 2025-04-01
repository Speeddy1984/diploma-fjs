import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Reservation, ReservationSchema } from './schemas/reservation.schema';
import { ReservationService } from './reservation.service';
import { ReservationClientController } from './reservation.client.controller';
import { ReservationManagerController } from './reservation.manager.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Reservation.name, schema: ReservationSchema }]),
  ],
  providers: [ReservationService],
  controllers: [ReservationClientController, ReservationManagerController],
})
export class ReservationModule {}
