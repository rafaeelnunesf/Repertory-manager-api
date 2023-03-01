import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from './config/config.service';
import { ApiModule } from './api/api.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    ApiModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    ConfigService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
