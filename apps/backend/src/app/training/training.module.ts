import { Module } from '@nestjs/common';
import { TrainingRepository } from './training.repository';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { getJwtOptions } from '../config/get-jwt-options';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: getJwtOptions,
    }),
  ],
  providers: [TrainingRepository],
  exports: [TrainingRepository],
})
export class TrainingModule {}
