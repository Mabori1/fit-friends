import { ICRUDRepository, IFeedback } from '@fit-friends/types';
import { FeedbackEntity } from './feedback.entity';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class FeedbackRepository
  implements ICRUDRepository<FeedbackEntity, number, IFeedback>
{
  constructor(private readonly prisma: PrismaService) {}
  findById(id: number): Promise<IFeedback> {
    return this.prisma.feedback.findFirst({ where: { id } });
  }

  public async create(feedbackEntity: FeedbackEntity): Promise<IFeedback> {
    const entity = feedbackEntity.toObject();
    return await this.prisma.feedback.create({ data: { ...entity } });
  }

  public async destroy(id: number): Promise<void> {
    await this.prisma.feedback.delete({ where: { id } });
  }

  public async findBytrainingId(
    trainingId: number,
  ): Promise<IFeedback[] | null> {
    return await this.prisma.feedback.findMany({ where: { trainingId } });
  }

  public async getNewRating(trainingId: number) {
    return await this.prisma.feedback.aggregate({
      _avg: {
        rating: true,
      },
      where: {
        trainingId,
      },
    });
  }
}
