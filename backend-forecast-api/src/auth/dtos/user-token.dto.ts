import { IsNotEmpty, IsString } from 'class-validator';

export class UserToken {
  @IsString()
  @IsNotEmpty()
  access_token: string;
}
