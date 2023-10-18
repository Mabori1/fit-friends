import { IOrderTraining } from './order-training.interface';
import { IPersonalOrderTraining } from './personal-order-training.interface';
import { IUserBalance } from './user-balance.interface';
import { IUserFriend } from './user-friend.interface';

export interface IUser {
  userId?: number;
  name: string;
  email: string;
  avatar?: string;
  passwordHash: string;
  gender: string;
  birthDate?: string;
  role: string;
  description?: string;
  location: string;
  phone?: string;
  backgraundPicture?: string;
  createdAt?: Date;
  client?: IClient | null;
  trainer?: ITrainer | null;
  level: string;
  typesOfTraining: string[];
  orders?: IOrderTraining[];
  personalOrders?: IPersonalOrderTraining[];
  balance?: IUserBalance[];
  friends?: IUserFriend[];
}

export interface IClient {
  clientId?: number;
  userId?: number;
  timeOfTraining: string;
  caloryLosingPlanTotal: number;
  caloryLosingPlanDaily: number;
  isTrainingReadiness: boolean;
}

export interface ITrainer {
  trainerId?: number;
  userId?: number;
  sertificat: string;
  merits?: string;
  isPersonalTraining?: boolean;
}
