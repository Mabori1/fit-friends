import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

export interface JWTConfig {
  accessTokenSecret: string;
  accessTokenExpiresIn: string;
  refreshTokenSecret: string;
  refreshTokenExpiresIn: string;
}

export default registerAs('jwt', (): JWTConfig => {
  const config: JWTConfig = {
    accessTokenSecret: process.env['JWT_AT_SECRET'] || '',
    accessTokenExpiresIn: process.env['JWT_AT_EXPIRES_IN'] || '',
    refreshTokenSecret: process.env['JWT_RT_SECRET'] || '',
    refreshTokenExpiresIn: process.env['JWT_RT_EXPIRES_IN'] || '',
  };

  const validationSchema = Joi.object<JWTConfig>({
    accessTokenSecret: Joi.string().required(),
    accessTokenExpiresIn: Joi.string().required(),
    refreshTokenSecret: Joi.string().required(),
    refreshTokenExpiresIn: Joi.string().required(),
  });

  const { error } = validationSchema.validate(config, { abortEarly: true });

  if (error) {
    throw new Error(
      `[JWT Config]: Environments validation failed. Please check .env file.
      Error message: ${error.message}`
    );
  }

  return config;
});
