import { Controller, Get } from '@nestjs/common';
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

  @Get('me')
  async getMe(@CurrentUser() user: User): Promise<User> {
    return user;
  }
}
