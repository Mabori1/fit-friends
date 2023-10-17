import { UserRole } from './user-role.enum';

export interface ITokenPayload {
  sub?: number;
  email: string;
  role: UserRole;
  name: string;
}
