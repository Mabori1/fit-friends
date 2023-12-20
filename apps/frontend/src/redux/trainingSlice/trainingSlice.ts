import { createSlice } from '@reduxjs/toolkit';
import { NameSpace, SliceStatus } from '../../constants';
import { FeedbackRdo } from '../../types/feedback.rdo';
import { TrainingRdo } from '../../types/training.rdo';
import { UserRdo } from '../../types/user.rdo';
import { OrderRdo } from '../../types/order.rdo';
import {
  fetchRecommendedTrainingsAction,
  fetchTrainingsAction,
  fetchTrainingsCatalogAction,
  fetchUserInfoAction,
  fetchFeedbacksAction,
  fetchTrainingAction,
  fetchTrainerTrainingsAction,
} from './apiTrainingActions';

type TrainingData = {
  trainingSliceStatus: SliceStatus;
  training: TrainingRdo | null;
  trainings: TrainingRdo[];
  orders: OrderRdo[];
  allTrainings: TrainingRdo[];
  filteredTrainingCatalog: TrainingRdo[];
  trainingsCatalog: TrainingRdo[];
  recommendedTrainings: TrainingRdo[];
  userTrainings: TrainingRdo[];
  userInfo: UserRdo | null;
  feedbacks: FeedbackRdo[];
};

const initialState: TrainingData = {
  trainingSliceStatus: SliceStatus.Idle,
  training: null,
  trainings: [],
  orders: [],
  allTrainings: [],
  filteredTrainingCatalog: [],
  trainingsCatalog: [],
  recommendedTrainings: [],
  userTrainings: [],
  userInfo: null,
  feedbacks: [],
};

export const trainingSlice = createSlice({
  name: NameSpace.TrainingSlice,
  initialState,
  reducers: {
    setTraining: (state, action) => {
      state.training = action.payload as TrainingRdo;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchTrainingAction.pending, (state) => {
        state.trainingSliceStatus = SliceStatus.Loading;
      })
      .addCase(fetchTrainingAction.fulfilled, (state, action) => {
        state.trainingSliceStatus = SliceStatus.Fulfilled;
        state.training = action.payload;
      })
      .addCase(fetchTrainingAction.rejected, (state) => {
        state.trainingSliceStatus = SliceStatus.Rejected;
        state.training = null;
      })
      .addCase(fetchTrainingsAction.pending, (state) => {
        state.trainingSliceStatus = SliceStatus.Loading;
      })
      .addCase(fetchTrainingsAction.fulfilled, (state, action) => {
        state.trainingSliceStatus = SliceStatus.Fulfilled;
        state.trainings = action.payload;
      })
      .addCase(fetchTrainingsAction.rejected, (state) => {
        state.trainingSliceStatus = SliceStatus.Rejected;
        state.trainings = [];
      })
      .addCase(fetchTrainingsCatalogAction.pending, (state) => {
        state.trainingSliceStatus = SliceStatus.Loading;
      })
      .addCase(fetchTrainingsCatalogAction.fulfilled, (state, action) => {
        state.trainingSliceStatus = SliceStatus.Fulfilled;
        state.trainingsCatalog = action.payload;
      })
      .addCase(fetchTrainingsCatalogAction.rejected, (state) => {
        state.trainingSliceStatus = SliceStatus.Rejected;
        state.trainingsCatalog = [];
      })
      .addCase(fetchRecommendedTrainingsAction.pending, (state) => {
        state.trainingSliceStatus = SliceStatus.Loading;
      })
      .addCase(fetchRecommendedTrainingsAction.fulfilled, (state, action) => {
        state.trainingSliceStatus = SliceStatus.Fulfilled;
        state.recommendedTrainings = action.payload;
      })
      .addCase(fetchRecommendedTrainingsAction.rejected, (state) => {
        state.trainingSliceStatus = SliceStatus.Rejected;
        state.recommendedTrainings = [];
      })
      .addCase(fetchUserInfoAction.pending, (state) => {
        state.trainingSliceStatus = SliceStatus.Loading;
      })
      .addCase(fetchUserInfoAction.fulfilled, (state, action) => {
        state.trainingSliceStatus = SliceStatus.Fulfilled;
        state.userInfo = action.payload;
      })
      .addCase(fetchUserInfoAction.rejected, (state) => {
        state.trainingSliceStatus = SliceStatus.Rejected;
        state.userInfo = null;
      })
      .addCase(fetchFeedbacksAction.pending, (state) => {
        state.trainingSliceStatus = SliceStatus.Loading;
      })
      .addCase(fetchFeedbacksAction.fulfilled, (state, action) => {
        state.trainingSliceStatus = SliceStatus.Fulfilled;
        state.feedbacks = action.payload;
      })
      .addCase(fetchFeedbacksAction.rejected, (state) => {
        state.trainingSliceStatus = SliceStatus.Rejected;
        state.feedbacks = [];
      })
      .addCase(fetchTrainerTrainingsAction.pending, (state) => {
        state.trainingSliceStatus = SliceStatus.Loading;
      })
      .addCase(fetchTrainerTrainingsAction.fulfilled, (state, action) => {
        state.trainingSliceStatus = SliceStatus.Fulfilled;
        state.userTrainings = action.payload;
      })
      .addCase(fetchTrainerTrainingsAction.rejected, (state) => {
        state.trainingSliceStatus = SliceStatus.Rejected;
        state.userTrainings = [];
      });
  },
});

export const { setTraining } = trainingSlice.actions;
