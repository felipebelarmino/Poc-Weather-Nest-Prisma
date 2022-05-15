import { Body, Controller, Get, Ip } from '@nestjs/common';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { WeatherDto } from './dtos/weather-by-city.dto';
import { WeatherFilterDto } from './dtos/weather-filter.dto';
// import { AppService } from './app.service';
// import { CurrentUser } from './auth/decorators/current-user.decorator';
// import { User } from './user/entities/user.entity';

import { WeatherService } from './weather.service';

@Controller()
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @IsPublic()
  @Get('/api/v1/weather')
  async getWeather(
    @Body() weatherFilter: WeatherFilterDto,
    @Ip() ip,
  ): Promise<any>{
    return await this.weatherService.getWeather(ip, weatherFilter);
  }
}
