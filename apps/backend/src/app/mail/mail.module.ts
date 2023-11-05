import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailService } from './mail.service';
import { getMailerAsyncOptions } from '../config/mail';
import { MailController } from './mail.controller';

@Module({
  imports: [
    MailerModule.forRootAsync(getMailerAsyncOptions('application.mail')),
  ],
  controllers: [MailController],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
