import { IEntity, IFeedback, ITraining } from '@fit-friends/types';

export class TrainingEntity implements IEntity<TrainingEntity>, ITraining {
  public title: string;
  public backgroundPicture?: string;
  public levelOfUser: string;
  public typeOfTraining: string;
  public duration: string;
  public price: number;
  public caloriesQtt: number;
  public createdAt: Date;
  public description: string;
  public gender: string;
  public video: string;
  public rating?: number;
  public trainerId: number;
  public isPromo?: boolean;
  public feedbacks?: IFeedback[];

  constructor(fitnessTraining: ITraining) {
    this.fillEntity(fitnessTraining);
  }

  public fillEntity(entity: ITraining): void {
    this.title = entity.title;
    this.backgroundPicture = entity.backgroundPicture;
    this.levelOfUser = entity.levelOfUser;
    this.typeOfTraining = entity.typeOfTraining;
    this.duration = entity.duration;
    this.price = entity.price;
    this.caloriesQtt = entity.caloriesQtt;
    this.createdAt = new Date();
    this.description = entity.description;
    this.gender = entity.gender;
    this.video = entity.video;
    this.rating = entity.rating ? entity.rating : 0;
    this.trainerId = entity.trainerId;
    this.isPromo = entity.isPromo;
    this.feedbacks = [];
  }

  public toObject(): TrainingEntity {
    return { ...this };
  }
}
