import { IEntity, IToken } from '@fit-friends/types';

export class RefreshTokenEntity implements IEntity<RefreshTokenEntity>, IToken {
  public createdAt: Date;
  public exp: Date;
  public id: number;
  public token: string;
  public userId: number;
  [key: string]: unknown;

  constructor(refreshToken: IToken) {
    this.createdAt = new Date();
    this.fillEntity(refreshToken);
  }

  public fillEntity(entity: IToken): void {
    this.userId = entity.userId;
    this.id = entity.id;
    this.token = entity.token;
    this.createdAt = entity.createdAt;
    this.exp = entity.exp;
  }

  public toObject(): RefreshTokenEntity {
    return { ...this };
  }
}
