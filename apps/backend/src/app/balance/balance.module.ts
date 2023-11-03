import { Module } from '@nestjs/common';
import { BalanceRepository } from './balance.repository';

@Module({
  providers: [BalanceRepository],
  exports: [BalanceRepository],
})
export class BalanceModule {}
