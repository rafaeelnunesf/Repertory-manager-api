import { Prisma } from '@prisma/client';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto implements Prisma.UserCreateInput {
  @IsString()
  @Length(3, 20)
  name: string;

  @IsString()
  @IsEmail()
  email: string;

  @Length(3)
  @IsString()
  password: string;
}
