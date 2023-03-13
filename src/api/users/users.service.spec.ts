import { Test, TestingModule } from '@nestjs/testing';
import { Prisma, PrismaClient } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { ConfigService } from '../../config/config.service';
import { UsersService } from './users.service';
import { faker } from '@faker-js/faker';
import { NotFoundException } from './exceptions/not-found.exception';
import { createUser } from './test-factory/users.factory';

describe('CustomersService', () => {
  let service: UsersService;
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
    await prisma.repertory.deleteMany();
  });

  afterAll(async () => {
    await prisma.user.deleteMany({});
    await prisma.team.deleteMany();
    await prisma.teamUser.deleteMany();
    await prisma.repertory.deleteMany();
    await prisma.$disconnect();
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, PrismaService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });
  afterEach(async () => {
    await prisma.user.deleteMany({});
    await prisma.team.deleteMany();
    await prisma.teamUser.deleteMany();
    await prisma.repertory.deleteMany();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Create', () => {
    it('should create and return a user successfuly', async () => {
      //Arrange
      const data: Prisma.UserCreateInput = {
        name: faker.name.fullName(),
        email: faker.internet.email(),
        password: faker.random.word(),
      };

      //Act
      const user = await service.create(data);

      //Assert
      expect(user).toBeDefined();
      expect(user.name).toEqual(data.name);
      expect(user.email).toEqual(data.email);
      expect(user.password).not.toEqual(data.password);
    });
  });
  it('should create and return an array of users successfuly', async () => {
    //Arrange
    await createUser(prisma);
    await createUser(prisma);

    //Act
    const test = await service.users({});

    //Assert
    expect(test).toBeDefined();
    expect(Array.isArray(test)).toBe(true);
    expect(test).toHaveLength(2);
  });

  it('should return an unique existent customer', async () => {
    //Arrange
    const password = '123456';
    const data = await createUser(prisma, { password });

    //Act
    const user = await service.user({ email: data.email });

    //Assert
    expect(user).toBeDefined();
    expect(user.email).toEqual(data.email);
    expect(user.name).toEqual(data.name);
    expect(user.password).not.toEqual(password);
  });

  it('should return an error if a non-existent email is passed', async () => {
    //Arrange
    const nonExistentEmail = 'email@example.com';

    //Act
    try {
      await service.findOneByEmail({ email: nonExistentEmail });
    } catch (error) {
      //Assert
      expect(error).toEqual(new NotFoundException('Email not found'));
    }
  });
  it('should delete a user successfully', async () => {
    //Arrange
    const data = { email: 'email@example.com' };
    await createUser(prisma, data);

    //Act
    await service.delete(data);

    //Assert
    expect(await prisma.user.findUnique({ where: data })).toBeNull();
  });
  it('should return an error if the user does not exist', async () => {
    //Arrange
    const data = { email: 'email@example.com' };

    //Act
    try {
      await service.delete(data);
    } catch (error) {
      //Assert
      expect(error).toEqual(new NotFoundException('User not found'));
    }
  });
});
