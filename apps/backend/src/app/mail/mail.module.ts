import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailService } from './mail.service';
import { getMailerAsyncOptions } from '../config/mail';

@Module({
  imports: [MailerModule.forRootAsync(getMailerAsyncOptions('notify.mail'))],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
