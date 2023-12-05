import { UserRdo } from './user.rdo';

export class UserResponse {
  public userInfo!: UserRdo;
  public access_token!: string;
  public refresh_token!: string;
}
