import { createAsyncThunk } from '@reduxjs/toolkit';
import { AsyncThunkConfig } from '../../types/async-thunk-config';
import { TrainingRdo } from '../../types/training.rdo';
import { APIRoute } from '../../constants';
import { TrainingQuery } from '../../types/training.query';
import { createQueryString } from '../../helper/utils';
import { UploadedFileRdo } from '../../types/uploaded-files.rdo';
import { TrainingDdo } from '../../types/training.dto';
import { UserRdo } from '../../types/user.rdo';
import { FeedbackRdo } from '../../types/feedback.rdo';
import { FeedbackDto } from '../../types/feedback.dto';
import {
  GenderOfTraining,
  TrainingDuration,
  UserLevel,
  UserTypesTraining,
} from '@fit-friends/types';

interface UpdateTrainingDto {
  id: number;
  title?: string;
  backgroundPicture?: string;
  levelOfUser?: UserLevel;
  typeOfTraining?: UserTypesTraining;
  duration?: TrainingDuration;
  gender?: GenderOfTraining;
  caloriesQtt?: number;
  description?: string;
  video?: string;
  price?: number;
  trainerId?: number;
  isPromo?: boolean;
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

type TrainerTraining = {
  trainerId: number;
  query: TrainingQuery;
};

export const fetchTrainerTrainingsAction = createAsyncThunk<
  TrainingRdo[],
  TrainerTraining,
  AsyncThunkConfig
>('user/fetchTrainerTrainings', async (trainerIdAndQuery, { extra: api }) => {
  const { trainerId, ...query } = trainerIdAndQuery;
  const queryString = createQueryString(query as TrainingQuery);
  const { data } = await api.get<TrainingRdo[]>(
    `${APIRoute.FetchTrainerTrainings}/${trainerId}` + queryString,
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
  UpdateTrainingDto,
  AsyncThunkConfig
>('trainer/updateTrainingVideoPath', async (updateDto, { extra: api }) => {
  const { id, ...newDto } = updateDto;
  const { data } = await api.patch<TrainingRdo>(
    `${APIRoute.UpdateTraining}/${id}`,
    newDto,
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

export const fetchRecommendedTrainingsAction = createAsyncThunk<
  TrainingRdo[],
  TrainingQuery,
  AsyncThunkConfig
>('client/fetchRecommendedTrainingsAction', async (query, { extra: api }) => {
  const queryString = createQueryString(query);
  const { data } = await api.get<TrainingRdo[]>(
    `${APIRoute.FetchRecomended}${queryString}`,
  );
  return data;
});

export const fetchTrainingsCatalogAction = createAsyncThunk<
  TrainingRdo[],
  TrainingQuery,
  AsyncThunkConfig
>('client/fetchTrainingsCatalogAction', async (query, { extra: api }) => {
  const queryString = createQueryString(query);
  const { data } = await api.get<TrainingRdo[]>(
    `${APIRoute.FetchRecomended}${queryString}`,
  );
  return data;
});

export const fetchTrainingAction = createAsyncThunk<
  TrainingRdo,
  number,
  AsyncThunkConfig
>('training/info', async (trainingId, { extra: api }) => {
  const { data } = await api.get<TrainingRdo>(
    `${APIRoute.Training}/${trainingId}`,
  );
  return data;
});

export const fetchFeedbacksAction = createAsyncThunk<
  FeedbackRdo[],
  number,
  AsyncThunkConfig
>('fetchFeedbacksAction', async (trainingId, { extra: api }) => {
  const { data } = await api.get<FeedbackRdo[]>(
    `${APIRoute.Feedbacks}/${trainingId}`,
  );
  return data;
});

export const createFeedbackAction = createAsyncThunk<
  FeedbackRdo,
  FeedbackDto,
  AsyncThunkConfig
>('createReviewAction', async (createReviewDto, { extra: api }) => {
  const { data } = await api.post<FeedbackRdo>(
    APIRoute.CreateFeedback,
    createReviewDto,
  );
  return data;
});
