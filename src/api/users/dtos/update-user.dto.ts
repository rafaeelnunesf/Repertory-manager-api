import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsOptional, IsString, Length } from 'class-validator';

export class UpdateUserDto implements Omit<Prisma.UserUpdateInput, 'email'> {
  @IsString()
  @IsOptional()
  @Length(3, 20)
  @ApiProperty({ minLength: 3, maxLength: 20, example: 'John Doe' })
  name?: string;

  @IsString()
  @IsOptional()
  @Length(3)
  @ApiProperty({ minLength: 3 })
  password?: string;
}
