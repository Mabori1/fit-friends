import { TypeOfPayment } from './type-of-payment.enum';

export interface IOrderTraining {
  orderTrainingId?: number;
  userId: number;
  typeOfTraining: string;
  trainingId: number;
  price: number;
  quantity: number;
  typeOfPayment: TypeOfPayment;
  createdAt?: Date;
}
