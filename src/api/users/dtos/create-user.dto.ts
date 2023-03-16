import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto implements Prisma.UserCreateInput {
  @IsString()
  @Length(3, 20)
  @ApiProperty({ minLength: 3, maxLength: 20, example: 'John Doe' })
  name: string;

  @IsString()
  @IsEmail()
  @ApiProperty({
    type: 'string',
    format: 'email',
    example: 'johndoe@example.com',
  })
  email: string;

  @Length(3)
  @IsString()
  @ApiProperty({ minLength: 3, example: '123' })
  password: string;
}
