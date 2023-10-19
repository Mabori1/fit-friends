export interface IOrderTraining {
  orderTrainingId?: number;
  userId: number;
  typeOfTraining: string;
  trainingId: number;
  price: number;
  quantity: number;
  typeOfPayment: string;
  createdAt?: Date;
}
