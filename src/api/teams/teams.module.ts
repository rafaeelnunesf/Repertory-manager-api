import { Module } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { TeamsController } from './teams.controller';
import { PrismaService } from '../../prisma/prisma.service';
import { RepertoiresService } from '../repertoires/repertoires.service';

@Module({
  controllers: [TeamsController],
  providers: [TeamsService, PrismaService, RepertoiresService],
})
export class TeamsModule {}
