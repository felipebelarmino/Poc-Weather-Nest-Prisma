import { Body, Controller, Delete, Get, Ip, Param, Post } from '@nestjs/common';
import { WeatherDto } from './dtos/weather.dto';
import { WeatherFilterDto } from './dtos/weather-filter.dto';
// import { AppService } from './app.service';
// import { User } from './user/entities/user.entity';

import { WeatherService } from './weather.service';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { Forecast } from './interfaces/forecast.interface';
import { WeatherFilterByDayDto } from './dtos/weather-filter-day.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from 'src/user/entities/user.entity';

@Controller('/api/v1/weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get('/')
  async getWeather(
    @Body() weatherFilter: WeatherFilterDto,
  ): Promise<Observable<AxiosResponse<WeatherDto>>> {
    return await this.weatherService.getWeather(weatherFilter);
  }

  @Get('/filter')
  async getWeatherByDay(
    @Body() weatherFilter: WeatherFilterByDayDto,
  ): Promise<Forecast[]> {
    return await this.weatherService.getWeatherByDay(weatherFilter);
  }

  @Post('/favorite')
  async favorite(
    @CurrentUser() user: User,
    @Body() weatherFilter: WeatherFilterByDayDto,
  ): Promise<void> {
    return await this.weatherService.addToFavorites(weatherFilter, user);
  }

  // @Delete('/favorite/:id')
  // async deleteFavorite(
  //   @Param('id') id: number,
  //   @CurrentUser() user: User,
  // ): Promise<void> {
  //   return await this.weatherService.deleteFromFavorites(id, user);
  // }// implementar delete
}
