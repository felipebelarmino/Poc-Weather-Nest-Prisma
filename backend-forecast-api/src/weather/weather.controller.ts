import { Body, Controller, Get, Ip, Param } from '@nestjs/common';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { WeatherDto } from './dtos/weather.dto';
import { WeatherFilterDto } from './dtos/weather-filter.dto';
// import { AppService } from './app.service';
// import { CurrentUser } from './auth/decorators/current-user.decorator';
// import { User } from './user/entities/user.entity';

import { WeatherService } from './weather.service';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { Forecast } from './interfaces/forecast.interface';
import { WeatherFilterByDayDto } from './dtos/weather-filter-day.dto';

@Controller('/api/v1/weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get('/')
  async getWeather(
    @Body() weatherFilter: WeatherFilterDto,
    @Ip() ip,
  ): Promise<Observable<AxiosResponse<WeatherDto>>> {
    return await this.weatherService.getWeather(ip, weatherFilter);
  }

  @Get('/filter')
  async getWeatherByDay(
    @Body() weatherFilter: WeatherFilterByDayDto,
    @Ip() ip,
  ): Promise<Forecast[]> {
    return await this.weatherService.getWeatherByDay(ip, weatherFilter);
  }
}
