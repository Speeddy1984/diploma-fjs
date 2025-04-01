import { IsNotEmpty, IsString, IsOptional, IsDateString } from 'class-validator';

export class SearchReservationDto {
  @IsNotEmpty()
  @IsString()
  userId!: string;

  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;
}
