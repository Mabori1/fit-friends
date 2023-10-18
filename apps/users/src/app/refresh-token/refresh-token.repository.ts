import { Injectable } from '@nestjs/common';
import { RefreshTokenEntity } from './refresh-token.entity';
import { RefreshToken } from '@prisma/client';
import { PrismaService } from '@fit-friends/config/config-db';

@Injectable()
export class RefreshTokenRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async create(item: RefreshTokenEntity): Promise<RefreshToken> {
    const entityData = item.toObject();
    return this.prisma.refreshToken.create({
      data: {
        ...entityData,
      },
    });
  }

  public async deleteByTokenId(refreshTokenId: number) {
    return this.prisma.refreshToken.delete({
      where: {
        refreshTokenId,
      },
    });
  }

  public async findByTokenId(
    refreshTokenId: number
  ): Promise<RefreshToken | null> {
    return this.prisma.refreshToken.findFirst({
      where: {
        refreshTokenId,
      },
    });
  }

  public async deleteExpiredTokens() {
    return this.prisma.refreshToken.deleteMany({
      where: {
        expiresIn: { lt: new Date() },
      },
    });
  }
}
