export interface IFeedback {
  id?: number;
  userId: number;
  trainingId: number;
  rating: number;
  text: string;
  userName: string;
  userAvatar: string;
  createdAt?: Date;
}
