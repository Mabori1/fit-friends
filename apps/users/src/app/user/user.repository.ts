import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { IUser, IUserFilter, ICRUDRepository } from '@fit-friends/types';
import { PrismaService } from '@fit-friends/config';

@Injectable()
export class UserRepository
  implements ICRUDRepository<UserEntity, number, IUser>
{
  constructor(private readonly prisma: PrismaService) {}

  public async create(item: UserEntity): Promise<IUser> {
    const entityData = item.toObject();
    return this.prisma.userEntity.create({
      data: {
        ...entityData,
        client:
          item.client != null
            ? {
                create: item.client,
              }
            : undefined,
        trainer:
          item.trainer != null
            ? {
                create: item.trainer,
              }
            : undefined,
        orders: {
          connect: [],
        },
        personalOrders: {
          connect: [],
        },
        balance: {
          connect: [],
        },
        friends: {
          connect: [],
        },
      },
      include: {
        client: true,
        trainer: true,
        orders: true,
        personalOrders: true,
        balance: true,
        friends: true,
      },
    });
  }

  public async destroy(userId: number): Promise<void> {
    await this.prisma.userEntity.delete({
      where: {
        userId,
      },
      include: {
        client: true,
        trainer: true,
        orders: true,
        personalOrders: true,
        balance: true,
      },
    });
  }

  public async findById(userId: number): Promise<IUser | null> {
    return this.prisma.userEntity.findFirst({
      where: {
        userId,
      },
      include: {
        client: true,
        trainer: true,
        orders: true,
        personalOrders: true,
        balance: true,
        friends: true,
      },
    });
  }

  public async findByEmail(email: string): Promise<IUser | null> {
    return this.prisma.userEntity.findFirst({
      where: {
        email,
      },
    });
  }

  public async update(
    userId: number,
    userEntity: FitUserEntity
  ): Promise<IUser> {
    const entityData = userEntity.toObject();
    return this.prisma.userEntity.update({
      where: {
        userId,
      },
      data: {
        ...entityData,
        client:
          userEntity.client != null
            ? {
                update: {
                  timeOfTraining:
                    userEntity.client.timeOfTraining != null
                      ? userEntity.client.timeOfTraining
                      : undefined,
                  caloryLosingPlanTotal:
                    userEntity.client.caloryLosingPlanTotal != null
                      ? userEntity.client.caloryLosingPlanTotal
                      : undefined,
                  caloryLosingPlanDaily:
                    userEntity.client.caloryLosingPlanDaily != null
                      ? userEntity.client.caloryLosingPlanDaily
                      : undefined,
                  isTrainingReadiness:
                    userEntity.client.isTrainingReadiness != null
                      ? userEntity.client.isTrainingReadiness
                      : undefined,
                },
              }
            : undefined,
        trainer:
          userEntity.trainer != null
            ? {
                update: {
                  sertificat:
                    userEntity.trainer.sertificat != null
                      ? userEntity.trainer.sertificat
                      : undefined,
                  merits:
                    userEntity.trainer.merits != null
                      ? userEntity.trainer.merits
                      : undefined,
                  isPersonalTraining:
                    userEntity.trainer.isPersonalTraining != null
                      ? userEntity.trainer.isPersonalTraining
                      : undefined,
                },
              }
            : undefined,
        orders: {
          connect: userEntity.orders.map(({ orderTrainingId }) => ({
            orderTrainingId,
          })),
        },
        personalOrders: {
          connect: userEntity.personalOrders.map(
            ({ personalOrderTrainingId }) => ({ personalOrderTrainingId })
          ),
        },
        balance: {
          connect: userEntity.balance.map(({ userBalanceId }) => ({
            userBalanceId,
          })),
        },
        friends: {
          connect: userEntity.friends.map(({ userFriendId }) => ({
            userFriendId,
          })),
        },
      },
      include: {
        client: true,
        trainer: true,
        orders: true,
        personalOrders: true,
        balance: true,
        friends: true,
      },
    });
  }
  public async find(
    limit: number,
    filter: IUserFilter,
    page: number
  ): Promise<IUser[]> | null {
    return this.prisma.userEntity.findMany({
      where: {
        location: { in: filter.location },

        level: { contains: filter.level },

        typesOfTraining: { hasSome: filter.typesOfTraining },
      },

      take: limit,
      include: {
        client: true,
        trainer: true,
        orders: true,
        personalOrders: true,
        balance: true,
      },
      orderBy: [{ createdAt: 'desc' }],
      skip: page > 0 ? limit * (page - 1) : undefined,
    });
  }
}
