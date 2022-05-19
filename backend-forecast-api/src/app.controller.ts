import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { CurrentUser } from './auth/decorators/current-user.decorator';
import { IsPublic } from './auth/decorators/is-public.decorator';
import { PrismaService } from './prisma/prisma.service';
import { User } from './user/entities/user.entity';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly prisma: PrismaService,
  ) {}

  @IsPublic()
  @Get('/api/v1/status')
  async create(): Promise<Object> {
    return this.appService.getStatus();
  }

  @Get('/api/v1/me')
  @ApiBearerAuth()
  async getMe(@CurrentUser() user: User): Promise<object> {
    const userinfo = await this.prisma.user.findUnique({
      where: {
        id: user.id,
      },
      include: { days: true },
    });

    return {
      ...userinfo,
      password: undefined,
    };
  }
}
