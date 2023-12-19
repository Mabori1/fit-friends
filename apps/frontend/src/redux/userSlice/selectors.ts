import { IBalance, INotify, UserRole } from '@fit-friends/types';
import { AuthStatus, NameSpace, SliceStatus } from '../../constants';
import { State } from '../store';
import { UserRdo } from '../../types/user.rdo';
import { PersonalOrderRdo } from '../../types/personal-order.rdo';
import { TrainerOrdersRdo } from '../../types/trainer-orders.rdo';

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

export const getUser = (state: State): UserRdo | undefined =>
  state[NameSpace.UserSlice].user;

export const getUserId = (state: State): number | undefined =>
  state[NameSpace.UserSlice].user?.userId;

export const getUserName = (state: State): string | undefined =>
  state[NameSpace.UserSlice].user?.name;

export const getAvatar = (state: State): string | undefined =>
  state[NameSpace.UserSlice].user?.avatar;

export const getCertificate = (state: State): string[] | undefined =>
  state[NameSpace.UserSlice].user?.trainer?.certificate;

export const getNotify = (state: State): INotify[] | undefined =>
  state[NameSpace.UserSlice].notices;

export const getTrainerFriends = (state: State): UserRdo[] =>
  state[NameSpace.UserSlice].trainerFriends;

export const getClientFriends = (state: State): UserRdo[] =>
  state[NameSpace.UserSlice].clientFriends;

export const getIsClientFriend =
  (id: number) =>
  (state: State): boolean =>
    state[NameSpace.UserSlice].clientFriends.some(
      (friend) => friend.userId === id,
    );

export const getIsTrainerFriend =
  (id: number) =>
  (state: State): boolean =>
    state[NameSpace.UserSlice].trainerFriends.some(
      (friend) => friend.userId === id,
    );

export const getInPersonalOrders = (state: State): PersonalOrderRdo[] =>
  state[NameSpace.UserSlice].inPersonalOrders;

export const getOutPersonalOrders = (state: State): PersonalOrderRdo[] =>
  state[NameSpace.UserSlice].outPersonalOrders;

export const getUsers = (state: State): UserRdo[] =>
  state[NameSpace.UserSlice].users;

export const getOrders = (state: State): TrainerOrdersRdo[] =>
  state[NameSpace.UserSlice].orders ?? [];

export const getBalance = (state: State): IBalance[] | undefined =>
  state[NameSpace.UserSlice].balance;

export const getTrainingsBalance = (state: State): TrainingRdo[] =>
  state[NameSpace.UserSlice].trainingsBalance;

export const getSubscribeStatus = (state: State): boolean =>
  state[NameSpace.UserSlice].subscribeStatus;
