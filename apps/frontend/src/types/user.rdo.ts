import {
  IAlert,
  IOrder,
  IPersonalOrder,
  TrainingDuration,
  UserRole,
  UserTypesTraining,
} from '@fit-friends/types';

export class UserRdo {
  public userId!: number;
  public name!: string;
  public email!: string;
  public avatar?: string;
  public gender!: string;
  public birthDate!: string;
  public role!: UserRole;
  public description!: string;
  public location!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
  public level!: string;
  public typesOfTraining!: UserTypesTraining[];
  public alerts!: IAlert[];
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
