import { registerAs } from '@nestjs/config';
import { validateSync } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { RabbitEnvironment } from './rabbit-environment';

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

  const rabbitEnvironment = plainToInstance(RabbitEnvironment, config, { enableImplicitConversion: true });

  const errors = validateSync(rabbitEnvironment, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return config;
});
