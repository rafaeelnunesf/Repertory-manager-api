// prisma/seed.ts

import { PrismaClient } from '@prisma/client';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  const user1 = await prisma.user.upsert({
    where: { email: 'rafa@email.com' },
    update: {},
    create: {
      email: 'rafa@email.com',
      name: 'Rafael',
      password: '123456',
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'rafa2@email.com' },
    update: {},
    create: {
      email: 'rafa2@email.com',
      name: 'Rafael nunes',
      password: '123456',
    },
  });

  console.log({ user1, user2 });
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
