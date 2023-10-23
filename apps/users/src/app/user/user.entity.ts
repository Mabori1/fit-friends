import {
  IAlert,
  IClient,
  IEntity,
  IOrderTraining,
  IPersonalOrderTraining,
  ITrainer,
  IUser,
  IUserBalance,
  IUserFriend,
  SALT_ROUNDS,
} from '@fit-friends/types';
import { genSalt, compare, hash } from 'bcrypt';

export class UserEntity implements IEntity<UserEntity>, IUser {
  public userId?: number;
  public name: string;
  public email: string;
  public avatar?: string;
  public passwordHash: string;
  public gender: string;
  public birthDate?: Date;
  public role: string;
  public description?: string;
  public location: string;
  public createdAt?: Date;
  public level: string;
  public typesOfTraining: string[];
  public client?: IClient | null;
  public trainer?: ITrainer | null;
  public refreshTokenHash?: string;
  public alerts?: IAlert[];
  public orders?: IOrderTraining[];
  public personalOrders?: IPersonalOrderTraining[];
  public balance?: IUserBalance[];
  public friends?: IUserFriend[];

  constructor(user: IUser) {
    this.fillEntity(user);
  }

  public toObject() {
    return { ...this };
  }

  public fillEntity(user: IUser) {
    this.userId = user.userId;
    this.name = user.name;
    this.email = user.email;
    this.avatar = user.avatar || '';
    this.passwordHash = user.passwordHash;
    this.gender = user.gender;
    this.birthDate = user.birthDate;
    this.role = user.role;
    this.description = user.description || '';
    this.location = user.location;
    this.createdAt = user.createdAt || new Date();
    this.level = user.level;
    this.typesOfTraining = user.typesOfTraining;
    this.client = user.client;
    this.trainer = user.trainer;
    this.alerts = user.alerts;
    this.orders = user.orders;
    this.personalOrders = user.personalOrders;
    this.balance = user.balance;
    this.friends = user.friends;
  }

  public async setPassword(password: string): Promise<UserEntity> {
    const salt = await genSalt(SALT_ROUNDS);
    this.passwordHash = await hash(password, salt);
    return this;
  }

  public async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.passwordHash);
  }
}
