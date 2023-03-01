import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.setGlobalPrefix('api', {
    exclude: ['auth/login', 'auth/signup', '/', '/me'],
  });

  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  await app.listen(5000);
}
bootstrap();
