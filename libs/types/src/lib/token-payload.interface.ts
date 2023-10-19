import { UserRole } from './user-role.enum';

export interface ITokenPayload {
  id?: number;
  email: string;
  role: UserRole;
  name: string;
}
