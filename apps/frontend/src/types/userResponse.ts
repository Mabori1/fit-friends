import {
  UserGender,
  UserLevel,
  UserLocation,
  UserRole,
  UserTypesTraining,
} from '@fit-friends/types';

export class UserResponse {
  public userInfo!: UserRdo;
  public access_token!: string;
  public refresh_token!: string;
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
}
