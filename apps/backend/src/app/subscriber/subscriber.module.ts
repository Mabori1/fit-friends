import { Module } from '@nestjs/common';
import { SubscriberRepository } from './subscriber.repository';

@Module({
  providers: [SubscriberRepository],
  exports: [SubscriberRepository],
})
export class SubscriberModule {}
