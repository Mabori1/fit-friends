import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { SubscriberRepository } from './subscriber.repository';
import { SubscriberEntity } from './subscriber.entity';
import { MailerService } from '@nestjs-modules/mailer';
import { UserRepository } from '../user/user.repository';
import { ITokenPayload } from '@fit-friends/types';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';

@Injectable()
export class SubscriberService {
  private readonly logger = new Logger(SubscriberService.name);

  constructor(
    private readonly subscriberRepository: SubscriberRepository,
    private readonly userRepository: UserRepository,
    private readonly mailerServer: MailerService,
  ) {}

  public async createSubscriber(subscriber: CreateSubscriberDto) {
    const { email, name, trainerId } = subscriber;
    const trainer = await this.userRepository
      .findById(trainerId)
      .catch((err) => {
        this.logger.error(err);
        throw new NotFoundException('Trainer not found');
      });

    if (!trainer) {
      throw new NotFoundException('Trainer not found');
    }

    const entity = new SubscriberEntity({ email, name, trainerId });
    return await this.subscriberRepository.create(entity);
  }

  public async sendMail(payload: ITokenPayload) {
    const { sub, name } = payload;
    const subscribers = await this.subscriberRepository
      .findByTrainerId(sub)
      .catch((err) => {
        this.logger.error(err);
        throw new NotFoundException('Subscribers not found');
      });

    if (!subscribers) {
      throw new NotFoundException('Subscribers not found');
    }

    await Promise.all(
      subscribers.map(async (item) => {
        await this.mailerServer.sendMail({
          to: item.email,
          subject: 'New training',
          template: '../../new-training',
          context: {
            user: `${item.name} `,
            trainer: `${name}`,
          },
        });
      }),
    );
  }
}
