import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

const DEFAULT_PORT = 4000;
const DEFAULT_POSTGRES_PORT = 5432;
const DEFAULT_SMTP_PORT = 25;

export interface NotifyConfig {
  environment: string;
  port: number;
  db: {
    host: string;
    port: number;
    user: string;
    name: string;
    password: string;
    pgAdminEmail: string;
    pgAdminPassword: string;
  };
  mail: {
    host: string;
    port: number;
    user: string;
    password: string;
    from: string;
  };
}

export default registerAs('notify', (): NotifyConfig => {
  const config: NotifyConfig = {
    environment: process.env.NODE_ENV,
    port: parseInt(process.env.PORT || DEFAULT_PORT.toString(), 10),
    db: {
      host: process.env.POSTGRES_HOST,
      port: parseInt(
        process.env.POSTGRES_PORT ?? DEFAULT_POSTGRES_PORT.toString(),
        10,
      ),
      name: process.env.POSTGRES_DB,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      pgAdminEmail: process.env.PGADMIN_DEFAULT_EMAIL,
      pgAdminPassword: process.env.PGADMIN_DEFAULT_PASSWORD,
    },
    mail: {
      host: process.env.MAIL_SMTP_HOST,
      port: parseInt(
        process.env.MAIL_SMTP_PORT ?? DEFAULT_SMTP_PORT.toString(),
        10,
      ),
      user: process.env.MAIL_USER_NAME,
      password: process.env.MAIL_USER_PASSWORD,
      from: process.env.MAIL_FROM,
    },
  };

  const validationSchema = Joi.object<NotifyConfig>({
    environment: Joi.string().valid('development', 'production', 'stage'),
    port: Joi.number().port().default(DEFAULT_PORT),
    db: Joi.object({
      host: Joi.string().valid().hostname(),
      port: Joi.number().port(),
      name: Joi.string().required(),
      user: Joi.string().required(),
      password: Joi.string().required(),
      pgAdminEmail: Joi.string().required(),
      pgAdminPassword: Joi.string().required(),
    }),
    mail: Joi.object({
      host: Joi.string().valid().hostname().required(),
      port: Joi.number().port().default(DEFAULT_SMTP_PORT),
      user: Joi.string().required(),
      password: Joi.string().required(),
      from: Joi.string().required(),
    }),
  });

  const { error } = validationSchema.validate(config, { abortEarly: true });

  if (error) {
    throw new Error(
      `[Notify Config]: Environments validation failed. Please check .env file.
       Error message: ${error.message}`,
    );
  }

  return config;
});
