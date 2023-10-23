import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { RefreshTokenService } from '../../refresh-token/refresh-token.service';
import { TokenNotExistsException } from '../exceptions/token-not-exists.exception';
import { AuthService } from '../auth.service';
import { IRefreshTokenPayload } from '@fit-friends/types';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
    private readonly refreshTokenService: RefreshTokenService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('jwt.refreshTokenSecret'),
    });
  }

  public async validate(payload: IRefreshTokenPayload) {
    if (!(await this.refreshTokenService.isExists(payload.tokenId))) {
      throw new TokenNotExistsException(payload.tokenId);
    }

    await this.refreshTokenService.deleteRefreshSession(payload.tokenId);
    await this.refreshTokenService.deleteExpiredRefreshTokens();
    return this.authService.getUser(payload.sub);
  }
}
