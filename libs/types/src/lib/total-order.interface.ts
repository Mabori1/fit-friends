import { IOrder } from './order.interface';

export interface ITotalOrder extends IOrder {
  totalQtt: number;
  totalPrice: number;
}
