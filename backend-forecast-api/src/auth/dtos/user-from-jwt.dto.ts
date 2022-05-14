import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UserFromJwt {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}
