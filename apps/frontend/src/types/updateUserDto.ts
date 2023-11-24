import { IClient, ITrainer, UserTypesTraining } from '@fit-friends/types';

export class UpdateUserDto {
  public name?: string;
  public avatar?: string;
  public password?: string;
  public gender?: string;
  public birthDate?: Date;
  public description?: string;
  public location?: string;
  public level?: string;
  public typesOfTraining?: string[];
  public trainer?: ITrainer;
  public client?: IClient;
}
