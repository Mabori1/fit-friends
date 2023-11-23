import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserResponse } from '../../types/userResponse';
import { APIRoute } from '../../const';
import { CreateUserDto } from '../../types/createUserDto';
import { dropTokens, saveTokens } from '../../services/tokens';
import { LoginUserDto } from '../../types/loginUserDto';
import { AsyncThunkConfig } from '../../types/asyncThunkConfig';
import { isAxiosError } from 'axios';
import { toast } from 'react-toastify';
import { UpdateUserDto } from '../../types/updateUserDto';

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
    toast.success('Вы успешно зарегистрировались!');
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
    toast.success('Вы успешно вошли!');
    return data;
  } catch (err) {
    let message = 'Неизвестная ошибка auth/login';

    if (isAxiosError(err)) {
      message = err.response?.data.message;
    }
    toast.error(message);
  }
});

export const logoutAction = createAsyncThunk<void, undefined, AsyncThunkConfig>(
  'auth/logout',
  async (loginUserDto, { extra: api }) => {
    try {
      await api.post<void>(APIRoute.Logout);
      toast.success('Вы успешно вышли!');
      dropTokens();
    } catch (err) {
      let message = 'Неизвестная ошибка auth/logout';

      if (isAxiosError(err)) {
        message = err.response?.data.message;
      }
      toast.error(message);
    }
  },
);

export const refreshTokensAction = createAsyncThunk<
  UserResponse,
  undefined,
  AsyncThunkConfig
>('auth/refresh', async (_arg, { extra: api }) => {
  const { data } = await api.post<UserResponse>(APIRoute.Refresh);
  saveTokens(data.access_token, data.refresh_token);
  return data;
});

export const checkUserAction = createAsyncThunk<
  UserResponse,
  undefined,
  AsyncThunkConfig
>('auth/check', async (_arg, { extra: api }) => {
  const { data } = await api.post<UserResponse>(APIRoute.Check);
  saveTokens(data.access_token, data.refresh_token);
  return data;
});

export const updateUserAction = createAsyncThunk<
  UserResponse | undefined,
  UpdateUserDto,
  AsyncThunkConfig
>('auth/update', async (updateUserDto, { extra: api }) => {
  const { data } = await api.patch<UserResponse>(
    APIRoute.UpdateUser,
    updateUserDto,
  );
  try {
    saveTokens(data.access_token, data.refresh_token);
    toast.success('Вы успешно изменили профиль!');
    return data;
  } catch (err) {
    let message = 'Неизвестная ошибка auth/update';
    if (isAxiosError(err)) {
      message = err.response?.data.message;
    }
    toast.error(message);
  }
});
