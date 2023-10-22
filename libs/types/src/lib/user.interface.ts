import { IAlert } from './alert.interface';
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
  createdAt?: Date;
  level: string;
  typesOfTraining: string[];
  client?: IClient | null;
  trainer?: ITrainer | null;
  alerts?: IAlert[];
  orders?: IOrderTraining[];
  personalOrders?: IPersonalOrderTraining[];
  balance?: IUserBalance[];
  friends?: IUserFriend[];
}

export interface IClient {
  clientId?: number;
  userId?: number;
  timeOfTraining?: string;
  caloryLosingPlanTotal?: number;
  caloryLosingPlanDaily?: number;
  isReady?: boolean;
}

export interface ITrainer {
  trainerId?: number;
  userId?: number;
  certificate: string;
  merits?: string;
  isPersonalTraining?: boolean;
}
