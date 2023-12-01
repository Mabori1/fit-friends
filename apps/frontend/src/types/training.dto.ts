import {
  GenderOfTraining,
  TrainingDuration,
  UserLevel,
  UserTypesTraining,
} from '@fit-friends/types';

export class TrainingDdo {
  public title!: string;
  public backgroundPicture!: string;
  public levelOfUser!: UserLevel;
  public typeOfTraining!: UserTypesTraining;
  public duration!: TrainingDuration;
  public gender!: GenderOfTraining;
  public caloriesQtt!: number;
  public description!: string;
  public video!: string;
  public price!: number;
  public isPromo!: boolean;
}
