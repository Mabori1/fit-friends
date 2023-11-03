import { ITraining } from './training.interface';

export interface ITotalOrder extends ITraining {
  totalQuantity: number;
  totalPrice: number;
}
