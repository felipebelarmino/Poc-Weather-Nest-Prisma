import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { WeatherDto } from './dtos/weather.dto';
import { WeatherFilterDto } from './dtos/weather-filter.dto';
import { WeatherService } from './weather.service';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { Forecast } from './interfaces/forecast.interface';
import { WeatherFilterByDayDto } from './dtos/weather-filter-day.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from 'src/user/entities/user.entity';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('/api/v1/weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get()
  @ApiBearerAuth()
  async getWeather(
    @Query('city') city: string,
    @Query('state') state: string,
  ): Promise<Observable<AxiosResponse<WeatherDto>>> {
    console.log(city, state);
    const weatherFilter = {
      city: city,
      state: state,
    };

    return await this.weatherService.getWeather(weatherFilter);
  }

  @Post('/filter')
  @ApiBearerAuth()
  async getWeatherByDay(
    @Body() weatherFilter: WeatherFilterByDayDto,
  ): Promise<Forecast[]> {
    return await this.weatherService.getWeatherByDay(weatherFilter);
  }

  @Post('/favorite')
  @ApiBearerAuth()
  async favorite(
    @CurrentUser() user: User,
    @Body() weatherFilter: WeatherFilterByDayDto,
  ): Promise<void> {
    return await this.weatherService.addToFavorites(weatherFilter, user);
  }

  @Delete('/favorite/:id')
  @ApiBearerAuth()
  async deleteFavorite(
    @Param('id') id: number,
    @CurrentUser() user: User,
  ): Promise<void> {
    return await this.weatherService.deleteFromFavorites(id, user);
  }
}
