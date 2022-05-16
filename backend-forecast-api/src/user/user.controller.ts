import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('/api/v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @IsPublic()
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.userService.create(createUserDto);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  async update(
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<any> {
    return await this.userService.update(updateUserDto);
  }
}
