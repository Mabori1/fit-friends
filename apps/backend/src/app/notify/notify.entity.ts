import { IEntity, INotify } from '@fit-friends/types';

export class NotifyEntity implements IEntity<NotifyEntity>, INotify {
  public targetUserEmail: string;
  public text: string;

  constructor(notify: INotify) {
    this.fillEntity(notify);
  }

  public fillEntity(entity: INotify) {
    this.targetUserEmail = entity.targetUserEmail;
    this.text = entity.text;
  }

  public toObject(): NotifyEntity {
    return { ...this };
  }
}
