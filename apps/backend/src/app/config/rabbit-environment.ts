import { IsNumber, IsString, Max, Min } from 'class-validator';

const MIN_PORT = 0;
const MAX_PORT = 65535;

export enum EnvValidationMessage {
  QueueRequired = 'Queue is required',
  PortRequired = 'Port is required',
  ExchangeRequired = 'Exchange is required',
  UserRequired = 'User is required',
  PasswordRequired = 'Password is required',
  HostRequired = 'Host is required',
}

export class RabbitEnvironment {
  @IsString({
    message: EnvValidationMessage.QueueRequired,
  })
  public queue: string;

  @IsNumber(
    {},
    {
      message: EnvValidationMessage.PortRequired,
    },
  )
  @Min(MIN_PORT)
  @Max(MAX_PORT)
  public port: number;

  @IsString({
    message: EnvValidationMessage.HostRequired,
  })
  public host: string;

  @IsString({
    message: EnvValidationMessage.UserRequired,
  })
  public user: string;

  @IsString({
    message: EnvValidationMessage.PasswordRequired,
  })
  public password: string;

  @IsString({
    message: EnvValidationMessage.ExchangeRequired,
  })
  public exchange: string;
}
