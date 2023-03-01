import { Test, TestingModule } from '@nestjs/testing';
import { Prisma, PrismaClient } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { ConfigService } from '../../config/config.service';
import { UsersService } from './users.service';
import { faker } from '@faker-js/faker';

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
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await prisma.user.deleteMany();
    await prisma.$disconnect();
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, PrismaService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });
  afterEach(async () => {
    await prisma.user.deleteMany();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Create', () => {
    it('should create and return a customer successfuly', async () => {
      //Arrange
      const data: Prisma.UserCreateInput = {
        name: faker.name.fullName(),
        email: faker.internet.email(),
        password: faker.random.word(),
      };

      //Act
      const customer = await service.create(data);

      //Assert
      expect(customer).toBeDefined();
      expect(customer.name).toEqual(data.name);
      expect(customer.email).toEqual(data.email);
      expect(customer.password).not.toEqual(data.password);
    });
  });
});
