import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { FitUserModule } from './fit-user/fit-user.module';
import { ConfigUsersModule } from '@fit-friends/config/config-users';

@Module({
  imports: [AuthModule, FitUserModule, ConfigUsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
