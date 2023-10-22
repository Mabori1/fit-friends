import { registerAs } from '@nestjs/config';
import { object, string, number } from 'joi';

const DEFAULT_RABBIT_PORT = 5672;

export interface RabbitConfig {
  host?: string;
  password?: string;
  user?: string;
  queue?: string;
  exchange?: string;
  port?: number;
}

export default registerAs('rabbit', (): RabbitConfig => {
  const config: RabbitConfig = {
    host: process.env['RABBIT_HOST'],
    password: process.env['RABBIT_PASSWORD'],
    port: parseInt(process.env['RABBIT_PORT'] ?? DEFAULT_RABBIT_PORT.toString(), 10),
    user: process.env['RABBIT_USER'],
    queue: process.env['RABBIT_QUEUE'],
    exchange: process.env['RABBIT_EXCHANGE'],
  };

  const validationSchema = object<RabbitConfig>({
    host: string().valid().hostname().required(),
    password: string().required(),
    port: number().port().default(DEFAULT_RABBIT_PORT),
    user: string().required(),
    queue: string().required(),
    exchange: string().required(),
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
