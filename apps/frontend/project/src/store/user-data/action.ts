import { ICreateUser, IUser } from '../../types/user';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { AppDispatch, State } from '../../types/state';
import { AppRoute } from '../../common/const';

export const createUser = createAsyncThunk<
  IUser,
  ICreateUser,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/register', async (user, { extra: api }) => {
  const { data } = await api.post<IUser>(AppRoute.SignUp, user);
  return data;
});
