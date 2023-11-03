import { Module } from '@nestjs/common';
import { FriendRepository } from './friend.repository';

@Module({
  providers: [FriendRepository],
  exports: [FriendRepository],
})
export class FriendModule {}
