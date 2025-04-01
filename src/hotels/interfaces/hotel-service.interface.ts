import { Hotel } from '../schemas/hotel.schema';

export interface SearchHotelParams {
  limit: number;
  offset: number;
  title?: string;
}

export interface UpdateHotelParams {
  title: string;
  description: string;
}

export interface IHotelService {
  createHotel(data: { title: string; description?: string }): Promise<Hotel>;
  findHotelById(id: string): Promise<Hotel>;
  searchHotels(params: SearchHotelParams): Promise<Hotel[]>;
  updateHotel(id: string, data: UpdateHotelParams): Promise<Hotel>;
}
