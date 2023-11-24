import { registerAs } from '@nestjs/config';
import { validateSync } from 'class-validator';
import { AppEnvironment } from './app-environment';
import { plainToInstance } from 'class-transformer';

export interface ApplicationConfig {
  environment: string;
  port: number;
  host: string;
  serveRoot: string;
  uploadDirectory: string;
}

export default registerAs('application', (): ApplicationConfig => {
  const config: ApplicationConfig = {
    environment: process.env.NODE_ENV,
    port: parseInt(process.env.PORT),
    host: process.env.HOST,
    serveRoot: process.env.SERVE_ROOT,
    uploadDirectory: process.env.UPLOAD_DIRECTORY,
  };
  const appEnvironment = plainToInstance(AppEnvironment, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(appEnvironment, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return config;
});
