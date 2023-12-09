import { OrderStatus } from '@fit-friends/types';
import { UserRequestType } from './user-request-type.enum';

export class UserRequestRdo {
  public id!: number;
  public createdAt!: string;
  public updatedAt!: string;
  public type!: UserRequestType;
  public targetId!: number;
  public userId!: number;
  public status!: OrderStatus;
}
