import { OrderStatus } from './order-status.enum';

export interface IPersonalOrderTraining {
  personalOrderTrainingId?: number;
  userId: number;
  trainerId: number;
  createdAt?: Date;
  updateAt?: Date;
  orderStatus: OrderStatus;
}
