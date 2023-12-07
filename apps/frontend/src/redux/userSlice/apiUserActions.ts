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
import { IBalance, IFriend, INotify, OrderStatus } from '@fit-friends/types';
import { UserRdo } from '../../types/user.rdo';
import { UserRequestRdo } from '../../types/user-request.rdo';
import { UserRequestType } from '../../types/user-request-type.enum';
import { createQueryString } from '../../helper/utils';
import { UserQuery } from '../../types/user.query';
import { OrderQuery } from '../../types/order.query';
import { OrderRdo } from '../../types/order.rdo';
import { OrderDto } from '../../types/order.dto';
import { PersonalOrderRdo } from '../../types/personal-order.rdo';

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
  const { data } = await api.get<UserRdo[]>(APIRoute.TrainerFriends);
  return data;
});

export const fetchInPersonalOrderAction = createAsyncThunk<
  PersonalOrderRdo[],
  undefined,
  AsyncThunkConfig
>('user/fetchInPersonalOrder', async (_arg, { extra: api }) => {
  const { data } = await api.get<PersonalOrderRdo[]>(
    APIRoute.InPersonalTraining,
  );
  return data;
});

export const fetchOutPersonalOrderAction = createAsyncThunk<
  PersonalOrderRdo[],
  undefined,
  AsyncThunkConfig
>('user/fetchOutPersonalOrder', async (_arg, { extra: api }) => {
  const { data } = await api.get<PersonalOrderRdo[]>(APIRoute.Check);
  return data;
});

type TrainingRequestDto = {
  type: UserRequestType.Training;
  userId?: number;
};

export const sendTrainingRequestAction = createAsyncThunk<
  UserRequestRdo,
  TrainingRequestDto,
  AsyncThunkConfig
>('sendTrainingRequestAction', async (trainingRequest, { extra: api }) => {
  const { data } = await api.post<UserRequestRdo>(
    `${APIRoute.InPersonalTraining}`,
    trainingRequest,
  );
  return data;
});

type ChangeRequestStatusDto = {
  trainingRequestStatus: OrderStatus;
  requestId: number;
};

export const changePersonalOrderStatusAction = createAsyncThunk<
  UserRequestRdo,
  ChangeRequestStatusDto,
  AsyncThunkConfig
>(
  'user/changePersonalOrderStatusAction',
  async (changeRequestStatusDto, { extra: api }) => {
    const requestId = changeRequestStatusDto.requestId;
    const updateUserRequestDto = {
      status: changeRequestStatusDto.trainingRequestStatus,
    };
    const { data } = await api.patch<UserRequestRdo>(
      `${APIRoute.ChangePersonalTraining}/${requestId}`,
      updateUserRequestDto,
    );
    return data;
  },
);

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
  IFriend,
  number,
  AsyncThunkConfig
>('user/fetchAddFriendAction', async (friendId, { extra: api }) => {
  const { data } = await api.post<IFriend>(`${APIRoute.Users}${friendId}`);
  return data;
});

export const fetchRemoveFriendAction = createAsyncThunk<
  undefined,
  number,
  AsyncThunkConfig
>('user/fetchRemoveFriendAction', async (friendId, { extra: api }) => {
  const { data } = await api.delete<undefined>(`${APIRoute.Users}${friendId}`);
  return data;
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

export const fetchPersonalOrdersAction = createAsyncThunk<
  PersonalOrderRdo[],
  OrderQuery,
  AsyncThunkConfig
>('user/fetchPersonalOrdersAction', async (query, { extra: api }) => {
  const { data } = await api.get<PersonalOrderRdo[]>(
    `${APIRoute.TrainerOrders}${createQueryString(query)}`,
  );
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
