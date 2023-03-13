import { Test, TestingModule } from '@nestjs/testing';
import { RepertoiresService } from './repertoires.service';
import { PrismaService } from '../../prisma/prisma.service';
import { ConfigService } from '../../config/config.service';
import { Prisma, PrismaClient } from '@prisma/client';

describe('RepertoiresService', () => {
  let service: RepertoiresService;
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

  afterEach(async () => {
    await prisma.user.deleteMany({});
    await prisma.team.deleteMany();
    await prisma.teamUser.deleteMany();
    await prisma.repertory.deleteMany();
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RepertoiresService, PrismaService],
    }).compile();

    service = module.get<RepertoiresService>(RepertoiresService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
