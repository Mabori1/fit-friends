import { Module } from '@nestjs/common';
import { SubscriberRepository } from './subscriber.repository';
import { SubscriberService } from './subscriber.service';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { getRabbitMQOptions } from '@fit-friends/core';
import { SubscriberController } from './subscriber.controller';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [
    RabbitMQModule.forRootAsync(
      RabbitMQModule,
      getRabbitMQOptions('application.rabbit'),
    ),
    MailModule,
  ],
  controllers: [SubscriberController],
  providers: [SubscriberRepository, SubscriberService],
  exports: [SubscriberRepository, SubscriberService],
})
export class SubscriberModule {}
