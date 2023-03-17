import { Module } from '@nestjs/common';
import { RepertoiresService } from './repertoires.service';
import { RepertoiresController } from './repertoires.controller';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [RepertoiresController],
  providers: [RepertoiresService, PrismaService],
  exports: [RepertoiresService],
})
export class RepertoiresModule {}
