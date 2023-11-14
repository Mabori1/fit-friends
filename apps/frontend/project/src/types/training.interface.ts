import { IFeedback } from './feedback.interface';

export interface ITraining {
  id?: number;
  title: string;
  backgroundPicture?: string;
  levelOfUser: string;
  typeOfTraining: string;
  duration: string;
  price: number;
  caloriesQtt: number;
  description: string;
  createdAt?: Date;
  gender: string;
  video: string;
  rating?: number;
  trainerId: number;
  isPromo?: boolean;
  feedbacks?: IFeedback[];
}
