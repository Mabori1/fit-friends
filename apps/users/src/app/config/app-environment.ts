import { IsNumber, IsString, Max, Min } from 'class-validator';

const MIN_PORT = 0;
const MAX_PORT = 65535;

export enum EnvValidationMessage {
  EnvironmentRequired = 'environment is required',
  PortRequired = 'port is required',
}

export class AppEnvironment {
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
    message: EnvValidationMessage.EnvironmentRequired,
  })
  public environment: string;
}
