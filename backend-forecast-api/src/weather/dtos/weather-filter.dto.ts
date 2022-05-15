import { IsNotEmpty, IsString } from "class-validator";

export class WeatherFilterDto {
  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  state: string;
}
