import { Module } from '@nestjs/common';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { NotifyService } from './notify.service';
import { getRabbitMQOptions } from '@fit-friends/core';
import { NotifyRepository } from './notify.repository';
import { NotifyController } from './notify.controller';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    RabbitMQModule.forRootAsync(RabbitMQModule, getRabbitMQOptions('rabbit')),
    UserModule,
  ],
  controllers: [NotifyController],
  providers: [NotifyService, NotifyRepository],
  exports: [NotifyService, NotifyRepository],
})
export class NotifyModule {}
