import { IEntity, IOrder } from '@fit-friends/types';

export class OrderEntity implements IEntity<OrderEntity>, IOrder {
  public userId: number;
  public type: string;
  public trainerId: number;
  public trainingId: number;
  public price: number;
  public quantity: number;
  public sumPrice: number;
  public typeOfPayment: string;
  public createdAt?: Date;

  constructor(order: IOrder) {
    this.fillEntity(order);
  }

  public fillEntity(entity: IOrder) {
    this.userId = entity.userId;
    this.type = entity.type;
    this.trainerId = entity.trainerId;
    this.trainingId = entity.trainingId;
    this.price = entity.price;
    this.quantity = entity.quantity;
    this.sumPrice = this.price * this.quantity;
    this.typeOfPayment = entity.typeOfPayment;
    this.createdAt = new Date();
  }

  public toObject(): OrderEntity {
    return { ...this };
  }
}
