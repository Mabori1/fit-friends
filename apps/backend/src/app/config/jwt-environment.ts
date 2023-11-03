import { IsString } from 'class-validator';

export enum EnvValidationMessage {
  AccessTokenSecret = 'Access token secret is required',
  AccessTokenExpiresIn = 'Access token expires in is required',
  RefreshTokenSecret = 'Refresh token secret is required',
  RefreshTokenExpiresIn = 'Refresh token expires in is required',
}

export class JwtEnvironment {
  @IsString({
    message: EnvValidationMessage.AccessTokenSecret,
  })
  public accessTokenSecret: string;

  @IsString({
    message: EnvValidationMessage.AccessTokenExpiresIn,
  })
  public accessTokenExpiresIn: string;

  @IsString({
    message: EnvValidationMessage.RefreshTokenSecret,
  })
  public refreshTokenSecret: string;

  @IsString({
    message: EnvValidationMessage.RefreshTokenExpiresIn,
  })
  public refreshTokenExpiresIn: string;
}
