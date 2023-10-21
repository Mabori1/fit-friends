import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigType } from '@nestjs/config';
import { RefreshTokenService } from '../../refresh-token/refresh-token.service';
import { TokenNotExistsException } from '../exceptions/token-not-exists.exception';
import jwtConfig from '../../../config/jwt.config';
import { AuthService } from '../auth.service';
import { IRefreshTokenPayload } from '@fit-friends/types';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(
    @Inject(jwtConfig.KEY)
    jwtOptions: ConfigType<typeof jwtConfig>,
    private readonly authService: AuthService,
    private readonly refreshTokenService: RefreshTokenService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtOptions.refreshTokenSecret,
    });
  }

  public async validate(payload: IRefreshTokenPayload) {
    if (!(await this.refreshTokenService.isExists(parseInt(payload.token)))) {
      throw new TokenNotExistsException(payload.token);
    }

    await this.refreshTokenService.deleteRefreshSession(parseInt(payload.token));
    await this.refreshTokenService.deleteExpiredRefreshTokens();
    return this.authService.getUser(payload.id);
  }
}
