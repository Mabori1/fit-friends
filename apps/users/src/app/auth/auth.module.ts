import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { FitUserModule } from '../fit-user/fit-user.module';

@Module({
  imports: [FitUserModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
