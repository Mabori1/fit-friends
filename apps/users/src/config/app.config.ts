import { registerAs } from '@nestjs/config';
import { object, string, number } from 'joi';

const DEFAULT_PORT = 4000;

export interface ApplicationConfig {
  environment: string;
  port: number;
}

export default registerAs('application', (): ApplicationConfig => {
  const config: ApplicationConfig = {
    environment: process.env.NODE_ENV,
    port: parseInt(process.env.PORT || DEFAULT_PORT.toString(), 10),
  };

  const validationSchema = object<ApplicationConfig>({
    environment: string()
      .valid('development', 'production', 'stage')
      .required(),
    port: number().port().default(DEFAULT_PORT),
  });

  const { error } = validationSchema.validate(config, { abortEarly: true });

  if (error) {
    throw new Error(
      `[Application Config]: Environments validation failed. Please check .env file.
      Error message: Mongo.${error.message}`
    );
  }

  return config;
});
