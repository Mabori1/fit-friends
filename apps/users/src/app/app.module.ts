import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigUsersModule } from '@fit-friends/config/config-users';
import { PrismaModule } from '@fit-friends/config/config-db';
import { FitUserModule } from './fit-user/fit-user.module';

@Module({
  imports: [AuthModule, FitUserModule, ConfigUsersModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
