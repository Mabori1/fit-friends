import { INotify, IUser, UserRole } from '@fit-friends/types';
import { AuthStatus, NameSpace, SliceStatus } from '../../constants';
import { State } from '../store';
import { UserRequestRdo } from '../../types/user-request.rdo';
import { UserRdo } from '../../types/user.rdo';

export const getAuthStatus = (state: State): AuthStatus =>
  state[NameSpace.UserSlice].authStatus;

export const getIsUserLoading = (state: State): boolean =>
  state[NameSpace.UserSlice].sliceStatus === SliceStatus.Loading;

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

export const getFriends = (state: State): UserRdo[] =>
  state[NameSpace.UserSlice].friends;

export const getIncomingRequests = (state: State): UserRequestRdo[] =>
  state[NameSpace.UserSlice].incomingRequests;
export const getOutgoingRequests = (state: State): UserRequestRdo[] =>
  state[NameSpace.UserSlice].outgoingRequests;

export const getUsers = (state: State): UserRdo[] =>
  state[NameSpace.UserSlice].users;
