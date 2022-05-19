import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class WeatherFilterDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'A city',
    example: 'Sao Paulo'
  })
  city: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'A state',
    example: 'SP'
  })
  state: string;
}
