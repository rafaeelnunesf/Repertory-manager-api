import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TeamsModule } from './teams/teams.module';
import { RepertoiresModule } from './repertoires/repertoires.module';

@Module({
  imports: [UsersModule, TeamsModule, RepertoiresModule],
  exports: [UsersModule, TeamsModule, RepertoiresModule],
})
export class ApiModule {}
