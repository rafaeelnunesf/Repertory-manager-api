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
import { UserToken } from './models/UserToken';
import { CreateUserDto } from '../api/users/dtos/create-user.dto';
import { ApiTags, ApiBody, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { LoginUserDto } from '../api/users/dtos/login-user.dto';
@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @ApiOperation({ summary: 'Login and get access token' })
  @ApiBody({ type: LoginUserDto })
  @ApiResponse({ status: 200, description: 'Success.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized user.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Request() req: AuthRequest): Promise<UserToken> {
    return this.authService.login(req.user);
  }

  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'Created.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 500, description: 'Internal server error!' })
  @Public()
  @Post('signup')
  public async createUser(@Body() body: CreateUserDto): Promise<void> {
    await this.userService.create(body);
  }
}
