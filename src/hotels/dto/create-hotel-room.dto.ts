import { IsNotEmpty, IsOptional, IsString, IsArray } from 'class-validator';

export class CreateHotelRoomDto {
  @IsNotEmpty()
  @IsString()
  hotelId!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsArray()
  images?: string[];
}
