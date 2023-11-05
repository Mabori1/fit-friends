import { Controller } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import {
  IFriendInfo,
  INewTrainingInfo,
  RabbitRouting,
} from '@fit-friends/types';
import { MailService } from '../mail/mail.service';

@Controller()
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @RabbitSubscribe({
    exchange: 'fitfriends',
    routingKey: RabbitRouting.AddTraining,
    queue: 'fitfriends',
  })
  public async newTrainingInfo(trainerInfo: INewTrainingInfo) {
    this.mailService.sendNotifyNewTraining(trainerInfo);
  }

  @RabbitSubscribe({
    exchange: 'fitfriends',
    routingKey: RabbitRouting.AddFriend,
    queue: 'fitfriends',
  })
  public async newFriendInfo(friendInfo: IFriendInfo) {
    this.mailService.sendNotifyNewFriend(friendInfo);
  }
}
