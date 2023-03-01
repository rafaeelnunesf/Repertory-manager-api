import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { InvalidCredentialsException } from './exceptions/InvalidCredentials.exception';

import { UserToken } from './models/UserToken';
import { UsersService } from '../api/users/users.service';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.usersService.findOneByEmail({ email });
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (user && isPasswordValid) {
      return { ...user, password: undefined };
    }

    throw new InvalidCredentialsException();
  }

  async login(user: User): Promise<UserToken> {
    const payload = { email: user.email, sub: user.id, name: user.name };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
