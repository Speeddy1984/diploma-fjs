import { Reservation } from '../schemas/reservation.schema';

export interface ReservationDto {
  userId: string;
  hotelId: string;
  roomId: string;
  dateStart: Date;
  dateEnd: Date;
}

export interface ReservationSearchOptions {
  userId: string;
}

export interface IReservationService {
  addReservation(data: ReservationDto): Promise<Reservation>;
  removeReservation(id: string): Promise<void>;
  getReservations(filter: ReservationSearchOptions): Promise<Reservation[]>;
}
