import { Module } from '@nestjs/common';
import { FitUserService } from './fit-user.service';
import { FitUserController } from './fit-user.controller';

@Module({
  controllers: [FitUserController],
  providers: [FitUserService],
})
export class FitUserModule {}
