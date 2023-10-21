export interface IOrderTraining {
  id?: number;
  userId: number;
  typeOfTraining: string;
  trainingId: number;
  price: number;
  quantity: number;
  typeOfPayment: string;
  createdAt?: Date;
}
