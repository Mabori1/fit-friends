import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { getJwtOptions } from '../config/get-jwt-options';
import { UserModule } from '../user/user.module';
import { TrainingModule } from '../training/training.module';
import { Module } from '@nestjs/common';
import { OrderModule } from '../order/order.module';
import { FriendModule } from '../friend/friend.module';
import { PersonalOrderModule } from '../personal-order/personal-order.module';
import { TrainerRoomController } from './trainer-room.controller';
import { TrainerRoomService } from './trainer-room.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: getJwtOptions,
    }),
    UserModule,
    TrainingModule,
    FriendModule,
    OrderModule,
    PersonalOrderModule,
  ],
  controllers: [TrainerRoomController],
  providers: [TrainerRoomService],
})
export class TrainerRoomModule {}
