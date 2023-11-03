import { Injectable } from '@nestjs/common';
import { FeedbackRepository } from './feedback.repository';
import { CreateReviewDto } from './dto/create-feedback.dto';
import { IFeedback, ITokenPayload } from '@fit-friends/types';
import { FeedbackEntity } from './feedback.entity';

@Injectable()
export class FeedbackService {
  constructor(private readonly feedbackRepository: FeedbackRepository) {}

  public async create(user: ITokenPayload, dto: CreateReviewDto) {
    const { trainingId, rating, text } = dto;
    const feedback: IFeedback = {
      userId: user.sub,
      trainingId,
      rating,
      text,
      createdAt: new Date(),
    };
    const feedbackEntity = new FeedbackEntity(feedback);

    return await this.feedbackRepository.create(feedbackEntity);
  }

  public async getFeedbacks(trainingId: number) {
    return await this.feedbackRepository.findBytrainingId(trainingId);
  }
}
