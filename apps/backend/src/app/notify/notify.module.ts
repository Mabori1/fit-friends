import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { NotifyService } from './notify.service';
import { NotifyRepository } from './notify.repository';
import { NotifyController } from './notify.controller';

@Module({
  imports: [UserModule],
  providers: [NotifyRepository, NotifyService],
  controllers: [NotifyController],
  exports: [NotifyRepository],
})
export class NotifyModule {}
