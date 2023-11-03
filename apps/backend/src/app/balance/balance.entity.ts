import { IBalance, IEntity } from '@fit-friends/types';

export class BalanceEntity implements IEntity<BalanceEntity>, IBalance {
  public userId: number;
  public trainingId: number;
  public trainingQtt: number;

  constructor(balance: IBalance) {
    this.fillEntity(balance);
  }

  fillEntity(entity: IBalance) {
    this.userId = entity.userId;
    this.trainingId = entity.trainingId;
    this.trainingQtt = entity.trainingQtt;
  }

  public toObject(): BalanceEntity {
    return { ...this };
  }
}
