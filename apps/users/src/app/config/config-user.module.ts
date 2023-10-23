import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import appConfig from './app.config';
import jwtConfig from './jwt.config';
import dbConfig from './db.config';

const ENV_FILE_PATH = '../../../../../.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [appConfig, dbConfig, jwtConfig],
      envFilePath: ENV_FILE_PATH,
    }),
  ],
  exports: [ConfigModule],
})
export class ConfigUsersModule {}
