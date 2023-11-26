import { IUser, UserRole } from '@fit-friends/types';
import { AuthStatus, NameSpace } from '../../const';
import { State } from '../store';

export const getAuthStatus = (state: State): AuthStatus =>
  state[NameSpace.UserSlice].authStatus;

export const getIsAuth = (state: State): boolean =>
  state[NameSpace.UserSlice].authStatus === AuthStatus.Auth;

export const getIsTrainer = (state: State): boolean =>
  state[NameSpace.UserSlice].user?.role === UserRole.Trainer;

export const getRole = (state: State): string =>
  state[NameSpace.UserSlice].user?.role ?? UserRole.Client;

export const getUser = (state: State): IUser | undefined =>
  state[NameSpace.UserSlice].user;
