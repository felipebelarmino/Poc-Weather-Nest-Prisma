import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dtos/login.dto';
import { UserPayload } from './dtos/user-payload.dto';
import { User } from 'src/user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UserToken } from './dtos/user-token.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);

    if (user) {
      const validPassword = await bcrypt.compare(password, user.password);

      if (validPassword) {
        return {
          ...user,
          password: undefined,
        };
      }
    }

    throw new Error('Invalid email or password');
  }

  async login(login: LoginDto, user: User): Promise<UserToken> {
    try {
      const payload: UserPayload = {
        sub: user.id,
        email: user.email,
        name: user.name,
      };

      const token: string = this.jwtService.sign(payload);

      return {
        access_token: token,
      };
    } catch (error) {
      throw new Error(`Error: ${error?.message}`);
    }
  }
}
