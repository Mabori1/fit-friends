import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigUsersModule } from './config/config-user.module';
import { FileModule } from './file/file.module';
import { TrainingModule } from './training/training.module';
import { FeedbackModule } from './feedback/feedback.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UserModule,
    ConfigUsersModule,
    FileModule,
    TrainingModule,
    FeedbackModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
