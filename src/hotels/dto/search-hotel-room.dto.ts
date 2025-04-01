import { IsNotEmpty, IsNumber, IsOptional, IsString, IsBoolean } from 'class-validator';

export class SearchHotelRoomDto {
  @IsNotEmpty()
  @IsString()
  hotel!: string;

  @IsOptional()
  @IsBoolean()
  isEnabled?: boolean;

  @IsOptional()
  @IsNumber()
  limit?: number;

  @IsOptional()
  @IsNumber()
  offset?: number;
}
