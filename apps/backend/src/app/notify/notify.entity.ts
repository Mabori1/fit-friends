import { IEntity, INotify } from '@fit-friends/types';

export class NotifyEntity implements IEntity<NotifyEntity>, INotify {
  public targetUserEmail: string;
  public text: string;
  public createdAt: Date;

  constructor(notify: INotify) {
    this.fillEntity(notify);
  }

  public fillEntity(entity: INotify) {
    this.targetUserEmail = entity.targetUserEmail;
    this.text = entity.text;
    this.createdAt = entity.createdAt || new Date();
  }

  public toObject(): NotifyEntity {
    return { ...this };
  }
}
