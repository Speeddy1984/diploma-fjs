import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Reservation, ReservationDocument } from './schemas/reservation.schema';
import { Model, Types } from 'mongoose';
import { ReservationDto, ReservationSearchOptions } from './interfaces/reservation.interface';

@Injectable()
export class ReservationService {
  constructor(@InjectModel(Reservation.name) private reservationModel: Model<ReservationDocument>) {}

  async addReservation(data: ReservationDto): Promise<Reservation> {
    const newReservation = new this.reservationModel({
      userId: new Types.ObjectId(data.userId),
      hotelId: new Types.ObjectId(data.hotelId),
      roomId: new Types.ObjectId(data.roomId),
      dateStart: data.dateStart,
      dateEnd: data.dateEnd,
    });
    return newReservation.save();
  }

  async removeReservation(id: string): Promise<void> {
    const result = await this.reservationModel.findByIdAndDelete(id);
    if (!result) {
      throw new BadRequestException('Бронь с указанным ID не существует');
    }
  }

  async getReservations(filter: ReservationSearchOptions): Promise<Reservation[]> {
    return this.reservationModel.find({ userId: new Types.ObjectId(filter.userId) });
  }
}
