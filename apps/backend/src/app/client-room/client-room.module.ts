import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { getJwtOptions } from '../config/get-jwt-options';
import { UserModule } from '../user/user.module';
import { TrainingModule } from '../training/training.module';
import { Module } from '@nestjs/common';
import { OrderModule } from '../order/order.module';
import { FriendModule } from '../friend/friend.module';
import { PersonalOrderModule } from '../personal-order/personal-order.module';
import { ClientRoomController } from './client-room.controller';
import { ClientRoomService } from './client-room.service';
import { BalanceModule } from '../balance/balance.module';
import { FeedbackModule } from '../feedback/feedback.module';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { getRabbitMQOptions } from '@fit-friends/core';
import { NotifyModule } from '../notify/notify.module';

@Module({
  imports: [
    RabbitMQModule.forRootAsync(RabbitMQModule, getRabbitMQOptions('rabbit')),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: getJwtOptions,
    }),
    UserModule,
    TrainingModule,
    FriendModule,
    OrderModule,
    PersonalOrderModule,
    BalanceModule,
    FeedbackModule,
    NotifyModule,
  ],
  controllers: [ClientRoomController],
  providers: [ClientRoomService],
})
export class ClientRoomModule {}
