import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigUsersModule } from './config/config-user.module';
import { FileModule } from './file/file.module';

@Module({
  imports: [PrismaModule, AuthModule, UserModule, ConfigUsersModule, FileModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
