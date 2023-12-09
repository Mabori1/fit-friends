export interface IPersonalOrder {
  id?: number;
  userId: number;
  targetId: number;
  createdAt?: Date;
  updateAt?: Date;
  orderStatus: string;
}
