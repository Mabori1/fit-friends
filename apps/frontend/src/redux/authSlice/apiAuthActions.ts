import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserResponse } from '../../types/userResponse';
import { APIRoute } from '../../const';
import { CreateUserDto } from '../../types/createUserDto';
import { saveTokens } from '../../services/tokens';
import { LoginUserDto } from '../../types/loginUserDto';
import { AsyncThunkConfig } from '../../types/asyncThunkConfig';
import { isAxiosError } from 'axios';
import { toast } from 'react-toastify';

export const registerUserAction = createAsyncThunk<
  UserResponse | undefined,
  CreateUserDto,
  AsyncThunkConfig
>('auth/register', async (createUserDto, { extra: api }) => {
  const { data } = await api.post<UserResponse>(
    APIRoute.Register,
    createUserDto,
  );
  try {
    saveTokens(data.access_token, data.refresh_token);
    return data;
  } catch (err) {
    let message = 'Неизвестная ошибка auth/register';
    if (isAxiosError(err)) {
      message = err.response?.data.message;
    }
    toast.error(message);
  }
});

export const loginUserAction = createAsyncThunk<
  UserResponse | undefined,
  LoginUserDto,
  AsyncThunkConfig
>('auth/login', async (loginUserDto, { extra: api }) => {
  try {
    const { data } = await api.post<UserResponse>(APIRoute.Login, loginUserDto);
    saveTokens(data.access_token, data.refresh_token);
    return data;
  } catch (err) {
    let message = 'Неизвестная ошибка auth/login';

    if (isAxiosError(err)) {
      message = err.response?.data.message;
    }
    toast.error(message);
  }
});

export const refreshTokensAction = createAsyncThunk<
  UserResponse,
  undefined,
  AsyncThunkConfig
>('auth/refresh', async (_arg, { extra: api }) => {
  const { data } = await api.get<UserResponse>(APIRoute.Refresh);
  saveTokens(data.access_token, data.refresh_token);
  return data;
});
