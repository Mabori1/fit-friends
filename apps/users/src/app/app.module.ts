import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigUsersModule } from './config/config-user.module';

@Module({
  imports: [PrismaModule, AuthModule, UserModule, ConfigUsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
