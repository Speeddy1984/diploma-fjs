import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSupportRequestDto {
  @IsNotEmpty()
  @IsString()
  user!: string;

  @IsNotEmpty()
  @IsString()
  text!: string;
}
