import { IClient, ITrainer, UserTypesTraining } from '@fit-friends/types';

export class CreateUserDto {
  public name!: string;
  public email!: string;
  public avatar?: string;
  public password!: string;
  public gender!: string;
  public birthDate?: Date;
  public role!: string;
  public description?: string;
  public location!: string;
  public level?: string;
  public typesOfTraining?: UserTypesTraining[];
  public trainer?: ITrainer;
  public client?: IClient;
}
