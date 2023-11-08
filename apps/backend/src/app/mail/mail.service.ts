import { Inject, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigType } from '@nestjs/config';
import notifyConfig from '../config/notify.config';
import { IFriendInfo, INewTrainingInfo, ISubscriber } from '@fit-friends/types';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,

    @Inject(notifyConfig.KEY)
    private readonly serviceConfig: ConfigType<typeof notifyConfig>,
  ) {}

  public async sendMailNewSubscribe(subscriber: ISubscriber) {
    await this.mailerService.sendMail({
      from: this.serviceConfig.mail.from,
      to: subscriber.email,
      subject: 'Ваш email добавлен для рассылки',
      template: './add-subscriber',
      context: {
        user: `${subscriber.name}`,
        email: `${subscriber.email}`,
      },
    });
  }

  public async sendMailUnsubscribe(unsubscriber: ISubscriber) {
    await this.mailerService.sendMail({
      from: this.serviceConfig.mail.from,
      to: unsubscriber.email,
      subject: 'Ваш email удален из рассылки',
      template: './unsubscribe',
      context: {
        user: `${unsubscriber.name}`,
        email: `${unsubscriber.email}`,
      },
    });
  }

  public async sendMailNewTraining(trainerInfo: INewTrainingInfo) {
    await this.mailerService.sendMail({
      from: this.serviceConfig.mail.from,
      to: trainerInfo.email,
      subject: 'Появилась новая тренировка',
      template: './add-training',
      context: {
        user: `${trainerInfo.name}`,
        trainerName: `${trainerInfo.trainerName}`,
        title: `${trainerInfo.title}`,
      },
    });
  }

  public async sendMailNewFriend(friendInfo: IFriendInfo) {
    await this.mailerService.sendMail({
      from: this.serviceConfig.mail.from,
      to: friendInfo.targetEmail,
      subject: 'Новая заявка в друзья',
      template: './add-friend',
      context: {
        targetName: `${friendInfo.targetName}`,
        srcName: `${friendInfo.srcName}`,
        srcEmail: `${friendInfo.srcEmail}`,
      },
    });
  }
}
