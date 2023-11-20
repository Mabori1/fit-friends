import { createSlice } from '@reduxjs/toolkit';
import { UserRole } from '@fit-friends/types';
import { AuthStatus, NameSpace } from '../../const';
import {
  registerUserAction,
  loginUserAction,
  refreshTokensAction,
} from '../authSlice/apiAuthActions';

type AuthSlice = {
  authStatus: AuthStatus;
  userRole?: UserRole;
};

const initialState: AuthSlice = {
  authStatus: AuthStatus.Unknown,
  userRole: UserRole.Client,
};

export const authSlice = createSlice({
  name: NameSpace.AuthSlice,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(registerUserAction.fulfilled, (state, action) => {
        state.authStatus = AuthStatus.Auth;
        state.userRole = action.payload.userInfo.role;
      })
      .addCase(registerUserAction.rejected, (state) => {
        state.authStatus = AuthStatus.NoAuth;
      })
      .addCase(loginUserAction.fulfilled, (state, action) => {
        state.authStatus = AuthStatus.Auth;
        state.userRole = action.payload?.userInfo.role;
      })
      .addCase(loginUserAction.rejected, (state) => {
        state.authStatus = AuthStatus.NoAuth;
      })
      .addCase(refreshTokensAction.fulfilled, (state, action) => {
        state.authStatus = AuthStatus.Auth;
        state.userRole = action.payload.userInfo.role;
      })
      .addCase(refreshTokensAction.rejected, (state) => {
        state.authStatus = AuthStatus.NoAuth;
      });
  },
});
