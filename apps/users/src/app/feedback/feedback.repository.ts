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
    const newFeedback = await this.prisma.feedback.create({
      data: {
        ...entity,
      },
    });

    const newRating = await this.prisma.feedback.aggregate({
      where: {
        trainingId: entity.trainingId,
      },
      _avg: {
        rating: true,
      },
    });

    await this.prisma.training.update({
      where: {
        id: entity.trainingId,
      },
      data: {
        rating: +newRating._avg.rating.toFixed(1) ?? 0,
      },
    });

    return newFeedback;
  }

  public async destroy(id: number): Promise<void> {
    await this.prisma.feedback.delete({ where: { id } });
  }

  public async findBytrainingId(
    trainingId: number,
  ): Promise<IFeedback[] | null> {
    return await this.prisma.feedback.findMany({ where: { trainingId } });
  }
}
