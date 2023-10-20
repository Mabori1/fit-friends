import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import appConfig from './app.config';
import dbConfig from './db.config';
import jwtConfig from './jwt.config';
import rabbitConfig from './rabbit.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [appConfig, dbConfig, jwtConfig, rabbitConfig],
    }),
  ],
})
export class ConfigUsersModule {}
