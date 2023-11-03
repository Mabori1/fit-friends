import { IEntity, IPersonalOrder, OrderStatus } from '@fit-friends/types';

export class PersonalOrderEntity
  implements IEntity<PersonalOrderEntity>, IPersonalOrder
{
  userId: number;
  trainerId: number;
  createdAt: Date;
  updateAt: Date;
  orderStatus: string;

  constructor(item: IPersonalOrder) {
    this.fillEntity(item);
  }

  public fillEntity(entity: IPersonalOrder) {
    this.userId = entity.userId;
    this.trainerId = entity.trainerId;
    this.orderStatus = entity.orderStatus || OrderStatus.Pending;
    this.createdAt = new Date();
    this.updateAt = entity.updateAt || new Date();
  }

  public toObject(): PersonalOrderEntity {
    return { ...this };
  }
}
