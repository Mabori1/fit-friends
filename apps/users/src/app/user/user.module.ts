import { Module } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { JwtAccessStrategy } from '../auth/strategies/jwt-access.strategy';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, UserRepository, JwtAccessStrategy],
  exports: [UserService, UserRepository],
})
export class UserModule {}
