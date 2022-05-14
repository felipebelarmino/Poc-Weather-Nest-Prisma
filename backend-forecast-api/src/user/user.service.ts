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
import { UpdateUserDto } from './dto/update-user.dto';
import { UserPayload } from 'src/auth/dtos/user-payload.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

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

  async update(updateUserDto: UpdateUserDto): Promise<object> {
    const user = await this.findByEmail(updateUserDto.email);

    if (user) {
      const validPassword = await bcrypt.compare(
        updateUserDto.password,
        user.password,
      );

      if (validPassword) {
        const userUpdated = await this.prisma.user
          .update({
            where: { email: user.email },
            data: {
              email: updateUserDto.email,
              name: updateUserDto.name,
              password: await bcrypt.hash(updateUserDto.newPassword, 10),
            },
          })
          .catch((error) => {
            throw new BadRequestException(error.message);
          });

        const payload: UserPayload = {
          sub: user.id,
          email: user.email,
          name: user.name,
        };

        const token: string = this.jwtService.sign(payload);

        return {
          message: 'User updated successfully.',
          ...userUpdated,
          newToken: token,
          password: undefined,
        };
      }
    }

    throw new BadRequestException('Some error occurred while updating.');
  }
}
