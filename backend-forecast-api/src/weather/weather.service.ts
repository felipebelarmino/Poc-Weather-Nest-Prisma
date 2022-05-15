import { BadRequestException, Injectable, Ip } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { lastValueFrom, Observable } from 'rxjs';
import { WeatherDto } from './dtos/weather.dto';
import { WeatherFilterDto } from './dtos/weather-filter.dto';
import { Day } from './dtos/day-user.dto';
import { Forecast } from './interfaces/forecast.interface';
import { WeatherFilterByDayDto } from './dtos/weather-filter-day.dto';

@Injectable()
export class WeatherService {
  constructor(private httpService: HttpService) {}

  async getWeather(
    ip,
    weatherFilter: WeatherFilterDto,
  ): Promise<Observable<AxiosResponse<WeatherDto>>> {
    try {
      const { city, state } = weatherFilter;

      const response = await lastValueFrom(
        this.httpService.get(
          `https://api.hgbrasil.com/weather?key=d77b0250&city_name=${city},${state}`,
        ),
      );

      const { data } = response;

      return data;
    } catch (error) {
      throw new BadRequestException(`Error: ${error.message}`);
    }
  }

  async getWeatherByDay(
    ip: any,
    weatherFilter: WeatherFilterByDayDto,
  ): Promise<Forecast[]> {
    try {
      const { city, state, initial_day, final_day } = weatherFilter;

      const response = await lastValueFrom(
        this.httpService.get(
          `https://api.hgbrasil.com/weather?key=d77b0250&city_name=${city},${state}`,
        ),
      );

      const { data }: WeatherDto = response;

      if (initial_day > final_day || initial_day < 0 || final_day < 0) {
        throw new BadRequestException('Invalid parameters.');
      }

      const forecast: Forecast[] = data.results.forecast.filter((day) => {
        const forecast_day = parseInt(day.date.split('/')[0]);

        if (forecast_day >= initial_day && forecast_day <= final_day)
          return day;
      });

      return forecast;
    } catch (error) {
      throw new BadRequestException(`Error: ${error.message}`);
    }
  }
}
