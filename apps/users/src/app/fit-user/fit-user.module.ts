import { Module } from '@nestjs/common';
import { FitUserService } from './fit-user.service';
import { FitUserController } from './fit-user.controller';
import { FitUserMemoryRepository } from './fit-user-memory.repository';

@Module({
  controllers: [FitUserController],
  providers: [FitUserService, FitUserMemoryRepository],
  exports: [FitUserMemoryRepository],
})
export class FitUserModule {}
