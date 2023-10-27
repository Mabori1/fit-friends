import { IAlert } from './alert.interface';
import { IBalance } from './balance.interface';
import { IFriend } from './friend.interface';
import { IOrder } from './order.interface';
import { IPersonalOrder } from './personal-order.interface';

export interface IUser {
  userId?: number;
  name: string;
  email: string;
  avatar?: string;
  passwordHash: string;
  gender: string;
  birthDate?: Date;
  role: string;
  description?: string;
  location: string;
  createdAt?: Date;
  level: string;
  typesOfTraining: string[];
  client?: IClient | null;
  trainer?: ITrainer | null;
  alerts?: IAlert[];
  orders?: IOrder[];
  personalOrders?: IPersonalOrder[];
  balance?: IBalance[];
  friends?: IFriend[];
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
