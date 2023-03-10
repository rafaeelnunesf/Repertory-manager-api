import { Prisma } from '@prisma/client';
import { IsString } from 'class-validator';

export class CreateTeamDto implements Prisma.TeamCreateInput {
  @IsString()
  name: string;
}
