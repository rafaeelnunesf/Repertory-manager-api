import { Module } from '@nestjs/common';
import { RepertoiresService } from './repertoires.service';
import { RepertoiresController } from './repertoires.controller';

@Module({
  controllers: [RepertoiresController],
  providers: [RepertoiresService],
})
export class RepertoiresModule {}
