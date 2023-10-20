import { IAlert } from './alert.interface';
import { IOrderTraining } from './order-training.interface';
import { IPersonalOrderTraining } from './personal-order-training.interface';
import { TrainingDuration } from './training-duration.enum';
import { IUserBalance } from './user-balance.interface';
import { IUserFriend } from './user-friend.interface';
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
  client?: IClient;
  trainer?: ITrainer;
  refreshTokenHash?: string;
  alerts?: IAlert[];
  orders?: IOrderTraining[];
  personalOrders?: IPersonalOrderTraining[];
  balance?: IUserBalance[];
  friends?: IUserFriend[];
}

export interface IClient {
  clientId?: number;
  userId?: number;
  timeOfTraining?: TrainingDuration;
  caloryLosingPlanTotal?: number;
  caloryLosingPlanDaily?: number;
  isReady?: boolean;
}

export interface ITrainer {
  trainerId?: number;
  userId?: number;
  certificate?: string;
  merits?: string;
  isPersonalTraining?: boolean;
}
