import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { lastValueFrom, Observable } from 'rxjs';
import { WeatherDto } from './dtos/weather.dto';
import { WeatherFilterDto } from './dtos/weather-filter.dto';
import { Forecast } from './interfaces/forecast.interface';
import { WeatherFilterByDayDto } from './dtos/weather-filter-day.dto';
import { User } from 'src/user/entities/user.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class WeatherService {
  constructor(
    private httpService: HttpService,
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
  ) {}

  async getWeather(
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

  async addToFavorites(
    weatherFilter: WeatherFilterByDayDto,
    user: User,
  ): Promise<void> {
    const { email } = user;

    try {
      const userExists = await this.prisma.user.findUnique({
        rejectOnNotFound: true,
        where: { email },
      });

      if (userExists) {
        const forecast = await this.getWeatherByDay(weatherFilter);

        if (forecast.length === 0) {
          throw new BadRequestException('Invalid parameters.');
        }

        const { city } = weatherFilter;

        const dayAlreadyExists = await this.prisma.day.findFirst({
          where: {
            userId: userExists.id,
            city: city,
            date: forecast[0].date,
          },
        });

        if (dayAlreadyExists) {
          throw new ConflictException('Day already exists.');
        }

        await this.prisma.day.create({
          data: {
            city: city,
            condition: forecast[0].condition,
            date: forecast[0].date,
            max: forecast[0].max,
            min: forecast[0].min,
            description: forecast[0].description,
            weekday: forecast[0].weekday,
            createdAt: new Date(),
            user: { connect: { id: userExists.id } },
          },
        });
      }
    } catch (error) {
      throw new BadRequestException(`Error: ${error.message}`);
    }
  }

  async deleteFromFavorites(id: number, user: User): Promise<void> {
    const { email } = user;

    try {
      const userExists = await this.prisma.user.findUnique({
        rejectOnNotFound: true,
        where: { email },
      });

      if (userExists) {
        const favoriteDayExists = await this.prisma.day.findFirst({
          where: {
            userId: userExists.id,
            id: id,
          },
        });

        if (!favoriteDayExists) {
          throw new BadRequestException('Day not found.');
        }

        await this.prisma.day.delete({
          where: {
            id: id,
          },
        });
      }
    } catch (error) {
      throw new BadRequestException(`Error: ${error.message}`);
    }
  }
}
