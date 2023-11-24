import { createSlice } from '@reduxjs/toolkit';
import { IUser } from '@fit-friends/types';
import { AuthStatus, NameSpace } from '../../const';
import {
  registerUserAction,
  loginUserAction,
  refreshTokensAction,
  checkUserAction,
  logoutAction,
  updateUserAction,
} from '../authSlice/apiAuthActions';

type AuthSlice = {
  authStatus: AuthStatus;
  user: IUser | undefined;
};

const initialState: AuthSlice = {
  authStatus: AuthStatus.Unknown,
  user: undefined,
};

export const authSlice = createSlice({
  name: NameSpace.AuthSlice,
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
      });
  },
});