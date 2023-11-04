import { Module } from '@nestjs/common';
import { SubscriberRepository } from './subscriber.repository';
import { SubscriberService } from './subscriber.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { UserModule } from '../user/user.module';
import { getMailerAsyncOptions } from '../config/mail';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { getRabbitMQOptions } from '@fit-friends/core';
import { SubscriberController } from './subscriber.controller';

@Module({
  imports: [
    UserModule,
    MailerModule.forRootAsync(getMailerAsyncOptions('application.mail')),
    RabbitMQModule.forRootAsync(
      RabbitMQModule,
      getRabbitMQOptions('application.rabbit'),
    ),
  ],
  controllers: [SubscriberController],
  providers: [SubscriberRepository, SubscriberService, SubscriberController],
})
export class SubscriberModule {}
