import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Injectable } from '@nestjs/common';
import { IUser } from '@fit-friends/shared/app-types';
import { FitUserService } from '../fit-user.service';

const USERNAME_FIELD_NAME = 'email';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly fitUserService: FitUserService) {
    super({ usernameField: USERNAME_FIELD_NAME });
  }

  public async validate(email: string, password: string): Promise<IUser> {
    return this.fitUserService.verifyUser({ email, password });
  }
}
