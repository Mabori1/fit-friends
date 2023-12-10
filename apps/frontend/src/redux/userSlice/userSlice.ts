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
} from './apiUserActions';
import { UserRdo } from '../../types/user.rdo';
import { OrderRdo } from '../../types/order.rdo';
import { PersonalOrderRdo } from '../../types/personal-order.rdo';

type UserSlice = {
  authStatus: AuthStatus;
  sliceStatus: SliceStatus;
  user: UserRdo | undefined;
  users: UserRdo[];
  trainerFriends: UserRdo[];
  clientFriends: UserRdo[];
  notices: INotify[] | [];
  orders?: OrderRdo[];
  inPersonalOrders?: PersonalOrderRdo[];
  outPersonalOrders?: PersonalOrderRdo[];
  balance?: IBalance[];
  subscribeStatus: boolean;
};

const initialState: UserSlice = {
  authStatus: AuthStatus.Unknown,
  sliceStatus: SliceStatus.Idle,
  user: undefined,
  users: [],
  trainerFriends: [],
  clientFriends: [],
  notices: [],
  orders: [],
  inPersonalOrders: [],
  outPersonalOrders: [],
  balance: [],
  subscribeStatus: false,
};

export const userSlice = createSlice({
  name: NameSpace.UserSlice,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(registerUserAction.pending, (state) => {
        state.sliceStatus = SliceStatus.Loading;
      })
      .addCase(registerUserAction.fulfilled, (state, action) => {
        state.authStatus = AuthStatus.Auth;
        state.user = action.payload?.userInfo;
        state.sliceStatus = SliceStatus.Fulfilled;
      })
      .addCase(registerUserAction.rejected, (state) => {
        state.authStatus = AuthStatus.NoAuth;
        state.sliceStatus = SliceStatus.Rejected;
      })
      .addCase(loginUserAction.pending, (state) => {
        state.authStatus = AuthStatus.NoAuth;
        state.sliceStatus = SliceStatus.Loading;
      })
      .addCase(loginUserAction.fulfilled, (state, action) => {
        state.authStatus = AuthStatus.Auth;
        state.sliceStatus = SliceStatus.Fulfilled;
        state.user = action.payload?.userInfo;
      })
      .addCase(loginUserAction.rejected, (state) => {
        state.authStatus = AuthStatus.NoAuth;
        state.sliceStatus = SliceStatus.Rejected;
      })
      .addCase(refreshTokensAction.pending, (state) => {
        state.authStatus = AuthStatus.NoAuth;
        state.sliceStatus = SliceStatus.Loading;
      })
      .addCase(refreshTokensAction.fulfilled, (state, action) => {
        state.authStatus = AuthStatus.Auth;
        state.sliceStatus = SliceStatus.Fulfilled;
        state.user = action.payload.userInfo;
      })
      .addCase(refreshTokensAction.rejected, (state) => {
        state.authStatus = AuthStatus.NoAuth;
        state.sliceStatus = SliceStatus.Rejected;
      })
      .addCase(checkUserAction.pending, (state) => {
        state.authStatus = AuthStatus.NoAuth;
        state.sliceStatus = SliceStatus.Loading;
      })
      .addCase(checkUserAction.fulfilled, (state, action) => {
        state.authStatus = AuthStatus.Auth;
        state.user = action.payload?.userInfo;
      })
      .addCase(checkUserAction.rejected, (state) => {
        state.authStatus = AuthStatus.NoAuth;
        state.sliceStatus = SliceStatus.Rejected;
      })
      .addCase(logoutAction.pending, (state) => {
        state.authStatus = AuthStatus.NoAuth;
        state.sliceStatus = SliceStatus.Loading;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authStatus = AuthStatus.NoAuth;
        state.sliceStatus = SliceStatus.Fulfilled;
        state.user = undefined;
      })
      .addCase(logoutAction.rejected, (state) => {
        state.authStatus = AuthStatus.NoAuth;
        state.sliceStatus = SliceStatus.Rejected;
      })
      .addCase(updateUserAction.pending, (state) => {
        state.sliceStatus = SliceStatus.Loading;
      })
      .addCase(updateUserAction.fulfilled, (state, action) => {
        state.user = action.payload?.userInfo;
      })
      .addCase(updateUserAction.rejected, (state) => {
        state.sliceStatus = SliceStatus.Rejected;
      })
      .addCase(uploadAvatarAction.pending, (state) => {
        state.sliceStatus = SliceStatus.Loading;
      })
      .addCase(uploadAvatarAction.fulfilled, (state, action) => {
        if (state.user) {
          state.user['avatar'] = action.payload?.path;
        }
        state.sliceStatus = SliceStatus.Fulfilled;
      })
      .addCase(uploadAvatarAction.rejected, (state) => {
        state.sliceStatus = SliceStatus.Rejected;
      })
      .addCase(uploadCertificateAction.pending, (state) => {
        state.sliceStatus = SliceStatus.Loading;
      })
      .addCase(uploadCertificateAction.fulfilled, (state, action) => {
        if (state.user?.trainer?.certificate) {
          state.user.trainer.certificate.push(action.payload.path);
        }
        state.sliceStatus = SliceStatus.Fulfilled;
      })
      .addCase(uploadCertificateAction.rejected, (state) => {
        state.sliceStatus = SliceStatus.Rejected;
      })
      .addCase(fetchNotifyAction.pending, (state) => {
        state.sliceStatus = SliceStatus.Loading;
      })
      .addCase(fetchNotifyAction.fulfilled, (state, action) => {
        state.notices = action.payload;
      })
      .addCase(fetchNotifyAction.rejected, (state) => {
        state.sliceStatus = SliceStatus.Rejected;
      })
      .addCase(deleteCertificateAction.pending, (state) => {
        state.sliceStatus = SliceStatus.Loading;
      })
      .addCase(deleteCertificateAction.fulfilled, (state, action) => {
        if (state.user?.trainer?.certificate) {
          state.user.trainer.certificate =
            state.user.trainer.certificate.filter(
              (certificat: string) => certificat !== action.payload,
            );
        }
        state.sliceStatus = SliceStatus.Fulfilled;
      })
      .addCase(deleteCertificateAction.rejected, (state) => {
        state.sliceStatus = SliceStatus.Rejected;
      })
      .addCase(deleteNotifyAction.pending, (state) => {
        state.sliceStatus = SliceStatus.Loading;
      })
      .addCase(deleteNotifyAction.fulfilled, (state, action) => {
        state.notices = state.notices.filter(
          (nofity) => nofity.id !== action.payload,
        );
        state.sliceStatus = SliceStatus.Fulfilled;
      })
      .addCase(deleteNotifyAction.rejected, (state) => {
        state.sliceStatus = SliceStatus.Rejected;
      })
      .addCase(fetchTrainerFriendsAction.fulfilled, (state, action) => {
        state.trainerFriends = action.payload;
      })
      .addCase(fetchClientFriendsAction.fulfilled, (state, action) => {
        state.clientFriends = action.payload;
      })
      .addCase(fetchUsersCatalogAction.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(fetchUsersCatalogAction.rejected, (state) => {
        state.users = [];
      })
      .addCase(fetchOrdersAction.fulfilled, (state, action) => {
        state.orders = action.payload;
      })
      .addCase(fetchOrdersAction.rejected, (state) => {
        state.orders = [];
      })
      .addCase(fetchInPersonalOrdersAction.fulfilled, (state, action) => {
        state.inPersonalOrders = action.payload;
      })
      .addCase(fetchInPersonalOrdersAction.rejected, (state) => {
        state.inPersonalOrders = [];
      })
      .addCase(fetchOutPersonalOrdersAction.fulfilled, (state, action) => {
        state.outPersonalOrders = action.payload;
      })
      .addCase(fetchOutPersonalOrdersAction.rejected, (state) => {
        state.outPersonalOrders = [];
      })
      .addCase(fetchBalanceAction.fulfilled, (state, action) => {
        state.balance = action.payload;
      })
      .addCase(fetchBalanceAction.rejected, (state) => {
        state.balance = [];
      })
      .addCase(checkSubscribeAction.fulfilled, (state, action) => {
        state.subscribeStatus = action.payload;
      })
      .addCase(toggleSubscribeAction.fulfilled, (state, action) => {
        state.subscribeStatus = action.payload;
      })
      .addCase(fetchAddFriendAction.fulfilled, (state, action) => {
        state.clientFriends.push(action.payload);
      })
      .addCase(fetchRemoveFriendAction.fulfilled, (state, action) => {
        state.clientFriends = state.clientFriends.filter(
          (friend) => friend.userId !== action.payload.friendId,
        );
      })
      .addCase(toggleSubscribeAction.rejected, (state) => {
        state.subscribeStatus = false;
      })
      .addCase(buyPersonalTrainingAction.fulfilled, (state, action) => {
        state.inPersonalOrders?.push(action.payload);
      });
  },
});
