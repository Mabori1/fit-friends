import { Controller } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { SubscriberService } from './subscriber.service';
import { IUnsubscribe, RabbitRouting } from '@fit-friends/types';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { MailService } from '../mail/mail.service';

@Controller()
export class SubscriberController {
  constructor(
    private readonly mailService: MailService,
    private readonly subscriberService: SubscriberService,
  ) {}

  @RabbitSubscribe({
    exchange: 'fitfriends',
    routingKey: RabbitRouting.AddSubscriber,
    queue: 'fitfriends',
  })
  public async create(subscriber: CreateSubscriberDto) {
    this.subscriberService.createSubscriber(subscriber);
    this.mailService.sendNotifyNewSubscriber(subscriber);
  }

  @RabbitSubscribe({
    exchange: 'fitfriends',
    routingKey: RabbitRouting.Unsubscribe,
    queue: 'fitfriends',
  })
  public async unsubscribe(unsubscriber: IUnsubscribe) {
    this.subscriberService.deleteSubscribe(unsubscriber);
    this.mailService.sendNotifyUnsubscriber(unsubscriber);
  }
}
