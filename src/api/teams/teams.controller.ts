import { CreateTeamDto } from './dtos/create-team.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { Prisma, Team, User } from '@prisma/client';
import { TeamsService } from './teams.service';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';

@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Post()
  create(@Body() data: CreateTeamDto, @CurrentUser() user: User) {
    return this.teamsService.create(data, user);
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
