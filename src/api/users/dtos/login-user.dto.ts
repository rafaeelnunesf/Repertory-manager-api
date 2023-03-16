import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsEmail, IsString, Length } from 'class-validator';

export class LoginUserDto implements Omit<Prisma.UserCreateInput, 'name'> {
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
