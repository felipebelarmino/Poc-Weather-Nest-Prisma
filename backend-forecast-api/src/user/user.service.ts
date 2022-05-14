import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { email } = createUserDto;
    const userAlreadyExists = await this.findByEmail(email);

    if (userAlreadyExists) {
      throw new ConflictException(`User already exists.`);
    }

    try {
      const data: Prisma.UserCreateInput = {
        ...createUserDto,
        password: await bcrypt.hash(createUserDto.password, 10),
      };

      const createdUser = await this.prisma.user.create({ data });

      return {
        ...createdUser,
        password: undefined,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findByEmail(email: string) {
    try {
      return await this.prisma.user.findUnique({
        rejectOnNotFound: true,
        where: { email },
      });
    } catch (error) {
      return null;
    }
  }
}
