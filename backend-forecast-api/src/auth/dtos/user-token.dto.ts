import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UserToken {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  access_token: string;
}
