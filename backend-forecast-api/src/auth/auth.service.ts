import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  validateUser(email: string, password: string) {
      throw new Error('Method not implemented.');
  }
  async login(): Promise<any> {
    return {
      access_token: 'access-token-8f3ae836da744329a6f93b7e28cafced',
    };
  }
}
