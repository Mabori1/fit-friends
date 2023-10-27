export interface IPersonalOrder {
  id?: number;
  userId: number;
  trainerId: number;
  createdAt?: Date;
  updateAt?: Date;
  orderStatus: string;
}
