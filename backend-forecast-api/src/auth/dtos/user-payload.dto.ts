import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UserPayload {
  @IsNumber()
  @IsNotEmpty()
  sub: number;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  iat?: number;

  @IsNumber()
  @IsNotEmpty()
  exp?: number;
}
