import { User } from '@prisma/client';
import { Controller, Get, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { ApiHeader, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@ApiHeader({
  name: 'Authorization',
  description: 'The access token',
  example: 'Bearer abc123',
  required: true,
})
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.users({});
  }

  @Get(':id')
  findOneById(@Param('id') id: string): Promise<User> {
    return this.usersService.user({ id: +id });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateUserDto): Promise<User> {
    return this.usersService.update({ where: { id: +id }, data });
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.usersService.delete({ id: +id });
  }
}
