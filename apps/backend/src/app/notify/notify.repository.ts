import { ICRUDRepository, INotify } from '@fit-friends/types';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { NotifyEntity } from './notify.entity';

@Injectable()
export class NotifyRepository
  implements ICRUDRepository<NotifyEntity, number, INotify>
{
  constructor(private readonly prisma: PrismaService) {}

  public async create(item: NotifyEntity): Promise<INotify> {
    const entity = item.toObject();
    return await this.prisma.notify.create({ data: { ...entity } });
  }

  public async destroy(id: number): Promise<void> {
    await this.prisma.notify.delete({ where: { id } });
  }

  public async findById(id: number): Promise<INotify> {
    return await this.prisma.notify.findFirst({
      where: { id },
    });
  }

  public async findByEmail(targetUserEmail: string): Promise<INotify[]> {
    return await this.prisma.notify.findMany({
      where: { targetUserEmail },
    });
  }
}
