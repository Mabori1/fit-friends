import { Module } from '@nestjs/common';
import { NotifyService } from './notify.service';
import { NotifyRepository } from './notify.repository';
import { NotifyController } from './notify.controller';
import { UserModule } from '../user/user.module';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [UserModule, MailModule],
  controllers: [NotifyController],
  providers: [NotifyService, NotifyRepository],
  exports: [NotifyService, NotifyRepository],
})
export class NotifyModule {}
