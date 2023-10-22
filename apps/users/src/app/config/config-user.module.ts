import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import appConfig from './app.config';
import dbConfig from './db.config';
import jwtConfig from './jwt.config';
import rabbitConfig from './rabbit.config';

const ENV_FILE_PATH = '../../../../../.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [appConfig, dbConfig, jwtConfig, rabbitConfig],
      envFilePath: ENV_FILE_PATH,
    }),
  ],
  exports: [ConfigModule],
})
export class ConfigUsersModule {}
