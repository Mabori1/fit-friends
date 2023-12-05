import { NameSpace } from '../../constants';
import { TrainingRdo } from '../../types/training.rdo';
import { State } from '../store';

export const getTraining = (state: State): TrainingRdo | null =>
  state[NameSpace.TrainingSlice].training;

export const getTrainings = (state: State): TrainingRdo[] =>
  state[NameSpace.TrainingSlice].trainings;

export const getAllTrainings = (state: State): TrainingRdo[] =>
  state[NameSpace.TrainingSlice].allTrainings;

export const getRecommendedTrainings = (state: State): TrainingRdo[] =>
  state[NameSpace.TrainingSlice].recommendedTrainings;

export const getTrainingCatalog = (state: State): TrainingRdo[] =>
  state[NameSpace.TrainingSlice].trainingsCatalog;

export const getUserInfo = (state: State): UserRdo =>
  state[NameSpace.TrainingSlice].userInfo;

export const getFeedbacks = (state: State): FeedbackRdo[] =>
  state[NameSpace.TrainingSlice].feedbacks;
