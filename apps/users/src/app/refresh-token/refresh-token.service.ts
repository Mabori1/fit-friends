import { RefreshTokenRepository } from './refresh-token.repository';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import dayjs from 'dayjs';
import { RefreshTokenEntity } from './refresh-token.entity';
import { parseTime } from '@fit-friends/core';
import { IRefreshTokenPayload } from '@fit-friends/types';

@Injectable()
export class RefreshTokenService {
  constructor(
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly configService: ConfigService,
  ) {}

  public async createRefreshSession(payload: IRefreshTokenPayload) {
    const timeValue = parseTime(this.configService.get<string>('jwt.refreshTokenExpiresIn'));
    const refreshToken = new RefreshTokenEntity({
      token: payload.token,
      createdAt: new Date(),
      userId: payload.id,
      exp: dayjs().add(timeValue.value, timeValue.unit).toDate(),
    });

    return this.refreshTokenRepository.create(refreshToken);
  }

  public async deleteRefreshSession(tokenId: number) {
    return this.refreshTokenRepository.deleteByTokenId(tokenId);
  }

  public async isExists(tokenId: number): Promise<boolean> {
    const refreshToken = await this.refreshTokenRepository.findByTokenId(tokenId);
    return refreshToken !== null;
  }

  public async deleteExpiredRefreshTokens() {
    return this.refreshTokenRepository.deleteExpiredTokens();
  }
}
