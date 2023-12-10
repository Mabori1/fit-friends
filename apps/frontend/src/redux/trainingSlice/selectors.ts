import { NameSpace } from '../../constants';
import { FeedbackRdo } from '../../types/feedback.rdo';
import { TrainingRdo } from '../../types/training.rdo';
import { UserRdo } from '../../types/user.rdo';
import { State } from '../store';

export const getTraining = (state: State): TrainingRdo | null =>
  state[NameSpace.TrainingSlice].training;

export const getTrainings = (state: State): TrainingRdo[] =>
  state[NameSpace.TrainingSlice].trainings;

export const getAllTrainings = (state: State): TrainingRdo[] =>
  state[NameSpace.TrainingSlice].allTrainings;

export const getTrainingById =
  (id: number) =>
  (state: State): TrainingRdo | undefined =>
    state[NameSpace.TrainingSlice].allTrainings.find(
      (training) => training.id === id,
    );

export const getRecommendedTrainings = (state: State): TrainingRdo[] =>
  state[NameSpace.TrainingSlice].recommendedTrainings;

export const getTrainingCatalog = (state: State): TrainingRdo[] =>
  state[NameSpace.TrainingSlice].trainingsCatalog;

export const getUserInfo = (state: State): UserRdo | null =>
  state[NameSpace.TrainingSlice].userInfo;

export const getFeedbacks = (state: State): FeedbackRdo[] | null =>
  state[NameSpace.TrainingSlice].feedbacks;
