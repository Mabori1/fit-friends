import { TypeOfOrder, TypeOfPayment } from '@fit-friends/types';

export class OrderRdo {
  public id!: number;
  public trainingId!: number;
  public type!: TypeOfOrder;
  public price!: number;
  public quantity!: number;
  public totalPrice!: number;
  public typeOfPayment!: TypeOfPayment;
  public createdAt!: Date;
}
