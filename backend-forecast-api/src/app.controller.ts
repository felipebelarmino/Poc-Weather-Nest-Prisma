import { Controller, Get, Ip } from '@nestjs/common';
import { AppService } from './app.service';
import { CurrentUser } from './auth/decorators/current-user.decorator';
import { IsPublic } from './auth/decorators/is-public.decorator';
import { User } from './user/entities/user.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @IsPublic()
  @Get('/api/v1/status')
  async create(): Promise<Object> {
    return this.appService.getStatus();
  }

  @Get('/api/v1/me')
  async getMe(@CurrentUser() user: User, @Ip() ip): Promise<any> {
    return {
      user_ip: ip,
      ...user,
    };
  }
}
