import { Prisma } from '@prisma/client';
import { IsOptional, IsString, Length } from 'class-validator';

export class UpdateUserDto implements Omit<Prisma.UserUpdateInput, 'email'> {
  @IsString()
  @IsOptional()
  @Length(3, 20)
  name?: string;

  @IsString()
  @IsOptional()
  @Length(3)
  password?: string;
}
