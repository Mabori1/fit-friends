import { registerAs } from '@nestjs/config';
import { validateSync } from 'class-validator';
import { JwtEnvironment } from './jwt-environment';
import { plainToInstance } from 'class-transformer';

export interface JWTConfig {
  accessTokenSecret?: string;
  accessTokenExpiresIn?: string;
  refreshTokenSecret?: string;
  refreshTokenExpiresIn?: string;
}

export default registerAs('jwt', (): JWTConfig => {
  const config: JWTConfig = {
    accessTokenSecret: process.env['JWT_AT_SECRET'],
    accessTokenExpiresIn: process.env['JWT_AT_EXPIRES_IN'],
    refreshTokenSecret: process.env['JWT_RT_SECRET'],
    refreshTokenExpiresIn: process.env['JWT_RT_EXPIRES_IN'],
  };

  const jwtEnvironment = plainToInstance(JwtEnvironment, config, { enableImplicitConversion: true });

  const errors = validateSync(jwtEnvironment, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return config;
});
