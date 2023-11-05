import { ICRUDRepository, ISubscriber } from '@fit-friends/types';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { SubscriberEntity } from './subscriber.entity';

@Injectable()
export class SubscriberRepository
  implements ICRUDRepository<SubscriberEntity, number, ISubscriber>
{
  constructor(private readonly prisma: PrismaService) {}

  public async create(item: SubscriberEntity): Promise<ISubscriber> {
    const entity = item.toObject();
    return await this.prisma.subscriber.create({ data: { ...entity } });
  }

  public async destroy(id: number): Promise<void> {
    await this.prisma.subscriber.delete({ where: { id } });
  }

  public async findById(id: number): Promise<ISubscriber> {
    return await this.prisma.subscriber.findFirst({ where: { id } });
  }

  public async findByEmail(email: string): Promise<ISubscriber> {
    return await this.prisma.subscriber.findFirst({ where: { email } });
  }

  public async findByEmailAndTrainerId(
    email: string,
    trainerId: number,
  ): Promise<ISubscriber> {
    return await this.prisma.subscriber.findFirst({
      where: { trainerId, email },
    });
  }

  public async findByTrainerId(trainerId: number): Promise<ISubscriber[]> {
    return await this.prisma.subscriber.findMany({ where: { trainerId } });
  }
}
