import { Module } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { JwtAccessStrategy } from '../auth/strategies/jwt-access.strategy';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, UserRepository, JwtAccessStrategy, JwtService],
  exports: [UserService, UserRepository],
})
export class UserModule {}
