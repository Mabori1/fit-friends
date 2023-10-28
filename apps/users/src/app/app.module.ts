import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigUsersModule } from './config/config-user.module';
import { FileModule } from './file/file.module';
import { TrainingModule } from './training/training.module';
import { FeedbackModule } from './feedback/feedback.module';
import { OrderModule } from './order/order.module';
import { FriendModule } from './friend/friend.module';
import { BalanceModule } from './balance/balance.module';
import { PersonalOrderModule } from './personal-order/personal-order.module';
import { ClientRoomModule } from './client-room/client-room.module';
import { TrainerRoomModule } from './trainer-room/trainer-room.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UserModule,
    ConfigUsersModule,
    FileModule,
    TrainingModule,
    FriendModule,
    BalanceModule,
    PersonalOrderModule,
    FeedbackModule,
    OrderModule,
    ClientRoomModule,
    TrainerRoomModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
