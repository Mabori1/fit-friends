import { Module } from '@nestjs/common';
import { PersonalOrderRepository } from './personal-order.repository';

@Module({
  providers: [PersonalOrderRepository],
  exports: [PersonalOrderRepository],
})
export class PersonalOrderModule {}
