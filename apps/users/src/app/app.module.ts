import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from '@fit-friends/config';
import { UserModule } from './user/user.module';
import jwtConfig from '../config/jwt.config';

@Module({
  imports: [
    UserModule,
    PrismaModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [jwtConfig],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
