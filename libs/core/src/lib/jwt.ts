import { IUser, ITokenPayload } from '@fit-friends/types';

export function createJWTPayload(user: IUser): ITokenPayload {
  return {
    sub: user.userId,
    email: user.email,
    role: user.role,
    name: user.name,
  };
}
