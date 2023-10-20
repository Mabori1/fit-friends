import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtAccessStrategy } from './strategies/jwt-access.strategy';
import { getJwtOptions } from '@fit-friends/config';
import { JwtRefreshStrategy } from './strategies/jwt.refresh.strategy';
import { RefreshTokenModule } from '../refresh-token/refresh-token.module';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: getJwtOptions,
    }),
    RefreshTokenModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtRefreshStrategy, JwtAccessStrategy],
})
export class AuthModule {}
