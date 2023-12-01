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
  public trainer?: TrainerDto;
  public client?: ClientDto;
}

class ClientDto {
  public timeOfTraining?: string;
  public caloryLosingPlanTotal?: number;
  public caloryLosingPlanDaily?: number;
  public isReady?: boolean;
}

class TrainerDto {
  public certificate?: string[];
  public merits?: string;
  public isPersonalTraining?: boolean;
}
