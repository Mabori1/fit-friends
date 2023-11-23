import { IUser } from '@fit-friends/types';

export class UserResponse {
  public userInfo!: IUser;
  public access_token!: string;
  public refresh_token!: string;
}
