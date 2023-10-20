import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

const DEFAULT_POSTGRES_PORT = 5432;

export interface DbConfig {
  name: string;
  port: number;
  user: string;
  password: string;
  pgAdminEmail: string;
  pgAdminPassword: string;
}

export default registerAs('db', (): DbConfig => {
  const config: DbConfig = {
    user: process.env['POSTGRES_USER'] ?? 'admin',
    password: process.env['POSTGRES_PASSWORD'] ?? 'test',
    name: process.env['POSTGRES_DB'] ?? 'fitfriends',
    port: parseInt(
      process.env['POSTGRES_PORT '] ?? DEFAULT_POSTGRES_PORT.toString(),
      10
    ),
    pgAdminEmail:
      process.env['PGADMIN_DEFAULT_EMAIL'] ?? 'keks@htmlacademy.local',
    pgAdminPassword: process.env['PGADMIN_DEFAULT_PASSWORD'] ?? 'test',
  };

  const validationSchema = Joi.object<DbConfig>({
    port: Joi.number().port().default(DEFAULT_POSTGRES_PORT),
    name: Joi.string().required(),
    user: Joi.string().required(),
    password: Joi.string().required(),
    pgAdminEmail: Joi.string().required(),
    pgAdminPassword: Joi.string().required(),
  });

  const { error } = validationSchema.validate(config, { abortEarly: true });

  if (error) {
    throw new Error(
      `[DB Config]: Environments validation failed. Please check .env file.
      Error message: ${error.message}`
    );
  }

  return config;
});
