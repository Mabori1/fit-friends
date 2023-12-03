import { createSlice } from '@reduxjs/toolkit';
import {
  IBalance,
  INotify,
  IOrder,
  IPersonalOrder,
  IUser,
} from '@fit-friends/types';
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
  fetchFriendsAction,
} from './apiUserActions';
import { UserRequestRdo } from '../../types/user-request.rdo';

type UserSlice = {
  authStatus: AuthStatus;
  sliceStatus: SliceStatus;
  user: IUser | undefined;
  friends: IUser[];
  notices: INotify[] | [];
  orders?: IOrder[];
  personalOrders?: IPersonalOrder[];
  balance?: IBalance[];
  incomingRequests: UserRequestRdo[];
  outgoingRequests: UserRequestRdo[];
};

const initialState: UserSlice = {
  authStatus: AuthStatus.Unknown,
  sliceStatus: SliceStatus.Idle,
  user: undefined,
  friends: [],
  notices: [],
  orders: [],
  personalOrders: [],
  balance: [],
  incomingRequests: [],
  outgoingRequests: [],
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
              (certificat) => certificat !== action.payload,
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
      .addCase(fetchFriendsAction.fulfilled, (state, action) => {
        state.friends = action.payload;
      });
  },
});
