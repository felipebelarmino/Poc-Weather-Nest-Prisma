import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class WeatherFilterByDayDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'A city',
    example: 'Sao Paulo',
  })
  city: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'A state',
    example: 'SP',
  })
  state: string;

  @IsNumber()
  @ApiProperty({
    description: 'A initial day',
    example: 19,
  })
  initial_day?: number;

  @IsNumber()
  @ApiProperty({
    description: 'A final day',
    example: 23,
  })
  final_day?: number;
}
