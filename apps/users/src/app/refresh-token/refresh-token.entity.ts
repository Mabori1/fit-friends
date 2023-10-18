import { Entity } from '@fit-friends/util/util-types';
import { IToken } from '@fit-friends/shared/app-types';

export class RefreshTokenEntity implements Entity<RefreshTokenEntity>, IToken {
  public createdAt: Date;
  public expiresIn: Date;
  public id: string;
  public tokenId: string;
  public userId: string;
  [key: string]: unknown;

  constructor(refreshToken: IToken) {
    this.createdAt = new Date();
    this.fillEntity(refreshToken);
  }

  public fillEntity(entity: IToken): void {
    this.userId = entity.userId;
    this.id = entity.id;
    this.tokenId = entity.tokenId;
    this.createdAt = entity.createdAt;
    this.expiresIn = entity.expiresIn;
  }

  public toObject(): RefreshTokenEntity {
    return { ...this };
  }
}
