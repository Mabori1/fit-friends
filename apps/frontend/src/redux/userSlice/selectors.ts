import { INotify, IUser, UserRole } from '@fit-friends/types';
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

export const getAvatar = (state: State): string | undefined =>
  state[NameSpace.UserSlice].user?.avatar;

export const getCertificate = (state: State): string[] | undefined =>
  state[NameSpace.UserSlice].user?.trainer?.certificate;

export const getNotify = (state: State): INotify[] | undefined =>
  state[NameSpace.UserSlice].notices;
