import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../store';
import { AxiosInstance } from 'axios';
import { UserResponse } from '../../types/userResponse';
import { APIRoute, BASE_URL } from '../../const';
import { CreateUserDto } from '../../types/createUserDto';
import { saveTokens } from '../../services/tokens';
import { LoginUserDto } from '../../types/loginUserDto';

export const registerUserAction = createAsyncThunk<
  UserResponse,
  CreateUserDto,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance[];
  }
>('auth/register', async (registerUserRequestBody, { extra: api }) => {
  const { data } = await api[0].post<UserResponse>(
    `${BASE_URL}${APIRoute.Register}`,
    registerUserRequestBody,
  );
  saveTokens(data.tokens.access_token, data.tokens.refresh_token);
  return data;
});

export const loginUserAction = createAsyncThunk<
  UserResponse,
  LoginUserDto,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance[];
  }
>('auth/login', async (signInUserRequestBody, { extra: api }) => {
  const { data } = await api[0].post<UserResponse>(
    `${BASE_URL}${APIRoute.Login}`,
    signInUserRequestBody,
  );
  saveTokens(data.tokens.access_token, data.tokens.refresh_token);
  return data;
});

export const refreshTokensAction = createAsyncThunk<
  UserResponse,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance[];
  }
>('auth/refresh', async (_arg, { extra: api }) => {
  const { data } = await api[1].get<UserResponse>(
    `${BASE_URL}${APIRoute.Refresh}`,
  );
  saveTokens(data.tokens.access_token, data.tokens.refresh_token);
  return data;
});
