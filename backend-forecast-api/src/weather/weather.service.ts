import { Injectable, Ip } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { lastValueFrom, Observable } from 'rxjs';
import { WeatherDto } from './dtos/weather-by-city.dto';
import { WeatherFilterDto } from './dtos/weather-filter.dto';

@Injectable()
export class WeatherService {
  constructor(private httpService: HttpService) {}

  async getWeather(
    ip,
    weatherFilter: WeatherFilterDto,
  ): Promise<Observable<AxiosResponse<any>>> {
    console.log(ip);

    const response = await lastValueFrom(
      this.httpService.get(
        `https://api.hgbrasil.com/weather?key=d77b0250&city_name=suzano,sp`,
      ),
    );

    const { data } = response;

    return data;
  }
}
