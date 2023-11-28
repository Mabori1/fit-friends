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
import { UploadedFileRdo } from '../../types/uploadedFilesRdo';
import { INotify } from '@fit-friends/types';
import { useAppDispatch } from '../store';

export const registerUserAction = createAsyncThunk<
  UserResponse | undefined,
  CreateUserDto,
  AsyncThunkConfig
>('user/register', async (createUserDto, { extra: api }) => {
  const { data } = await api.post<UserResponse>(
    APIRoute.Register,
    createUserDto,
  );
  try {
    saveTokens(data.access_token, data.refresh_token);
    toast.success('Вы успешно зарегистрировались!');
    return data;
  } catch (err) {
    let message = 'Неизвестная ошибка user/register';
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
>('user/login', async (loginUserDto, { extra: api }) => {
  try {
    const { data } = await api.post<UserResponse>(APIRoute.Login, loginUserDto);
    saveTokens(data.access_token, data.refresh_token);
    toast.success('Вы успешно вошли!');
    return data;
  } catch (err) {
    let message = 'Неизвестная ошибка user/login';

    if (isAxiosError(err)) {
      message = err.response?.data.message;
    }
    toast.error(message);
  }
});

export const logoutAction = createAsyncThunk<void, undefined, AsyncThunkConfig>(
  'user/logout',
  async (_, { extra: api }) => {
    try {
      await api.post<void>(APIRoute.Logout);
      toast.success('Вы успешно вышли!');
      dropTokens();
    } catch (err) {
      let message = 'Неизвестная ошибка user/logout';

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
>('user/refresh', async (_arg, { extra: api }) => {
  const { data } = await api.post<UserResponse>(APIRoute.Refresh);
  saveTokens(data.access_token, data.refresh_token);
  return data;
});

export const checkUserAction = createAsyncThunk<
  UserResponse,
  undefined,
  AsyncThunkConfig
>('user/check', async (_arg, { extra: api }) => {
  const { data } = await api.post<UserResponse>(APIRoute.Check);
  saveTokens(data.access_token, data.refresh_token);
  return data;
});

export const updateUserAction = createAsyncThunk<
  UserResponse | undefined,
  UpdateUserDto,
  AsyncThunkConfig
>('user/update', async (updateUserDto, { extra: api }) => {
  const { data } = await api.patch<UserResponse>(
    APIRoute.UpdateUser,
    updateUserDto,
  );
  try {
    toast.success('Вы успешно изменили профиль!');
    return data;
  } catch (err) {
    let message = 'Неизвестная ошибка user/update';
    if (isAxiosError(err)) {
      message = err.response?.data.message;
    }
    toast.error(message);
  }
});

export const uploadAvatarAction = createAsyncThunk<
  UploadedFileRdo,
  FormData,
  AsyncThunkConfig
>('user/uploadAvatar', async (avatar, { extra: api }) => {
  const { data } = await api.post<UploadedFileRdo>(APIRoute.Avatar, avatar);

  const dispatch = useAppDispatch();
  dispatch(updateUserAction({ avatar: data.path }));

  return data;
});

export const uploadCertificateAction = createAsyncThunk<
  UploadedFileRdo,
  FormData,
  AsyncThunkConfig
>('user/uploadCertificate', async (certificat, { extra: api }) => {
  const { data } = await api.post<UploadedFileRdo>(
    APIRoute.Certificate,
    certificat,
  );
  return data;
});

export const deleteCertificateAction = createAsyncThunk<
  undefined,
  string,
  AsyncThunkConfig
>('user/deleteCertificate', async (certificateUrl, { extra: api }) => {
  const { data } = await api.delete<undefined>(
    `${APIRoute.DeleteCertificate}/?certificateUrl=${certificateUrl}`,
  );
  return data;
});

export const fetchNotifyAction = createAsyncThunk<
  INotify[],
  undefined,
  AsyncThunkConfig
>('user/getNotify', async (_arg, { extra: api }) => {
  const { data } = await api.get<INotify[]>(APIRoute.Notify);
  return data;
});

export const deleteNotifyAction = createAsyncThunk<
  undefined,
  number,
  AsyncThunkConfig
>('user/deleteNotify', async (id, { extra: api }) => {
  const { data } = await api.delete(`${APIRoute.Notify}/${id}`);
  return data;
});
