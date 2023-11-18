import { createSlice } from '@reduxjs/toolkit';
import { UserRole } from '@fit-friends/types';
import { AuthStatus, ReducerNameSpace } from '../../const';
import {
  registerUserAction,
  loginUserAction,
  refreshTokensAction,
} from '../authSlice/apiAuthActions';

type AuthSlice = {
  authStatus: AuthStatus;
  userRole: UserRole;
};

const initialState: AuthSlice = {
  authStatus: AuthStatus.Unknown,
  userRole: UserRole.Client,
};

export const authSlice = createSlice({
  name: ReducerNameSpace.AuthSlice,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(registerUserAction.fulfilled, (state, action) => {
        state.authStatus = AuthStatus.Auth;
        state.userRole = action.payload.user.userRole;
      })
      .addCase(registerUserAction.rejected, (state) => {
        state.authStatus = AuthStatus.NoAuth;
      })
      .addCase(loginUserAction.fulfilled, (state, action) => {
        state.authStatus = AuthStatus.Auth;
        state.userRole = action.payload.user.userRole;
      })
      .addCase(loginUserAction.rejected, (state) => {
        state.authStatus = AuthStatus.NoAuth;
      })
      .addCase(refreshTokensAction.fulfilled, (state, action) => {
        state.authStatus = AuthStatus.Auth;
        state.userRole = action.payload.user.userRole;
      })
      .addCase(refreshTokensAction.rejected, (state) => {
        state.authStatus = AuthStatus.NoAuth;
      });
  },
});
