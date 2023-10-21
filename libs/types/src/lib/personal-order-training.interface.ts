export interface IPersonalOrderTraining {
  id?: number;
  userId: number;
  trainerId: number;
  createdAt?: Date;
  updateAt?: Date;
  orderStatus: string;
}
