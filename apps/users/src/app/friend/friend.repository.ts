import { ICRUDRepository, IFriend } from '@fit-friends/types';
import { Injectable } from '@nestjs/common';
import { FriendEntity } from './friend.entity';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class FriendRepository
  implements ICRUDRepository<FriendEntity, number, IFriend>
{
  constructor(private readonly prisma: PrismaService) {}

  public async create(friendEntity: FriendEntity): Promise<IFriend> {
    const entity = friendEntity.toObject();
    return await this.prisma.friend.create({
      data: { ...entity },
    });
  }

  public async destroy(id: number): Promise<void> {
    await this.prisma.friend.delete({ where: { id } });
  }

  public async findById(id: number): Promise<IFriend> {
    return await this.prisma.friend.findFirst({ where: { id } });
  }

  public async findByUserId(userId: number): Promise<IFriend[] | null> {
    return await this.prisma.friend.findMany({ where: { userId } });
  }

  public async findByFriendId(friendId: number): Promise<IFriend[] | null> {
    return await this.prisma.friend.findMany({ where: { friendId } });
  }

  public async findByUserIdAndFriendId(
    userId: number,
    friendId: number,
  ): Promise<IFriend> {
    return await this.prisma.friend.findFirst({
      where: { userId, friendId },
    });
  }
}
