import { Test, TestingModule } from '@nestjs/testing';
import { Prisma, PrismaClient, User } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { ConfigService } from '../../config/config.service';
import { UsersService } from './users.service';
import { faker } from '@faker-js/faker';
import { createUser } from '../../../test/factories/users.factory';

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
    it('should create and return a user successfuly', async () => {
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
  it('should create and return an array of users successfuly', async () => {
    //Arrange
    await createUser(prisma);
    await createUser(prisma);

    const test = await service.users({});

    expect(test).toBeDefined();
    expect(Array.isArray(test)).toBe(true);
    expect(test).toHaveLength(2);
  });

  /*
  it('should create and return an unique existent customer', async () => {
    //Arrange
    const data: Prisma.CustomerCreateInput = {
      name: 'Rafael',
      cpf: '111.444.777-35',
      birthday: '25-08-1998',
    };

    await service.create(data);

    const test = await service.findOne(data.cpf);

    expect(test).toBeDefined();
    expect(test.cpf).toEqual(data.cpf);
  });
  it('should return an error if a non-existent cpf is passed', async () => {
    //Arrange
    const nonExistentCPF = '111.444.777-35';

    try {
      await service.findOne(nonExistentCPF);
    } catch (error) {
      expect(error).toEqual(new CustomerNotFoundException());
    }
  }); */
});
