import * as bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';
import { User, PrismaClient } from '@prisma/client';

export async function createUser(
  prisma: PrismaClient,
  params: Partial<User> = {},
): Promise<User> {
  const incomingPassword = params.password || faker.internet.password(6);
  const hashedPassword: string = await bcrypt.hash(incomingPassword, 10);

  const fakerName: string = faker.name.fullName();

  return prisma.user.create({
    data: {
      email: params.email || faker.internet.email(),
      name: params.name || fakerName,
      password: hashedPassword,
    },
  });
}
