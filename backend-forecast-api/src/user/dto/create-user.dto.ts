import { User } from '../entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto extends User {
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  @ApiProperty({
    description: 'A email',
    example: 'user@email.com',
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  @ApiProperty({
    description: 'A password with more than 6 characters',
    example: '@Password',
  })
  password: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(150)
  @ApiProperty({
    description: 'A name',
    example: 'Felipe',
  })
  name: string;
}
