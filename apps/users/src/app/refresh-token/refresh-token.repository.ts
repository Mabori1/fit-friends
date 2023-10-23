import { Injectable } from '@nestjs/common';
import { RefreshTokenEntity } from './refresh-token.entity';
import { PrismaService } from '../../prisma/prisma.service';
import { Token } from '@prisma/client';

@Injectable()
export class RefreshTokenRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async create(item: RefreshTokenEntity): Promise<Token> {
    const entityData = item.toObject();
    console.log(entityData);

    return this.prisma.token.create({
      data: {
        ...entityData,
      },
    });
  }

  public async deleteByTokenId(id: number) {
    return this.prisma.token.delete({
      where: {
        id,
      },
    });
  }

  public async findByTokenId(id: number): Promise<Token | null> {
    return this.prisma.token.findFirst({
      where: {
        id,
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
