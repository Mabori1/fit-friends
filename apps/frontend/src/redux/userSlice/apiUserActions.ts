import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserResponse } from '../../types/userResponse';
import { APIRoute } from '../../constants';
import { CreateUserDto } from '../../types/create-user.dto';
import { dropTokens, saveTokens } from '../../services/tokens';
import { LoginUserDto } from '../../types/login-user.dto';
import { AsyncThunkConfig } from '../../types/async-thunk-config';
import { isAxiosError } from 'axios';
import { toast } from 'react-toastify';
import { UpdateUserDto } from '../../types/update-user.dto';
import { UploadedFileRdo } from '../../types/uploaded-files.rdo';
import { IBalance, INotify } from '@fit-friends/types';
import { UserRdo } from '../../types/user.rdo';
import { createQueryString } from '../../helper/utils';
import { UserQuery } from '../../types/user.query';
import { OrderQuery } from '../../types/order.query';
import { OrderRdo } from '../../types/order.rdo';
import { OrderDto } from '../../types/order.dto';
import { PersonalOrderRdo } from '../../types/personal-order.rdo';
import { PersonalOrderStatusQuery } from '../../types/personal-order-status-query';

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
  UserRdo,
  UpdateUserDto,
  AsyncThunkConfig
>('user/update', async (updateUserDto, { extra: api }) => {
  const { data } = await api.patch<UserRdo>(APIRoute.UpdateUser, updateUserDto);
  return data;
});

export const uploadAvatarAction = createAsyncThunk<
  UploadedFileRdo,
  FormData,
  AsyncThunkConfig
