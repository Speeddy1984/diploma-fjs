import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateHotelDto {
  @IsNotEmpty()
  @IsString()
  title!: string;

  @IsNotEmpty()
  @IsString()
  description!: string;
}
