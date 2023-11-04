import { IEntity, ISubscriber } from '@fit-friends/types';

export class SubscriberEntity
  implements IEntity<SubscriberEntity>, ISubscriber
{
  public email: string;
  public name: string;
  public trainerId: number;

  constructor(item: ISubscriber) {
    this.fillEntity(item);
  }

  public fillEntity(entity: ISubscriber) {
    this.email = entity.email;
    this.name = entity.name;
    this.trainerId = entity.trainerId;
  }

  public toObject(): SubscriberEntity {
    return { ...this };
  }
}
