export interface IPersonalOrderTraining {
  personalOrderTrainingId?: number;
  userId: number;
  trainerId: number;
  createdAt?: Date;
  updateAt?: Date;
  orderStatus: string;
}
