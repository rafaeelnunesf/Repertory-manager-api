import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { Prisma, Team } from '@prisma/client';
import { TeamsService } from './teams.service';

@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Post()
  create(@Body() data: Prisma.TeamCreateInput) {
    return this.teamsService.create(data);
  }

  @Get()
  findAll(): Promise<Team[]> {
    return this.teamsService.findAll({});
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Team> {
    return this.teamsService.findOne({ id: +id });
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() data: Prisma.TeamUpdateInput,
  ): Promise<Team> {
    return this.teamsService.update({ where: { id: +id }, data });
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.teamsService.remove({ id: +id });
  }
}
