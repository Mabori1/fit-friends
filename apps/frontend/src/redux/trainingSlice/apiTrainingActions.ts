import { createAsyncThunk } from '@reduxjs/toolkit';
import { AsyncThunkConfig } from '../../types/async-thunk-config';
import { TrainingRdo } from '../../types/training.rdo';
import { APIRoute } from '../../constants';
import { TrainingQuery } from '../../types/training.query';
import { createQueryString } from '../../helper/utils';
import { UploadedFileRdo } from '../../types/uploaded-files.rdo';
import { TrainingDdo } from '../../types/training.dto';
import { UserRdo } from '../../types/user.rdo';

interface UpdateVideoPath {
  id: number;
  video: string;
}

export const createTrainingAction = createAsyncThunk<
  TrainingRdo,
  TrainingDdo,
  AsyncThunkConfig
>('trainer/create', async (createTrainingDto, { extra: api }) => {
  const { data } = await api.post<TrainingRdo>(
    APIRoute.CreateTraining,
    createTrainingDto,
  );
  return data as TrainingRdo;
});

export const fetchTrainingsAction = createAsyncThunk<
  TrainingRdo[],
  TrainingQuery,
  AsyncThunkConfig
>('trainer/fetchTrainings', async (query, { extra: api }) => {
  const queryString = createQueryString(query);
  const { data } = await api.get<TrainingRdo[]>(
    APIRoute.FetchTrainings + queryString,
  );
  return data;
});

export const uploadVideoAction = createAsyncThunk<
  UploadedFileRdo,
  FormData,
  AsyncThunkConfig
>('trainer/uploadVideo', async (video, { extra: api }) => {
  const { data } = await api.post<UploadedFileRdo>(APIRoute.UploadVideo, video);

  return data;
});

export const updateTrainingAction = createAsyncThunk<
  TrainingRdo,
  UpdateVideoPath,
  AsyncThunkConfig
>('trainer/updateTrainingVideoPath', async (updateDto, { extra: api }) => {
  const { id, ...newVideo } = updateDto;
  const { data } = await api.patch<TrainingRdo>(
    `${APIRoute.UpdateTraining}/${id}`,
    newVideo,
  );
  return data;
});

export const fetchUserInfoAction = createAsyncThunk<
  UserRdo,
  number,
  AsyncThunkConfig
>('trainer/userInfo', async (userId, { extra: api }) => {
  const { data } = await api.get<UserRdo>(`${APIRoute.Users}/${userId}`);
  return data;
});
