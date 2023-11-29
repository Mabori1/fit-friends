import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { FeedbackRdo } from '../../types/feedback.rdo';
import { TrainingRdo } from '../../types/training.rdo';
import { UserRdo } from '../../types/user.rdo';

type TrainingData = {
  currentTraining: TrainingRdo | null;
  currentTrainings: TrainingRdo[];
  currentOrders: OrderRdo[];
  allExistingTrainings: TrainingRdo[];
  filteredTrainingCatalog: TrainingRdo[];
  trainingCatalog: TrainingRdo[];
  recommendedTrainings: TrainingRdo[];
  userTrainings: TrainingRdo[];
  userInfo: UserRdo | null;
  feedbacks: FeedbackRdo[];
};

const initialState: TrainingData = {
  currentTraining: null,
  currentTrainings: [],
  currentOrders: [],
  allExistingTrainings: [],
  filteredTrainingCatalog: [],
  trainingCatalog: [],
  recommendedTrainings: [],
  userTrainings: [],
  userInfo: null,
  reviews: [],
};

export const trainingSlice = createSlice({
  name: NameSpace.TrainingSlice,
  initialState,
  reducers: {
    setCurrentTraining: (state, action) => {
      state.currentTraining = action.payload as TrainingRdo;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchMyTrainingsAction.fulfilled, (state, action) => {
        state.currentTrainings = action.payload;
      })
      .addCase(fetchUserInfoAction.fulfilled, (state, action) => {
        state.userInfo = action.payload;
      })
      .addCase(fetchTrainingInfoAction.fulfilled, (state, action) => {
        state.currentTraining = action.payload;
      })
      .addCase(updateTrainingAction.fulfilled, (state, action) => {
        state.currentTraining = action.payload;
      })
      .addCase(uploadVideoFileAction.fulfilled, (state, action) => {
        state.currentTraining = action.payload;
      })
      .addCase(fetchMyOrdersAction.fulfilled, (state, action) => {
        state.currentOrders = action.payload;
      })
      .addCase(fetchTrainingCatalogAction.fulfilled, (state, action) => {
        state.filteredTrainingCatalog = action.payload[0];
        state.trainingCatalog = action.payload[1];
      })
      .addCase(fetchTrainingsAction.fulfilled, (state, action) => {
        state.userTrainings = action.payload;
      })
      .addCase(fetchRecommendedTrainingsAction.fulfilled, (state, action) => {
        state.recommendedTrainings = action.payload;
      })
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
      });
  },
});

export const { setCurrentTraining } = trainingData.actions;
