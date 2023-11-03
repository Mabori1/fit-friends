import { Injectable } from '@nestjs/common';
import { RefreshTokenEntity } from './refresh-token.entity';
import { PrismaService } from '../../prisma/prisma.service';
import { IToken } from '@fit-friends/types';

@Injectable()
export class RefreshTokenRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async create(item: RefreshTokenEntity): Promise<IToken> {
    const entityData = item.toObject();

    return this.prisma.token.create({
      data: {
        ...entityData,
      },
    });
  }

  public async deleteByUserId(userId: number) {
    this.prisma.token.deleteMany({
      where: {
        userId,
      },
    });
  }

  public async deleteByTokenId(tokenId: string): Promise<IToken> {
    return this.prisma.token.delete({
      where: {
        tokenId,
      },
    });
  }

  public async findByTokenId(tokenId: string): Promise<IToken | null> {
    return this.prisma.token.findFirst({
      where: {
        tokenId,
      },
    });
  }

  public async deleteExpiredTokens() {
    return this.prisma.token.deleteMany({
      where: {
        exp: { lt: new Date() },
      },
    });
  }
}
