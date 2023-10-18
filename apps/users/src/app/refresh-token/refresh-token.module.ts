import { Module } from '@nestjs/common';
import { RefreshTokenService } from './refresh-token.service.js';
import { RefreshTokenRepository } from './refresh-token.repository.js';

@Module({
  imports: [],
  providers: [RefreshTokenService, RefreshTokenRepository],
  exports: [RefreshTokenService],
})
export class RefreshTokenModule {}
