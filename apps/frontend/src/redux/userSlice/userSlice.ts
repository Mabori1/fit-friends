import { createSlice } from '@reduxjs/toolkit';
import { IBalance, INotify } from '@fit-friends/types';
import { AuthStatus, NameSpace, SliceStatus } from '../../constants';
import {
  registerUserAction,
  loginUserAction,
  refreshTokensAction,
  checkUserAction,
  logoutAction,
  updateUserAction,
  uploadAvatarAction,
  uploadCertificateAction,
  deleteCertificateAction,
  fetchNotifyAction,
  deleteNotifyAction,
  fetchTrainerFriendsAction,
  fetchClientFriendsAction,
  fetchUsersCatalogAction,
  fetchOrdersAction,
  fetchInPersonalOrdersAction,
  fetchBalanceAction,
  toggleSubscribeAction,
  buyPersonalTrainingAction,
  checkSubscribeAction,
  fetchAddFriendAction,
  fetchRemoveFriendAction,
  fetchOutPersonalOrdersAction,
  fetchTrainingsBalanceAction,
} from './apiUserActions';
import { UserRdo } from '../../types/user.rdo';
import { PersonalOrderRdo } from '../../types/personal-order.rdo';
import { TrainerOrdersRdo } from '../../types/trainer-orders.rdo';
import { TrainingRdo } from '../../types/training.rdo';

type UserSlice = {
  authStatus: AuthStatus;
  userSliceStatus: SliceStatus;
  user: UserRdo | undefined;
  users: UserRdo[];
  trainerFriends: UserRdo[];
  clientFriends: UserRdo[];
  notices: INotify[] | [];
  orders?: TrainerOrdersRdo[];
  inPersonalOrders: PersonalOrderRdo[];
  outPersonalOrders: PersonalOrderRdo[];
  balance?: IBalance[];
  trainingsBalance: TrainingRdo[];
  subscribeStatus: boolean;
};

const initialState: UserSlice = {
  authStatus: AuthStatus.Unknown,
  userSliceStatus: SliceStatus.Idle,
  user: undefined,
  users: [],
  trainerFriends: [],
  clientFriends: [],
  notices: [],
  orders: [],
  inPersonalOrders: [],
  outPersonalOrders: [],
  balance: [],
  trainingsBalance: [],
  subscribeStatus: false,
};

