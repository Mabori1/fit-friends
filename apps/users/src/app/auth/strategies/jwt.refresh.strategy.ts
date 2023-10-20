import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigType } from '@nestjs/config';
import { jwtConfig } from '@fit-friends/config/config-users';
import { RefreshTokenService } from '../../refresh-token/refresh-token.service';
import { FitUserService } from '../fit-user.service';
import { IRefreshTokenPayload } from '@fit-friends/shared/app-types';
import { TokenNotExistsException } from '../exceptions/token-not-exists.exception';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh'
) {
  constructor(
    @Inject(jwtConfig.KEY)
    jwtOptions: ConfigType<typeof jwtConfig>,
    private readonly fitnessUserService: FitUserService,
    private readonly refreshTokenService: RefreshTokenService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtOptions.refreshTokenSecret,
    });
  }

  public async validate(payload: IRefreshTokenPayload) {
    if (!(await this.refreshTokenService.isExists(parseInt(payload.tokenId)))) {
      throw new TokenNotExistsException(payload.tokenId);
    }

    await this.refreshTokenService.deleteRefreshSession(
      parseInt(payload.tokenId)
    );
    await this.refreshTokenService.deleteExpiredRefreshTokens();
    return this.fitnessUserService.getUser(payload.sub);
  }
}
