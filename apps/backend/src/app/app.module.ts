import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { FileModule } from './file/file.module';
import { TrainingModule } from './training/training.module';
import { FeedbackModule } from './feedback/feedback.module';
import { OrderModule } from './order/order.module';
import { FriendModule } from './friend/friend.module';
import { BalanceModule } from './balance/balance.module';
import { PersonalOrderModule } from './personal-order/personal-order.module';
import { ClientRoomModule } from './client-room/client-room.module';
import { TrainerRoomModule } from './trainer-room/trainer-room.module';
import { ConfigModule } from '@nestjs/config';
import appConfig from './config/app.config';
import dbConfig from './config/db.config';
import jwtConfig from './config/jwt.config';
import subscriberConfig from './config/subscriber.config';
import { NotifyModule } from './notify/notify.module';
import rabbitConfig from './config/rabbit.config';
import notifyConfig from './config/notify.config';
import { SubscriberModule } from './subscriber/subscriber.module';

const ENV_FILE_PATH = '../../../../.env';

@Module({
  imports: [
    PrismaModule,
    NotifyModule,
    AuthModule,
    UserModule,
    FileModule,
    TrainingModule,
    FriendModule,
    BalanceModule,
    PersonalOrderModule,
    FeedbackModule,
    OrderModule,
    ClientRoomModule,
    SubscriberModule,
    TrainerRoomModule,
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [
        appConfig,
        dbConfig,
        jwtConfig,
        subscriberConfig,
        rabbitConfig,
        notifyConfig,
      ],
      envFilePath: ENV_FILE_PATH,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
