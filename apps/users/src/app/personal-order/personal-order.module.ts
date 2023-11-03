import { Module } from '@nestjs/common';
import { PersonalOrderRepository } from './personal-order.repository';
import { PersonalOrderService } from './personal-order.service';
import { PersonalOrderController } from './personal-order.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { getJwtOptions } from '../config/get-jwt-options';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: getJwtOptions,
    }),
    UserModule,
  ],
  controllers: [PersonalOrderController],
  providers: [PersonalOrderRepository, PersonalOrderService],
  exports: [PersonalOrderRepository],
})
export class PersonalOrderModule {}
