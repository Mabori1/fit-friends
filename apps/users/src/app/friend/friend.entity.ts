import { IEntity, IFriend } from '@fit-friends/types';

export class FriendEntity implements IEntity<FriendEntity>, IFriend {
  public userFriendId: number;
  public userId: number;
  public friendId: number;
  public isConfirmed?: boolean;

  constructor(userFriend: IFriend) {
    this.fillEntity(userFriend);
  }
  fillEntity(entity: IFriend) {
    this.userId = entity.userId;
    this.friendId = entity.friendId;
    this.isConfirmed = entity.isConfirmed;
  }
  toObject(): FriendEntity {
    return { ...this };
  }
}
