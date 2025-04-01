import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateHotelDto {
  @IsNotEmpty()
  @IsString()
  title!: string;

  @IsOptional()
  @IsString()
  description?: string;
}
