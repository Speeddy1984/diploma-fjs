import { HotelRoom } from '../schemas/hotel-room.schema';

export interface SearchRoomsParams {
  limit: number;
  offset: number;
  hotel: string;
  isEnabled?: boolean;
}

export interface IHotelRoomService {
  createHotelRoom(data: Partial<HotelRoom>): Promise<HotelRoom>;
  findHotelRoomById(id: string): Promise<HotelRoom>;
  searchHotelRooms(params: SearchRoomsParams): Promise<HotelRoom[]>;
  updateHotelRoom(id: string, data: Partial<HotelRoom>): Promise<HotelRoom>;
}
