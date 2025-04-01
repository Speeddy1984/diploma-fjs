import { IsOptional, IsString, IsNumber } from 'class-validator';

export class SearchHotelDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsNumber()
  limit?: number;

  @IsOptional()
  @IsNumber()
  offset?: number;
}
