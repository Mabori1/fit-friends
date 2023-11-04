import { IEntity, INotify } from '@fit-friends/types';

export class NotifyEntity implements IEntity<NotifyEntity>, INotify {
  public targetUserId: number;
  public type: string;
  public srcUserId: number;

  constructor(notify: INotify) {
    this.fillEntity(notify);
  }

  public fillEntity(entity: INotify) {
    this.targetUserId = entity.targetUserId;
    this.type = entity.type;
    this.srcUserId = entity.srcUserId;
  }

  public toObject(): NotifyEntity {
    return { ...this };
  }
}
