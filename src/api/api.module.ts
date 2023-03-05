import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TeamsModule } from './teams/teams.module';

@Module({
  imports: [UsersModule, TeamsModule],
  exports: [UsersModule, TeamsModule],
})
export class ApiModule {}
