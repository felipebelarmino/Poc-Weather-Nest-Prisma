import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class WeatherFilterByDayDto {
  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  state: string;

  @IsNumber()
  initial_day?: number;

  @IsNumber()
  final_day?: number;
}