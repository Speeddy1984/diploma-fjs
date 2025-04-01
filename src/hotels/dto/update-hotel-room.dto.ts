import { IsOptional, IsString, IsBoolean, IsArray } from 'class-validator';

export class UpdateHotelRoomDto {
  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsBoolean()
  isEnabled?: boolean;

  @IsOptional()
  @IsArray()
  images?: string[];

  @IsOptional()
  @IsString()
  hotelId?: string;
}
