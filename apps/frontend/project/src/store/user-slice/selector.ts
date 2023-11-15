import { AuthStatus, NameSpace } from '../../common/const';
import { State } from '../../types/state';

export const getAuthStatus = (state: State): AuthStatus =>
  state[NameSpace.User].authStatus;

export const getAuthCheckedStatus = (state: State): boolean =>
  state[NameSpace.User].authStatus !== AuthStatus.Unknown;

export const isAuth = (state: State): boolean =>
  state[NameSpace.User].authStatus === AuthStatus.Auth;
