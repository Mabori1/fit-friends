import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { IOrder } from '@fit-friends/types';
import { OrderQuery } from '../trainer-room/query/order.query';
import { OrderEntity } from './order.entity';

@Injectable()
export class OrderRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async create(orderEntity: OrderEntity): Promise<IOrder> {
    const entityOrder = orderEntity.toObject();
    return await this.prisma.order.create({
      data: { ...entityOrder },
    });
  }

  public async destroy(id: number): Promise<void> {
    await this.prisma.order.delete({
      where: {
        id,
      },
    });
  }

  public async findById(id: number): Promise<IOrder> {
    return await this.prisma.order.findFirst({
      where: {
        id,
      },
    });
  }

  public async findByTrainingId(trainingId: number): Promise<IOrder[] | null> {
    return await this.prisma.order.findMany({
      where: {
        trainingId,
      },
    });
  }

  public async findByUserId(userId: number): Promise<IOrder[] | null> {
    return await this.prisma.order.findMany({
      where: {
        userId,
      },
    });
  }

  public async find(query: OrderQuery, userId: number): Promise<IOrder[]> {
    const { limit, page } = query;
    return await this.prisma.order.findMany({
      where: { userId },
      orderBy: { trainingId: 'desc' },
      skip: page > 0 ? limit * (page - 1) : undefined,
    });
  }
}
