import { UsersService } from 'src/api/users/users.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient, User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { UsersModule } from '../api/users/users.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { ConfigService } from '../config/config.service';
import { ConfigService as jwtStrategyConfig } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { createUser } from '../api/users/test-factory/users.factory';
import { NotFoundException } from '../api/users/exceptions/not-found.exception';

describe('AuthService', () => {
  let authService: AuthService;
  let authController: AuthController;
  let jwtService: JwtService;
  let usersService: UsersService;

  beforeEach(() => {
    authService = new AuthService(jwtService, usersService);
    authController = new AuthController(authService, usersService);
  });

  const config = new ConfigService();
  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: config.get('DATABASE_URL'),
      },
    },
  });

  beforeAll(async () => {
    await prisma.$connect();
    await prisma.user.deleteMany({});
    await prisma.team.deleteMany();
    await prisma.teamUser.deleteMany();
  });

  afterAll(async () => {
    await prisma.user.deleteMany({});
    await prisma.team.deleteMany();
    await prisma.teamUser.deleteMany();
    await prisma.$disconnect();
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        UsersModule,
        JwtModule.register({
          secret: process.env.JWT_SECRET,
          signOptions: { expiresIn: '24h' },
        }),
      ],
      controllers: [AuthController],
      providers: [AuthService, LocalStrategy, JwtStrategy, jwtStrategyConfig],
      exports: [AuthService],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  afterEach(async () => {
    await prisma.user.deleteMany({});
    await prisma.team.deleteMany();
    await prisma.teamUser.deleteMany();
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('validateUser', () => {
    it('should return a user object when credentials are valid', async () => {
      const data = { email: 'user@example.com', password: 'supersecret' };
      await createUser(prisma, data);

      const res = await authService.validateUser(data.email, data.password);

      expect(res.email).toEqual('user@example.com');
    });

    it('should return Not Found excception when credentials are invalid', async () => {
      try {
        await authService.validateUser('xxx', 'xxx');
      } catch (error) {
        expect(error).toEqual(new NotFoundException('Email not found'));
      }
    });
  });

  describe('validateLogin', () => {
    it('should return JWT object when credentials are valid', async () => {
      const user: User = {
        id: 123,
        email: 'user@example.com',
        name: 'name',
        password: 'password',
      };

      const res = await authService.login(user);
      expect(res.access_token).toBeDefined();
    });
  });
});
