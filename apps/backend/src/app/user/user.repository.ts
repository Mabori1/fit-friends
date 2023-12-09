import { Injectable } from '@nestjs/common';
import { IUser, IUserFilter, ICRUDRepository } from '@fit-friends/types';
import { UserEntity } from './user.entity';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UserRepository
  implements ICRUDRepository<UserEntity, number, IUser>
{
  constructor(private readonly prisma: PrismaService) {}

  public async create(item: UserEntity): Promise<IUser> {
    const entityData = item.toObject();
    return this.prisma.user.create({
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
    await this.prisma.user.delete({
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
    return this.prisma.user.findFirst({
      where: {
        userId,
      },
      include: {
        client: true,
        trainer: true,
      },
    });
  }

  public async findByEmail(email: string): Promise<IUser | null> {
    return this.prisma.user.findFirst({
      where: {
        email,
      },
    });
  }

  public async update(userId: number, userEntity: UserEntity): Promise<IUser> {
    const entityData = userEntity.toObject();
    return this.prisma.user.update({
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
                  isReady:
                    userEntity.client.isReady != null
                      ? userEntity.client.isReady
                      : undefined,
                },
              }
            : undefined,
        trainer:
          userEntity.trainer != null
            ? {
                update: {
                  certificate:
                    userEntity.trainer.certificate != null
                      ? userEntity.trainer.certificate
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
          connect: userEntity.orders.map(({ id }) => ({
            id,
          })),
        },
        personalOrders: {
          connect: userEntity.personalOrders.map(({ id }) => ({ id })),
        },
        balance: {
          connect: userEntity.balance.map(({ id }) => ({
            id,
          })),
        },
        friends: {
          connect: userEntity.friends.map(({ id }) => ({
            id,
          })),
        },
      },
      include: {
        client: true,
        trainer: true,
        balance: true,
        friends: true,
      },
    });
  }

  public async find(
    limit: number,
    filter: IUserFilter,
    page: number,
  ): Promise<IUser[]> | null {
    console.log(filter.locations);
    return this.prisma.user.findMany({
      where: {
        AND: [
          { role: filter.role ? { contains: filter.role } : 'пользователь' },

          {
            location: filter.locations ? { in: filter.locations } : undefined,
          },

          { level: { contains: filter.level } },

          {
            typesOfTraining: filter.typesOfTraining
              ? { hasSome: filter.typesOfTraining }
              : undefined,
          },

          {
            client: {
              isReady: filter.isReady,
            },
          },
        ],
      },

      take: limit,
      include: {
        client: true,
        trainer: true,
        balance: true,
      },
      orderBy: [{ createdAt: 'desc' }],
      skip: page > 0 ? limit * (page - 1) : undefined,
    });
  }
}
