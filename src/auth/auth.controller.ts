import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthRequest } from './models/AuthRequest';
import { Public } from './decorators/public.decorator';
import { UsersService } from '../api/users/users.service';
import { Prisma, User } from '@prisma/client';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Request() req: AuthRequest) {
    return this.authService.login(req.user);
  }

  @Public()
  @Post('signup')
  public async createUser(@Body() body: Prisma.UserCreateInput): Promise<User> {
    return await this.userService.create(body);
  }
}
