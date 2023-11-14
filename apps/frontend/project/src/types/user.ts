import { IAlert } from './alert.interface';
import { IBalance } from './balance.interface';
import { IFriend } from './friend.interface';
import { IOrder } from './order.interface';
import { IPersonalOrder } from './personal-order.interface';
import { UserGender } from './user-gender.enum';
import { UserLevel } from './user-level.enum';
import { UserLocation } from './user-location.enum';
import { UserRole } from './user-role.enum';
import { UserTypesTraining } from './user-types-training.enum';

export interface IUser {
  userId?: number;
  name: string;
  email: string;
  avatar?: string;
  passwordHash: string;
  gender: UserGender;
  birthDate?: Date;
  role: UserRole;
  description?: string;
  location: UserLocation;
  createdAt?: Date;
  level: UserLevel;
  typesOfTraining: UserTypesTraining[];
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

export interface ICreateUser {
  name: string;
  email: string;
  avatar?: string;
  gender: UserGender;
  birthDate?: Date;
  role: UserRole;
  description?: string;
  location: UserLocation;
  level: UserLevel;
}
