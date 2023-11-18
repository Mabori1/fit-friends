import { UserRole } from '@fit-friends/types';
import { AuthStatus, NameSpace } from '../../const';
import { State } from '../store';

export const getAuthStatus = (state: State): AuthStatus =>
  state[NameSpace.AuthSlice].authStatus;
export const getUserRole = (state: State): UserRole =>
  state[NameSpace.AuthSlice].userRole;
