import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

const DEFAULT_SMTP_PORT = 25;

export interface SubscriberConfig {
  host: string;
  port: number;
  user: string;
  password: string;
  from: string;
}

export default registerAs('subscribe', (): SubscriberConfig => {
  const config: SubscriberConfig = {
    host: process.env.MAIL_SMTP_HOST,
    port: parseInt(
      process.env.MAIL_SMTP_PORT ?? DEFAULT_SMTP_PORT.toString(),
      10,
    ),
    user: process.env.MAIL_USER_NAME,
    password: process.env.MAIL_USER_PASSWORD,
    from: process.env.MAIL_FROM,
  };

  const validationSchema = Joi.object<SubscriberConfig>({
    host: Joi.string().valid().hostname().required(),
    port: Joi.number().port().default(DEFAULT_SMTP_PORT),
    user: Joi.string().required(),
    password: Joi.string().required(),
    from: Joi.string().required(),
  });

  const { error } = validationSchema.validate(config, { abortEarly: true });
  if (error) {
    throw new Error(
      `[Subscriber Config]: Environments validation failed. Please check .env file.
       Error message: ${error.message}`,
    );
  }
  return config;
});