export const userSlice = createSlice({
  name: NameSpace.UserSlice,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(registerUserAction.pending, (state) => {
        state.userSliceStatus = SliceStatus.Loading;
      })
      .addCase(registerUserAction.fulfilled, (state, action) => {
        state.authStatus = AuthStatus.Auth;
        state.user = action.payload?.userInfo;
        state.userSliceStatus = SliceStatus.Fulfilled;
      })
      .addCase(registerUserAction.rejected, (state) => {
        state.authStatus = AuthStatus.NoAuth;
        state.userSliceStatus = SliceStatus.Rejected;
      })
      .addCase(loginUserAction.pending, (state) => {
        state.authStatus = AuthStatus.NoAuth;
        state.userSliceStatus = SliceStatus.Loading;
      })
      .addCase(loginUserAction.fulfilled, (state, action) => {
        state.authStatus = AuthStatus.Auth;
        state.userSliceStatus = SliceStatus.Fulfilled;
        state.user = action.payload?.userInfo;
      })
      .addCase(loginUserAction.rejected, (state) => {
        state.authStatus = AuthStatus.NoAuth;
        state.userSliceStatus = SliceStatus.Rejected;
      })
      .addCase(refreshTokensAction.pending, (state) => {
        state.authStatus = AuthStatus.NoAuth;
        state.userSliceStatus = SliceStatus.Loading;
      })
      .addCase(refreshTokensAction.fulfilled, (state, action) => {
        state.authStatus = AuthStatus.Auth;
        state.userSliceStatus = SliceStatus.Fulfilled;
        state.user = action.payload.userInfo;
      })
      .addCase(refreshTokensAction.rejected, (state) => {
        state.authStatus = AuthStatus.NoAuth;
        state.userSliceStatus = SliceStatus.Rejected;
      })
      .addCase(checkUserAction.pending, (state) => {
        state.authStatus = AuthStatus.NoAuth;
        state.userSliceStatus = SliceStatus.Loading;
      })
      .addCase(checkUserAction.fulfilled, (state, action) => {
        state.authStatus = AuthStatus.Auth;
        state.user = action.payload?.userInfo;
      })
      .addCase(checkUserAction.rejected, (state) => {
        state.authStatus = AuthStatus.NoAuth;
        state.userSliceStatus = SliceStatus.Rejected;
      })
      .addCase(logoutAction.pending, (state) => {
        state.authStatus = AuthStatus.NoAuth;
        state.userSliceStatus = SliceStatus.Loading;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authStatus = AuthStatus.NoAuth;
        state.userSliceStatus = SliceStatus.Fulfilled;
        state.user = undefined;
      })
      .addCase(logoutAction.rejected, (state) => {
        state.authStatus = AuthStatus.NoAuth;
        state.userSliceStatus = SliceStatus.Rejected;
      })
      .addCase(updateUserAction.pending, (state) => {
        state.userSliceStatus = SliceStatus.Loading;
      })
      .addCase(updateUserAction.fulfilled, (state, action) => {
        state.userSliceStatus = SliceStatus.Fulfilled;
        state.user = action.payload;
      })
      .addCase(updateUserAction.rejected, (state) => {
        state.userSliceStatus = SliceStatus.Rejected;
        state.user = undefined;
      })
      .addCase(uploadAvatarAction.pending, (state) => {
        state.userSliceStatus = SliceStatus.Loading;
      })
      .addCase(uploadAvatarAction.fulfilled, (state, action) => {
        if (state.user) {
          state.user['avatar'] = action.payload?.path;
        }
        state.userSliceStatus = SliceStatus.Fulfilled;
      })
      .addCase(uploadAvatarAction.rejected, (state) => {
        state.userSliceStatus = SliceStatus.Rejected;
      })
      .addCase(uploadCertificateAction.pending, (state) => {
        state.userSliceStatus = SliceStatus.Loading;
      })
      .addCase(uploadCertificateAction.fulfilled, (state, action) => {
        if (state.user?.trainer?.certificate) {
          state.user.trainer.certificate.push(action.payload.path);
        }
        state.userSliceStatus = SliceStatus.Fulfilled;
      })
      .addCase(uploadCertificateAction.rejected, (state) => {
        state.userSliceStatus = SliceStatus.Rejected;
      })
      .addCase(fetchNotifyAction.pending, (state) => {
        state.userSliceStatus = SliceStatus.Loading;
      })
      .addCase(fetchNotifyAction.fulfilled, (state, action) => {
        state.userSliceStatus = SliceStatus.Fulfilled;
        state.notices = action.payload;
      })
      .addCase(fetchNotifyAction.rejected, (state) => {
        state.userSliceStatus = SliceStatus.Rejected;
      })
      .addCase(deleteCertificateAction.pending, (state) => {
        state.userSliceStatus = SliceStatus.Loading;
      })
      .addCase(deleteCertificateAction.fulfilled, (state, action) => {
        if (state.user?.trainer?.certificate) {
          state.user.trainer.certificate =
            state.user.trainer.certificate.filter(
              (certificat: string) => certificat !== action.payload,
            );
        }
        state.userSliceStatus = SliceStatus.Fulfilled;
      })
      .addCase(deleteCertificateAction.rejected, (state) => {
        state.userSliceStatus = SliceStatus.Rejected;
      })
      .addCase(deleteNotifyAction.pending, (state) => {
        state.userSliceStatus = SliceStatus.Loading;
      })
      .addCase(deleteNotifyAction.fulfilled, (state, action) => {
        state.notices = state.notices.filter(
          (nofity) => nofity.id !== action.payload,
        );
        state.userSliceStatus = SliceStatus.Fulfilled;
      })
      .addCase(deleteNotifyAction.rejected, (state) => {
        state.userSliceStatus = SliceStatus.Rejected;
      })
      .addCase(fetchTrainerFriendsAction.fulfilled, (state, action) => {
        state.userSliceStatus = SliceStatus.Fulfilled;
        state.trainerFriends = action.payload;
      })
      .addCase(fetchClientFriendsAction.fulfilled, (state, action) => {
        state.userSliceStatus = SliceStatus.Fulfilled;
        state.clientFriends = action.payload;
      })
      .addCase(fetchUsersCatalogAction.fulfilled, (state, action) => {
        state.userSliceStatus = SliceStatus.Fulfilled;
        state.users = action.payload;
      })
      .addCase(fetchUsersCatalogAction.rejected, (state) => {
        state.userSliceStatus = SliceStatus.Rejected;
        state.users = [];
      })
      .addCase(fetchOrdersAction.fulfilled, (state, action) => {
        state.userSliceStatus = SliceStatus.Fulfilled;
        state.orders = action.payload;
      })
      .addCase(fetchOrdersAction.rejected, (state) => {
        state.userSliceStatus = SliceStatus.Rejected;
        state.orders = [];
      })
      .addCase(fetchInPersonalOrdersAction.fulfilled, (state, action) => {
        state.userSliceStatus = SliceStatus.Fulfilled;
        state.inPersonalOrders = action.payload;
      })
      .addCase(fetchInPersonalOrdersAction.rejected, (state) => {
        state.userSliceStatus = SliceStatus.Rejected;
        state.inPersonalOrders = [];
      })
      .addCase(fetchOutPersonalOrdersAction.fulfilled, (state, action) => {
        state.userSliceStatus = SliceStatus.Fulfilled;
        state.outPersonalOrders = action.payload;
      })
      .addCase(fetchOutPersonalOrdersAction.rejected, (state) => {
        state.userSliceStatus = SliceStatus.Rejected;
        state.outPersonalOrders = [];
      })
      .addCase(fetchBalanceAction.fulfilled, (state, action) => {
        state.userSliceStatus = SliceStatus.Fulfilled;
        state.balance = action.payload;
      })
      .addCase(fetchBalanceAction.rejected, (state) => {
        state.userSliceStatus = SliceStatus.Rejected;
        state.balance = [];
      })
      .addCase(checkSubscribeAction.fulfilled, (state, action) => {
        state.userSliceStatus = SliceStatus.Fulfilled;
        state.subscribeStatus = action.payload;
      })
      .addCase(toggleSubscribeAction.fulfilled, (state, action) => {
        state.userSliceStatus = SliceStatus.Fulfilled;
        state.subscribeStatus = action.payload;
      })
      .addCase(fetchAddFriendAction.fulfilled, (state, action) => {
        state.userSliceStatus = SliceStatus.Fulfilled;
        state.clientFriends.push(action.payload);
      })
      .addCase(fetchRemoveFriendAction.fulfilled, (state, action) => {
        state.userSliceStatus = SliceStatus.Fulfilled;
        state.clientFriends = state.clientFriends.filter(
          (friend) => friend.userId !== action.payload.friendId,
        );
      })
      .addCase(toggleSubscribeAction.rejected, (state) => {
        state.userSliceStatus = SliceStatus.Rejected;
        state.subscribeStatus = false;
      })
      .addCase(buyPersonalTrainingAction.fulfilled, (state, action) => {
        state.userSliceStatus = SliceStatus.Fulfilled;
        state.outPersonalOrders?.push(action.payload);
      })
      .addCase(fetchTrainingsBalanceAction.pending, (state) => {
        state.userSliceStatus = SliceStatus.Loading;
      })
      .addCase(fetchTrainingsBalanceAction.fulfilled, (state, action) => {
        state.userSliceStatus = SliceStatus.Fulfilled;
        state.trainingsBalance = action.payload;
      })
      .addCase(fetchTrainingsBalanceAction.rejected, (state) => {
        state.userSliceStatus = SliceStatus.Rejected;
        state.trainingsBalance = [];
      });
  },
});
