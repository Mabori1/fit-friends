import { RefreshTokenRepository } from './refresh-token.repository.js';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import dayjs from 'dayjs';
import { RefreshTokenEntity } from './refresh-token.entity.js';
import { jwtConfig } from '@fit-friends/config/config-users';
import { IRefreshTokenPayload } from '@fit-friends/shared/app-types';
import { parseTime } from '@fit-friends/util/util-core';

@Injectable()
export class RefreshTokenService {
  constructor(
    private readonly refreshTokenRepository: RefreshTokenRepository,
    @Inject(jwtConfig.KEY)
    private readonly jwtOptions: ConfigType<typeof jwtConfig>
  ) {}

  public async createRefreshSession(payload: IRefreshTokenPayload) {
    const timeValue = parseTime(this.jwtOptions.refreshTokenExpiresIn);
    const refreshToken = new RefreshTokenEntity({
      tokenId: payload.tokenId,
      createdAt: new Date(),
      userId: payload.sub.toString(),
      expiresIn: dayjs().add(timeValue.value, timeValue.unit).toDate(),
    });

    return this.refreshTokenRepository.create(refreshToken);
  }

  public async deleteRefreshSession(tokenId: number) {
    return this.refreshTokenRepository.deleteByTokenId(tokenId);
  }

  public async isExists(tokenId: number): Promise<boolean> {
    const refreshToken = await this.refreshTokenRepository.findByTokenId(
      tokenId
    );
    return refreshToken !== null;
  }

  public async deleteExpiredRefreshTokens() {
    return this.refreshTokenRepository.deleteExpiredTokens();
  }
}
