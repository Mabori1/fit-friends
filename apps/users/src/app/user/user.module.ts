import { getJwtOptions } from '@fit-friends/config/config-users';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtRefreshStrategy } from './strategies/jwt.refresh.strategy';
import { JwtAccessStrategy } from './strategies/jwt-access.strategy';
import { RefreshTokenModule } from '../refresh-token/refresh-token.module';
import { FitUserService } from './user.service';
import { FitUserRepository } from './user.repository';
import { FitUserController } from './user.controller';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: getJwtOptions,
    }),
    RefreshTokenModule,
  ],
  controllers: [FitUserController],
  providers: [
    FitUserRepository,
    FitUserService,
    JwtRefreshStrategy,
    JwtAccessStrategy,
  ],
  exports: [FitUserRepository, FitUserService],
})
export class UserModule {}
