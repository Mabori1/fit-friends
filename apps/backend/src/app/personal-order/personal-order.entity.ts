import { IEntity, IPersonalOrder, OrderStatus } from '@fit-friends/types';

export class PersonalOrderEntity
  implements IEntity<PersonalOrderEntity>, IPersonalOrder
{
  userId: number;
  targetId: number;
  createdAt: Date;
  updateAt: Date;
  orderStatus: string;

  constructor(item: IPersonalOrder) {
    this.fillEntity(item);
  }

  public fillEntity(entity: IPersonalOrder) {
    this.userId = entity.userId;
    this.targetId = entity.targetId;
    this.orderStatus = entity.orderStatus || OrderStatus.Pending;
    this.createdAt = new Date();
    this.updateAt = entity.updateAt || new Date();
  }

  public toObject(): PersonalOrderEntity {
    return { ...this };
  }
}
