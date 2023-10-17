import { getJwtOptions } from '@fit-friends/config/config-users';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

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
    FitnessUserRepository,
    FitnessUserService,
    JwtRefreshStrategy,
    JwtAccessStrategy,
  ],
  exports: [FitnessUserRepository, FitnessUserService],
})
export class FitnessUserModule {}
