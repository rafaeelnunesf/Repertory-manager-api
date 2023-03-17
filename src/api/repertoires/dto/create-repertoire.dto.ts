import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsNumber, IsString } from 'class-validator';

export class CreateRepertoireDto implements Prisma.RepertoryCreateManyInput {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNumber()
  teamId: number;
}
