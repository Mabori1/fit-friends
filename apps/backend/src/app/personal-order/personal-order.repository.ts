import { ICRUDRepository, IPersonalOrder } from '@fit-friends/types';
import { Injectable } from '@nestjs/common';
import { PersonalOrderEntity } from './personal-order.entity';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class PersonalOrderRepository
  implements ICRUDRepository<PersonalOrderEntity, number, IPersonalOrder>
{
  constructor(private readonly prisma: PrismaService) {}

  public async create(
    personalOrderTrainingEntity: PersonalOrderEntity,
  ): Promise<IPersonalOrder> {
    const entity = personalOrderTrainingEntity.toObject();
    return await this.prisma.personalOrder.create({
      data: { ...entity },
    });
  }

  public async destroy(id: number): Promise<void> {
    await this.prisma.personalOrder.delete({
      where: {
        id,
      },
    });
  }

  public async findById(id: number): Promise<IPersonalOrder> {
    return await this.prisma.personalOrder.findFirst({
      where: { id },
    });
  }

  public async findByUserId(userId: number): Promise<IPersonalOrder[]> {
    return await this.prisma.personalOrder.findMany({
      where: { userId },
    });
  }

  public async findByTrainerId(trainerId: number): Promise<IPersonalOrder[]> {
    return await this.prisma.personalOrder.findMany({
      where: { trainerId },
    });
  }

  public async update(
    id: number,
    personalOrderTrainingEntity: PersonalOrderEntity,
  ): Promise<IPersonalOrder> {
    const entity = personalOrderTrainingEntity.toObject();
    return await this.prisma.personalOrder.update({
      where: { id },
      data: { ...entity },
    });
  }
}
