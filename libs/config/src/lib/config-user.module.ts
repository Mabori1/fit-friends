import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import appConfig from './config/app.config';
import dbConfig from './config/db.config';
import jwtConfig from './config/jwt.config';
import rabbitConfig from './config/rabbit.config';

const ENV_FILE_PATH = '../../../../.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [appConfig, dbConfig, jwtConfig, rabbitConfig],
      envFilePath: ENV_FILE_PATH,
    }),
  ],
})
export class ConfigUsersModule {}
