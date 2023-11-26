import { IUser, UserRole } from '@fit-friends/types';
import { AuthStatus, NameSpace } from '../../const';
import { State } from '../store';

export const getAuthStatus = (state: State): AuthStatus =>
  state[NameSpace.AuthSlice].authStatus;

export const getIsAuth = (state: State): boolean =>
  state[NameSpace.AuthSlice].authStatus === AuthStatus.Auth;

export const getIsTrainer = (state: State): boolean =>
  state[NameSpace.AuthSlice].user?.role === UserRole.Trainer;

export const getRole = (state: State): string =>
  state[NameSpace.AuthSlice].user?.role ?? UserRole.Client;

export const getUser = (state: State): IUser | undefined =>
  state[NameSpace.AuthSlice].user;
