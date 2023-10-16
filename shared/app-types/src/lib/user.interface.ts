import { IOrderTraining } from './order-training.interface';
import { IPersonalOrderTraining } from './personal-order-training.interface';
import { IUserBalance } from './user-balance.interface';
import { IUserFriend } from './user-friend.interface';
import { UserGender } from './user-gender.enum';
import { UserLevel } from './user-level.enum';
import { UserLocation } from './user-location.enum';
import { UserRoleType } from './user-role.enum';
import { UserTypesTraining } from './user-types-training.enum';

export interface IUser {
  userId?: number;
  name: string;
  mail: string;
  avatar?: string;
  passwordHash: string;
  gender: UserGender;
  birthDate: string;
  role: UserRoleType;
  description?: string;
  location: UserLocation;
  backgraundPicture?: string;
  createdAt?: Date;
  client?: IClient | null;
  trainer?: ITrainer | null;
  level?: UserLevel;
  typesOfTraining?: UserTypesTraining[];
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
  isTrainingReadiness: boolean;
}

export interface ITrainer {
  trainerId?: number;
  userId?: number;
  sertificates?: string[];
  merits?: string;
  isPersonalTraining?: boolean;
}
