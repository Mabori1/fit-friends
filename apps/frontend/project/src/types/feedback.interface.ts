export interface IFeedback {
  id?: number;
  userId: number;
  trainingId: number;
  rating: number;
  text: string;
  createdAt?: Date;
}
