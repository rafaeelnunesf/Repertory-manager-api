import { Prisma, User } from '@prisma/client';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() body: Prisma.UserCreateInput): Promise<User> {
    return this.usersService.create(body);
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.users({});
  }

  @Get(':id')
  findOneById(@Param('id') id: string): Promise<User> {
    return this.usersService.user({ id: +id });
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() data: Prisma.UserUpdateInput,
  ): Promise<User> {
    return this.usersService.update({ where: { id: +id }, data });
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<User> {
    return this.usersService.delete({ id: +id });
  }
}
