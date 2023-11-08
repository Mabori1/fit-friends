import { IBalance, ICRUDRepository } from '@fit-friends/types';
import { Injectable } from '@nestjs/common';
import { BalanceEntity } from './balance.entity';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class BalanceRepository
  implements ICRUDRepository<BalanceEntity, number, IBalance>
{
  constructor(private readonly prisma: PrismaService) {}

  public async create(userBalanceEntity: BalanceEntity): Promise<IBalance> {
    const entity = userBalanceEntity.toObject();
    return await this.prisma.balance.create({
      data: { ...entity },
    });
  }

  public async destroy(id: number): Promise<void> {
    await this.prisma.balance.delete({
      where: { id },
    });
  }

  public async findById(id: number): Promise<IBalance> {
    return await this.prisma.balance.findFirst({
      where: { id },
    });
  }

  public async findByUserId(userId: number): Promise<IBalance[]> {
    return await this.prisma.balance.findMany({
      where: { userId },
    });
  }

  public async findByUserIdAndTrainingId(userId: number, trainingId: number) {
    return await this.prisma.balance.findFirst({
      where: { userId, trainingId },
    });
  }

  public async update(
    id: number,
    balanceEntity: BalanceEntity,
  ): Promise<IBalance> {
    const entity = balanceEntity.toObject();
    return await this.prisma.balance.update({
      where: { id },
      data: { ...entity },
    });
  }
}
