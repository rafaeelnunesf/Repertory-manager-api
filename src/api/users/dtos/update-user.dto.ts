import { Prisma } from '@prisma/client';
import { IsEmpty, IsString } from 'class-validator';

export class UpdateUserDto implements Prisma.UserUpdateInput {
  @IsString()
  name: string;

  @IsEmpty()
  email: string;

  @IsEmpty()
  password: string;
}
