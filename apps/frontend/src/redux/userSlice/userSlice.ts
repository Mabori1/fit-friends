import { createSlice } from '@reduxjs/toolkit';
import { INotify, IUser } from '@fit-friends/types';
import { AuthStatus, NameSpace } from '../../const';
import {
  registerUserAction,
  loginUserAction,
  refreshTokensAction,
  checkUserAction,
  logoutAction,
  updateUserAction,
  uploadAvatarAction,
  fetchNotifyAction,
  deleteNotifyAction,
} from './apiUserActions';

type UserSlice = {
  authStatus: AuthStatus;
  user: IUser | undefined;
  notices: INotify[] | [];
};

const initialState: UserSlice = {
  authStatus: AuthStatus.Unknown,
  user: undefined,
  notices: [],
};

export const userSlice = createSlice({
  name: NameSpace.UserSlice,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(registerUserAction.fulfilled, (state, action) => {
        state.authStatus = AuthStatus.Auth;
        state.user = action.payload?.userInfo;
      })
      .addCase(registerUserAction.rejected, (state) => {
        state.authStatus = AuthStatus.NoAuth;
      })
      .addCase(loginUserAction.fulfilled, (state, action) => {
        state.authStatus = AuthStatus.Auth;
        state.user = action.payload?.userInfo;
      })
      .addCase(loginUserAction.rejected, (state) => {
        state.authStatus = AuthStatus.NoAuth;
      })
      .addCase(refreshTokensAction.fulfilled, (state, action) => {
        state.authStatus = AuthStatus.Auth;
        state.user = action.payload.userInfo;
      })
      .addCase(refreshTokensAction.rejected, (state) => {
        state.authStatus = AuthStatus.NoAuth;
      })
      .addCase(checkUserAction.fulfilled, (state, action) => {
        state.authStatus = AuthStatus.Auth;
        state.user = action.payload?.userInfo;
      })
      .addCase(checkUserAction.rejected, (state) => {
        state.authStatus = AuthStatus.NoAuth;
      })
      .addCase(logoutAction.rejected, (state) => {
        state.authStatus = AuthStatus.NoAuth;
        state.user = undefined;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authStatus = AuthStatus.NoAuth;
        state.user = undefined;
      })
      .addCase(updateUserAction.fulfilled, (state, action) => {
        state.user = action.payload?.userInfo;
      })
      .addCase(uploadAvatarAction.fulfilled, (state, action) => {
        state.user = action.payload?.userInfo.avatar;
      })
      .addCase(fetchNotifyAction.fulfilled, (state, action) => {
        state.notices = action.payload;
      })
      .addCase(deleteNotifyAction.fulfilled, (state, action) => {
        state.notices = state.notices.filter(
          (nofity) => nofity.id !== action.payload,
        );
      });
  },
});
