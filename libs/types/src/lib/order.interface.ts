export interface IOrder {
  id?: number;
  userId: number;
  type: string;
  trainingId: number;
  price: number;
  quantity: number;
  sumPrice: number;
  typeOfPayment: string;
  createdAt?: Date;
}
