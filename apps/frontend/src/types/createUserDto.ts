import {
  IClient,
  ITrainer,
  UserGender,
  UserLevel,
  UserLocation,
  UserRole,
  UserTypesTraining,
} from '@fit-friends/types';

export class CreateUserDto {
  public name!: string;
  public email!: string;
  public avatar?: string;
  public password!: string;
  public gender!: UserGender;
  public birthDate?: Date;
  public role!: UserRole;
  public description?: string;
  public location!: UserLocation;
  public level!: UserLevel;
  public typesOfTraining!: UserTypesTraining[];
  public trainer?: ITrainer;
  public client?: IClient;
}
