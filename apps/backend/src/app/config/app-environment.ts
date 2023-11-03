import { IsNumber, IsString, Max, Min } from 'class-validator';

const MIN_PORT = 0;
const MAX_PORT = 65535;

export enum EnvValidationMessage {
  EnvironmentRequired = 'environment is required',
  PortRequired = 'port is required',
  ServeRootRequired = 'Serve root is required',
  HostRequired = 'Host is required',
  UploadDirectoryRequired = 'Upload directory is required',
}

export class AppEnvironment {
  @IsNumber(
    { maxDecimalPlaces: MAX_PORT },
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

  @IsString({
    message: EnvValidationMessage.ServeRootRequired,
  })
  public serveRoot: string;

  @IsString({
    message: EnvValidationMessage.HostRequired,
  })
  public host: string;

  @IsString({
    message: EnvValidationMessage.UploadDirectoryRequired,
  })
  public uploadDirectory: string;
}
