import { Controller } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { SubscriberService } from './subscriber.service';
import { RabbitRouting } from '@fit-friends/types';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';

@Controller()
export class SubscriberController {
  constructor(private readonly subscriberService: SubscriberService) {}

  @RabbitSubscribe({
    exchange: 'fit-friends.notify',
    routingKey: RabbitRouting.AddFriend,
    queue: 'fit-friends.notify',
  })
  public async create(subscriber: CreateSubscriberDto) {
    this.subscriberService.createSubscriber(subscriber);
  }
}