>('user/uploadAvatar', async (avatar, { extra: api }) => {
  const { data } = await api.post<UploadedFileRdo>(
    APIRoute.UploadAvatar,
    avatar,
  );

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
  string,
  string,
  AsyncThunkConfig
>('user/deleteCertificate', async (certificateUrl, { extra: api }) => {
  await api.delete<string>(
    `${APIRoute.DeleteCertificate}/?certificateUrl=${certificateUrl}`,
  );
  return certificateUrl;
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

export const fetchTrainerFriendsAction = createAsyncThunk<
  UserRdo[],
  undefined,
  AsyncThunkConfig
>('user/fetchTrainerFriends', async (_arg, { extra: api }) => {
  const { data } = await api.get<UserRdo[]>(APIRoute.TrainerFriends);
  return data;
});

export const fetchClientFriendsAction = createAsyncThunk<
  UserRdo[],
  undefined,
  AsyncThunkConfig
>('user/fetchClientFriends', async (_arg, { extra: api }) => {
  const { data } = await api.get<UserRdo[]>(APIRoute.ClientFriends);
  return data;
});

// export const fetchOutPersonalOrderAction = createAsyncThunk<
//   PersonalOrderRdo[],
//   undefined,
//   AsyncThunkConfig
// >('user/fetchOutPersonalOrder', async (_arg, { extra: api }) => {
//   const { data } = await api.post<PersonalOrderRdo[]>(APIRoute.Check);
//   return data;
// });

export const addPersonalOrderAction = createAsyncThunk<
  PersonalOrderRdo,
  number,
  AsyncThunkConfig
>('user/addPersonalOrderAction', async (targetId, { extra: api }) => {
  const { data } = await api.post<PersonalOrderRdo>(
    `${APIRoute.PersonalOrder}/${targetId}`,
  );
  return data;
});

export const changePersonalOrderStatusAction = createAsyncThunk<
  PersonalOrderRdo,
  PersonalOrderStatusQuery,
  AsyncThunkConfig
>('user/changePersonalOrderStatusAction', async (query, { extra: api }) => {
  const { data } = await api.patch<PersonalOrderRdo>(
    `${APIRoute.PersonalOrder}${createQueryString(query)}`,
  );
  return data;
});

export const fetchUsersCatalogAction = createAsyncThunk<
  UserRdo[],
  UserQuery,
  AsyncThunkConfig
>('user/fetchUsersCatalogAction', async (query, { extra: api }) => {
  const queryString = createQueryString(query);
  const { data } = await api.get<UserRdo[]>(
    `${APIRoute.UsersQuery}${queryString}`,
  );
  return data;
});

export const fetchAddFriendAction = createAsyncThunk<
  UserRdo,
  number,
  AsyncThunkConfig
>('user/fetchAddFriendAction', async (friendId, { extra: api }) => {
  const { data } = await api.post<UserRdo>(
    `${APIRoute.AddRemoveFriend}/${friendId}`,
  );
  return data;
});

type RemoveFriendId = {
  friendId: number;
};

export const fetchRemoveFriendAction = createAsyncThunk<
  RemoveFriendId,
  number,
  AsyncThunkConfig
>('user/fetchRemoveFriendAction', async (friendId, { extra: api }) => {
  await api.delete<undefined>(`${APIRoute.AddRemoveFriend}/${friendId}`);
  return { friendId };
});

export const fetchOrdersAction = createAsyncThunk<
  OrderRdo[],
  OrderQuery,
  AsyncThunkConfig
>('user/fetchOrdersAction', async (query, { extra: api }) => {
  const { data } = await api.get<OrderRdo[]>(
    `${APIRoute.TrainerOrders}${createQueryString(query)}`,
  );
  return data;
});

export const fetchInPersonalOrdersAction = createAsyncThunk<
  PersonalOrderRdo[],
  number,
  AsyncThunkConfig
>('user/fetchInPersonalOrdersAction', async (userId, { extra: api }) => {
  const { data } = await api.get<PersonalOrderRdo[]>(
    `${APIRoute.InPersonalOrder}/${userId}`,
  );
  return data;
});

export const fetchOutPersonalOrdersAction = createAsyncThunk<
  PersonalOrderRdo[],
  undefined,
  AsyncThunkConfig
>('user/fetchOutPersonalOrdersAction', async ({ extra: api }) => {
  const { data } = await api.get<PersonalOrderRdo[]>(APIRoute.OutPersonalOrder);
  return data;
});

export const fetchBalanceAction = createAsyncThunk<
  IBalance[],
  undefined,
  AsyncThunkConfig
>('user/fetchBalanceAction', async (_args, { extra: api }) => {
  const { data } = await api.get<IBalance[]>(APIRoute.ClientBalance);
  return data;
});

export const spendTrainingAction = createAsyncThunk<
  void,
  number,
  AsyncThunkConfig
>('user/spendTraining', async (trainingId, { extra: api }) => {
  await api.delete(`${APIRoute.SpendTraining}/${trainingId}`);
});

export const buyTrainingAction = createAsyncThunk<
  OrderRdo,
  OrderDto,
  AsyncThunkConfig
>('user/buyTrainingAction', async (createOrderDto, { extra: api }) => {
  const { data } = await api.post<OrderRdo>(APIRoute.BuyOrder, createOrderDto);
  return data;
});

export const buyPersonalTrainingAction = createAsyncThunk<
  PersonalOrderRdo,
  number,
  AsyncThunkConfig
>('user/buyPersonalTrainingAction', async (trainerId, { extra: api }) => {
  const { data } = await api.post<PersonalOrderRdo>(
    `${APIRoute.BuyPersonalOrder}/${trainerId}`,
  );
  return data;
});

export const checkSubscribeAction = createAsyncThunk<
  boolean,
  number,
  AsyncThunkConfig
>('user/checkSubscribeAction', async (trainerId, { extra: api }) => {
  const { data } = await api.get<boolean>(
    `${APIRoute.CheckSubscribe}/${trainerId}`,
  );
  return data;
});

export const toggleSubscribeAction = createAsyncThunk<
  boolean,
  number,
  AsyncThunkConfig
>('user/toggleSubscribeAction', async (trainerId, { extra: api }) => {
  const { data } = await api.post<boolean>(
    `${APIRoute.ToggleSubscribe}/${trainerId}`,
  );
  return data;
});
