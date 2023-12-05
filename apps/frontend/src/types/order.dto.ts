import { TypeOfOrder, TypeOfPayment } from '@fit-friends/types';

export class OrderDto {
  public type!: TypeOfOrder;
  public trainerId!: number;
  public trainingId!: number;
  public price!: number;
  public quantity!: number;
  public sumPrice!: number;
  public typeOfPayment!: TypeOfPayment;
}
