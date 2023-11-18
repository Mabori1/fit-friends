import {
  IOrder,
  IPersonalOrder,
  TrainingDuration,
  UserGender,
  UserLevel,
  UserLocation,
  UserRole,
  UserTypesTraining,
} from '@fit-friends/types';

class Tokens {
  public access_token!: string;
  public refresh_token!: string;
}

export class UserResponse {
  public user!: UserRdo;
  public tokens!: Tokens;
}

export class UserRdo {
  public userId!: number;
  public name!: string;
  public email!: string;
  public avatar?: string;
  public gender!: UserGender;
  public birthDate!: string;
  public role!: UserRole;
  public description!: string;
  public location!: UserLocation;
  public createdAt!: Date;
  public level!: UserLevel;
  public typesOfTraining!: UserTypesTraining[];
  public client?: {
    id?: number;
    userId?: number;
    timeOfTraining?: TrainingDuration;
    caloryLosingPlanTotal?: number;
    caloryLosingPlanDaily?: number;
    isReady?: boolean;
  };
  public trainer?: {
    id?: number;
    userId?: number;
    certificate?: string;
    merits?: string;
    isPersonalTraining?: boolean;
  };
  public orders?: IOrder[];
  public personalOrders?: IPersonalOrder[];
}
