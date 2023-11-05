import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { SubscriberRepository } from './subscriber.repository';
import { SubscriberEntity } from './subscriber.entity';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { IUnsubscribe } from '@fit-friends/types';

@Injectable()
export class SubscriberService {
  private readonly logger = new Logger(SubscriberService.name);

  constructor(private readonly subscriberRepository: SubscriberRepository) {}

  public async createSubscriber(subscriber: CreateSubscriberDto) {
    const { email, name, trainerId } = subscriber;
    const existingSubscriber = await this.subscriberRepository
      .findByEmailAndTrainerId(email, trainerId)
      .catch((err) => {
        this.logger.error(err);
        throw new NotFoundException('Subscriber not found');
      });

    if (existingSubscriber) {
      return existingSubscriber;
    }

    const entity = new SubscriberEntity({ email, name, trainerId });
    return await this.subscriberRepository.create(entity);
  }

  public async deleteSubscribe(unsubscriber: IUnsubscribe) {
    const subscriber = await this.subscriberRepository
      .findByEmailAndTrainerId(unsubscriber.email, unsubscriber.trainerId)
      .catch((err) => {
        this.logger.error(err);
        throw new NotFoundException('Subscriber not found');
      });

    if (!subscriber) {
      throw new NotFoundException('Subscriber not found');
    }

    await this.subscriberRepository.destroy(subscriber.id);
  }
}
