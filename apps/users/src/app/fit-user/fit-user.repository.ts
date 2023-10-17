import { Injectable } from '@nestjs/common';

@Injectable()
export class FitnessUserRepository
  implements CRUDRepository<FitnessUserEntity, number, User>
{
  constructor(private readonly prisma: PrismaService) {}

  public async create(item: FitnessUserEntity): Promise<User> {
    const entityData = item.toObject();
    return this.prisma.userEntity.create({
      data: {
        ...entityData,
        clientBody:
          item.clientBody != null
            ? {
                create: item.clientBody,
              }
            : undefined,
        trainerBody:
          item.trainerBody != null
            ? {
                create: item.trainerBody,
              }
            : undefined,
        orders: {
          connect: [],
        },
        personalOrders: {
          connect: [],
        },
        userBalance: {
          connect: [],
        },
        friends: {
          connect: [],
        },
      },
      include: {
        clientBody: true,
        trainerBody: true,
        orders: true,
        personalOrders: true,
        userBalance: true,
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
        clientBody: true,
        trainerBody: true,
        orders: true,
        personalOrders: true,
        userBalance: true,
      },
    });
  }

  public async findById(userId: number): Promise<User | null> {
    return this.prisma.userEntity.findFirst({
      where: {
        userId,
      },
      include: {
        clientBody: true,
        trainerBody: true,
        orders: true,
        personalOrders: true,
        userBalance: true,
        friends: true,
      },
    });
  }
  public async findByEmail(userMail: string): Promise<User | null> {
    return this.prisma.userEntity.findFirst({
      where: {
        userMail,
      },
    });
  }
  public async update(
    userId: number,
    userEntity: FitnessUserEntity
  ): Promise<User> {
    const entityData = userEntity.toObject();
    return this.prisma.userEntity.update({
      where: {
        userId,
      },
      data: {
        ...entityData,
        clientBody:
          userEntity.clientBody != null
            ? {
                update: {
                  timeOfTraining:
                    userEntity.clientBody.timeOfTraining != null
                      ? userEntity.clientBody.timeOfTraining
                      : undefined,
                  caloryLosingPlanTotal:
                    userEntity.clientBody.caloryLosingPlanTotal != null
                      ? userEntity.clientBody.caloryLosingPlanTotal
                      : undefined,
                  caloryLosingPlanDaily:
                    userEntity.clientBody.caloryLosingPlanDaily != null
                      ? userEntity.clientBody.caloryLosingPlanDaily
                      : undefined,
                  readinessForTraining:
                    userEntity.clientBody.readinessForTraining != null
                      ? userEntity.clientBody.readinessForTraining
                      : undefined,
                },
              }
            : undefined,
        trainerBody:
          userEntity.trainerBody != null
            ? {
                update: {
                  sertificates:
                    userEntity.trainerBody.sertificates != null
                      ? userEntity.trainerBody.sertificates
                      : undefined,
                  merit:
                    userEntity.trainerBody.merit != null
                      ? userEntity.trainerBody.merit
                      : undefined,
                  readinessForPrivate:
                    userEntity.trainerBody.readinessForPrivate != null
                      ? userEntity.trainerBody.readinessForPrivate
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
        userBalance: {
          connect: userEntity.userBalance.map(({ userBalanceId }) => ({
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
        clientBody: true,
        trainerBody: true,
        orders: true,
        personalOrders: true,
        userBalance: true,
        friends: true,
      },
    });
  }
  public async find(
    limit: number,
    filter: UserFilter,
    page: number
  ): Promise<User[]> | null {
    return this.prisma.userEntity.findMany({
      where: {
        location: { in: filter.locations },

        levelOfExperience: { contains: filter.levelOfExperience },

        typesOfTraining: { hasSome: filter.typesOfTraining },
      },

      take: limit,
      include: {
        clientBody: true,
        trainerBody: true,
        orders: true,
        personalOrders: true,
        userBalance: true,
      },
      orderBy: [{ createdAt: 'desc' }],
      skip: page > 0 ? limit * (page - 1) : undefined,
    });
  }
}
