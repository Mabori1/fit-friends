import { compare, genSalt, hash } from 'bcrypt';
import { SALT_ROUNDS } from '@fit-friends/shared/app-constants';
import {
  IClient,
  IEntity,
  IOrderTraining,
  IPersonalOrderTraining,
  ITrainer,
  IUser,
  IUserBalance,
  IUserFriend,
} from '@fit-friends/shared/app-types';

export class FitUserEntity implements IEntity<FitUserEntity>, IUser {
  public name: string;
  public email: string;
  public avatar: string;
  public passwordHash!: string;
  public gender: string;
  public birthDate: string;
  public role: string;
  public description: string;
  public location: string;
  public backgraundPicture: string;
  public createdAt: Date;
  public client?: IClient | null;
  public trainer?: ITrainer | null;
  public level: string;
  public typesOfTraining: string[];
  public orders!: IOrderTraining[];
  public personalOrders!: IPersonalOrderTraining[];
  public balance!: IUserBalance[];
  public friends!: IUserFriend[];

  constructor(fitUser: IUser) {
    this.fillEntity(fitUser);
  }

  public fillEntity(entity: IUser): void {
    this.name = entity.name;
    this.email = entity.email;
    this.avatar = entity.avatar || '';
    this.passwordHash = entity.passwordHash;
    this.gender = entity.gender;
    this.birthDate = entity.birthDate;
    this.role = entity.role;
    this.description = entity.description || '';
    this.location = entity.location;
    this.backgraundPicture = entity.backgraundPicture || '';
    this.createdAt = new Date();
    this.client = entity.client;
    this.trainer = entity.trainer;
    this.level = entity.level;
    this.typesOfTraining = entity.typesOfTraining || [];
    this.orders = [];
    this.personalOrders = [];
    this.balance = [];
    this.friends = [];
  }

  public toObject(): FitUserEntity {
    return { ...this };
  }
  public async setPassword(password: string): Promise<FitUserEntity> {
    const salt = await genSalt(SALT_ROUNDS);
    this.passwordHash = await hash(password, salt);
    return this;
  }

  public async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.passwordHash);
  }
}
