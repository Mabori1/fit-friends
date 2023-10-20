import { registerAs } from '@nestjs/config';
import { object, string } from 'joi';

export interface JWTConfig {
  accessTokenSecret: string;
  accessTokenExpiresIn: string;
  refreshTokenSecret: string;
  refreshTokenExpiresIn: string;
}

export default registerAs('jwt', (): JWTConfig => {
  const config: JWTConfig = {
    accessTokenSecret: process.env.JWT_AT_SECRET,
    accessTokenExpiresIn: process.env.JWT_AT_EXPIRES_IN,
    refreshTokenSecret: process.env.JWT_RT_SECRET,
    refreshTokenExpiresIn: process.env.JWT_RT_EXPIRES_IN,
  };

  const validationSchema = object<JWTConfig>({
    accessTokenSecret: string().required(),
    accessTokenExpiresIn: string().required(),
    refreshTokenSecret: string().required(),
    refreshTokenExpiresIn: string().required(),
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
